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

  //Send Email
  const handleSubmit = (e) => { 
    e.preventDefault()
    console.log('Sending')
    let data = {
      name: "nname",
      message: "mmesagge",
    }
    fetch('/api/sendMail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(
      console.log('done, ya!')
    )
  }

  //Auth0 Login Status
  const { user, error, isLoading } = useUser();

  const { profile, setProfile } = useContext(TodosContext);

  useEffect(() => {
    setProfile(initialProfile);
  }, []);

  const { updateUserOnAirtable } = useContext(TodosContext);

  //Flash Message
  const [flashMessage, setFlashMessage] = useState(false)
  const [flashType, setFlashType] = useState("info")

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
        <title>Mypage | Activate Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* フラッシュメッセージ ここから */}
        <ShowFlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} />
        {/* フラッシュメッセージ ここまで */}
        <h1>Mypage | {typeof initialProfile}</h1>
        {user &&(
            <div>
              Welcome {session_auth0_user.nickname} （ {session_auth0_user.sub} ）!
            </div>
        )}
        <div className="myp-block-wrapper">
          <div className="myp-block-wrapper block-indevelopment">
            <h3>Eメール送信</h3>
            <input type='submit' onClick={(e)=>{handleSubmit(e)}} />
          </div>
        </div>
        <div>
          {initialProfile.length === 0
            ? <CreateProfile profile={initialProfile} />
            : <ShowProfile atRecord={initialProfile} flashMessage={flashMessage} setFlashMessage={setFlashMessage} flashType={flashType} setFlashType={setFlashType}/>
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