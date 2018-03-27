var htmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js',
        b: './src/script/b.js',        
        c: './src/script/c.js'
    },
    output: {
        path: '/dist',
        filename: 'js/[name]-[hash].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'a.html',    
            template: 'index.html',
            inject: false,
            titlename: 'this is a'
        }),
        new htmlWebpackPlugin({
            filename: 'b.html',    
            template: 'index.html',
            inject: false,
            titlename: 'this is b'
        }),
        new htmlWebpackPlugin({
            filename: 'c.html',    
            template: 'index.html',
            inject: false,
            titlename: 'this is c'
        }),
    ]
};
module.exports = config;