export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'FZZu8uR5MmdwWfK/DbHYvQ=='), 
      },
    },
  });
  