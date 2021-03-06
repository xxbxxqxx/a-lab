import React from 'react';
import Head from 'next/head';
//import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next.js with Auth0</title>
    </Head>


    <main>
      {
        /*
          <div className="container">{children}</div>
        */
      }
      {children}
    </main>

    <Footer />
  </>
);

export default Layout;