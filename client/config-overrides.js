const {override, addBabelPlugin} = require('customize-cra');

module.exports = override(
    addBabelPlugin(['./plugin.js', {rootDir: '/Users/braydonjones/Documents/Projects/broski'}])
);