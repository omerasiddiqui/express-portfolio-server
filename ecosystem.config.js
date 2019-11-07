module.exports = {
    apps: [{
      name: 'portfolio',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-218-238-227.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/portfolio2.pem',
        ref: 'origin/master',
        repo: 'https://github.com/omerasiddiqui/express-portfolio-server.git',
        path: '/home/ubuntu/server',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }