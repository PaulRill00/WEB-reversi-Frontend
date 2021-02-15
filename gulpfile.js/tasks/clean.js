const del = require('del');
const config = require('../config').getConfig();

const clean = () => {
  return del([config.variables.dist]);
}

exports.clean = clean;