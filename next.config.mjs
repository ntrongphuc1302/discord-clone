/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images-ext-1.discordapp.net",
      },
      {
        protocol: "https",
        hostname: "getstream.io",
      },
    ],
  },
};

export default nextConfig;
