const packageName = require('./package.json').name;

module.exports = {
  // 通过 webpack define plugin 定义全局变量
  // define: {
  //   'process.env': {
  //     HTTP_ENV: 'release7'
  //   }
  // },
  // devtoolProd: 'cheap-module-eval-source-map',

  postcss: {
    autoprefixer: {
      overrideBrowserslist: ["last 2 versions"],
    },
  },

  devServer: {
    port: 8081,
    // 微前端访问会有跨域
    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  webpackConfig: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  },

  lessLoader: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "primary-color": "#FFBD2E",
        "border-radius": "4px",
      },
    },
  },
}
