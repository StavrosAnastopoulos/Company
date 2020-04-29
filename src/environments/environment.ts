const url = `${window.location.protocol}//${window.location.host}`;

export const environment = {
  production: false,
  webApiUrl: `${url}/api/`,
  identityConfig: {
    authority: 'https://demo.identityserver.io/',
    client_id: 'spa',
    response_type: 'code',
    scope: 'openid profile email api',
    redirect_uri: `${url}/assets/signin-callback.html`,
    silent_redirect_uri: `${url}/assets/silent-callback.html`,
    post_logout_redirect_uri: `${url}`,
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true,
    revokeAccessTokenOnSignout: true,
  },
};
