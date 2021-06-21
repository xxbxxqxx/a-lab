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

      <section className="reasons-col">

        <h2 className="title">選ばれる理由</h2>

        <div className="reasons-col-in container">

          <div class="row">
            <div className="col-sm-4 reasons-cont">
              <div className="reasons-cont-in">
                <h3>見出し1です</h3>
                testetst
              </div>
            </div>

            <div className="col-sm-4 reasons-cont">
              <div className="reasons-cont-in">
                <h3>見出し1です</h3>
                testetst
              </div>
            </div>

            <div className="col-sm-4 reasons-cont">
              <div className="reasons-cont-in">
                <h3>見出し1です</h3>
                testetst
              </div>
            </div>
          </div>{/* row */}
        </div> {/* //container */}
      </section>

      <section className="job-col">

        <h2 className="title">求人紹介</h2>

        <div className="job-col-in container">

          <div class="row">

            <div className="col-sm-6 job-col-in-cont">
              <div className="job-col-in-cont-in">
                <h3>1</h3>
                <div className="ttl-cap">
                  <p>テキストです<br />テキストですテキストです</p>
                </div>

                <div className="job-info">
                  <table>
                    <tbody>
                      <tr>
                        <th>業界</th>
                        <td>東証一部上場大手ブライダル企業</td>
                      </tr>
                      <tr>
                        <th>年収</th>
                        <td>400万円〜600万円</td>
                      </tr>
                      <tr>
                        <th>雇用形態</th>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <th>職種</th>
                        <td>エンジニア職</td>
                      </tr>
                      <tr>
                        <th>勤務地</th>
                        <td>東京都、千代田区</td>
                      </tr>
                    </tbody>
                  </table>

                  <ul>
                    <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                  </ul>
                </div>{/* //job-info */}
              </div>
            </div>{/* job-col-in-cont */}

            <div className="col-sm-6 job-col-in-cont">
              <div className="job-col-in-cont-in">
                <h3>2</h3>
                <div className="ttl-cap">
                  <p>テキストです<br />テキストですテキストです</p>
                </div>

                <div className="job-info">
                  <table>
                    <tbody>
                      <tr>
                        <th>業界</th>
                        <td>東証一部上場大手ブライダル企業</td>
                      </tr>
                      <tr>
                        <th>年収</th>
                        <td>400万円〜600万円</td>
                      </tr>
                      <tr>
                        <th>雇用形態</th>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <th>職種</th>
                        <td>エンジニア職</td>
                      </tr>
                      <tr>
                        <th>勤務地</th>
                        <td>東京都、千代田区</td>
                      </tr>
                    </tbody>
                  </table>

                  <ul>
                    <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                  </ul>
                </div>{/* //job-info */}
              </div>
            </div>{/* job-col-in-cont */}

            <div className="col-sm-6 job-col-in-cont">
              <div className="job-col-in-cont-in">
                <h3>3</h3>
                <div className="ttl-cap">
                  <p>テキストです<br />テキストですテキストです</p>
                </div>

                <div className="job-info">
                  <table>
                    <tbody>
                      <tr>
                        <th>業界</th>
                        <td>東証一部上場大手ブライダル企業</td>
                      </tr>
                      <tr>
                        <th>年収</th>
                        <td>400万円〜600万円</td>
                      </tr>
                      <tr>
                        <th>雇用形態</th>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <th>職種</th>
                        <td>エンジニア職</td>
                      </tr>
                      <tr>
                        <th>勤務地</th>
                        <td>東京都、千代田区</td>
                      </tr>
                    </tbody>
                  </table>

                  <ul>
                    <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                  </ul>
                </div>{/* //job-info */}
              </div>
            </div>{/* job-col-in-cont */}

            <div className="col-sm-6 job-col-in-cont">
              <div className="job-col-in-cont-in">
                <h3>4</h3>
                <div className="ttl-cap">
                  <p>テキストです<br />テキストですテキストです</p>
                </div>

                <div className="job-info">
                  <table>
                    <tbody>
                      <tr>
                        <th>業界</th>
                        <td>東証一部上場大手ブライダル企業</td>
                      </tr>
                      <tr>
                        <th>年収</th>
                        <td>400万円〜600万円</td>
                      </tr>
                      <tr>
                        <th>雇用形態</th>
                        <td>正社員</td>
                      </tr>
                      <tr>
                        <th>職種</th>
                        <td>エンジニア職</td>
                      </tr>
                      <tr>
                        <th>勤務地</th>
                        <td>東京都、千代田区</td>
                      </tr>
                    </tbody>
                  </table>

                  <ul>
                    <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                    <li>・テストテストテストテストテストテスト</li>
                  </ul>
                </div>{/* //job-info */}
              </div>
            </div>{/* job-col-in-cont */}



          </div>{/* row */}

        </div>{/* //container */}
      </section>


      <section className="open-gate-col">
        <h2 className="title">日本最大規模の身体障害者SNS・OpenGate</h2>

        <div className="open-gate-col-in">

          <div className="open-gate-col-in-img">
            <img src="/bukin.jpg" />
          </div>

          <div className="open-gate-col-in-txt">
            <p>
              身体の不自由な部分をクリック！<br />
            同境遇の人と出会えて、共感出来て、交流出来ます。
            </p>
          </div>

        </div>
      </section>


      <section className="users-voice-col">
        <h2 className="title">利用者の声</h2>

        <div className="users-voice-col-in container">

          <div class="row">

            <div className="col-sm-6 users-voice-cont">
              <div className="users-voice-cont-in">
                <div className="users-voice-cont-in-head">
                  <ul>
                    <li><img src="/voiceuser.png" /></li>
                    <li>1対1の親身な姿勢に、本当に感謝の気持ちで一杯。</li>
                  </ul>
                </div>

                <div className="users-voice-cont-in-cont">
                  <strong>T・K さん「大手金融機関へ転職成功」</strong>
                  <h3>転職したいと思った理由</h3>
                  <p>
                    ガス・電気のインフラ業界のコールセンターとバックオフィスの事業に勤めていました。私はバックオフィス事業で入社しましたが、在籍4年の間に3回の異動があり腰を据えて業務経験を積むことが難しいと思ったことや、入社時に説明を受けていないバックオフィスからコールセンターへの配置転換を余儀なくされたことが挙げられます。また、精神障害を患っているので障害を理解して頂ける会社でかつ腰を据えて業務経験を積んで行きたいとの思いから転職したいと思いました。
                </p>
                </div>
              </div>
            </div>{/* users-voice-cont */}

            <div className="col-sm-6 users-voice-cont">
              <div className="users-voice-cont-in">
                <div className="users-voice-cont-in-head">
                  <ul>
                    <li><img src="/voiceuser.png" /></li>
                    <li>1対1の親身な姿勢に、本当に感謝の気持ちで一杯。</li>
                  </ul>
                </div>

                <div className="users-voice-cont-in-cont">
                  <strong>T・K さん「大手金融機関へ転職成功」</strong>
                  <h3>転職したいと思った理由</h3>
                  <p>
                    ガス・電気のインフラ業界のコールセンターとバックオフィスの事業に勤めていました。私はバックオフィス事業で入社しましたが、在籍4年の間に3回の異動があり腰を据えて業務経験を積むことが難しいと思ったことや、入社時に説明を受けていないバックオフィスからコールセンターへの配置転換を余儀なくされたことが挙げられます。また、精神障害を患っているので障害を理解して頂ける会社でかつ腰を据えて業務経験を積んで行きたいとの思いから転職したいと思いました。
                </p>
                </div>
              </div>
            </div>{/* users-voice-cont */}

            <div className="col-sm-6 users-voice-cont">
              <div className="users-voice-cont-in">
                <div className="users-voice-cont-in-head">
                  <ul>
                    <li><img src="/voiceuser.png" /></li>
                    <li>1対1の親身な姿勢に、本当に感謝の気持ちで一杯。</li>
                  </ul>
                </div>

                <div className="users-voice-cont-in-cont">
                  <strong>T・K さん「大手金融機関へ転職成功」</strong>
                  <h3>転職したいと思った理由</h3>
                  <p>
                    ガス・電気のインフラ業界のコールセンターとバックオフィスの事業に勤めていました。私はバックオフィス事業で入社しましたが、在籍4年の間に3回の異動があり腰を据えて業務経験を積むことが難しいと思ったことや、入社時に説明を受けていないバックオフィスからコールセンターへの配置転換を余儀なくされたことが挙げられます。また、精神障害を患っているので障害を理解して頂ける会社でかつ腰を据えて業務経験を積んで行きたいとの思いから転職したいと思いました。
                </p>
                </div>
              </div>
            </div>{/* users-voice-cont */}

            <div className="col-sm-6 users-voice-cont">
              <div className="users-voice-cont-in">
                <div className="users-voice-cont-in-head">
                  <ul>
                    <li><img src="/voiceuser.png" /></li>
                    <li>1対1の親身な姿勢に、本当に感謝の気持ちで一杯。</li>
                  </ul>
                </div>

                <div className="users-voice-cont-in-cont">
                  <strong>T・K さん「大手金融機関へ転職成功」</strong>
                  <h3>転職したいと思った理由</h3>
                  <p>
                    ガス・電気のインフラ業界のコールセンターとバックオフィスの事業に勤めていました。私はバックオフィス事業で入社しましたが、在籍4年の間に3回の異動があり腰を据えて業務経験を積むことが難しいと思ったことや、入社時に説明を受けていないバックオフィスからコールセンターへの配置転換を余儀なくされたことが挙げられます。また、精神障害を患っているので障害を理解して頂ける会社でかつ腰を据えて業務経験を積んで行きたいとの思いから転職したいと思いました。
                </p>
                </div>
              </div>
            </div>{/* users-voice-cont */}

          </div>{/* row */}
        </div>
      </section>

      <section className="flow-col">

        <h2 className="title">ご利用の流れ</h2>

        <div className="flow-col-in container">

          <div class="row">

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>01</dt>
                    <dd>登録</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>02</dt>
                    <dd>就職・転職相談</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>03</dt>
                    <dd>応募・書類選考開始！</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>04</dt>
                    <dd>面接</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>05</dt>
                    <dd>内定</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}

            <div className="col-sm-4 flow-col-in-cont">

              <div className="flow-col-in-cont-out">

                <div className="flow-col-in-cont-head">
                  <dl>
                    <dt>06</dt>
                    <dd>入社</dd>
                  </dl>
                </div>{/* //flow-col-in-cont-head */}

                <div className="flow-col-in-cont-cont">
                  あなただけのマイページが作成され、
                  求人の閲覧ができるようになります。
                  求人だけではなく、就職・転職に
                  便利なコンテンツを閲覧することも可能です！
                </div>{/* //flow-col-in-cont-cont */}

              </div>

            </div>{/* //flow-col-in-cont-out */}



          </div>
        </div>
      </section>

      <section className="qa-col">
        <h2 className="title">Q&A</h2>

        <div className="qa-col-in container">
          <dl>
            <dt>質問文章</dt>
            <dd>回答文章</dd>
            <dt>質問文章</dt>
            <dd>回答文章</dd>
            <dt>質問文章</dt>
            <dd>回答文章</dd>
          </dl>
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