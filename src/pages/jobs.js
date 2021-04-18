import React, { useContext, useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';

export default function Home() {

  return (
    <Layout>
      <Head>
        <title>Jobs | Activate Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{wordBreak: "break-all"}}>
          求人情報 via Contentful
        </div>
      </main>
    </Layout>
  )
}

//export async function getServerSideProps(context) {
//    //const { user } = await getSession(context.req, context.res);
//    //let todos = await table.find('rec1PDbe0ww22feo3');
//    //const user_only_id = user.sub.split("|")[1];
//    //let at_record = await table.select({maxRecords: 1, filterByFormula: `{uid} = '${user.sub}'`}).firstPage();
//    return {
//        props: {
//            //initialProfile: minifyRecords(at_record),
//            //session_auth0: JSON.stringify(session),
//            //session_auth0_user: user,
//            //uhsaid: user_only_id,
//        },
//    };
//}