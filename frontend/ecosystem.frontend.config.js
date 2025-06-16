require('dotenv').config({ path: '.env.front' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPO_GIT, DEPLOY_REF = 'origin/master' } = process.env;

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npx',
      args: ['serve', '-s', 'build', '-l', '3001'], // раздача статических файлов из build на порту 3001
      cwd: '/home/mesto/my-app/source/frontend', // директория проекта на сервере (где есть папка build)
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      watch: false
    }
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_GIT,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,
      'post-deploy': `pm2 startOrReload ecosystem.frontend.config.js --only frontend`,
      ssh_options: 'StrictHostKeyChecking=no'
    }
  }
};
