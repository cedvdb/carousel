var path = require('path');

module.exports = {
    entry: "./src/js/entry",
    output: {
        path: __dirname,
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.html$/, loader: "html" },
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader'},
            { test: /\.(svg|woff|woff2|ttf|eot)(\?.*$|$)/, loader: 'file-loader'},
        ]
    }
};