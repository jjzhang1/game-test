// next.config.js

const { DefinePlugin } = require("webpack");

const contractAddresses = {
  development: "0x9055222122F974B7E6ac8eaAC952A6B6039d26e1",
  production: "0x9055222122F974B7E6ac8eaAC952A6B6039d26e1",
  test: "0x9055222122F974B7E6ac8eaAC952A6B6039d26e1",
};

module.exports = {
  reactStrictMode: true,
  compress: true,
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new DefinePlugin({
        "process.env.CONTRACT_ADDRESS": JSON.stringify(
          contractAddresses[process.env.NODE_ENV]
        ),
      })
    );

    if (isServer) {
      config.plugins.push(
        new DefinePlugin({
          "process.env.CONTRACT_ADDRESS": JSON.stringify(
            process.env.NODE_ENV === "production"
              ? contractAddresses.production
              : contractAddresses.development
          ),
        })
      );
    }

    return config;
  },
  async rewrites() {
    const env = process.env.NODE_ENV;
    const testUrl = "http://52.77.241.219:8443";
    // const prodUrl = "http://balance.game:8888";
    const prodUrl = "http://52.77.241.219:8443";

    const destination = env === "production" ? prodUrl : testUrl;
    console.log("portttttttttttttt", destination);
    return [
      {
        source: "/api/:path*",
        destination: `${destination}/api/:path*`, // 代理到后端API
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: `
  //           default-src 'self';
  //           script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org;
  //           style-src 'self' 'unsafe-inline';
  //           connect-src 'self' https://config.uca.cloud.unity3d.com https://cdp.cloud.unity3d.com https://cdp.cloud.unity.cn https://game-test-drab.vercel.app;
  //           object-src 'none';
  //         `
  //             .replace(/\s{2,}/g, " ")
  //             .trim(),
  //         },
  //       ],
  //     },
  //   ];
  // },
};
