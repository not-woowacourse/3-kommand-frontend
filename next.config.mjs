/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    const API_URL = 'https://not-woowacourse-api.yopark.dev';

    return [
      {
        source: '/backend-api/:path*',
        destination: `${API_URL}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/:path*`,
      },
    ];
  },
  basePath:
    process.env.NEXT_PUBLIC_DEFAULT_PATHNAME === '/'
      ? ''
      : process.env.NEXT_PUBLIC_DEFAULT_PATHNAME,
};

export default nextConfig;
