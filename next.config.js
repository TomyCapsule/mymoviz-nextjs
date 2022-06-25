/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}



module.exports = {
  reactStrictMode: true,
  env: {
    MOVIEDB_KEY: process.env.MOVIEDB_KEY
  }
}
