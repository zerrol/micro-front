module.exports = {
  // 通过 webpack define plugin 定义全局变量
  // define: {
  //   'process.env': {
  //     HTTP_ENV: 'release7'
  //   }
  // },
  // devtoolProd: 'cheap-module-eval-source-map',

  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },

  postcss: {
    autoprefixer: {
      overrideBrowserslist: ["last 2 versions"],
    },
  },

  theme: {
    "primary-color": "#57D4CE"
  }

  // lessLoader: {
  //   lessOptions: {
  //     javascriptEnabled: true,
  //     modifyVars: {
  //       "primary-color": "#FFBD2E",
  //     },
  //   },
  // },
}
