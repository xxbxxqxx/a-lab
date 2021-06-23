import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Header = () => {
  const { user } = useUser();

  return (
    <footer>

      {/*

      <section className="about-company-col">

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
                    <li>【新宿本社】</li>
                    <li>〒160-0023</li>
                    <li>東京都新宿区西新宿3-2-9</li>
                    <li>新宿ワシントンホテルビル本館2F</li>
                    <li> THE HUB新宿ワシントン37</li>
                  </ul>

                  <ul className="sns">
                    <li><a href="#"><img src="/facebook.png" /></a></li>
                    <li><a href="#"><img src="/insta.png" /></a></li>
                    <li><a href="#"><img src="/twitter.png" /></a></li>
                  </ul>

                </div>

                <div className="col-sm-4 about-company-access-R">

                  <ul>
                    <li>
                      <a href="#">＞企業・法人の皆さまへ<br />
                      法人・組織向けのご案内</a>
                    </li>
                    <li><a href="#">＞運営会社について</a></li>
                  </ul>

                  <img src="/image/AL1.png" />

                </div>

              </div>
            </div>
          </div>
        </div>

      </section>

      */}
      {/* //about-company-col */}

      <section className="comany-profile-col">
        <div className="comany-profile-col-in container">
          <ul>

            <li><a href="/terms">利用規約</a></li>
            <li><a href="/privacy">プライバシーポリシー</a></li>

          </ul>
          <p>厚生労働大臣許可：13-ユ-312684</p>
          <img src="/image/top-logo.png" />
        </div>
      </section>

    </footer>
  );
};

export default Header;
