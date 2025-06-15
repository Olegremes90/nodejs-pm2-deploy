module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'dist/app.js',
      cwd: '/home/mesto/source/backend',
      env: { NODE_ENV: 'production' },
      watch: false,
    },
  ],
};
