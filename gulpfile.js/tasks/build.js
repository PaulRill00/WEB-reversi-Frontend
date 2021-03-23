const { src, dest, parallel } = require('gulp');
const $ = require('gulp-load-plugins')();
const merge = require('merge-stream');
const path = require('path');

const config = require('../config').getConfig();

const compileToDeploy = true;

const html = () => {
  return src(config.html.from)
    .pipe(dest(config.html.to.dist))
}

const css = () => {
  return src(config.css.from)
    .pipe($.sass())
    .pipe($.minifyCss())
    .pipe($.autoprefixer())
    .pipe($.plumber())
    .pipe(dest(config.css.to.dist))
    .pipe($.if(compileToDeploy, dest(config.css.to.deploy)));
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
    .pipe($.if(compileToDeploy, dest(config.js.to.deploy)));
}

const vendor = () => {
  return src(config.vendor.from)
    .pipe($.concat('vendor.js'))
    .pipe(dest(config.vendor.to.dist))
    .pipe($.if(compileToDeploy, dest(config.vendor.to.deploy)));
}

const handlebars = () => {
  const templates = src(config.handlebars.from)
    .pipe($.handlebars())
    .pipe($.wrap('Handlebars.template(<%= contents %>)'))
    .pipe($.declare({
      namespace: 'spa_reversi',
      noRedeclare: true,
      processName: function(filePath) {
        return $.declare.processNameByPath(filePath.replace('<parent_map>/templates/', ''));
      }
    }));

  const partials = src(config.partials.from)
    .pipe($.handlebars())
    .pipe($.wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        imports: {
            processPartialName: function (fileName) {
                return JSON.stringify(path.basename(fileName, '.js').substr(1));
            }
        }
    }));

    return merge(partials, templates)
      .pipe($.concat('templates.js'))
      .pipe(dest(config.handlebars.to.dist))
      .pipe($.if(compileToDeploy, dest(config.handlebars.to.deploy)));
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
exports.build = parallel(html, css, js, vendor, handlebars, webfonts, tests);