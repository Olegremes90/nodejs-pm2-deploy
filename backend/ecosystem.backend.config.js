module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/app.js',
      cwd: '/home/mesto/my-app/source/backend',
      env: { NODE_ENV: 'production' },
      watch: false,
    },
  ],

  deploy: {
    production: {
      'post-deploy': 'pm2 startOrReload ecosystem.backend.config.js --only backend',
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};
