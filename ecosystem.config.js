module.exports = {
  apps: [
    {
      name: 'easyvest-backend',
      script: './backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
        MONGODB_URI: 'mongodb+srv://taharjtdeveloper:XQIC5sCzpzQW91UQ@betaoption.xwpxpkd.mongodb.net/?retryWrites=true&w=majority&appName=betaoption',
        SESSION_SECRET: 'your-secure-session-secret-key-change-this',
        CLIENT_URL: 'https://easyvest.ir',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: 'https://easyvest.ir/auth/google/callback'
      }
    },
    {
      name: 'easyvest-frontend',
      script: 'serve',
      cwd: './frontend/build',
      args: '-s build -l 5001',
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