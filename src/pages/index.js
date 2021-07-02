import Head from 'next/head'
import Layout from '../components/layout';
import Link from 'next/link';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import { fetchEntries } from '../lib/contentfulPosts'
const { decycle, encycle } = require('json-cyclic');

export default function Home({ session_auth0, contextreq, contextres, contentfulposts }) {
  const { user, error, isLoading } = useUser();

  return (
    <Layout>
      <Head>
        <title>OpenGate Careers l 障害者の求人・就職サポートサイト</title>
        <meta name="description" content="OpenGate Careers（オープンゲートキャリアズ）は障害者の求人・就職サポートサイトです。あなたの障害の症状を理解することで、あなたの強みやスキル、キャリアに合わせた企業とのマッチングを可能にしていきます。" />
      </Head>
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

        <div className="top-image-btn">
          <p>あなたにかわって<br />
            障害を翻訳します</p>
          <a href="/api/auth/login" data-testid="login" className="log-btn"><i className="fa fa-lightbulb-o" aria-hidden="true"></i>
            無料登録で使ってみる</a>
        </div>

      </section>
      {/*top画像ここまで　*/}


      <section className="top-main-bottom">

        <div className="container">

          <div className="row">

            <div className="col-sm-2 top-main-bottom-l">
              <img src="image/y0870.png" />
            </div>

            <div className="col-sm-10 top-main-bottom-r">
              <p>
                あなたの障害の症状を理解することで、<br />
                あなたの強みやスキル、キャリアにあわせた企業とのマッチングを可能にしていきます。<br />
                一人ひとりが、自分らしさを大切に、やりたいことが見つかるように。<br />
                我々があなたに合う仕事を紹介します。
              </p>

            </div>

          </div>

        </div>

      </section>


      {/*
        

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

          */}


      {/* container */}

      <main>

        <section id="reasons" className="reasons-col">

          <h2 className="title">OpenGate Careersが選ばれる理由</h2>

          <div className="reasons-col-in container">

            <div className="row">
              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>
                    世界初！<br />
                    障害者翻訳システムで<br />
                    不安を軽減
                  </h3>
                  <img src="/image/reasons-cont-in-1.jpg" />
                  <p>
                    当社独自の翻訳システムを使用し、自分<br />
                    の症状を翻訳することで人事担当者の障<br />
                    害に対するハードルを下げます。必要な<br />
                    配慮をしっかり伝え、自信をもって面接<br />
                    に臨めるように伴奏し、皆さんの「こん<br />
                    な仕事をしたい」を一緒に考えます。<br />
                  </p>
                </div>
              </div>

              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>経験豊富なスタッフが<br />
                    就職を全力サポート</h3>
                  <img src="/image/reasons-cont-in-2.jpg" />
                  <p>
                    専門的な観点から、あなたのご要望にあ<br />
                    ったおすすめの求人をご紹介。自身も障<br />
                    害を持ち、障害者の就職活動に対する不<br />
                    安や葛藤を知る代表の増本自らアドバイ<br />
                    ザーとして、可能な限り求職者の皆さん<br />
                    の就職活動をサポートします。
                  </p>
                </div>
              </div>

              <div className="col-sm-4 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>就職から定着まで<br />
                    アフターフォローも<br />
                    充実</h3>
                  <img src="/image/reasons-cont-in-3.png" />
                  <p>
                    ヒアリングのみならず、履歴書添削など<br />
                    あなたの就職を全面的にサポートします。<br />
                    企業側との交渉も我々にお任せください。<br />
                    就職後の職場での働き方やコミュニケー<br />
                    ションの方法、自ら伝えづらい部分は一<br />
                    緒に解決方法を考えていきましょう。
                  </p>
                </div>
              </div>
            </div>{/* row */}
          </div> {/* //container */}
        </section>

        <section id="job" className="job-col">

          <h2 className="title"> <img src="/image/job-col-icon1.png" />求人紹介</h2>

          <div className="job-col-in container">

            <div className="row">
              {contentfulposts.map((p) => {
                return <div className="col-sm-6 job-col-in-cont" key={p.title}>
                  <div className="job-col-in-cont-in">
                    <h3><img src="/image/job-col-icon2.png" /></h3>
                    <div className="ttl-cap">
                      <p>{p.title}</p>
                    </div>

                    <div className="job-info">

                      <table>
                        <tbody>
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
                            <td>
                              {p.content.split(/\n/g).map((p) => {
                              <p>p</p>})}
                              {p.content.split(/\n/g).map(value => (
                                <>{value}<br /></>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              })}


            </div>{/* row */}

          </div>{/* //container */}
        </section>

        <section id="users-voice" className="users-voice-col">
          <h2 className="title">利用者の声</h2>

          <div className="users-voice-col-in container">

            <div className="row">

              <div className="col-sm-12 users-voice-cont">
                <div className="users-voice-cont-in">
                  <div className="users-voice-cont-in-head">
                    <ul>
                      <li><img src="/image/users-voice-1.png/" /></li>
                      <li>
                        <h3>私に代わって障害を企業に丁寧に説明してくれました。</h3>
                        <p>
                          以前は、不動産会社の事務をしていましたがADHDと強迫性障害を患いながら仕事をすることはとても大変で、自分の障害がどんなものかを周りの人に理解されないことが一番辛かったです。思い切って転職活動を始め利用したのがこのオープンゲートキャリアズ。“障害翻訳”って何？という感じでしたが、はじめての面談のときからしっかりヒアリングしてくれて、自分が相手にどうしてほしいのか、必要な配慮はどこまでか深く理解したうえで、担当の方が私に代わって企業に説明してくれたので、私自身は思い切って面接に挑むことができました。最初にきちんとヒアリングをしてくれるので、私は安心してお任せすることができました。

                          {/* 以前は、不動産会社の事務をしていましたがADHDと強迫性障害を患いながら仕事をすることはとても大変で、自分の障害<br />
                          がどんなものかを周りの人に理解されないことが一番辛かったです。思い切って転職活動を始め利用したのがこのオープン<br />
                          ゲートキャリアズ。“障害翻訳”って何？という感じでしたが、はじめての面談のときからしっかりヒアリングしてくれて、<br />
                          自分が相手にどうしてほしいのか、必要な配慮はどこまでか深く理解したうえで、担当の方が私に代わって企業に説明して<br />
                          くれたので、私自身は思い切って面接に挑むことができました。最初にきちんとヒアリングをしてくれるので、私は安心し<br />
                          てお任せすることができました。 */}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{/* users-voice-cont */}


              <div className="col-sm-12 users-voice-cont">
                <div className="users-voice-cont-in">
                  <div className="users-voice-cont-in-head">
                    <ul>
                      <li><img src="/image/users-voice-2.png/" /></li>
                      <li>
                        <h3>不安な私にも親身に寄り添ってくれました。</h3>
                        <p>
                          正直、はじめは障害者採用にあまりいいイメージがなく。というのも私自身、障害を周りにはクローズにしており障害者雇用の枠で就職することを悩んでいました。まずは面談だけ、と思って登録してみましたが、担当の方が親身に私の話を聞いてくれて。私は指の欠損なので、実際に周りから気づかれないことも多くあります。ただ、障害があるからといって、負い目に感じる必要はなく、難しい部分を周りにサポートしてもらい私自身のスキルをどんどん発揮していけばよいと背中を押していただいて、今はとてもやりがいのある仕事に就くことができました。自分の可能性を広げて挑戦して本当に良かったと思っています。

                          {/* 正直、はじめは障害者採用にあまりいいイメージがなく。というのも私自身、障害を周りにはクローズにしており障害者雇<br />
                          用の枠で就職することを悩んでいました。まずは面談だけ、と思って登録してみましたが、担当の方が親身に私の<br />
                          話を聞いてくれて。私は指の欠損なので、実際に周りから気づかれないことも多くあります。ただ、障害があるからといっ<br />
                          て、負い目に感じる必要はなく、難しい部分を周りにサポートしてもらい私自身のスキルをどんどん発揮していけばよいと<br />
                          背中を押していただいて、今はとてもやりがいのある仕事に就くことができました。自分の可能性を広げて挑戦して本当に<br />
                          良かったと思っています。 */}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>{/* users-voice-cont */}



            </div>{/* row */}
          </div>
        </section>

        <section id="flow" className="flow-col">
          <h2 className="title">ご利用の流れ</h2>
          <div className="flow-col-in container">
            <div className="row">
              <div className="col-sm-3 flow-col-in-cont">
                <div className="flow-col-in-cont-out">
                  <div className="flow-col-in-cont-head">
                    <dl>
                      <dt>01</dt>
                      <dd>
                        <h4>Registration</h4>
                        <p>無料登録</p>

                      </dd>
                    </dl>
                  </div>{/* //flow-col-in-cont-head */}
                  <div className="flow-col-in-cont-cont">
                    <p>
                      ご登録は1分程度で完了。<br />
                      アドバイザーより24時間以内に<br />
                      ご連絡いたします。マイページ<br />
                      より登録内容を確認できます。<br />
                    </p>
                    <img src="/image/flow-1.png" />

                  </div>{/* //flow-col-in-cont-cont */}
                </div>
              </div>{/* //flow-col-in-cont-out */}
              <div className="col-sm-3 flow-col-in-cont">
                <div className="flow-col-in-cont-out">
                  <div className="flow-col-in-cont-head">
                    <dl>
                      <dt>02</dt>
                      <dd>
                        <h4>Interview</h4>
                        <p>
                          面談<br />
                          おススメ紹介
                        </p>
                      </dd>
                    </dl>
                  </div>{/* //flow-col-in-cont-head */}
                  <div className="flow-col-in-cont-cont">
                    <p>
                      電話やWeb面談ツール、対面を<br />
                      通じてあなたの状況をヒアリン<br />
                      グし、あなたの状況や症状にあ<br />
                      わせた求人をご紹介します。<br />
                    </p>
                    <img src="/image/flow-2.png" />
                  </div>{/* //flow-col-in-cont-cont */}
                </div>
              </div>{/* //flow-col-in-cont-out */}
              <div className="col-sm-3 flow-col-in-cont">
                <div className="flow-col-in-cont-out">
                  <div className="flow-col-in-cont-head">
                    <dl>
                      <dt>03</dt>
                      <dd>
                        <h4>Applying</h4>
                        <p>
                          応募・書類選考
                        </p>
                      </dd>
                    </dl>
                  </div>{/* //flow-col-in-cont-head */}
                  <div className="flow-col-in-cont-cont">
                    <p>
                      選考に必要な書類のアドバイス<br />
                      ・模擬面談などあなたにあわせ<br />
                      たフォローで最適な情報をバッ<br />
                      クアップ。企業情報もきちんと<br />
                      お伝えします。
                    </p>
                    <img src="/image/flow-3.png" />
                  </div>{/* //flow-col-in-cont-cont */}
                </div>
              </div>{/* //flow-col-in-cont-out */}
              <div className="col-sm-3 flow-col-in-cont">
                <div className="flow-col-in-cont-out">
                  <div className="flow-col-in-cont-head">
                    <dl>
                      <dt>04</dt>
                      <dd>
                        <h4>Following</h4>
                        <p>
                          フォロー
                        </p>
                      </dd>
                    </dl>
                  </div>{/* //flow-col-in-cont-head */}
                  <div className="flow-col-in-cont-cont">
                    <p>
                      入社後、お困りのこともお気軽<br />
                      にご相談ください。継続的にあ<br />
                      なたの就職活動をサポートしま<br />
                      す。
                    </p>
                    <img src="/image/flow-4.png" />
                  </div>{/* //flow-col-in-cont-cont */}
                </div>
              </div>{/* //flow-col-in-cont-out */}

            </div>
          </div>
        </section>

        <section id="qa" className="qa-col">
          <h2 className="title">Q&A</h2>

          <div className="qa-col-in container">
            <dl>
              <dt>エリアは特定されていますか？</dt>
              <dd>首都圏のみならず、他県の求人も多数ございます。まずはあなたのご希望を面談でお聞かせください。</dd>
              <dt>どのような方が対象ですか？</dt>
              <dd>身体障害手帳・療育手帳・愛の手帳・精神の手帳・障害者保険福祉手帳をお持ちの方が対象となります。<br />
                （申請中の方も対象となりますのでお気軽にご相談ください）
              </dd>
              <dt>OpenGateとは何ですか？</dt>
              <dd>
                「OpenGate」は日本初の障害者・企業・医療従事者をつなぐコミュニケーションSNSです。現在は、身体障害のみですが、今後、精神障害や発達障害の方々も気軽にコミュニケーションをとれるような仕組みにしていく予定です。
              </dd>
              <dt>障害者翻訳システムとは何ですか？</dt>
              <dd>
                当社が特許を取得した「障害」を翻訳できるシステムです。言語と同じようにあなたの症状をだれにでもわかりやすくすることで配慮の方法やコミュニケーションを簡単にすることができます。
              </dd>
              <dt>登録にお金はかかりますか？</dt>
              <dd>
                登録からサポートまですべて無料でご利用いただけます。
              </dd>
            </dl>
          </div>
        </section>

        <section id="open-gate" className="open-gate-col">
          <h2 className="title">日本最大規模の身体障害者SNS・OpenGate</h2>

          <div className="open-gate-col-in container">

            <div className="row">

              <div className="col-sm-6 open-gate-col-in-cont-l">

                <h3><img src="/image/opengateCareer-1.png" /></h3>

                <div className="open-gate-col-in-cont-top-img">
                  <img src="/image/bukin.jpg" />
                </div>

                <div className="open-gate-col-in-txt">
                  <p>
                    我々が運営する障害者・家族・企業・医療従事者をつなげるアプリ「OpenGate」です。<br />
                    このアプリは、障害部位ごとにつながり、語りあえるSNSです。<br />
                    障害部位を登録することで、近い境遇の人やほしい情報・商品・サービスに出会いやすくなります。<br />
                  </p>


                  <span>▼こちらのリンクよりぜひご覧ください！</span>
                  <Link href="https://open-gate.jp/" target="_blank">OpenGate</Link>
                </div>

              </div>

              <div className="col-sm-6 open-gate-col-in-cont-r">

                <h3>障害者検索キュレーションサイト</h3>

                <div className="open-gate-col-in-cont-top-img">

                  <img src="/image/opengateCareer-2.png" />

                </div>

                <div className="open-gate-col-in-txt">
                  <p>
                    障害に関する様々な情報をその症状ごとに”検索”ができ<br />
                    る業界初の”おまとめサイト”（キュレーション）です。<br />
                    あなたの気になる『症状』をクリックするだけで、その<br />
                    症状に関するニュースや動画が見れます。
                  </p>

                  <dl>
                    <dt>▼【身体障害者】専用の検索サイト</dt>
                    <dd><Link href="https://physical.opengate.site/" target="_blank">https://physical.opengate.site/</Link></dd>

                    <dt>▼【精神症状専用】検索サイトオープン！</dt>
                    <dd><Link href="https://mental.opengate.site" target="_blank">https://mental.opengate.site</Link></dd>

                    <dt>▼【発達症状、知的症状専用】検索サイトオープン！</dt>
                    <dd><Link href="https://intellectual.opengate.site" target="_blank">https://intellectual.opengate.site</Link></dd>
                  </dl>

                </div>


              </div>

            </div>

          </div>
        </section>


        <section id="about" className="about-company-col">

          <h2 className="title">会社概要</h2>

          <div className="about-company-col-in container">

            <div className="about-company-col-in">

              <div className="about-company-access">
                <div className="row">

                  <div className="col-sm-4 about-company-access-L">
                    <img src="/image/office.jpg" />
                  </div>

                  <div className="col-sm-4 about-company-access-C">
                    <h3><img src="/favicon.png" />株式会社アクティベートラボ</h3>
                    <ul>
                      <li>〒160-0023</li>
                      <li>東京都新宿区西新宿3-2-9</li>
                      <li>新宿ワシントンホテルビル本館2F</li>
                      <li> THE HUB新宿ワシントン37</li>
                    </ul>

                    <ul className="sns">
                      <li><Link href="https://www.facebook.com/opengate.japan" target="_blank"><img src="/facebook.png" /></Link></li>
                      <li><Link href="https://www.instagram.com/opengate_official/?hl=ja" target="_blank"><img src="/insta.png" /></Link></li>
                      <li><Link href="https://twitter.com/OpenGate_AL" target="_blank"><img src="/twitter.png" /></Link></li>
                    </ul>

                  </div>

                  <div className="col-sm-4 about-company-access-R">

                    <ul>
                      <li>
                        <a href="service" target="_blank">＞企業・法人の皆さまへ</a>
                      </li>
                      <li><Link href="https://activatelab.co.jp/" target="_blank">＞運営会社について</Link></li>

                    </ul>

                    <img src="/image/AL1.png" />

                  </div>

                </div>
              </div>
            </div>
          </div>

        </section>
        {/* //about-company-col */}




      </main>

    </Layout >
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