import '../components/styles/globals.css'
import '../components/styles/style.scss'
import '../components/styles/konishi_addition.scss'
import '../components/styles/flash_message.scss'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import { TodosProvider } from '../contexts/TodosContext';

export default function MyApp({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </UserProvider>
  )
}