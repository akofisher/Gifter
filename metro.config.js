const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Exclude `.svg` from assetExts and include it in sourceExts
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  ext => ext !== 'svg',
);
defaultConfig.resolver.sourceExts.push('svg');

// Add svg transformer
defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer',
);

module.exports = mergeConfig(defaultConfig, {});
