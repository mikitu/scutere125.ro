const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure Metro only looks in the mobile-app directory, not the monorepo root
config.watchFolders = [projectRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

// Block access to parent node_modules
config.resolver.blockList = [
  // Block pnpm node_modules from root
  /.*\/node_modules\/\.pnpm\/.*/,
  // Block root node_modules
  new RegExp(`${path.resolve(projectRoot, '../..')}/node_modules/.*`),
];

module.exports = config;

