const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./DB/db.js');
const schema = require('./graphql/schema.js');
const authMiddleware = require('./middleware/auth.js');

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  maxAge: 3600,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

dotenv.config();

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    const app = express();

    // Configure Apollo Server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ')[1] : null;
        return { token };
      },
      uploads: false,
      bodyParserConfig: false
    });

    // Start Apollo Server
    await server.start();

    // Apply Apollo middleware
    server.applyMiddleware({ 
      app,
      path: '/graphql',
      cors: false
    });

    // Add CORS after Apollo middleware
    app.use(cors());

    // Add body parsing after Apollo middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Auth middleware
    app.use(authMiddleware);

    // Static files
    app.use('/public', express.static('public'));
    server.applyMiddleware({ 
      app,
      path: '/graphql'
    });
    server.applyMiddleware({ 
      app,
      path: '/graphql',
      bodyParserConfig: { limit: '50mb' }
    });

    const PORT = process.env.PORT || 4000;
    const httpServer = app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });

    // Handle server errors
    httpServer.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      httpServer.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
