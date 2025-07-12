module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
     'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@services': './src/services',
          '@redux': './src/redux',
          '@navigations': './src/navigations',
          '@theme': './src/theme',
          '@helper': './src/helper',
        },
      },
    ],
  ],
};
