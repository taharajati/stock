module.exports = {
  apps: [
    {
      name: 'easyvest-backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
        MONGODB_URI: process.env.MONGODB_URI,
        SESSION_SECRET: process.env.SESSION_SECRET,
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
      env: {
        NODE_ENV: 'production',
        PORT: 5001
      },
      args: '-s -l 5001 --no-clipboard --no-request-logging --rewrite-all --single',
      ignore_watch: ['node_modules', 'build'],
      watch_options: {
        followSymlinks: false,
        usePolling: true
      }
    }
  ]
}; 