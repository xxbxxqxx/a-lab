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

        <main className="mypage-main mypage-main-withdraw">

          {user
            ? (
              <>
              <h1>アカウント退会</h1>
              <p>アカウントを退会するとログインができなくなりますが、よろしいですか？</p>
              <form>
                <button type="submit" className="btn btn-primary-register btn-lg">
                  退会する
                </button>
              </form>
              </>
            )
            : (
              <h1>ログインしてください。</h1>
            )
          }
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