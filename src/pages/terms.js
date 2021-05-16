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

          <section className="membership-col">

            <h2 className="title">お問い合わせ</h2>

            <div className="contact">
              <form>
                <dl className="contact-input">
                  <dt>お名前</dt>
                  <dd><input type="text" placeholder="お名前を入力してください" /></dd>
                </dl>
                <dl className="contact-input">
                  <dt>ふりがな</dt>
                  <dd><input type="text" placeholder="ふりがなを入力してください" /></dd>
                </dl>
                <dl className="contact-input">
                  <dt>電話番号</dt>
                  <dd><input type="text" placeholder="電話番号を入力してください" /></dd>
                </dl>
                <dl className="contact-input">
                  <dt>メールアドレス</dt>
                  <dd><input type="mail" placeholder="メールアドレスを入力してください" /></dd>
                </dl>

                <dl className="contact-input">
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

                <h3>会員規約</h3>

                <div className="summary_txt">

                  <h4>【人材紹介事業利用規約】</h4>

                  本規約は、株式会社ココピア（以下「当社」という。）が企画運営する人材紹介サイト「ココピアキャリア」（以下、｢本ウェブサイト｣という。）を通じて提供される一切のサービスに適用されるものとします。

                  第1条（サービス）

                  1. 本サービスとは、本ウェブサイトを通じた求職・求人、及び、それに関連するサービスを利用目的とするサービスの総称です。
                  2. ユーザーとは、本サービスを利用する個人をいいます。
                  3. 本サービスを利用する者は、本規約の内容をすべて承認したものとみなします。
                  4. 当社および当社のサービス利用企業は本サービスを提供する際に、ユーザーに対しEメール、SMS、ダイレクトメール、郵便、電話等によって連絡をすることができます。なおEメール、SMS、ダイレクトメール、郵便には、当社の提供する情報に関するwebサイトのURLや、お問い合わせ先等の電話番号の情報が含まれる場合があります。

                  第2条（禁止事項）

                  ユーザーは、次の行為をすることはできません。

                  1. 虚偽の情報を登録し、又は提供すること
                  2. 当社、他のユーザー又は第三者の著作権等知的財産権を侵害する行為
                  3. 当社、他のユーザー又は第三者の財産権、プライバシーに関する権利、その他の権利又は利益を侵害する行為
                  4. 本サービスで得た情報を、本サービスの利用目的の範囲を超えて第三者に譲渡し、又は営利を目的とした情報提供活動に用いること
                  5. コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報を送信する行為
                  6. 本サービスの運営の妨げとなる一切の行為
                  7. 本サービスを利用する他のユーザー又は第三者を誹謗中傷する行為
                  8. 公序良俗に反する行為
                  9. 法令に反する一切の行為
                  10. その他、当社が不適切と判断する一切の行為

                  第3条（ユーザーの責任）

                  1. ユーザーは自らの意思によって本サービスを利用するものとします。
                  2. ユーザーは、ユーザーが自ら登録した情報については、その内容について一切の責任を負うものとします。
                  3. 前項の登録情報は、本サービスを利用するために必要な範囲内で、ユーザーの求めに応じ、変更、追加、削除できるものとし、常にユーザーが責任をもって利用目的に沿い、正確、最新に保つものとします。

                  第4条（労働条件）

                  当社は、求人企業の労働条件その他契約内容の確認においては、ユーザーの希望に応じ連絡を取次ぎますが、ユーザーは、ユーザーの責任において、求人企業に労働条件その他契約内容を直接確認した後に契約を結ぶものとし、当社がユーザーに通知した労働条件が、当該契約の詳細を最終的に保証するものではないことを承諾します。

                  第5条（情報の削除）

                  1. 当社は、ユーザーによる情報の送信、提供等の行為が本規約第2条に規定された行為に該当し又はそのおそれがある場合には、ユーザーに通知することなく、当該情報の全部又は一部について、削除、送信停止その他必要と認める措置を講じることができます。
                  2. 当社は、ユーザーが第2条その他本規約の規定に違反した場合には、ユーザーに通知することなく、当該ユーザーについて本サービスの利用を一時的に停止し、又はユーザーとしての登録を抹消することができます。

                  第6条（提供情報の利用）

                  ユーザーは、本サービスにおいて提供した情報のうち、氏名、住所、電話番号、メールアドレス等個人を特定する情報を除く情報*を、当社が日本の国内外で無償で非独占的に使用する （複製、公開、送信、頒布、譲渡、貸与、翻訳、翻案を含む）権利を許諾（サブライセンス権を含む）したものとみなします。また、ユーザーは著作者人格権を行使しないものとします。
                  * 個人を特定する情報 とは、氏名、住所、電話番号、電子メールアドレスなどの個人を特定することが可能な情報、複数の情報を組み合わせることで個人を特定することが可能な情報および個人識別符号の含まれる情報をいいます。具体的には、住所を利用する際には都道府県名と地方名までは「個人を特定することができない情報」として取り扱います。また年齢そのものは、 複数の情報を組み合わせることで「個人を特定する情報」とみなし、5～10歳きざみの年齢層を「個人を特定することができない情報」として取り扱います。

                  第7条（個人情報の取り扱い）

                  当社はユーザーから、以下に定める要配慮個人情報（個人情報保護法第2条第3項により定義された「要配慮個人情報」をいい、以下同様とします。）を含むプライバシー情報を、あらかじめユーザーからの同意を得て取得し、当社定める個人情報保護方針の下に、サービスの提供のために利用します。

                  当社が取得する要配慮個人情報を含むプライバシー情報
                  ・氏名、住所、電話番号（携帯電話を含む）、メールアドレス、勤務先、生年月日、障害の状況（部位、等級）、障害配慮について、通院履歴、支援機関、就労許可の有無、ストレス要因、ストレス要因への対処方法、その他の記述等により個人を識別できる情報、その他の障害者に対する求人紹介業務の提供に必要となる情報。

                  本サービスにおける個人情報の取り扱いについては、「個人情報保護方針」および「個人情報の取り扱いについて」（以下総称して「個人情報保護方針」という）をご確認ください。ユーザーは、本サービスを利用する場合には、当該個人情報保護方針を承認したものとみなします。

                  第8条（サービス内容の変更）

                  当社は、本サービスの運営を良好に保つため、事前の通知なく、本サービスの内容を変更することがあり、ユーザーはそれに対して異議を申し立てないものとします。

                  第9条（サービスの停止・終了等）

                  当社は、以下のいずれかに該当する事由が発生した場合、ユーザーへの事前の通知及び承諾を要することなく、本サービスを停止または終了することができます。

                  1. 本サービス運営のためのシステム（以下「システム」という。）の保守、更新等を定期的又は緊急に行う場合
                  2. 通常講ずるべきウィルス対策では防止できないウィルス被害、火災、停電、天災地変などの不可抗力により、本サービスの提供が困難な場合
                  3. 突発的なシステムの故障等が発生した場合
                  4. その他、不測の事態により、当社が本サービスの提供が困難と判断した場合

                  第10条（ユーザーによる登録の削除）

                  ユーザーは、自らの意思により本サービスへの登録を削除することができます。

                  第11条（免責）

                  1. 当社は、企業情報等の第三者の情報、広告その他第三者により提供される情報、ユーザー等が本サービスに登録し掲載する情報等に関し、内容の正確性、有用性等について何らの保証もしません。
                  2. ユーザーの本サービスへの登録及び本サービスの利用(第三者の情報提供行為等を含む)から生じる一切の損害に関して、当社は責任を負わないものとします。
                  3. 当社は、当社による本サービスの提供の中断、停止、利用不能又は変更、ユーザーの情報の削除又は消失､ユーザーの登録の抹消、本サービスの利用によるデータの消失又は機器の故障若しくは損傷、その他本サービスに関連してユーザーが被った損害につき、一切責任を負わないものとします。
                  4. 本ウェブサイトから他のウェブサイトへのリンク又は他のウェブサイトから本ウェブサイトへのリンクが提供されている場合でも、当社は、本ウェブサイト以外のウェブサイト及びそこから得られる情報に関して如何なる理由に基づいても一切の責任を負わないものとします。
                  5. 当社は、ユーザーによる本サービスの利用によって、就職・転職が成功することを保証するものではありません。
                  6. 当社の責任を免責する本規約の条項が消費者契約法等の法令に反することによって無効となる場合など、何らかの理由によって当社が本サービスに関してユーザーに対して損害賠償責任を負うべき場合でも、当社の賠償責任は、故意または重過失による場合を除き、ユーザーに生じた直接かつ通常の損害の範囲に限るものとします。

                  第12条（規約の変更）

                  当社は、ユーザーの承諾を得ることなく、本規約を随時変更することができます。変更の内容は、本ウェブサイト上に2週間掲載し、その期間経過をもってすべてのユーザーが了承したものとみなします。

                  第13条（本規約の譲渡等）

                  1. ユーザーは、当社の書面による事前の承諾なく、本規約に基づく権利又は義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。
                  2. 当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い本規約に基づく権利及び義務並びにユーザーの登録事項その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、ユーザーは、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。

                  第14条（ユーザーの損害賠償義務）

                  ユーザーが本規約に違反し、当社に対し損害を与えた場合、ユーザーは当社に対し、損害賠償義務を負担します。

                  第15条（準拠法及び管轄裁判所）

                  本規約の準拠法は日本法とし、本規約に関する紛争については、東京地方裁判所または東京簡易裁判所を第１審の専属的合意管轄裁判所とします。

                  附則

                  この規約は2020年1月に施行します。

                </div>

                <div class="terms-check">
                  <label>
                    <input type="checkbox" class="terms-check-input" /><span>利用規約に同意する</span><br />
                  </label>
                </div>

                <div className="contact-submi-btn">
                  <input type="submit" value="登録して話を聞く" />
                </div>
              </form>

            </div>{/* //contact */}


            <div className="membership-col-in">
              testtesttesttesttesttesttesttesttesttesttesttesttest
              testtesttesttesttesttesttesttesttesttesttesttesttesttest
            </div>
          </section>

          <section className="about-company-col">
            <div className="about-company-col-in">
              <ul>
                <li>個人情報保護方針</li>
                <li>運営会社について</li>
              </ul>
              <p>厚生労働大臣許可：14-ユ-301310</p>
            </div>
          </section>



          <section className="terms-of-use-col">
            <h2>利用規約</h2>

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
          </section>


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