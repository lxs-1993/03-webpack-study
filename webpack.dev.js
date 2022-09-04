// webpack是基于node的
const webpack = require("webpack")
// webpack合并
const { merge } = require('webpack-merge') // webpack合并
const base = require("./webpack.base")
// 引入插件
module.exports = merge(base,{
  mode: 'development',
  plugins: [
    // 定义webpack变量
    new webpack.DefinePlugin({
      DEV_ENV:JSON.stringify('dev')
    })
  ]  
})