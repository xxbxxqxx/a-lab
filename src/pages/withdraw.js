import React, { useContext, useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/Airtable';
import { TodosContext } from '../contexts/TodosContext';
import ShowFlashMessage from '../components/ShowFlashMessage';
import { useRouter } from 'next/router';

export default function Withdraw({ initialProfile, session_auth0_user, contentfulposts }) {

  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const { updateUserOnAirtable } = useContext(TodosContext);
  const moment = require("moment");

  const profile = initialProfile[0].fields

    //プロフィールアップデート処理
  const handleSubmitUpdate = async (e) => {
    const dateWithdraw = moment().format("YYYY/M/D HH:mm")
    let updatedRecord = {
      id: (initialProfile[0].id),
      fields: {
        "退会フラグ": "退会済み",
        "退会フラグ更新日時": dateWithdraw
      }
    }
    console.log(updatedRecord)
    e.preventDefault();
    updateUserOnAirtable(updatedRecord).then(
      router.push('/api/auth/logout')
    )

    //Toユーザー
    const emailBodyContentUser = 'OpenGate Careers(オープンゲートキャリアズ)の退会手続きが完了いたしましたので、お知らせいたします。' + '<br />'
      + 'ご利用いただきまして誠にありがとうございました。' + '<br />' + '<br />'
      + '▼ご注意事項' + '<br />'
      + '・退会したアカウントの情報を元に戻すことはできません' + '<br />' + '<br />'
      + '自動配信メールです。このメールには返信できません。' + '<br />' + '<br />'
      + '――――――――――――――――――――――――――――――――――――' + '<br />'
      + 'OpenGate Careers（オープンゲートキャリアズ）：https://www.opengate.careers/' + '<br />'
      + '問い合わせ先：OpenGate Careers事務局：contact@opengate.careers' + '<br />' + '<br />'
      + 'OpenGate Careers（オープンゲートキャリアズ）'
    const jsonBodyUser = {
      emailSubject: "【OpenGate Careers(オープンゲートキャリアズ)】退会完了のお知らせ",
      emailBody: emailBodyContentUser,
      emailTo: profile.email
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBodyUser)
    })

    //To管理者
    const emailBodyContent = '<h2>ユーザーが退会しました。</h2><br /><p>'
      + "UID: " + profile.uid + "<br />"
      + "メールアドレス: " + profile.email + "<br />"
      + "名前: " + profile.LastName + " " + profile.FirstName + "<br />"
      + '</p><br /><p>詳しくは<a href="https://airtable.com/tblZIi0lMTduQcmwh/viw16uoDx9Iuy9vfd">Airtableから確認</a>してください。</p>'
    const jsonBody = {
      emailSubject: "ユーザーが退会しました。",
      emailBody: emailBodyContent
    }
    const resUserRegistration = await fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    })
  }

  return (
    <Layout>
      <Head>
        <title>退会申請 | OpenGate Careers</title>
      </Head>
      {isLoading && <p>Loading login info...</p>}
      {error && (
        <div>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </div>
      )}
      <div className="container">
        <main className="mypage-main mypage-main-withdraw">
          {user && initialProfile.length > 0 && initialProfile[0].fields["退会フラグ"] !== "退会済み"
            ? (
              <>
              <h1>アカウント退会</h1>
              <p>アカウントを退会するとログインができなくなりますが、よろしいですか？</p>
              <form className="form my-6 myp-form"
                onSubmit={(e => handleSubmitUpdate(e))}
              >
                <button type="submit" className="btn btn-primary-register btn-lg"
                  style={{
                    background: "#eee",
                    border: "solid 2px #ccc",
                  }}
                >
                  退会する
                </button>
              </form>
              </>
            )
            : (
              <>
              <h1>アカウント退会</h1>
              <p style={{textAlign: "center"}}>会員登録もしくはログインが必要です。</p>
              </>
            )
          }
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { user } = await getSession(context.req, context.res);
  let minifiedAtRecord = ""
  if( user ){
    const at_record = await table.select({ maxRecords: 1, filterByFormula: `{uid} = '${user.sub}'` }).firstPage();
    minifiedAtRecord = minifyRecords(at_record)
  }

  return {
    props: {
      initialProfile: minifiedAtRecord,
      session_auth0_user: user,
    },
  };
}