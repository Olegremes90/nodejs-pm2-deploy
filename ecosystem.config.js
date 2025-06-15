require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npx',                      // Статический сервер для фронтенда
      args: ['serve', '-s', 'frontend/build', '-l', '3001'],   // Путь к frontend сборке и порт
      cwd: DEPLOY_PATH,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
    {
      name: 'backend',
      script: 'backend/dist/app.js',    // Точка входа бэкенда
      cwd: DEPLOY_PATH,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Olegremes90/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/.env.deploy`,
      // Отдельный скрипт для frontend
      'post-deploy': `
        cd frontend &&
        export NODE_OPTIONS=--openssl-legacy-provider && source ~/.nvm/nvm.shexport NODE_OPTIONS=--openssl-legacy-provider && source ~/.nvm/nvm.sh &&
        npm install &&
        npm run build &&
        cd .. &&
        cd backend &&
        . ~/.nvm/nvm.sh &&
        npm install &&
        npm run build &&
        pm2 reload ecosystem.config.js --only backend &&
        pm2 startOrReload ecosystem.config.js --only frontend
      `,
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};
