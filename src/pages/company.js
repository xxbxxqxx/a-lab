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

          <section className="company-col">
            <h2>会社ロゴ</h2>

            <div className="company-col-in">
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