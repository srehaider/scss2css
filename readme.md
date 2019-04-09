# How to use

## Clone Repository
Clone or download repository

## Install dependencies
Open terminal and run
```
npm install
```
to install required dependencies.

## Build for Production
Run
```
npm run build
```
in terminal to convert SCSS to CSS for production. It produces optimized and minified css ready to use for production.

## Build for Development
Run
```
npm start
```
in terminal to convert SCSS to CSS. It produces optimized and unminified css with source maps to see which scss code produced corresponding css in browser dev tools, which ease debuging process. It also enables watch mode which converts SCSS to CSS whenever a change is detected.

## Add your own SCSS to entry point to convert
To add your own SCSS, only you need to add it to `entryPoints` array in `webpack.config.js`.

```
const source = "./scss";  // Absolute or relative path to current directory
const destination = "./css";  // Absolute or relative path to current directory
const entryPoints = [
    "main",
    "another",
    "navbar/style",
]
```

**`source`**: Directory where SCSS files are placed

**`destination`**: Directory where CSS files will be placed after conversion

**`entryPoints`**: Array of SCSS files you want to convert