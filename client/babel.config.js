module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
        modules: "auto",
      },
    ],
    "@babel/preset-react",
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
