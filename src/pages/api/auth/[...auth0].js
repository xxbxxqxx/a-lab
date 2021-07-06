/*
https://auth0.com/blog/introducing-the-auth0-next-js-sdk/

This will create the following urls: /api/auth/login, /api/auth/callback, /api/auth/logout and /api/auth/me.

Details here;
https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md
*/
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

//export default handleAuth();
export default handleAuth({
  async login(req, res) {
    let screenType = ""
    if(req.query.screen_type === "signup"){
      screenType = 'signup'
    }
    try {
      await handleLogin(
        req,
        res,
        //{ authorizationParams: { screen_hint: 'signup', screen_hint: 'signup', action: 'signup' } }
        { authorizationParams: { action: screenType }, returnTo: "/mypage" }
      );
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
  //async callback(req, res) {
  //  try {
  //    await handleCallback(req, res);
  //  } catch (error) {
  //    res.status(error.status || 500).end(error.message);
  //  }
  //}
});