/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pump-app.s3.eu-west-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
