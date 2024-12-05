export default {
    routes: [
      {
        method: 'POST',
        path: '/custom-user/login',
        handler: 'custom-user.login',
        config: {
          auth: false, // Make it accessible publicly
        },
      },
      {
        method: 'POST',
        path: '/custom-user/register',
        handler: 'custom-user.register',
        config: {
          auth: false, // Make it accessible publicly
        },
      },
      {
        method: 'GET',
        path: '/custom-user', // Endpoint for fetching all users
        handler: 'custom-user.find', // You can use Strapi's default `find` handler or a custom one
        config: {
          auth: false, // Adjust based on your security requirements
        },
      },
      {
        method: 'GET',
        path: '/custom-user/:id', // Endpoint for fetching a specific user by ID
        handler: 'custom-user.findOne', // You can use Strapi's default `findOne` handler or a custom one
        config: {
          auth: false, // Adjust based on your security requirements
        },
      },
    ],
  };  