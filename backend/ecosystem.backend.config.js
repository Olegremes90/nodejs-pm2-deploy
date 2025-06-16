require('dotenv').config({ path: '.env.back' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, REPO_GIT, DEPLOY_REF = 'origin/master' } = process.env;

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
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_GIT,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,
      'post-deploy': `cd backend && . ~/.nvm/nvm.sh && npm install && npm run build && pm2 startOrReload ${DEPLOY_PATH}/source/ecosystem.backend.config.js --only backend`,
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};
