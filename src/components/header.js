import React, { useState } from "react"
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Link as LinkRS, animateScroll as scroll } from "react-scroll"
import { useRouter } from 'next/router';

import Menu from "../components/menu";
import Hamburger from 'hamburger-react'

const Header = () => {
  const { user } = useUser();

  //ハンガーメニュー
  const [isOpen, setOpen] = useState(false)

  const router = useRouter();

  return (
    <header className="header-common header-fix">
      <div className="header-common-in container">
        <div className="row">
          <div className="header-left col-sm-4">
            <a href="./"><img src="image/top-logo2.png" /></a>
          </div>

          <div className="header-right col-sm-8 col-xs-12">
            <nav>
              <Hamburger toggled={isOpen} toggle={setOpen} color="#000" />
              <Menu open={isOpen} setOpen={setOpen} />
              <ul className="login-out">
                {user && user.email_verified === true
                  ? (router.pathname !== "/mypage" ?
                  <>
                    <li>
                      <a href="/mypage" className="log-btn">
                        {/*<a>Mypage</a>*/}
                        Mypage
                      </a>
                    </li>
                  </>
                  : (<li>
                      <a href="/api/auth/logout" data-testid="logout" className="log-btn">
                        ログアウト
                      </a>
                    </li>
                    )
                ) : (
                  <>
                    <li>
                      <a href="/api/auth/login" data-testid="login" className="log-btn" target="_blank">
                        <i className="fa fa-external-link" aria-hidden="true"></i>ログイン
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>

           {user ? "" 
           : (<a href="/api/auth/login?screen_type=signup" data-testid="login" className="log-btn log-btn-bottom" target="_blank"> <i className="fa fa-user-circle" aria-hidden="true"></i>新規登録する＞</a>)
           }
          </div>{/* header-right */}
        </div>

        {router.pathname == "/"
          && <ul className="navi-bottom">
            {/*
          <li>
            <Link href="#">
              <a>TOP</a>
            </Link>
          </li>
          */}


            <li>
              <LinkRS
                activeClass="active"
                to="reasons"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                選ばれる理由
              </LinkRS>

            </li>

            <li>
              <LinkRS
                activeClass="active"
                to="job"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                求人情報
              </LinkRS>
            </li>

            <li>
              <LinkRS
                activeClass="active"
                to="users-voice"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                利用者の声
              </LinkRS>
            </li>

            <li>
              <LinkRS
                activeClass="active"
                to="flow"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                ご利用の流れ
              </LinkRS>
            </li>


            <li>
              <LinkRS
                activeClass="active"
                to="qa"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Q&A
              </LinkRS>
            </li>

            <li>
              <LinkRS
                activeClass="active"
                to="open-gate"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                OpenGateとは
              </LinkRS>
            </li>

            <li>
              <LinkRS
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                会社概要
              </LinkRS>
            </li>

          </ul>
        }

      </div>
      {/* //header-common-in  */}
    </header>
  );
};

export default Header;