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
//import TestComponent from '../components/TestComponent';

import { fetchEntriesMypage } from '../lib/contentfulPosts'

const { decycle, encycle } = require('json-cyclic');

export default function Home({ initialProfile, session_auth0_user, contentfulposts }) {

  //Auth0 Login Status
  const { user, error, isLoading } = useUser();

  //プロフィール用State作成
  const prf = initialProfile ? initialProfile[0] : "";
  const [profile, setProfile] = useState({
    uid: prf ? prf.fields.uid ? prf.fields.uid : "" : "",
    email: prf ? prf.fields.email ? prf.fields.email : session_auth0_user.email : session_auth0_user.email,
    FirstName: prf ? prf.fields.FirstName ? prf.fields.FirstName : "" : "",
    LastName: prf ? prf.fields.LastName ? prf.fields.LastName : "" : "",
    FirstNameKana: prf ? prf.fields.FirstNameKana ? prf.fields.FirstNameKana : "" : "",
    LastNameKana: prf ? prf.fields.LastNameKana ? prf.fields.LastNameKana : "" : "",
    Birthday: prf ? prf.fields.Birthday ? prf.fields.Birthday : "1985-01-01" : "1985-01-01",
    Prefecture: prf ? prf.fields.Prefecture ? prf.fields.Prefecture : "" : "",
    Address: prf ? prf.fields.Address ? prf.fields.Address : "" : "",
    TelNo: prf ? prf.fields.TelNo ? prf.fields.TelNo : "" : "",
    HearingImpairment: prf ? prf.fields.HearingImpairment ? prf.fields.HearingImpairment : "No" : "No",
    "手帳種類": prf ? prf.fields["手帳種類"] ? prf.fields["手帳種類"] : "" : "",
    "障害等級": prf ? prf.fields["障害等級"] ? prf.fields["障害等級"] : "" : "",
    "障害種別(身体障害)": prf ? prf.fields["障害種別(身体障害)"] ? prf.fields["障害種別(身体障害)"] : [] : [],
    "障害種別(精神障害)": prf ? prf.fields["障害種別(精神障害)"] ? prf.fields["障害種別(精神障害)"] : [] : [],
    "障害種別(発達障害)": prf ? prf.fields["障害種別(発達障害)"] ? prf.fields["障害種別(発達障害)"] : [] : [],
    Description: prf ? prf.fields.Description ? prf.fields.Description : "" : "",
    "現在のステータス": prf ? prf.fields["現在のステータス"] ? prf.fields["現在のステータス"] : "" : "",
    CV: prf ? prf.fields.CV ? prf.fields.CV : "" : "",
    Resume: prf ? prf.fields.Resume ? prf.fields.Resume : "" : "",
    "障害種別(その他)": prf ? prf.fields["障害種別(その他)"] ? prf.fields["障害種別(その他)"] : "" : "",
    "添削希望": prf ? prf.fields["添削希望"] ? prf.fields["添削希望"] : "No" : "No",
    "面談希望": prf ? prf.fields["面談希望"] ? prf.fields["面談希望"] : "No" : "No",
  })

  const { updateUserOnAirtable } = useContext(TodosContext);

  //Flash Message
  const [flashMessage, setFlashMessage] = useState(false)
  const [flashType, setFlashType] = useState("info")

  //初期登録か、それ以降かを判定
  const registerFlag = (initialProfile.length === 0) ? "false" : "true"
  const [initialReister, setInitialReister] = useState()

  useEffect(() => {
    if (initialProfile.length === 0 && initialReister !== false) {
      setFlashType("NotYetRegistered")
      setFlashMessage(true)
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>マイページ | OpenGate Careers</title>
      </Head>
      {isLoading && <p>Loading login info...</p>}
      {error && (
        <div>
          <h4>Error</h4>
          <pre>{error.message}</pre>
        </div>
      )}
      <div className="container">

        <main className="mypage-main">

          <ShowFlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} />

          <h1><i class="fa fa-info-circle" aria-hidden="true"></i>マイページ</h1>
          {user ? 
            user.email_verified === true
          ? (<>
          <ShowJobAtMypage
            flashMessage={flashMessage}
            setFlashMessage={setFlashMessage}
            flashType={flashType}
            setFlashType={setFlashType}
            initialProfile={initialProfile}
            contentfulposts={contentfulposts}
            auth0Profile={session_auth0_user}
          />

          <div style={{ marginTop: "0px" }}>
            <ShowProfile
              atRecord={initialProfile}
              flashMessage={flashMessage}
              setFlashMessage={setFlashMessage}
              flashType={flashType}
              setFlashType={setFlashType}
              profile={profile}
              setProfile={setProfile}
              auth0Profile={session_auth0_user}
            />
          </div>
          </>
          )
          : (<div>
              <h1>仮新規登録受付</h1>
              <div style={{maxWidth: "700px", margin: "20px auto 40px", textAlign: "center"}}>
              <p>ご登録ありがとうございます。<br />仮登録メールをお送りしました。</p>
              <p>
                本人確認のため、ご登録いただいたメールアドレスに仮登録メールをお送りしました。<br />
                本文に記載されているURLから、本登録を完了してください。
              </p>
              <p>48時間以内に仮登録メールが届かない場合は、OpenGate事務局までお問い合わせください。</p>
              </div>
            </div>)
          : (<div>
              <h1>登録をしてください。</h1>
            </div>)
          }
          {/*}
          <div style={{ marginTop: "0px" }}>
            <div className="myp-block-wrapper block-indevelopment">
              <span className="label">開発用</span>
              <h3>Record from Airtable</h3>
              <pre data-testid="profile"><code>{JSON.stringify(profile)}</code></pre>
            </div>
            <div className="myp-block-wrapper block-indevelopment">
              <span className="label">開発用</span>
              <h3>Auth0 Profile</h3>
              <pre data-testid="profile"><code>{JSON.stringify(user, null, 1)}</code></pre>
            </div>
          </div>
        */}

        </main>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { user } = await getSession(context.req, context.res);
  //let todos = await table.find('rec1PDbe0ww22feo3');
  //const user_only_id = user.sub.split("|")[1];
  let at_record = await table.select({ maxRecords: 1, filterByFormula: `{uid} = '${user.sub}'` }).firstPage();

  const res = await fetchEntriesMypage()
  const posts = await res.items.map((p) => {
    return p.fields
  })

  return {
    props: {
      initialProfile: minifyRecords(at_record),
      //session_auth0: JSON.stringify(session),
      session_auth0_user: user,
      //uhsaid: user_only_id,
      contentfulposts: posts,
    },
  };
}