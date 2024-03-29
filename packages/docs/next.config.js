const withPWA = require('next-pwa')({
  publicExcludes: ['!bulletins/**/*'],
  dest: 'public',
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const redirects = [
  { source: '/docs', destination: '/docs/intro', permanent: true },
];

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return redirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/badge/**',
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config = withPWA(config);
} else {
  config = withBundleAnalyzer(config);
}

module.exports = config;
