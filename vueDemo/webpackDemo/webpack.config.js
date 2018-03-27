// webpack的配置文件，所有的配置项都在这里写。

const path = require('path');
const glob = require('glob');  // 扫描文件
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');   // 压缩js
const htmlPlugin = require('html-webpack-plugin');   // 处理html
const extractTextPlugin = require('extract-text-webpack-plugin');  // 分离css插件
const purifyCssPlugin = require('purifycss-webpack');
const entry = require('./webpack_config/entry_webpack.js');   // 引入模块
const copyWebpackPlugin = require('copy-webpack-plugin');   // 引入copy-webpack-plugin插件

console.log(encodeURIComponent(process.env.type));    // encodeURLComponent node中的语法，输出到控制台

// 接受到type值并判断是否为开发环境和生产环境
if(process.env.type == "build"){
    var website = {
        publicPath: 'http://baixue.com:1717/'
    }
} else {
    var website = {
        publicPath: 'http://172.16.0.223:1717/'
    }
}

module.exports = {
    entry: {  //entry.path,
        entry: "./src/entry.js",
        jquery: "jquery",
        vue: "vue"
    },
    output: {   // 出口配置项
        path: path.resolve(__dirname, 'dist'),  // 打包之后的路径  path 是node语法，使用之前先引入 path.resolve(__dirname, 'dist') 表示dist的绝对路劲
        filename: '[name].js',   // 打包之后的文件名, 配置多入口时，就得相应的配置多出口，区分命名 
        publicPath: website.publicPath
    },
    module: {  // 处理各种文件的转换以及图片压缩等
        rules: [  // 配置规则
            {
                test: /\.css$/,  // 用正则表达式的形式处理文件扩展名
                // use: ['style-loader', 'css-loader']   // use 配置使用哪些loader
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader'
                    ]
                })
                // [{  // 配置的另一种写法，更方便的添加配置项
                //     loader: "style-loader"
                // }, {
                //     loader: "css-loader"
                // }]
                // include: "",  // 要处理哪些文件夹
                // exclude: "",  // 哪些文件不需要处理
                // query: ""  
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',   // url-loader自带了file-loader的功能，不依赖file-loader,file-loader 解决打包之前和打包之后图片路劲不同的问题
                    options: {
                        limit: 5000,    // 大于5000时会拷贝图片的路劲，小于5000时就会以base64位格式的图片在js中展示
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/i,
                use: ['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',   // 分离
                    use: [{
                        loader: 'css-loader'
                    },{
                        loader: 'less-loader'
                    }]
                }) 
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                    },{
                        loader: 'sass-loader'
                    }]
                })

            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: "/node_modules/"  // 去除此目录
            }
        ]
    },
    plugins: [    // 各种处理文件的插件，是一个数组
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new uglify()
        new htmlPlugin({
            minify: {  // 压缩
                removeAttributeQuotes: true   // 去掉所有属性的引号
            },
            hash: true,   //处理缓存，以hash的形式命名存储，每次给不同的字符串
            template: './src/index.html'   // 模板， index.html的相对路劲
        }),
        new extractTextPlugin("css/index.css"),   // 将css打包在css文件夹下
        new purifyCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))   // 消除html中没有用到的css样式  *号表示所有的.html文件
        }),
        new webpack.BannerPlugin("baixue"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["jquery", "vue"],  // 对应入口配置的类库名臣
            filename: "assets/js/[name].js",  // 抽离之后的路劲
            minChunk: 2   // 至少抽离几个文件
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/public',   // 要打包的静态资源目录地址
            to: "./public" // 打包到dist目录下的public文件夹下
        }])
    ],
    devServer: {   // 配置webpack开发服务
        contentBase: path.resolve(__dirname, 'dist'),   // 绝对路劲
        host: '172.16.0.223',  // 服务器ip地址
        compress: true,  // 是否配置服务器压缩
        port: 1717  // 服务器端口
    },
    watchOptions: {
        poll: 1000,   // 监测修改的时间以毫秒为单位 （1秒监测一次，是否修改了文件，如果修改则打包）
        aggregateTimeout: 500,   // 防止重复按键，半秒钟内重复按"ctrl+S"保存则不打包
        ignored: /node_modules/  // 排除文件
    }
}