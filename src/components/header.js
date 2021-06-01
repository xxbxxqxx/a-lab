import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Link as LinkRS, animateScroll as scroll } from "react-scroll"







const Header = () => {
  const { user } = useUser();

  return (
    <header className="header-common">
      <div className="header-common-in container">
        <div className="row">
          <div className="header-left col-sm-4">
            <img src="/top-test.png" />
          </div>

          <div className="header-right col-sm-8">
            <nav>
              <ul>
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link href="/jobs">
                        <a>求人情報</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage">
                        <a>Mypage</a>
                      </Link>
                    </li>
                    <li>
                      <a href="/api/auth/logout" data-testid="logout" className="log-btn">
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a href="/api/auth/login" data-testid="login" className="log-btn">
                        Login
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <ul className="navi-bottom">
              <li>
                <LinkRS to="reasons">
                  選ばれる理由
                </LinkRS>

              </li>

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
          </div>{/* header-right */}


        </div>
      </div>
    </header>
  );
};

export default Header;
