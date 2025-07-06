const User =require('../../models/User.js');
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const userResolver = {
  Query: {
    users: async () => await User.find(),
    me: async (_, __, { token }) => {
      if (!token) {
        return null;
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findById(decoded.id);
      } catch {
        return null;
      }
    },
  },

  Mutation: {
    registerUser: async (_, { input }) => {
      const { name, email, password, role } = input;
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'User',
      });

      const token = generateToken(newUser);

      return {
        token,
        user: newUser,
      };
    },

    loginUser: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};

module.exports = userResolver;
