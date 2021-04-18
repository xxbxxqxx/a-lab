import React, { useContext, useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import styles from '../components/styles/Home.module.css'
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';
import ShowProfile from '../components/ShowProfile';
import auth0 from '../lib/auth0';
const { decycle, encycle } = require('json-cyclic');

export default function Home({ initialTodos, session_auth0_user, contextreq, contextres }) {
  const { user, error, isLoading } = useUser();

  const { todos, setTodos, getTodosK } = useContext(TodosContext);
  useEffect(() => {
      setTodos(initialTodos);
  }, []);
  
  const handleToggleUpdate2 = (e) => {
    const sdadsad = getTodosK();
    console.log(sdadsad);
  };
  return (
    <Layout>
    {isLoading && <p>Loading login info...</p>}
    {error && (
      <div>
        <h4>Error</h4>
        <pre>{error.message}</pre>
      </div>
    )}
    <div className={styles.container}>
      <Head>
        <title>Mypage | Activate Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{wordBreak: "break-all"}}>
          <button
            type="button"
            onClick={handleToggleUpdate2}
          >
            ユーザー情報取得
          </button>
        </div>
        <h1 className={styles.title}>Mypage</h1>
        {user &&(
            <div>
              Welcome {user.name}!
            </div>
        )}
        <div className={styles.grid}>
          <div href="https://nextjs.org/learn" className="myp-block-wrapper">
            <h3>Airtableの情報更新パネル</h3>
            <hr />
            <p>Airtable 経由で取得したレコード（JSON.stringify(todos)）</p>
            {JSON.stringify(todos)}
            <hr />
            <ShowProfile RecordId={todos[0] ? todos[0]["id"] : "aaa"} />
          </div>

          <div href="https://nextjs.org/docs" className="myp-block-wrapper">
            <h3>Auth0 Profile</h3>
            <pre data-testid="profile"><code>{JSON.stringify(user, null, 1)}</code></pre>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context.req, context.res);
    //let todos = await table.find('rec1PDbe0ww22feo3');
    let todos = await table.select({maxRecords: 1,filterByFormula: "{uid} = 'sdasad'"}).firstPage();
    return {
        props: {
            initialTodos: minifyRecords(todos),
            //session_auth0_user: session.user,
            //ressds:  JSON.stringify(session),
            contextreq: JSON.stringify(decycle(context.req)),
            contextres: JSON.stringify(decycle(context.res)),
        },
    };
}