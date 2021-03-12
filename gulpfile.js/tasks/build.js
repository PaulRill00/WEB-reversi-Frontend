const { src, dest, parallel } = require('gulp');
const $ = require('gulp-load-plugins')();
var gulpif = require('gulp-if');

const config = require('../config').getConfig();

const compileToDeploy = false;

const html = () => {
  return src(config.html.from)
    .pipe(dest(config.html.to.dist))
    .pipe(gulpif(compileToDeploy, dest(config.html.to.deploy)));
}

const css = () => {
  return src(config.css.from)
    .pipe($.sass())
    .pipe($.minifyCss())
    .pipe($.autoprefixer())
    .pipe($.plumber())
    .pipe(dest(config.css.to.dist))
    .pipe(gulpif(compileToDeploy, dest(config.css.to.deploy)));
}

const js = () => {
  return src(config.js.from)
    .pipe($.order(config.js.order, { base: config.variables.src}))
    .pipe($.concat('app.js'))
    // .pipe($.babel({
    //     presets: ['@babel/preset-env']
    // }))
    // .pipe($.uglifyjs({compress: true}))
    .pipe(dest(config.js.to.dist))
    .pipe(gulpif(compileToDeploy, dest(config.js.to.deploy)));
}

const webfonts = () => {
  return src(config.webfonts.from)
    .pipe(dest(config.webfonts.to));
}

const tests = () => {
  return src(config.tests.from)
    .pipe(dest(config.tests.to));
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.tests = tests;
exports.build = parallel(html, css, js, webfonts, tests);