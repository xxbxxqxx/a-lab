import '../components/styles/globals.css'
import '../components/styles/style.scss'
import '../components/styles/konishi_addition.scss'
import '../components/styles/flash_message.scss'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { TodosProvider } from '../contexts/TodosContext';
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <TodosProvider>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Component {...pageProps} />
      </TodosProvider>
    </UserProvider>
  )
}