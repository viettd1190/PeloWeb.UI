let FtpDeploy = require('ftp-deploy');
let ftpDeploy = new FtpDeploy();

let devConfig = {
  user: 'tantranvan9463@gmail.com', 
  password: 'UngNguyen389350',
  host: '192.168.30.74',
  port: 21,
  localRoot: __dirname + `/deployments/pelo-prod`,
  remoteRoot: `/pelo-prod`,
  include: ['*'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
  connTimeout: 60000,
  pasvTimeout: 60000,
  aliveTimeout: 60000
};

let prodConfig = {
  user: 'Administrator', 
  password: 'viettd123^%$',
  host: '103.77.167.96',
  port: 21,
  localRoot: __dirname + `/deployments/pelo-prod`,
  remoteRoot: `/pelo-prod`,
  include: ['*'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
  connTimeout: 60000,
  pasvTimeout: 60000,
  aliveTimeout: 60000
};

ftpDeploy
  .deploy(process.env.env_config === 'dev' ? devConfig : prodConfig)
  .then(res => console.log('finished: ', res))
  .catch(err => console.log('err', err));

ftpDeploy.on('uploading', function (data) {
  data.totalFilesCount;
  data.transferredFileCount; 
  data.filename; 
});

ftpDeploy.on('uploaded', function (data) {
  console.log(data); 
});

ftpDeploy.on('log', function (data) {
  console.log(data); 
});