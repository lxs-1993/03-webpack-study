// webpack是基于node的
const path = require("path")
// 引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const plugins = require("./utils/plugins")
// 压缩Js文件
// const TerserWebpackPlugin = require("terser-webpack-plugin")
// // 压缩css文件 这种已经是要过时的了，最好不要使用
// const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

const commonCssConfig = [ // 公共的css配置
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [[require("postcss-preset-env")()]],
      },
    },
  },
];
module.exports = {
  // 入口(entry) 多页面应用就会存在多个入口
  entry: {
    index:'./src/index.js', // 默认入口就是src/index.js
  },
  // 出口(output) 多出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './src/index/[hash:4].js'
  },
  // 模式(生产模式还有开发模式)
  mode: 'production',
  // 装载器(loader)
  // 插件(plugins)
  // optimization: {
  //   minimizer: [new TerserWebpackPlugin(),new OptimizeCssAssetsWebpackPlugin()]
  // },
  plugins,
  // 配置端口
  devServer: {
    port: 9527,
    open: true, // 自动打开浏览器
    progress: true, // 进度
    contentBase: './dist', // 指定web服务的根目录
    proxy: {
      // 代理配置
      "/api": {
        target: "http://localhost:9528", // 代理的后端接口
        pathRewrite:{
          "/api": ""
        }
      },
    }
  },
  module: {
    rules: [
      // 图片处理
      {
        test: /\.html$/,
        use:'html-withimg-loader', 
      },
      // 图片处理1
      // {
      //   test: /\.(png|jpeg|jpg|svg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       esModule: false, // 默认是true是es6
      //       outputPath: 'img', // 把图片放到目录下
      //     }
      //   }
      // },
      // 图片处理2
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false, // 默认是true是es6
            outputPath: 'img', // 把图片放到目录下
            limit: 100*1024,// 小于100kb的图片转换为base64图片
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options:{
            // es6 7...转换为es5
            presets:[
              "@babel/preset-env"
            ],
            "plugins": [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [...commonCssConfig], // css顺序是从右到左，从下到上
      },
      {
        test: /\.less$/,
        use: [...commonCssConfig,'less-loader'], // less顺序是从右到左，从下到上
      },
    ]
  },
  externals: {
    jquery: '$'
  }
}