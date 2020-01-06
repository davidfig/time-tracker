/* Copyright (c) 2020 David Figatner */

const Bundler = require('parcel-bundler')
const path = require('path')

const entryFiles = path.join('client', 'index.html')

const options = {
  outDir: 'dist', // The out directory to put the build files in, defaults to dist
  outFile: 'index.html', // The name of the outputFile
  publicUrl: './', // The url to serve on, defaults to '/'
  watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: true, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
//   global: 'moduleName', // Expose modules as UMD under this name, disabled by default
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
//   target: 'browser', // Browser/node/electron, defaults to browser
//   bundleNodeModules: false, // By default, package.json dependencies are not included when using 'node' or 'electron' with 'target' option above. Set to true to adds them to the bundle, false by default
//   https: { // Define a custom {key, cert} pair, use true to generate one or false to use http
//     cert: './ssl/c.crt', // Path to custom certificate
//     key: './ssl/k.key' // Path to custom key
//   },
//   logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
  hmr: false, // Enable or disable HMR while watching
//   hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
//   hmrHostname: '', // A hostname for hot module reload, default to ''
//   detailedReport: false, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: false // Enable or disable auto install of missing dependencies found during bundling
}

module.exports = function parcel()
{
    const bundler = new Bundler(entryFiles, options)
    bundler.bundle()
}