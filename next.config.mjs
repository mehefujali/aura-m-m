/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      // Apnar baki purono domain-gulo jodi proyojon hoy
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "placehold.co" },
      {
        protocol: "https",
        hostname: "api.nexorzen.com",
      },
    ],
  },
};

export default nextConfig;
