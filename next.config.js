const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        port: "",
        pathname: "/user-default-pictures-uv/*",
      },
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        port: "",
        pathname: "/jtv_user_pictures/*",
      },
      {
        protocol: "https",
        hostname: "s.namemc.com",
        port: "",
        pathname: "/2d/skin/face.png",
      },
      {
        protocol: "https",
        hostname: "s.namemc.com",
        port: "",
        pathname: "/i/*.png",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
