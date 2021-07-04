import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layoutSevice';
import { useUser, getSession } from '@auth0/nextjs-auth0';
const { decycle, encycle } = require('json-cyclic');

export default function Home({ session_auth0, contextreq, contextres }) {
  const { user, error, isLoading } = useUser();


  return (
    <Layout>


      <header className="header-common header-Service">
        <div className="header-common-in container">
          <div className="row">
            <div className="header-left col-sm-12">
              <a href="./"><img src="image/top-logo2.png" /></a>
            </div>

            {/* 
            <div className="header-right col-sm-8">

              <ul className="navi-bottom">


                <li>
                  <Link href="#">
                    <a>求人情報</a>
                  </Link>
                </li>

                <li>
                  <Link href="#">
                    <a>利用者の声</a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>Q&A</a>
                  </Link>
                </li>

                <li>
                  <Link href="#">
                    <a>OpenGate</a>
                  </Link>
                </li>

              </ul>
            </div>

            */}

            {/* header-right */}


          </div>
        </div>

        <div className="Service_title">
          <h1>法人・組織向けのご案内</h1>

        </div>

      </header>

      <div className="service">

        <section className="point-col">

          <div className="point-head">

            <h2 className="title-servoce"><span>POINT</span></h2>
            <p>
              OpenGate Careersが<br />
              企業様に選ばれる３つのポイント
            </p>
          </div>

          <div className="reasons-col container">

            <div className="row">
              <div className="col-lg-4 col-md-12 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>1</h3>
                  <p>
                    障害者専門のプロが<br />
                    雇用の定着から<br />
                    普段の配慮方法までを<br />
                    柔軟にサポート<br />
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>2</h3>
                  <p>
                    企業の抱える課題を<br />
                    経験と実績から<br />
                    最適なものをご提案<br />
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 reasons-cont">
                <div className="reasons-cont-in">
                  <h3>3</h3>
                  <p>
                    ITを通じて<br />
                    障害者と企業の<br />
                    良好な関係を築く<br />
                    事例を多数ご紹介
                  </p>


                </div>
              </div>
            </div>{/* row */}
          </div> {/* //container */}
        </section>

        <section className="service-col">

          <div className="service-col-head">
            <h2 className="title-servoce"><span>SERVICE</span></h2>
          </div>

          <div className="service-col-in container">

            <ul>
              <li>
                <h3>障害者雇用コンサルティング</h3>
                <div className="service-col-in-top">
                  障害者雇用の「わからない」を解決
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service01.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    障害者の法定雇用率が2.2％から2.3％ への引き上げが決定しており、障害者雇用を取り巻く環境は転換期を迎えます。障害者雇用に取り組む中で課題がある企業様、これから障害者雇用に取り組む企業様などあらゆるフェーズに対応します。
                  </p>
                </div>

              </li>

              <li>
                <h3>障害者雇用定着支援</h3>
                <div className="service-col-in-top">
                  採用した障害者の「受け入れ～定着・戦力化」
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service02.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    就労する障害者の方々は、障害の部位や原因、程度によって配慮が異なります。採用活動支援から～選考～入社～定着までの各プロセスに応じ、定着支援のサポート、受入部門へのアドバイスまで、早期退職者を減らし、雇用の安定化のための取り組みを各種実施いたします。
                  </p>
                </div>
              </li>

              <li>
                <h3>バリアフリーレポート</h3>
                <div className="service-col-in-top">
                  企業様の障害者受け入れ可否をチェック
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service03.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    障害者雇用では、応募者の障害の程度は一人ひとり異なるため、それぞれに合わ せた配慮が必要です。当社では、企業様の現状の障害者受け入れ可否をあらゆる角度からチェックします。また、障害者が能力を発揮できる環境や社内制度を提案します。
                  </p>
                </div>
              </li>

              <li>
                <h3>サテライトオフィステレワーク</h3>
                <div className="service-col-in-top">
                  障害者の能力を企業様内で最大限発揮させるべく、自宅就業支援を含む、オフィス以外で働く環境・働き方・制度等の提案
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service04.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    障害者の法定雇用率が2.2％から2.3％への引き上げが決定しており、障害者雇 用を取り巻く環境は転換期を迎えます。障害者雇用に取り組む中で課題がある企業様、これから障害者雇用に取り組む企 業様などあらゆるフェーズに対応します。
                  </p>
                </div>
              </li>

              <li>
                <h3>障害者採用サイト構築支援</h3>
                <div className="service-col-in-top">
                  自社サイトに障害者採用サイトを導入するための支援
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service05.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    就労する障害者の方々は、障害の部位や 原因、程度によって配慮が異なります。採用活動支援から～選考～入社～定着までの各プロセスに応じ、定着支援のサポート、受入部門へのアドバイスまで、早期退職者を減らし、雇用の安定化のための取り組みを各種実施いたします。
                  </p>
                </div>
              </li>

              <li>
                <h3>OpenGate SNS</h3>
                <div className="service-col-in-top">
                  同境遇の方とつながることが出来る身体障害者に特化したSNS「OpenGate」を活用して障害者に対してのマーケティング支援
                </div>

                <div className="service-col-in-img">
                  <img src="/icon_service06.png" />
                </div>

                <div className="service-col-in-txt">
                  <p>
                    障害者雇用では、応募者の障害の程度は一人ひとり異なるため、それぞれに合わ せた配慮が必要です。当社では、企業様の現状の障害者受け入れ可否をあらゆる角度からチェックします。また、障害者が能力を発揮できる環境や社内制度を提案します。
                  </p>
                </div>
              </li>
            </ul>

            <div className="service-col-in-contact">
              <h3>＼詳細はこちら／</h3>
              <a href="https://activatelab.co.jp/"><img src="/AL-logo.jpg" /></a>
              <p>株式会社アクティベートラボ</p>
            </div>

          </div>
          {/* //service-col-in */}

        </section>

        <section className="message">

          <div className="message-col-head">
            <h2 className="title-servoce"><span>MESSAGE</span></h2>
          </div>

          <div className="message-col-in container">

            <div class="row">
              <div className="col-lg-6 col-md-12 col-sm-12 message-col-in-cont-L">
                <img src="/masumoto.png" />

                <div className="message-col-in-cont-L-txt">
                  <h3>増本 裕司</h3>
                  <span>代表取締役</span>
                  <img src="/name-bottom.png" />
                </div>

              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 message-col-in-cont-R">
                <h3>当社独自のノウハウを使って障害者雇用に対するミスマッチを防ぎます</h3>
                <p>
                  {/* 私自身身体障害2級であり、障害者になってからの就職活動は大変苦労しました。「そもそも障害者ってなに！？」「精神障害者って  なんでしょ！？」などの偏見も多く経験◯◯し、こんな思いをする人をひとりでも減らしたいと今も活動を続けています。また、自分が起業してから、企業側からも実際にどのような配慮をしたらよいかわからない、そんな声を多く聞きます。私たちは、「情報・IT」をベースに、業界初の障害者翻訳システム、ジョブマップ、キュレーションサイトなど新たなサービスを次々と生み出し、当事者そして企業様の間にミスマッチを起こさせないそんな取り組みをしています。今、抱えているそのお悩み、私たちが解決できるかもしれません。ぜひ一度ご相談ください。 */}

                  私自身身体障害2級であり、障害者になってからの就職活動は大変苦労しました。「そもそも障害者ってなに！？」「精神障害者って◯◯なんでしょ！？」などの偏見も多く経験し、こんな思いをする人をひとりでも減らしたいと今も活動を続けています。また、自分が起業してから、企業側からも実際にどのような配慮をしたらよいかわからない、そんな声を多く聞きます。私たちは、「情報・IT」をベースに、業界初の障害者翻訳システム、ジョブマップ、キュレーションサイトなど新たなサービスを次々と生み出し、当事者そして企業様の間にミスマッチを起こさせないそんな取り組みをしています。今、抱えているそのお悩み、私たちが解決できるかもしれません。ぜひ一度ご相談ください。
                </p>
              </div>

            </div>

          </div>
        </section> {/* message */}




      </div>
      {/* //service */}



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