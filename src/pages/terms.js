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
              <a href="/"><img src="/top-logo.png" /></a>
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
          <h1>人材紹介サービス利用規約</h1>

        </div>

      </header>

      <div className="container">

        <main>



          <section className="membership-col">


            <div className="summary_txt">

              <p>
                株式会社アクティベートラボ（以下「当社」といいます。）が企画運営する人材紹介サイト「オープンゲートキャリアズ（OpenGate Careers）」を通じて提供される人材紹介サービス（以下「本サービス」といいます。）をご利用いただくうえでのご同意事項となります。本サービスに登録をされる場合には、本規約の内容に同意した上で、登録を行ってください。また、ご登録前に本サービスをご利用いただく場合には、実際にご利用されたことをもって本規約にご同意いただいたものとみなします（本規約にご同意いただいたことによりお客様と当社との間で成立する本サービス利用契約を「本契約」といいます）。
              </p>

              <h4>第1条（職業紹介サービス）</h4>
              <p>
                当社が運営する本サービスとは、利用者に対して、そのキャリア、スキルおよび適性に合致すると思われる求人案件を紹介するキャリア・
                コンサルティングサービス、およびこれに付随する各種情報提供サービス、その他の転職支援サービスの総称をいいます。
              </p>

              <h4> 第2条（ＩＤ・パスワード）</h4>
              <ul>
                <li> １．当社は、利用者に、IDおよびパスワードを発行・付与することがあります。</li>
                <li> ２．利用者は、発行・付与されたIDおよびパスワードの使用・管理責任を自ら負うものとします。</li>
                <li> ３．利用者は、自己に付与されたIDおよびパスワードを第三者（求人企業を含みます、以下同じ）に使用させ、または譲渡することをできないものとします。</li>
                <li>４．利用者は、IDおよびパスワードを第三者に使用されたことにより発生する一切の損害、および利用者自身もしくは第三者がIDおよびパスワードを不正に使用したことにより発生する一切の損害につき、利用者に使用もしくは管理上の帰責性があるか否かにかかわらずその全てを負担するものとし、当社は何ら責任を負わないものとします。</li>
              </ul>

              <h4> 第３条（書類の提出）</h4>
              <p> 利用者は、当社が求めた場合には、以下の書類を速やかに当社に対し提出するものとします。</p>
              <ul>
                <li> (1)　氏名・住所等、利用者であることを特定・確認するための本人確認書類</li>
                <li> (2)　在留資格を確認するための在留カードまたは就労資格証明書</li>
                <li>(3)　その他当社もしくは求人者が提出を求める証明書類等</li>
              </ul>

              <h4>  第４条（利用者の責任）</h4>

              <ul>
                <li>1.　利用者は、本規約に同意し、自らの責任にもとづき本サービスを利用するものとし、本サービスの利用に関する一切の責任を負うものとします。</li>
                <li>2.　利用者は、当社および求人者に対し、個人情報を不備・齟齬のないよう正確に提供するものとします。利用者が提供した個人情報が正確でなかった場合等、利用者が当社および求人者に対して提供した情報内容に起因して、求人者、その他の第三者との間で紛争等が生じた場合には、利用者自身の責任においてこれに対処するものとし、当社に一切の迷惑をかけないことを保証します。</li>
                <li>3.　当社は、求人者の労働条件その他契約内容の確認においては、利用者の希望に応じ連絡を取次ぎますが、利用者は、利用者の責任において、求人者に労働条件その他契約内容を直接確認した後に契約を結ぶものとし、当社が利用者に通知した労働条件が、当該契約の詳細を最終的に保証するものではないことを承諾します。</li>
                <li>4.　利用者は、本サービスを通じて紹介を受けた求人者に対し、本サービスの利用によらず独自に採用選考を受けまたは入社する場合、当社に事前に通知するものとします。</li>
              </ul>

              <h4> 第５条（著作権）</h4>
              <p>当社のホームページに掲載されている全てのコンテンツは、当社が所有しています。当社の書面による許可なく、私的利用の範囲を超えて利用してはなりません。</p>

              <h4>第６条（商標）</h4>
              <p>当社のホームページに掲載される商標およびロゴマーク等に関する権利は、当社または個々の権利者に帰属し、商標法、不正競争防止法等により保護されています。利用者が上記権利の利用を希望する場合、事前に当社に連絡し、当社の許諾を得た上で利用できるものとします。</p>

              <h4>第７条（禁止事項）</h4>
              <p>利用者は、本サービスの利用に際し、以下各号の行為を行ってはならないものとします。</p>

              <ul>
                <li>(1)　第三者または当社の著作権、特許権、実用新案権、意匠権、商標権、その他の知的財産権を侵害する行為。</li>
                <li> (2)　第三者または当社の財産、プライバシー、名誉等の権利を侵害する行為。</li>
                <li>(3)　第三者または当社を誹謗中傷する行為。</li>
                <li>(4)　第三者または当社に不利益を与える、またはそのおそれのある行為。</li>
                <li>(5)　虚偽の情報を登録、告知する行為。</li>
                <li>(6)　本サービスを利用した営業活動、営利を目的とする情報提供等の行為。</li>
                <li>(7)　本サービスを通じて入手した情報を、複製、販売、出版その他私的利用の範囲を超えて使用する行為。</li>
                <li>(8)　本サービスの運営を妨げ、あるいは第三者または当社の信用を毀損するような行為、またはそのおそれのある行為。</li>
                <li>(9)　公序良俗に反する行為、またはそのおそれのある行為。</li>
                <li>(10)　各種法令に違反する行為、またはそのおそれのある行為。</li>
              </ul>

              <h4>第８条（利用者のお申出による本契約の終了）</h4>
              <p>利用者は、当社所定の手続きを行うことにより、いつでも本契約を終了することができます。</p>

              <h4>第９条（サービスの停止・終了等） </h4>
              <p>当社は、利用者が以下に該当すると判断したときは、利用者に対して何らの催告を要することなく、本サービスの提供を終了させることができるものとします。</p>

              <ul>
                <li> (1)　利用者が本規約に定める各事項に違反したとき</li>
                <li> (2)　正当な理由なく当社からの連絡にご返信いただけないとき</li>
                <li>(3)　転職支援サービスの範囲を超える要望を繰り返し行う場合</li>
                <li>(4)　その他、利用者と当社との信頼関係が維持できないと当社が判断した場合</li>
              </ul>

              <h4>第10 条（求人照合）</h4>
              <p>当社は、利用者から求人への応募依頼を受け付けた場合であっても、求人者より示された選考基準に基づいて当該求人への適合度合いを判断した結果、当社から当該求人への推薦を行わない場合や、求人者に代わり、選考基準に適合しない旨のご連絡をする場合があります。なお、当社は、選考基準や判断理由などをお伝えすることはできません。</p>

              <h4>第11条（免責）</h4>

              <ul>
                <li>1.　当社は、利用者が本サービスへ申込み、または本サービスを利用したことにより利用者に生じた一切の精神的、財産的損害につき、これらの損害が当社の故意または過失により生じた場合を除き、何らの責任も負わないものとします。</li>
                <li>2.　当社は、情報取扱業務において通常講ずべき合理的なウィルス対策では防止できないウィルス被害、その他当社の責に帰すべき事由によらない地震、台風、津波、落雷、火災、風水害、停電、その他の天災地変、戦争、暴動、内乱、テロ行為、重大な疾病、感染症、法令・規則の制定・改廃、公権力による命令・処分・要請その他の政府・地方公共団体による行為、争議行為、輸送機関などの事故の不可抗力により、本サービスの提供に支障が生じ、または本サービスの提供が困難となった場合、これによって利用者に生じた損害につき何らの責任も負わないものとします。</li>
                <li>3.　当社は、利用者に提供する情報のうち、企業情報等の第三者に関する情報、企業広告、求人広告その他第三者より提供される情報内容の正確性につき保証するものではありません。</li>
                <li>4.　当社は、年収査定金額の算出方法等、当社の機密に属する事項について、質問等への回答、その他対応等を行う義務を一切負いません。</li>
                <li>5.　当社は、利用者による本サービスの利用によって、転職・再就職が成功することを保証するものではありません。</li>
              </ul>

              <h4>第12 条（個人情報の取扱い）</h4>

              <p>
                1.　別途「プライバシーポリシー」に定めるものとし、当社は、これに基づき利用者の個人情報を適切に収集、利用、管理、および保管し、または第三者への提供を行います。なお、個人情報とは、利用者個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述および資料（映像・画像・音声等）によって当該個人を識別できるもの、また、当該情報のみでは識別できないが、他の情報と容易に照合することにより、当該個人を識別できるものをいいます。
              </p>

              <p>
                2.利用者は、当社が本サービスを提供するために、利用者の身体・精神・知的・発達障害に関する情報を収集し、これを求人者に提供することについて同意します。その他、原則として、以下各号に定める機微な情報（以下「機微情報」といいます。）を収集しません。ただし、 利用者自ら、当社に対して機微情報を提供した場合は、当社が当該機微情報を取得すること、および、当社が利用者に対する適切な職業紹介および求人情報提供のために必要な範囲内において当該機微情報を第三者に提供することにつき、利用者の同意があったものとみなします。
              </p>

              <ul>
                <li> (1)　思想、信条または宗教に関する事項</li>
                <li> (2)　人種、民族、門地、本籍地（所在都道府県に関する情報を除く。）、その他社会的差別の原因となる事項</li>
                <li> (3)　勤労者の団結権、団体交渉およびその他団体行動に関する事項</li>
                <li> (4)　集団示威行為への参加、請願権の行使その他の政治的権利の行使に関する事項</li>
                <li> (5)　保健・医療または性生活に関する事項</li>
              </ul>

              <h4> 第13 条（第三者提供に関する免責事項）</h4>
              <p> 1.　当社は、以下各号に定める場合において、第三者による個人情報の取得に関し、何ら責任を負いません。</p>

              <ul>
                <li>(1)　利用者自らが、本サービスを利用して特定の求人者等に個人情報を開示、提供する場合</li>
                <li> (2)　利用者の活動状況等、本サービスにおいて利用者が提供した情報により、偶然本人が特定された場合</li>
              </ul>
              <p> 2.　当社は、利用者と求人者との間の提供情報に関するトラブル等につき一切責任を負いません。</p>

              <h4> 第14条（反社会的勢力の排除）</h4>
              <p>
                利用者は、反社会的勢力（暴力団、暴力団員、暴力団員でなくなった時から5年を経過しない者、暴力団準構成員、暴力団関係企業、総会屋等、社会運動等標ぼうゴロまたは特殊知能暴力集団等、その他これらに準ずる者をいいます。）に該当しないこと、また暴力的行為、詐術・脅迫行為、業務妨害行為等違法行為を行わないことを、将来にわたっても表明するものとします。かかる表明に違反した場合には、異議なく本サービスの提供の終了を受け入れるものとします。
                </p>

              <h4> 第15 条（サービス利用規約の変更）</h4>
              <p>
                当社は、本規約を必要に応じて変更することができるものとします。変更の内容については、インターネット上での告知、または電子メール等の方法により利用者へ通知し、一ヶ月経過した時点で、すべての利用者が変更を承諾したものとみなします。
                  </p>

              <h4> 第16 条（情報の保管期間）</h4>
              <p>1.　当社は、本サービスを提供するために必要な期間が経過したと判断した場合、当社が保有するサーバ上に蓄積されている、当社または求人者とのやり取りに関する情報、および利用者の登録情報等を、抹消することがあります。抹消後はこれを復元することはできません。</p>
              <p> 2.　利用者は、前項の事情を踏まえ、自らに不利益もしくは損害が発生しないために必要な措置を、自己の責任と費用負担において講じるものとします。</p>

              <h4> 第17 条（損害賠償）</h4>
              <p>
                利用者が、本規約に違反し、または本サービスの利用に際し、当社、求人者もしくは第三者に対して損害を与えた場合、利用者は直接・間接を問わず、一切の損害を賠償するものとします。
                  </p>

              <h4>第18 条 (協議事項、管轄裁判所)</h4>
              <p>
                本規約の解釈に疑義が生じた場合、又は本規約に定めのない事項については、当社と利用者は、当社と利用者は、誠意をもって協議の上これを解決するものとします。
                本規約は日本法を準拠法とし、本サービスおよび本規約に関して生じる一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                  </p>

              <h4>第19 条 (お問い合わせ連絡先)</h4>
              <p>
                本サービスおよび本規約に関するお問い合わせについて以下までご連絡ください。
                </p>
              【お問い合わせ先】 株式会社アクティベートラボ   お客様相談窓口
                  info@activatelab.co.jp

            </div>

            <div className="contact">


            </div>{/* //contact */}


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