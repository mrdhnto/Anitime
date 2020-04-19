const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
 
module.exports = {
   entry: "./app.js",
   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js"
   },
   module: {
       rules: [
           {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: "./src/template.html",
           filename: "index.html"
       })
   ]
}