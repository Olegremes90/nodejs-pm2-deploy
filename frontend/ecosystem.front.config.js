module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npx',
      args: ['serve', '-s', 'build', '-l', '3001'], // раздача статических файлов из build на порту 3000
      cwd: '/home/mesto/my-app/source/frontend',                    // директория проекта на сервере (где есть папка build)
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      watch: false
    }
  ],
}
