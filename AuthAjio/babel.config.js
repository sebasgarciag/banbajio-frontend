module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // o tu preset específico si no usas Expo
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env.local",
        },
      ],
    ],
  };
};
