const { AuthenticationError } = require('apollo-server-express');

const { User, Task, Child } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // TODO: Add authentication

    // find all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('children')
    },

    // child query
    children: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Child.find(params)
    }

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
      
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
      },
}
};

module.exports = resolvers;