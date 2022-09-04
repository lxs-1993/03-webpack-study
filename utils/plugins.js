

// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 每次打包前，清除dist缓存文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 合并css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 压缩css文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
// 压缩Js文件
const TerserWebpackPlugin = require("terser-webpack-plugin")
// 纯净的css文件
const glob = require('glob');
const path = require("path")
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// 全局变量的配置
const webpack = require("webpack")
module.exports = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html', // 指定输出的文件模板名
    chunks: ['index'], // 指定页面需要的js
  }),
  new CleanWebpackPlugin(), // 使用这个插件在每次生成dist目录前，先删除dist目录
  // 抽离css文件
  new MiniCssExtractPlugin({
    filename: './css/index.[hash:4].css'
  }),
  // 压缩css文件
  new CssMinimizerWebpackPlugin(),
  // 压缩js文件
  new TerserWebpackPlugin({
    // 压缩js
    test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
    parallel: true, //使用多进程并发运行
    terserOptions: {
      //Terser 压缩配置
      output: { comments: false },
      compress: {
        // pure_funcs: ["console.log"], // 去除console.log
      },
    },
    extractComments: true, //将注释剥离到单独的文件中
  }),
  // 全局变量的配置
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
  // new PurgeCSSPlugin({
    // paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    // 可以换成熟悉的用法,这样就会把所有的css文件都剔除了
    // paths: glob.sync(path.join(__dirname, 'index.html')),
  // })
]

