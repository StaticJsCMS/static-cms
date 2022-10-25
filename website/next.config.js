const withPWA = require('next-pwa')({
  publicExcludes: ['!bulletins/**/*'],
  dest: 'public'
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const redirects = [
  { source: '/chat', destination: 'https://join.slack.com/t/static-cms/shared_invite/zt-1gvgnf5yv-E4sR17YnEcOy6fLFH9m7bQ', permanent: true },
];

/** @type {import('next').NextConfig} */
let config = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return redirects;
  },
}

if (process.env.NODE_ENV === 'production') {
  config = withPWA(config);
} else {
  config = withBundleAnalyzer(config);
}

module.exports = config
