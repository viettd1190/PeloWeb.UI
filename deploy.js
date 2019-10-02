let FtpDeploy = require('ftp-deploy');
let ftpDeploy = new FtpDeploy();

let devConfig = {
  user: 'truongmv', 
  password: 'user1###',
  host: '192.168.10.45',
  port: 21,
  localRoot: __dirname + `/deployments/support-dvr-map-dev`,
  remoteRoot: `/support-dvr-map-dev`,
  include: ['*'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
  connTimeout: 60000,
  pasvTimeout: 60000,
  aliveTimeout: 60000
};

let prodConfig = {
  user: 'truongmv', 
  password: 'user1###',
  host: '42.117.1.19',
  port: 21,
  localRoot: __dirname + `/deployments/support-dvr-map-prod`,
  remoteRoot: `/support-dvr-map-prod`,
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