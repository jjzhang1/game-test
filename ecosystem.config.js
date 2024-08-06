module.exports = {
  apps: [
    {
      name: "savvy-game",
      script: "yarn dev",
      args: "",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
