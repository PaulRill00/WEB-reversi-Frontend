const clean = require('./tasks/clean').clean;
const build = require('./tasks/build').build;
const watch = require('./tasks/browserSyncTask').watch;

const start = async function (done) {
    build();
    watch();
    return done();
}

exports.watch = watch;
exports.clean = clean;
exports.default = start;
exports.build = build;