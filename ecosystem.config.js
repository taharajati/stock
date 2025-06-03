module.exports = {
  apps: [
    {
      name: 'betaoption-backend',
      script: './backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
        MONGODB_URI: 'mongodb+srv://taha:taha12345@cluster0.8jqgx.mongodb.net/betaoption?retryWrites=true&w=majority',
        JWT_SECRET: 'your-secret-key',
        CLIENT_URL: 'https://easyvest.ir',
        GOOGLE_CLIENT_ID: '1094757684567-8jqgx.mongodb.net',
        GOOGLE_CLIENT_SECRET: 'GOCSPX-8jqgx.mongodb.net',
        GOOGLE_CALLBACK_URL: 'https://easyvest.ir/auth/google/callback'
      }
    },
    {
      name: 'betaoption-frontend',
      script: 'http-server',
      cwd: './frontend/build',
      args: '-p 5001',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
        REACT_APP_API_URL: 'https://easyvest.ir'
      }
    }
  ]
}; 