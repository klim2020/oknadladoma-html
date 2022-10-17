const path = require('path');

module.exports = {
  paths: {
    /* Path to source files directory */
    source: path.resolve(__dirname, '../src/'),

    /* Path to built files directory */
    output: path.resolve(__dirname, '../dist/'),
    vendorList: {
      typedjs: path.resolve(__dirname, '../node_modules/typed.js/lib/typed.min.js'),
      jquery: path.resolve(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
      bootstrapjs: path.resolve(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.min.js'),
      bootstrapbundlejs: path.resolve(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'),
      //swiperjs: path.resolve(__dirname, '../node_modules/swiper/swiper-bundle.min.js'),
      jqValidate:path.resolve(__dirname, '../node_modules/jq-bootstrap-validation/dist/jq.bootstrap.validation.min.js'),
      jqInput:path.resolve(__dirname, '../node_modules/inputmask/dist/jquery.inputmask.min.js'),
      easing:path.resolve(__dirname, '../example/lib/easing/easing.min.js'),
      isotope:path.resolve(__dirname, '../node_modules/isotope-layout/dist/isotope.pkgd.min.js'),
    },
    vendorListCss: {
      //swipercss: path.resolve(__dirname, '../node_modules/swiper/swiper-bundle.min.css'),
      bootstrap: path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'),
      animatecss: path.resolve(__dirname, '../node_modules/animate.css/animate.min.css'),
    },
    nodepath:"../node_modules/",
  },
  server: {
    host: 'localhost',
    port: 8000,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    images: 8192,

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 8192,
  },
};
