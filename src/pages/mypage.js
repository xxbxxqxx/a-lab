import React, { useContext, useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/Airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';

import ShowProfile from '../components/AtShowProfile';
import CreateProfile from '../components/AtCreateProfile';

const { decycle, encycle } = require('json-cyclic');

export default function Home({ initialProfile, session_auth0_user }) {
  const { user, error, isLoading } = useUser();

  const { profile, setProfile } = useContext(TodosContext);

  useEffect(() => {
      setProfile(initialProfile);
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
        <title>Mypage | Activate Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Mypage</h1>
        {user &&(
            <div>
              Welcome {session_auth0_user.nickname} （ {session_auth0_user.sub} ）!
            </div>
        )}
        <div>
          {initialProfile.length === 0
            ? <CreateProfile profile={initialProfile} />
            : <ShowProfile atRecord={initialProfile} />
          }

          {/* 開発用情報 消さないで （ここから） */}
          <div href="https://nextjs.org/docs" className="myp-block-wrapper block-indevelopment">
            <span className="label">開発用</span>
            <h3>Record from Airtable</h3>
            <pre data-testid="profile"><code>{JSON.stringify(profile)}</code></pre>
          </div>

          <div href="https://nextjs.org/docs" className="myp-block-wrapper block-indevelopment">
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