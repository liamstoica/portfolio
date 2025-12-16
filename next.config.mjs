/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/work/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
















