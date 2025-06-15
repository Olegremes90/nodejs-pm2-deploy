require('dotenv').config({ path: '.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/main' } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Olegremes90/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/.env`,
      'post-deploy': `
        cd frontend && npm install && npm run build &&
        cd ../backend && npm install &&
        pm2 restart ecosystem.front.config.js --only frontend &&
        pm2 restart ecosystem.backend.config.js --only backend
      `,
      ssh_options: 'StrictHostKeyChecking=no'
    }
  }
};
