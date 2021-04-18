import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="header-common">
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
                <a href="/api/auth/logout" data-testid="logout" className="text-secondary">
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/api/auth/login" data-testid="login" className="text-secondary">
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
