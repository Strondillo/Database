import { factories } from '@strapi/strapi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default factories.createCoreController('api::custom-user.custom-user', ({ strapi }) => ({
    async login(ctx) {
        const { Email, Password } = ctx.request.body;
        console.log('Received login request:', { Email, Password });
    
        if (!Email || !Password) {
          return ctx.badRequest('Email and password are required');
        }
    
        // Find the user by email
        const user = await strapi.entityService.findMany('api::custom-user.custom-user', {
          filters: { Email: Email.toLowerCase() },
        });
    
        console.log('User found:', user);
    
        if (!user || user.length === 0) {
          return ctx.badRequest('Invalid email or password');
        }
    
        const foundUser = user[0];
        console.log('Found user in database:', foundUser);
    
        if (Password !== foundUser.Password) {
            console.log('Password does not match');
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
    
        console.log('Login successful. Token generated:', token);
    
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
      },

     async register(ctx) {
        const { Email, Password, First_Name, Last_Name, prcId, AccountType } = ctx.request.body;
    
        // Validate input
        if (!Email || !Password || !First_Name || !Last_Name) {
          return ctx.badRequest('All fields are required.');
        }
    
        const existingUser = await strapi.entityService.findMany('api::custom-user.custom-user', {
          filters: { Email },
        });
    
        if (existingUser.length > 0) {
          return ctx.badRequest('Email already registered.');
        }
    
        const user = await strapi.entityService.create('api::custom-user.custom-user', {
          data: {
            First_Name,
            Last_Name,
            Email,
            Password,
            prcId,
            AccountType,
          },
        });
    
        ctx.send({ message: 'User registered successfully.', user });
      },
    }));
