module.exports = {
  apps: [{
    name: 'easyvest',
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
    },
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G'
  }]
}; 