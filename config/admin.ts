export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'p0x7UEV0+ZT4uGEe4HkZbg=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'KdvDqwo+FAMUafMcHzaNXw=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'Y3KGX0p8nC1BqG/QAN0zhw=='),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
