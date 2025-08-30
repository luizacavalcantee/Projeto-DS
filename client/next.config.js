/** @type {import('next').NextConfig} */

module.exports = {  
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'standalone',
  
  // Configuração para proxy reverso nginx
  basePath: '/escolaong',
  assetPrefix: '/escolaong',
  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://bora-impactar-dev.setd.rdmapps.com.br/api/:path*',
      },
      // Rewrite para API interna (backend do projeto)
      {
        source: '/api/:path*',
        destination: '/escolaongback/:path*',
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
      },
      // Adicionar hostname da VM para imagens locais
      {
        protocol: 'http',
        hostname: 'vm-cinboraimpactar2.cin.ufpe.br',
        port: '',
        pathname: '/**',
      }
    ],
  },
  
  // Configurações adicionais para proxy reverso
  env: {
    NEXT_PUBLIC_API_BASE_URL: '/escolaongback',
  },
};
