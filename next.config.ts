import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enforce type & lint checks during CI/build so issues are caught early
  typescript: {
    // Fail builds on TypeScript errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Fail builds on ESLint issues
    ignoreDuringBuilds: false,
  },

  // Security headers for all responses. Keep conservative to avoid
  // breaking client-side behavior; add a more strict CSP later with
  // nonce-based injection or via middleware when ready.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'Content-Security-Policy',
            // A reasonably strict, but still compatible default policy.
            // Consider tightening this further (removing 'unsafe-inline', adding nonces)
            // after testing in staging.
            value:
              "default-src 'self'; img-src 'self' data: https:; connect-src 'self' https: wss:; script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https:; font-src 'self' https:; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
