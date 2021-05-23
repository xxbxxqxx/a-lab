import React, { useContext, useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/Airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';

import ShowProfile from '../components/AtShowProfile';
import CreateProfile from '../components/AtCreateProfile';
import ShowFlashMessage from '../components/ShowFlashMessage';
import TestComponent from '../components/TestComponent';

const { decycle, encycle } = require('json-cyclic');

export default function Home({ initialProfile, session_auth0_user }) {

  //プロフィール用State作成
  const prf = initialProfile ? initialProfile[0] : "";
  const [profile, setProfile] = useState({
    uid: prf ? prf.fields.uid ? prf.fields.uid : "" : "",
    email: prf ? prf.fields.email ? prf.fields.email : "" : "",
    description: prf ? prf.fields.description ? prf.fields.description : "" : "",
    FirstName: prf ? prf.fields.FirstName ? prf.fields.FirstName : "" : "",
    LastName: prf ? prf.fields.LastName ? prf.fields.LastName : "" : "",
    CV: prf ? prf.fields.CV ? prf.fields.CV : "" : "",
  })

  ////Send Email
  //const handleSubmit = async (e) => { 
  //  e.preventDefault()
  //  console.log('Sending...')

  //  console.log(event.target.myFile.value)
  //  const jsonBody = {
  //    myText: e.target.myText.value,
  //    myFile: e.target.myFile.value
  //  }
  //  fetch('/api/sendMail', {
  //    method: 'POST',
  //    headers: {
  //    //  'Accept': 'application/json, text/plain, */*',
  //      'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify(jsonBody)
  //  }).then(
  //    console.log('done, ya!')
  //  )
  //}

  //Auth0 Login Status
  const { user, error, isLoading } = useUser();

  //useEffect(() => {
  //  setProfile(initialProfile);
  //}, []);

  const { updateUserOnAirtable } = useContext(TodosContext);

  //Flash Message
  const [flashMessage, setFlashMessage] = useState(false)
  const [flashType, setFlashType] = useState("info")

  //初期登録か、それ以降かを判定
  const registerFlag = (initialProfile.length === 0) ? "false" : "true" 
  const [ initialReister, setInitialReister ] = useState()

  useEffect(() => {
    if(initialProfile.length === 0 && initialReister !== false){
      setFlashType("NotYetRegistered")
      setFlashMessage(true)
    }
  }, []);

  return (
    <Layout>
    {isLoading && <p>Loading login info...</p>}
    {error && (
      <div>
        <h4>Error</h4>
        <pre>{error.message}</pre>
      </div>
    )}
    <div className="container">
      <Head>
        <title>Mypage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* フラッシュメッセージ ここから */}
        <ShowFlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} />
        {/* フラッシュメッセージ ここまで */}
        <h1>Mypage</h1>
        {user &&(
            <div>
              Welcome {session_auth0_user.nickname} （ {session_auth0_user.sub} ）!
            </div>
        )}
        <div>
          {
            initialProfile.length === 0 && initialReister !== false
            ? <CreateProfile profile={initialProfile} flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} setFlashType={setFlashType} profile={profile} setProfile={setProfile}  initialReister={initialReister} setInitialReister={setInitialReister} />
            : <ShowProfile atRecord={initialProfile} flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} setFlashType={setFlashType} profile={profile} setProfile={setProfile} />
          }

          {/* 開発用情報 消さないで （ここから） */}
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
          {/* 開発用情報 消さないで （ここまで） */}
        </div>

        {/*<div className="myp-block-wrapper">
          <div className="myp-block-wrapper block-indevelopment">
            <span className="label">開発用</span>
            <h3>Eメール送信</h3>
            <form onSubmit={e => handleChangeCV(e)}>
            <TestComponent />
          </div>
        </div>*/}

      </main>
    </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const { user } = await getSession(context.req, context.res);
    //let todos = await table.find('rec1PDbe0ww22feo3');
    //const user_only_id = user.sub.split("|")[1];
    let at_record = await table.select({maxRecords: 1, filterByFormula: `{uid} = '${user.sub}'`}).firstPage();
    return {
        props: {
            initialProfile: minifyRecords(at_record),
            //session_auth0: JSON.stringify(session),
            session_auth0_user: user,
            //uhsaid: user_only_id,
        },
    };
}