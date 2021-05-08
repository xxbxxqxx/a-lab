import Head from 'next/head'
import Layout from '../components/layout';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { fetchEntries } from '../lib/contentfulPosts'
const { decycle, encycle } = require('json-cyclic');

export default function Home({ session_auth0, contextreq, contextres, contentfulposts }) {
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

      <section className="top-main-visual">

        <div className="registration-top">
          <dl className="registration-cap">
            <dt>無料登録はこちら</dt>
            <dd>障害者雇用専門のキャリアコンサルタントに相談してみる</dd>
          </dl>

          <form>
            <dl className="registration-input">
              <dt>お名前</dt>
              <dd><input type="text" placeholder="お名前を入力してください" /></dd>
            </dl>
            <dl className="registration-input">
              <dt>ふりがな</dt>
              <dd><input type="text" placeholder="ふりがなを入力してください" /></dd>
            </dl>
            <dl className="registration-input">
              <dt>電話番号</dt>
              <dd><input type="text" placeholder="電話番号を入力してください" /></dd>
            </dl>
            <dl className="registration-input">
              <dt>メールアドレス</dt>
              <dd><input type="mail" placeholder="メールアドレスを入力してください" /></dd>
            </dl>

            <dl className="registration-input">
              <dt>手帳種類</dt>
              <dd>
                <input type="radio" name="" value="1" />
                <label>身体障害</label>

                <input type="radio" name="" value="2" />
                <label>精神障害</label>

                <input type="radio" name="" value="3" />
                <label>知的障害</label>

                <input type="radio" name="" value="4" />
                <label>取得予定</label>

                <input type="radio" name="" value="5" />
                <label>取得なし</label>
              </dd>
            </dl>
            <div className="submi-btn">
              <input type="submit" value="登録して話を聞く" />
            </div>
          </form>

        </div>


      </section>
      {/*top画像ここまで　*/}

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
            <hr style={{borderColor: "#000"}} />

            <h3>求人情報</h3>
            <div className="block-indevelopment-posts">
              {contentfulposts.map((p) => {
                return <div className="block-indevelopment-posts-post">
                  <p>Title: {p.title}</p>
                  <p>Slug: {p.slug}</p>
                  <p>業界: {p.industry}</p>
                  <p>年収: {p.income}</p>
                  <p>雇用形態: {p.employmentType}</p>
                  <p>業務: {p.job}</p>
                  <p>場所: {p.location}</p>
                  <p>本文: {p.content}</p>
                </div>
              })}
            </div>
          </div>

          <section className="service-top-col">
            <h2>サービス紹介文</h2>

            <div className="service-top-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="main-photo-col">
            <h2>メイン画像</h2>

            <div className="main-photo-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="service-cat-top-col">
            <h2>サービス概要（カテゴリー）</h2>

            <div className="mservice-cat-top-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="free-contact-top-col">
            <h2>無料登録フォーム</h2>

            <div className="free-contact-top-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="mypage-top-col">
            <h2>マイページ</h2>

            <div className="mypage-top-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>

          <section className="Recr-comp-top-col">
            <h2>募集参加企業（ロゴのみ）</h2>

            <div className="Recr-comp-top-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>


          <section className="search-box-top-col">
            <h2>検査ボックス</h2>

            <div className="search-box-top--col-in">
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
  //Airtable
  const session = await getSession(context.req, context.res);
  //Contentful
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })
  return {
    props: {
      session_auth0: session ? JSON.stringify(session) : "NO SESSION",
      //session_auth0_user: session.user,
      //ressds:  JSON.stringify(session),
      contextreq: JSON.stringify(decycle(context.req)),
      contextres: JSON.stringify(decycle(context.res)),
      contentfulposts: posts,
    },
  };
}