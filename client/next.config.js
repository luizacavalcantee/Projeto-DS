/** @type {import('next').NextConfig} */

module.exports = {  
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'standalone',
  basePath: '/escolaong',
  assetPrefix: '/escolaong',
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://bora-impactar-dev.setd.rdmapps.com.br/api/:path*',
      },
      // {
      //   source: '/escolaong/:path*',
      //   destination: '/:path*'
      // }
    ];
  },

  images: {
    path:'/escolaong/_next/image',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bora-impactar-dev.setd.rdmapps.com.br',
        port: '',
        pathname: '/rails/active_storage/**', 
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
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fake-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};
