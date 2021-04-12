/*
https://auth0.com/blog/introducing-the-auth0-next-js-sdk/

This will create the following urls: /api/auth/login, /api/auth/callback, /api/auth/logout and /api/auth/me.

Details here;
https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md
*/
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();
