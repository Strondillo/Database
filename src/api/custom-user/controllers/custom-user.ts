import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default factories.createCoreController('api::custom-user.custom-user', ({ strapi }) => ({
  async login(ctx) {
    try {
      const { Email, Password } = ctx.request.body;
      console.log('Login attempt:', { Email, Password });

      if (!Email || !Password) {
        return ctx.badRequest('Email and password are required');
      }

      // Find user
      const users = await strapi.entityService.findMany('api::custom-user.custom-user', {
        filters: { Email: Email.toLowerCase() },
      });

      if (!users || users.length === 0) {
        return ctx.badRequest('Invalid email or password');
      }

      const foundUser = users[0];
      console.log('Found user password hash:', foundUser.Password);

      // Use bcrypt to compare the plain text password with the hashed one
      const isValid = await bcrypt.compare(Password, foundUser.Password);
      if (!isValid) {
        return ctx.badRequest('Invalid email or password');
      }

      const token = jwt.sign(
        {
          id: foundUser.id,
          email: foundUser.Email,
        },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1d' }
      );

      return ctx.send({
        user: {
          id: foundUser.id,
          First_Name: foundUser.First_Name,
          Last_Name: foundUser.Last_Name,
          Email: foundUser.Email,
          prcId: foundUser.prcId,
          AccountType: foundUser.AccountType,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return ctx.badRequest('An error occurred during login');
    }
  },

  async register(ctx) {
    try {
      const { Email, Password, First_Name, Last_Name, prcId, AccountType } = ctx.request.body;

      if (!Email || !Password || !First_Name || !Last_Name) {
        return ctx.badRequest('All fields are required.');
      }

      // Check for existing user
      const existingUser = await strapi.entityService.findMany('api::custom-user.custom-user', {
        filters: { Email: Email.toLowerCase() },
      });

      if (existingUser.length > 0) {
        return ctx.badRequest('Email already registered.');
      }

      // Create user - the password will be automatically hashed by Strapi
      const user = await strapi.entityService.create('api::custom-user.custom-user', {
        data: {
          First_Name,
          Last_Name,
          Email: Email.toLowerCase(),
          Password: Password, // gets hashed by Strapi
          prcId,
          AccountType,
        },
      });

      console.log('User registered with plain password:', Password);
      console.log('User stored hashed password:', user.Password);

      // Optionally, if you want to inform the user what the hashed password is
      return ctx.send({
        message: 'User registered successfully.',
        user: {
          id: user.id,
          First_Name: user.First_Name,
          Last_Name: user.Last_Name,
          Email: user.Email,
          prcId: user.prcId,
          AccountType: user.AccountType,
          hashedPassword: user.Password, // exposing this is not recommended in production
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      return ctx.badRequest('An error occurred during registration');
    }
  },
}));