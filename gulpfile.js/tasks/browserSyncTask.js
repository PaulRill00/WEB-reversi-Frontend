const gulp = require('gulp');
const browserSync = require('browser-sync');
const build = require('./build');

const config = require('../config').getConfig();

const browserSyncTask = () => {
  return browserSync.init(config.browserSync);
}

const watch = () => {
  browserSyncTask();
  return config.watch.forEach((item) => {
    return gulp.watch(item.from).on('change', () => {
      build[item.task]();
      return browserSync.reload;
    });
  });
}

exports.watch = watch;