const { src, dest, parallel } = require('gulp');
const $ = require('gulp-load-plugins')();

const config = require('../config').getConfig();

const html = () => {
  return src(config.html.from)
    .pipe(dest(config.html.to.dist))
    .pipe(dest(config.html.to.deploy));
}

const css = () => {
  return src(config.css.from)
    .pipe($.sass())
    .pipe($.minifyCss())
    .pipe($.autoprefixer())
    .pipe(dest(config.css.to.dist))
    .pipe(dest(config.css.to.deploy));
}

const js = () => {
  return src(config.js.from)
    .pipe($.order(config.js.order, { base: config.variables.src}))
    .pipe($.concat('app.js'))
    .pipe(dest(config.js.to.dist))
    .pipe(dest(config.js.to.deploy));
}

const tests = () => {
  return src(config.tests.from)
    .pipe(dest(config.tests.to));
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.tests = tests;
exports.build = parallel(html, css, js, tests);