import React, { useContext, useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/Airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';

import ShowProfile from '../components/AtShowProfile';
import ShowJobAtMypage from '../components/ShowJobAtMypage';
import CreateProfile from '../components/AtCreateProfile';
import ShowFlashMessage from '../components/ShowFlashMessage';

export default function Withdraw({ initialProfile, session_auth0_user, contentfulposts }) {

  const { user, error, isLoading } = useUser();
  return (
    <Layout>
      <Head>
        <title>メールアドレス認証完了 | OpenGate Careers</title>
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
          <h1>新規完了登録</h1>
          <p style={{textAlign: "center",marginTop: "40px"}}>
            <p style={{marginBottom: "40px"}}>本登録ありがとうございます。<br />
            基本情報を登録しましょう！</p>
            <a href="/api/auth/login" data-testid="login" className="log-btn" target="_blank"
              style={{
                background: "#0e9b3f",
                padding: "20px 40px",
                margin: "20px 0 0",
                color: "#fff",
                fontWeight: "bold"}}
            >
              <i className="fa fa-external-link" aria-hidden="true"></i>ログイン
            </a>
          </p>
        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { user } = await getSession(context.req, context.res);
  const at_record = await table.select({ maxRecords: 1, filterByFormula: `{uid} = '${user.sub}'` }).firstPage();

  return {
    props: {
      initialProfile: minifyRecords(at_record),
      session_auth0_user: user,
    },
  };
}