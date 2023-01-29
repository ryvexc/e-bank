/** @type {import('next').NextConfig} */
const withCSS = require('@zeit/next-css')

const nextConfig = {
  reactStrictMode: true,
}

module.exports = 
  nextConfig,
  withCSS()
