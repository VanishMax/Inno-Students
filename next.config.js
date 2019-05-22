const withCSS = require('@zeit/next-css')
const withBabelMinify = require('next-babel-minify')()
const withPurgeCss = require('next-purgecss')

module.exports = withBabelMinify(withCSS(withPurgeCss()))
