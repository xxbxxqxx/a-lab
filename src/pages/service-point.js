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
        </main>

      </div>

      <section className="service-point-col">
        <h2 className="service-cap">サービスのポイント</h2>

        <div className="reasons-col-in container">

          <div class="row">

            <div className="col-sm-4 reasons-col-in-cont">
              <div className="reasons-col-in-cont-in">
                <span className="reasons-number">1</span>

                <div className="reasons-col-in-cont-in-cont">
                  <h3>無期限無料の入社後定着支援</h3>
                  <p>
                    他のエージェント同様に原則、労使間の積極的な介入は出来ませんが、ご相談ベースというかたちで、入社後の定着支援は無料で承ります。弊社のスタンスは入社というのは通過点に過ぎず、あくまでも定着、活躍がゴールになります。
                    その過程で起こる人事や配属先の上席・同僚のお悩みや課題について企業視点を持ちながら真摯に、そして真正面からご対応させて頂きます。
                    このように入社後の定着支援についても行き届いた万全の体制がございますので、人事の方にとって長期的に安心してサービスのご利用が出来ます。
                      </p>
                </div>

              </div>
            </div>{/* reasons-col-in-cont */}

            <div className="col-sm-4 reasons-col-in-cont">
              <div className="reasons-col-in-cont-in">
                <span className="reasons-number">2</span>

                <div className="reasons-col-in-cont-in-cont">
                  <h3>三百名以上の転職支援実績を誇るエキスパート</h3>
                  <p>
                    障害者もしくは健常者の人材紹介で最低三百名以上の支援実績がある者が担当させて頂きます。障害者領域のみならず、健常者の領域でも高い成果を上げてきた人材が在籍していることがハッピーの強みです。
                    また成果のみならず、社会事業への高い意識や英語人材が在籍しているのも特徴です。このような担当者が、求人票作成段階から入社後の定着支援まで貴社の障害者採用ステージに合わせてサポートさせて頂きます。

                    ミスマッチを防ぐ為、主治医の意見書（精神の方のみ）を提出している日本で唯一の民間人材紹介会社です。
                      </p>
                </div>

              </div>
            </div>{/* reasons-col-in-cont */}

            <div className="col-sm-4 reasons-col-in-cont">
              <div className="reasons-col-in-cont-in">
                <span className="reasons-number">3</span>

                <div className="reasons-col-in-cont-in-cont">
                  <h3>無期限無料の入社後定着支援</h3>
                  <p>
                    他のエージェント同様に原則、労使間の積極的な介入は出来ませんが、ご相談ベースというかたちで、入社後の定着支援は無料で承ります。弊社のスタンスは入社というのは通過点に過ぎず、あくまでも定着、活躍がゴールになります。
                    その過程で起こる人事や配属先の上席・同僚のお悩みや課題について企業視点を持ちながら真摯に、そして真正面からご対応させて頂きます。
                    このように入社後の定着支援についても行き届いた万全の体制がございますので、人事の方にとって長期的に安心してサービスのご利用が出来ます。
                      </p>
                </div>

              </div>
            </div>{/* reasons-col-in-cont */}

          </div>
        </div>{/* reasons-col-in */}
      </section>

      <section className="message">
        <h2 className="service-cap">MESSAGE</h2>

        <div className="message-col-in container">

          <div class="row">
            <div className="col-sm-4 message-col-in-cont-L">
              <img src="/masumoto.png" />
            </div>

            <div className="col-sm-8 message-col-in-cont-R">
              私は、身体障害者２級です。
              2009年9月14日、当時の職場にて脳出血で倒れました。意識不明のまま緊急搬送され、混濁した意識のなかで2週間、生死を彷徨いました。
              幸いにも一命を取り止め、会社を辞め、４年間リハビリに専念したものの、右半身マヒ、吃音、失語、高次機能障害が残りました。
              リハビリに必死で打ち込んだ４年間、私を希望へ導いてくれたのは人との出会い、情報との出会いでした。
              自身が障害のある当事者となって気付いたこと。障害者を取りまく環境には、まだまだ足りないものが多すぎます。そもそも障害者にとって、人や情報との出会いは想像を超えて遥かに難しいものです。
              だれもが社会に等しく関わり、自分らしい生き方ができる社会であってほしい
              それには、社会と接点を持つ障害者が増えることが欠かせないと考えます。
              私たちは、ITやAIを駆使して障害者のデジタルデバイドを解消、特に「働くこと」で社会参加する障害者を増やすことにチャレンジし続けます。
                </div>

          </div>

        </div>
      </section> {/* message */}


      <section className="activatetravo-corpo-col">
        <h2>アクティベートラボ　コーポレートサイトに遷移</h2>

        <div className="activatetravo-corpo-col-in">
          testtesttesttesttesttesttesttesttesttesttesttesttest
          testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
      </section>


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