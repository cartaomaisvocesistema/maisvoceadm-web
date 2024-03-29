/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['partnersimages.s3.amazonaws.com']
  },
  env: {
    BASE_URL_API: 'https://maisvoceapi.cartaomaisvcadm.com.br'
  },
}

module.exports = nextConfig
