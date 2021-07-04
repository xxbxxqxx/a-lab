/*
https://auth0.com/blog/introducing-the-auth0-next-js-sdk/

This will create the following urls: /api/auth/login, /api/auth/callback, /api/auth/logout and /api/auth/me.

Details here;
https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md
*/
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const getLoginState = (req, loginOptions) => {
  return { screen_hint: 'signup', initialScreen: 'signup', action: 'signup' };
};

//export default handleAuth();
export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { getLoginState });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});