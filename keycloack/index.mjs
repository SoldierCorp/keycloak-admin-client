import KcAdminClient from '@keycloak/keycloak-admin-client';

const kcAdminClient = new KcAdminClient({
  baseUrl: 'https://auth.dev.v2x.presencepg.com',
  realmName: 'master',
});

const credentials = {
  username: 'admin',
  password: '',
  grantType: 'password',
  clientId: 'admin-cli',
  // totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
};

await kcAdminClient.auth(credentials);

setInterval(() => kcAdminClient.auth(credentials), 58 * 1000);

export { kcAdminClient }