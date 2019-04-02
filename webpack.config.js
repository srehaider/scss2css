const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");


const source = "./scss";  // Complete or relative path to current directory
const destination = "./css";  // Complete or relative path to current directory
const entryPoints = [
    "main",
    "another",
    "navbar/style",
]

module.exports = (env, argv) => {

    const conf = {
        entry: entryPoints.reduce((entries, name) => {
            entries[name] = path.resolve(__dirname, source, `${name}.scss`)
            return entries
        }, {}),
        devtool: false,
        output: {
            path: path.resolve(__dirname, destination),
            filename: "[name].min.js"
        },
        module: {
            rules: [
                {
                    test: /\.s[ca]ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                url: false,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                url: false,
                                sourceMap: true,
                                plugins: () => [
                                    require("autoprefixer")({
                                        "browsers": ["> 1%", "last 2 versions"]
                                    }),
                                    require("css-mqpacker")(),
                                    require("postcss-merge-selectors")(),
                                ],
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                url: false,
                                sourceMap: true,
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin({ silent: true }),
            new MiniCssExtractPlugin({
                filename: "./[name].css",
                chunkFilename: "[id].css"
            })
        ],
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({})
            ]
        },
    }

    return conf;
}