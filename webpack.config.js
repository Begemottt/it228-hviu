var path = require("path");

module.exports = {
    entry: "./src/index.js", // The main entry file, where you import all the different components to be built
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js" // The name of the output file, to be linked in the HTML
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Look for any file with a .js extension
                exclude: /node_modules/, // Ignore node_modules! Don't want to drawn in EVERYTHING when you don't need it
                use: { // Tells it how to handle the files
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: './css/', name: 'styles.css'}
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: 'index.html'}
                    },
                ],    
            }
        ]
    }
};
