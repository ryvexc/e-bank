/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css')
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  }
}

module.exports =
  nextConfig,
  withCSS()
