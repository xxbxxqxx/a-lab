import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';
const { decycle, encycle } = require('json-cyclic');

export default function Home({ session_auth0, contextreq, contextres }) {
  const { user, error, isLoading } = useUser();


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
          <title>Activate Lab</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>

          {user
            ? (
              <h1>Welcome {user.name} !</h1>
            )
            : (
              <h1>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>
            )
          }

          <div href="https://nextjs.org/docs" className="myp-block-wrapper block-indevelopment">
            <span className="label">開発用</span>
            <h3>Sessions</h3>
            <pre data-testid="profile"><code>{session_auth0}</code></pre>
          </div>

          <section className="job-search-col">
            <h2>求人検索</h2>

            <div className="job-search-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>

          <section className="job-col">
            <h2>詳細検索</h2>

            <div className="job-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="job-offer-col">
            <h2>各求人の情報</h2>

            <div className="job-offer-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>



        </main>

      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  return {
    props: {
      session_auth0: session ? JSON.stringify(session) : "NO SESSION",
      //session_auth0_user: session.user,
      //ressds:  JSON.stringify(session),
      contextreq: JSON.stringify(decycle(context.req)),
      contextres: JSON.stringify(decycle(context.res)),
    },
  };
}