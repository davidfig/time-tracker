/* Copyright (c) 2020 David Figatner */

const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

const outDir = 'dist'

// bundles client/index.js (and its css) into dist/ and rebuilds on change
module.exports = async function parcel()
{
    fs.mkdirSync(outDir, { recursive: true })
    fs.copyFileSync(path.join('client', 'index.html'), path.join(outDir, 'index.html'))
    const context = await esbuild.context({
        entryPoints: [path.join('client', 'index.js')],
        bundle: true,
        sourcemap: true,
        outdir: outDir,
        logLevel: 'info',
    })
    await context.watch()
}
