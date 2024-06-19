/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'my-blob-store.public.blob.vercel-storage.com',
            port: '',
          },
        ],
    },
    experimental: {
      instrumentationHook: true
    }
};

export default nextConfig;