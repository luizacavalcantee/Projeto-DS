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

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
            {
        protocol: 'https',
        hostname: 'exemplo.com',
        port: '',
        pathname: '/**',
      }

    ],
  },
};
