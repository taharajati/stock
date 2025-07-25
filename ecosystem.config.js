module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGODB_URI: process.env.MONGODB_URI,
        SESSION_SECRET: process.env.SESSION_SECRET,
        // سایر متغیرهای لازم
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '512M'
    }
  ]
}; 