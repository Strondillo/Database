export default {
  routes: [
      {
          method: 'POST',
          path: '/custom-user/login',
          handler: 'custom-user.login',
          config: {
              auth: false,
          },
      },
      {
          method: 'POST',
          path: '/custom-user/register',
          handler: 'custom-user.register',
          config: {
              auth: false,
          },
      },
      {
          method: 'GET',
          path: '/custom-user', // Fetch all users
          handler: 'custom-user.find',
          config: {
              auth: false,
          },
      },
      {
          method: 'GET',
          path: '/custom-user/:id', // Fetch a specific user by ID
          handler: 'custom-user.findOne',
          config: {
              auth: false,
          },
      },
  ],
};
