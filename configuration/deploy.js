const ftp = require('basic-ftp');
const path = require('path');
const environment = require('./environment');
// eslint-disable-next-line no-undef
const config = {
  host: "185.143.145.227",
  user: "tawtdvqs",
  password: "n4C6Lx>oEq%M",
  //secure: true
};

const options = {
  logging: 'debug',
};
(async () => {
  const client = new ftp.Client();
  // eslint-disable-next-line no-undef
  // client.connect();
  client.ftp.verbose = true;
  console.log('Current directory:', path.resolve(__dirname, '../dist/'));

  try {
    await client.access(config);

    //await client.cd('oknavdoma.com.ua/wp-content/themes/twentytwentytwo/dist');
    console.log(await client.list())
    //console.log('dirlist is ' + await client.list());
    await client.cd('oknavdoma.com.ua/');
    
    await client.uploadFromDir(path.resolve(__dirname, '../dist/'));
    
    
    //await client.uploadFrom("../dist/index.html", "README_FTP.md")
    // await client.downloadTo('README_COPY.md', 'README_FTP.md')
  } catch (err) {
    console.log(err);
  }
  client.close();

  // eslint-disable-next-line no-undef
  // client.upload([path.resolve(__dirname, '../dist/**')], '/getmancar.com/test', {
  // baseDir: 'dist',
  // overwrite: 'older',
  // }, function (result) {
  //  console.log(result);
  // });
})();
