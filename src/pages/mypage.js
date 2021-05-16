import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import ShowFlash from '../components/ShowFlash';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from './api/utils/Airtable';
import Todo from '../components/Todo';
import { TodosContext } from '../contexts/TodosContext';
import TodoForm from '../components/TodoForm';

import ShowProfile from '../components/AtShowProfile';
import CreateProfile from '../components/AtCreateProfile';

import Moment from 'react-moment';

const { decycle, encycle } = require('json-cyclic');

export default function Home({ initialProfile, session_auth0_user }) {

  //S3用現在時刻取得
  const dateNow = Date.now();
  const moment = require("moment");

  const [isOpen, setOpen] = useState(false)

  //Auth0 Login Status
  const { user, error, isLoading } = useUser();

  const { profile, setProfile } = useContext(TodosContext);

  useEffect(() => {
      setProfile(initialProfile);
  }, []);

  const { updateUserOnAirtable } = useContext(TodosContext);
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    //const filename = encodeURIComponent(file.name);
    const filename =
      moment().format("YYYYMMDD-HH:mm:ss")
      + "-CV-"
      + initialProfile[0].fields.LastName
      + initialProfile[0].fields.FirstName
      + "-" + initialProfile[0].fields.uid;
    const res = await fetch(`/api/s3Upload?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      //mode: "no-cors",
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      //ここでAirtableにpostする必要がある。
      const updatedRecord = {
        id: (initialProfile[0].id),
        fields: {
          CV: "https://presignedtest-rk.s3-ap-northeast-1.amazonaws.com/" + filename
        }
      }
      updateUserOnAirtable(updatedRecord);
      console.log('Uploaded successfully!');
    } else {
      console.error(url);
    }
  };

  const switchFlash = () =>{
    this.setState({ open: !this.state.open })
  }
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
        <div className="myp-block-wrapper">
          <h3>履歴書アップロード</h3>
          {initialProfile[0].fields.CV.length === 0
            ? <p>まだ履歴書が投稿されていません</p>
            : <p>initialProfile[0].fields.CV</p>
          }
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
          <div className="myp-block-wrapper block-indevelopment">
            <h3>フラッシュメッセージテスト</h3>
            <button type="button" onClick={() => setOpen(true)}>表示</button>
            <button type="button" onClick={() => setOpen(false)}>非表示</button>
            <ShowFlash message="メッセージ" open={isOpen} setOpen={setOpen} />
          </div>
        </div>
        <div>
          {initialProfile.length === 0
            ? <CreateProfile profile={initialProfile} />
            : <ShowProfile atRecord={initialProfile} />
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