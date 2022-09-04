// webpack是基于node的

const webpack = require("webpack")
const { merge } = require('webpack-merge') // webpack合并
// webpack合并
const base = require("./webpack.base")

module.exports = merge(base,{
  // 模式(生产模式还有开发模式)
  mode: 'production',
  plugins:[
    new webpack.DefinePlugin({
      DEV_ENV:JSON.stringify('test')
    }),
  ],
  
})