const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 使用happypack
const HappyPack = require('happypack');
const os = require('os');
const path = require('path');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
    entry: './src/musicPlayer/index.vue',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                cache: true, // 开启缓存
                parallel: true, // 允许并发
                sourceMap: false, // set to true if you want JS source maps
            }),
        ],
    },
    module: {
        rules: [
            // 处理js
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
                //排除node_modules 目录下的文件
                exclude: /node_modules/,
            },
            // 处理vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            // 处理字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HappyPack({
            //用id来标识 happypack处理类文件
            id: 'happyBabel',
            //如何处理 用法和loader 的配置一样
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory=true',
                },
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        },
    },
    output: {
        filename: 'vue-mplayer.js',
        path: path.resolve(__dirname, '../lib'),
        libraryTarget: 'commonjs2'
    },
    mode: 'production'
}
