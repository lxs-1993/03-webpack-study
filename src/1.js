const path = require("path")
console.log("1",__dirname) // 1 G:\0004-study\0001-webpack
console.log("2",__filename) // 2 G:\0004-study\0001-webpack\1.js
console.log("pathResolve",path.resolve(__dirname,'./dist'))
//G:\0004-study\0004-webpack\src\dist