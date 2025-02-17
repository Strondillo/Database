export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'L2ERvzRiPlEOf5a0AmN5HA=='), 
      },
    },
  });
  