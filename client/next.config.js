/** @type {import('next').NextConfig} */

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://bora-impactar-dev.setd.rdmapps.com.br/api/:path*',
      },
    ];
  },
};