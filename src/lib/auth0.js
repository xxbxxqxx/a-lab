import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  baseURL: 'http://localhost:3000',
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.COOKIE_SECRET,
  clockTolerance: 60,
  httpTimeout: 5000,
  //authorizationParams: {
  //  scope: 'openid profile email',
  //  audience: 'MY_AUDIENCE'
  //},
  routes: {
    callback: '/api/callback',
    postLogoutRedirect: '/'
  },
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7,
    //session.storeIdToken, session.storeAccessToken, session.storeRefreshToken are no longer options. All tokens are stored by default, to remove anything from the session see the afterCallback option in https://auth0.github.io/nextjs-auth0/modules/handlers_callback.html#modify-the-session-after-login.
    //storeIdToken: true,
    //storeAccessToken: true,
    //storeRefreshToken: true,
  }
});