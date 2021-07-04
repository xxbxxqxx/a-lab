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
          <h1>プライバシーポリシー</h1>

        </div>

      </header>

      <div className="container">

        <main>
          <section className="privacy-col">

            <div className="summary_txt">

              {/* <h3>プライバシーポリシー</h3> */}
              <p>
                株式会社アクティベートラボ（以下「当社」といいます。）は、当社の提供するサービス（以下「本サービス」といいます。）における、ユーザーについての個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
              </p>
              <div className="privacy-col-txt-top">
                <span>1.収集する利用者情報及び収集方法</span>
                本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき当社が収集するものを意味するものとします。<br />
                本サービスにおいて当社が収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。
              </div>

              <div className="privacy-col-txt">

                <h4>(1)ユーザーからご提供いただく情報</h4>
                <p>本サービスを利用するために、または本サービスの利用を通じてユーザーからご提供いただく情報は以下のとおりです。</p>
                <ul>
                  <li>・氏名、生年月日、性別、職業等プロフィールに関する情報</li>
                  <li>・メールアドレス、電話番号、住所等連絡先に関する情報</li>
                  <li>・クレジットカード情報、銀行口座情報、電子マネー情報等決済手段に関する情報</li>
                  <li>・ユーザーの肖像を含む静止画情報</li>
                  <li>・入力フォームその他当社が定める方法を通じてユーザーが入力または送信する情報</li>
                </ul>

                <h4>(2)ユーザーが本サービスの利用において、他のサービスと連携を許可することにより、当該他のサービスからご提供いただく情報</h4>
                <p>ユーザーが、本サービスを利用するにあたり、ソーシャルネットワーキングサービス等の他のサービスとの連携を許可した場合には、その許可の際にご同意いただいた内容に基づき、以下の情報を当該外部サービスから収集します。</p>
                <ul>
                  <li>・当該外部サービスでユーザーが利用するID</li>
                  <li>・その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報</li>
                </ul>

                <h4> (3)ユーザーが本サービスを利用するにあたって、当社が収集する情報</h4>
                <p> 当社は、本サービスへのアクセス状況やそのご利用方法に関する情報を収集することがあります。これには以下の情報が含まれます。</p>
                <ul>
                  <li>・リファラ</li>
                  <li>・IPアドレス</li>
                  <li>・サーバーアクセスログに関する情報</li>
                  <li>・Cookie、ADID、IDFAその他の識別子</li>
                </ul>

                <h4> (4)ユーザーが本サービスを利用するにあたって、当社がユーザーの個別同意に基づいて収集する情報</h4>
                <p>当社は、ユーザーが3-1に定める方法により個別に同意した場合、当社は以下の情報を利用中の端末から収集します。</p>
                <ul>
                  <li>・位置情報</li>
                  <li>・個人情報保護法上の要配慮個人情報（病歴、身体障害、知的障害、精神障害「発達障害を含む」その他の個人情報保護委員会規則で定める心身の機能の障害があること）</li>
                </ul>

                <h3>2.利用目的</h3>
                <h4>本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下のとおりです。</h4>

                <ul>
                  <li>(1)本サービスに関する登録の受付、本人確認、ユーザー認証、ユーザー設定の記録、利用料金の決済計算等本サービスの提供、維持、保護及び改善のため</li>
                  <li>(2)ユーザーのトラフィック測定及び行動測定のため</li>
                  <li>(3)広告の配信、表示及び効果測定のため</li>
                  <li>(4)本サービスに関するご案内、お問い合わせ等への対応のため</li>
                  <li>(5)本サービスに関する当社の規約、ポリシー等（以下「規約等」といいます。）に違反する行為に対する対応のため</li>
                  <li>(6)本サービスに関する規約等の変更などを通知するため</li>
                </ul>
                <h3>3.通知・公表または同意取得の方法、利用中止要請の方法</h3>
                <h4>3-1以下の利用者情報については、その収集が行われる前にユーザーの同意を得るものとします。</h4>
                <ul>
                  <li>・位置情報</li>
                  <li>・個人情報保護法上の要配慮個人情報（病歴、身体障害、知的障害、精神障害「発達障害を含む」その他の個人情報保護委員会規則で定める心身の機能の障害があること）</li>
                </ul>

                <h4>3-2ユーザーは、本サービスの所定の設定を行うことにより、利用者情報の全部または一部についてその収集又は利用の停止を求めることができ、この場合、当社は速やかに、当社の定めるところに従い、その利用を停止します。なお利用者情報の項目によっては、その収集または利用が本サービスの前提となるため、当社所定の方法により本サービスを退会した場合に限り、当社はその収集又は利用を停止します。</h4>

                <h3>4.外部送信、第三者提供、情報収集モジュールの有無</h3>
                <h4>4-1本サービスでは、以下の提携先が、ユーザーの端末にCookieを保存し、これを利用して利用者情報を蓄積及び利用している場合があります。</h4>
                <ul>
                  <li>(1)提携先 Google, Inc</li>
                  <li>(2)上記提携先のプライバシーポリシーのURL <a href="https://policies.google.com/privacy?hl=ja" target="_blank">https://policies.google.com/privacy?hl=ja</a></li>
                  <li>(3)上記提携先のオプトアウト（無効化）URL <a href="https://policies.google.com/privacy?hl=ja" target="_blank">https://policies.google.com/privacy?hl=ja</a></li>
                </ul>

                <h4>4-2本サービスには以下の情報収集モジュールが組み込まれています。これに伴い、以下のとおり情報収集モジュール提供者（日本国外にある者を含みます。）への利用者情報の提供を行います。</h4>
                <ul>
                  <li>(1)情報収集モジュールの名称 Google Analytics</li>
                  <li>(2)情報収集モジュールの提供者 Google, Inc</li>
                  <li>(3)上記提供者における利用目的 本サービスのサービス向上・マーケティング調査の目的でアクセス解析を行うため</li>
                  <li>(4)上記提供者のプライバシーポリシーのURL <a href="https://policies.google.com/privacy?hl=ja" target="_blank">https://policies.google.com/privacy?hl=ja</a></li>
                </ul>

                <h3>5.第三者提供</h3>
                <p>
                  当社は、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます。）に提供しません。但し、次に掲げる必要があり第三者（日本国外にある者を含みます。）に提供する場合はこの限りではありません。
                  個人情報の保護に関する法律（以下「個人情報保護法」といいます。）上の要配慮個人情報については、あらかじめユーザーの同意を得た場合のほか、個人情報保護法その他の法令で認められる場合以外に第三者に提供しません。
                </p>
                <ul>
                  <li>(1)当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                  <li>(2)合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                  <li>(3)第4項の定めに従って、提携先または情報収集モジュール提供者へ個人情報が提供される場合</li>
                  <li>(4)国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合</li>
                  <li>(5)その他、個人情報保護法その他の法令で認められる場合</li>
                </ul>

                <h3>6.外部APIの利用</h3>
                <ul>
                  <li>・当社が、提供している動画のサービスでは、YouTubeのAPIを利用しています。</li>
                  <li>・YouTubeのAPIを利用して、取得したデータは、「YouTubeの利用規約（<a href="https://www.youtube.com/t/terms" target="_blank">https://www.youtube.com/t/terms</a>）」の対象となります。</li>
                  <li>・「Googleのプライバシーポリシー（https://www.google.com/policies/privacy）」の対象となります。</li>
                  <li>・当社プラットフォームを通じて、取得した動画のサムネイルを、プラットフォーム上の表示目的で保存しますが、動画ファイルは保存いたしません。</li>
                  <li>・そのため動画再生についても、取得したYouTube動画のIDから、公式のYouTube埋め込みプレーヤーにて再生されます。</li>
                  <li>・Googleセキュリティ設定ページ(<a href="https://security.google.com/settings/security/permissions" target="_blank">https://security.google.com/settings/security/permissions</a>)から、YouTubeアカウントへのアクセスをいつでも取り消すことができます。</li>
                  <li>・YouTubeが提供するデータは外部の第三者に共有されることはございません。</li>
                </ul>

                <h3>7.個人情報の開示</h3>
                <p>
                  当社は、ユーザーから、個人情報保護法の定めに基づき個人情報の開示を求められたときは、ユーザーご本人からのご請求であることを確認の上で、ユーザーに対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。但し、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、この限りではありません。なお、個人情報の開示につきましては、手数料（1件あたり1,000円）を頂戴しておりますので、あらかじめ御了承ください。
                </p>

                <h3>8.個人情報の訂正及び利用停止等</h3>
                <h4>8-1当社は、ユーザーから、(1)個人情報が真実でないという理由によって個人情報保護法の定めに基づきその内容の訂正を求められた場合、及び(2)あらかじめ公表された利用目的の範囲を超えて取扱われているという理由または偽りその他不正の手段により収集されたものであるという理由により、個人情報保護法の定めに基づきその利用の停止を求められた場合には、ユーザーご本人からのご請求であることを確認の上で遅滞なく必要な調査を行い、その結果に基づき、個人情報の内容の訂正または利用停止を行い、その旨をユーザーに通知します。なお、訂正または利用停止を行わない旨の決定をしたときは、ユーザーに対しその旨を通知いたします。</h4>

                <h4>8-2当社は、ユーザーから、ユーザーの個人情報について消去を求められた場合、当社が当該請求に応じる必要があると判断した場合は、ユーザーご本人からのご請求であることを確認の上で、個人情報の消去を行い、その旨をユーザーに通知します。</h4>

                <h4>8-3個人情報保護法その他の法令により、当社が訂正等または利用停止等の義務を負わない場合は、8-1および8-2の規定は適用されません。</h4>

                <h3>9.お問い合わせ窓口</h3>
                <p>ご意見、ご質問、苦情のお申出その他利用者情報の取扱いに関するお問い合わせは、下記の窓口までお願いいたします。</p>
                <ul>
                  <li>住所：〒160-8336</li>
                  <li>東京都新宿区西新宿3-2-9</li>
                  <li>新宿ワシントンホテルビル本館2F</li>
                  <li>THE HUB新宿ワシントン37</li>
                  <li>株式会社アクティベートラボ</li>
                  <li>個人情報取扱責任者：OpenGate事業本部長</li>
                  <li>連絡先：info@activatelab.co.jp</li>
                </ul>

                <h3>10.プライバシーポリシーの変更手続</h3>
                <p>当社は、必要に応じて、本ポリシーを変更します。但し、法令上ユーザーの同意が必要となるような本ポリシーの変更を行う場合、変更後の本ポリシーは、当社所定の方法で変更に同意したユーザーに対してのみ適用されるものとします。なお、当社は、本ポリシーを変更する場合には、変更後の本ポリシーの施行時期及び内容を当社のウェブサイト上での表示その他の適切な方法により周知し、またはユーザーに通知します。</p>

              </div>
            </div>
            {/* //summary_txt */}
          </section>



          {/* <section className="terms-of-use-col">
            <h2>プライバシーポリシー</h2>


            <div className="terms-of-use-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>

          <section className="privacy-col">
            <h2>個人情報保護</h2>

            <div className="privacy-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>

          <section className="employment-number-col">
            <h2>有料職業紹介番号</h2>

            <div className="employment-number-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section> */}


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