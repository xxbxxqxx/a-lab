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

        {/* <div className="registration-top">
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
        </div> */}

      </section>
      {/*top画像ここまで　*/}

      <div className="container">
        <Head>
          <title>Activate Lab</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>



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
          <hr style={{ borderColor: "#000" }} />

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
      </div>
      {/* container */}

      <main>

        <section id="reasons" className="reasons-col BG-Orang">

          <h2 className="title">選ばれる理由</h2>

          <div className="reasons-col-in container">

            <div class="row">
              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>専門性の高い スタッフが多数常駐。あなたの就職活動を全力</h3>
                  <p>
                    ・専門的な観点から、あなたのご要望にあったおすすめの求人をご紹介します。ヒアリングを通じて、やりがい・働く環境・あなたのスキルにぴったりな職場を一緒に探していきましょう。
                    ・出勤前、お昼休み、仕事終わり等、あなたのご都合の良いタイミングで面談します。お仕事でお忙しい方でも気軽にご連絡ください。
                  </p>
                </div>
              </div>

              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>あなたにかわって障害を翻訳します！</h3>
                  <p>
                    ・当社のもつ「翻訳システム」を使用して、あなたの障害を翻訳します。人事の担当者にどう自分の症状を伝えたらよいか・・そんな風に悩む必要がありません！あなたの障害を翻訳して、必要な配慮をしっかり伝え、できることを自身でも認識したうえで自信をもって面接に臨めるようにサポートいたします。
                  </p>
                </div>
              </div>

              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>就職から定着までアフターフォローも充実しています。</h3>
                  <p>
                    ・ヒアリングのみならず、履歴書添削や模擬面談を通じて、あなたの就職を全面的にサポートします。
                    ・企業側との交渉も我々にお任せください！就職後の職場での働き方やコミュニケーションの方法、自ら伝えずらい部分は一緒に解決方法を考えましょう。
                  </p>
                </div>
              </div>
            </div>{/* row */}
          </div> {/* //container */}
        </section>

        <section className="job-col">

          <h2 className="title">求人紹介</h2>

          <div className="job-col-in container">

            <div class="row">





              {contentfulposts.map((p) => {
                return <div className="col-sm-6 job-col-in-cont">
                  <div className="job-col-in-cont-in">
                    <h3>1</h3>
                    <div className="ttl-cap">
                      <p>{p.title}</p>
                    </div>

                    <div className="job-info">

                      <table>
                        <tbody>
                          <tr>
                            <th>Slug</th>
                            <td>{p.slug}</td>
                          </tr>
                          <tr>
                            <th>業界</th>
                            <td>{p.industry}</td>
                          </tr>
                          <tr>
                            <th>年収</th>
                            <td>{p.income}</td>
                          </tr>

                          <tr>
                            <th>雇用形態</th>
                            <td>{p.employmentType}</td>
                          </tr>

                          <tr>
                            <th>業務</th>
                            <td>{p.job}</td>
                          </tr>

                          <tr>
                            <th>場所</th>
                            <td>{p.location}</td>
                          </tr>
                          <tr>
                            <th>本文</th>
                            <td>{p.content}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              })}





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
                        <tr>
                          <th>特徴</th>
                          <td>
                            <ul>
                              <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                            </ul>

                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                        <tr>
                          <th>特徴</th>
                          <td>
                            <ul>
                              <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                            </ul>

                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                        <tr>
                          <th>特徴</th>
                          <td>
                            <ul>
                              <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                            </ul>

                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                        <tr>
                          <th>特徴</th>
                          <td>
                            <ul>
                              <li>・テストテストテストテストテストテストテストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                              <li>・テストテストテストテストテストテスト</li>
                            </ul>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>{/* //job-info */}
                </div>
              </div>{/* job-col-in-cont */}

            </div>{/* row */}

          </div>{/* //container */}
        </section>

        <section className="users-voice-col BG-Orang">
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
                    {/* <strong>T・K さん「大手金融機関へ転職成功」</strong>
                    <h3>転職したいと思った理由</h3> */}
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
                    {/* <strong>T・K さん「大手金融機関へ転職成功」</strong>
                    <h3>転職したいと思った理由</h3> */}
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
                    {/* <strong>T・K さん「大手金融機関へ転職成功」</strong>
                    <h3>転職したいと思った理由</h3> */}
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
                    {/* <strong>T・K さん「大手金融機関へ転職成功」</strong>
                    <h3>転職したいと思った理由</h3> */}
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

        <section className="open-gate-col BG-Orang">
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


        <section className="about-company-col">

          <h2 className="title">会社概要 / アクセス</h2>

          <div className="about-company-col-in container">

            <div className="about-company-col-in">

              <div className="about-company-access">
                <div className="row">

                  <div className="col-sm-6 about-company-access-L">
                    <img src="/office-test.jpg" />
                  </div>

                  <div className="col-sm-6 about-company-access-R">
                    <h3><img src="/favicon.png" />株式会社アクティベートラボ</h3>
                    <ul>
                      <li>【新宿本社】</li>
                      <li>〒160-0023</li>
                      <li>東京都新宿区西新宿3-2-9</li>
                      <li>新宿ワシントンホテルビル本館2F</li>
                      <li> THE HUB新宿ワシントン37</li>
                    </ul>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>

        <section className="comany-profile-col">
          <div className="comany-profile-col-in container">
            <ul>
              <li><a href="#">個人情報保護方針</a></li>
              <li><a href="#">運営会社について</a></li>
            </ul>
            <p>厚生労働大臣許可：14-ユ-301310</p>
            <img src="/top-test.png" />
          </div>
        </section>

        {/* <section className="service-top-col">
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
        </section> */}

      </main>

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