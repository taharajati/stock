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
        CLIENT_URL: 'http://easyvest.ir',
        GOOGLE_CLIENT_ID: 'your-google-client-id',
        GOOGLE_CLIENT_SECRET: 'your-google-client-secret',
        GOOGLE_CALLBACK_URL: 'http://easyvest.ir/auth/google/callback'
      }
    },
    {
      name: 'betaoption-frontend',
      script: 'serve',
      cwd: './frontend',
      args: '-s build -l 5001',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
        REACT_APP_API_URL: 'http://easyvest.ir'
      }
    }
  ]
}; 