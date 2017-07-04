const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const watchify = require("watchify");
const gutil = require("gulp-util");
const webserver = require('gulp-webserver');

const w = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ["src/app.js"],
    cache: {},
    packageCache: {},
    noParse: ["easeljs"]
}));

gulp.task("webserver", function () {
    return gulp.src("export")
        .pipe(webserver({
            livereload: true,
            fallback: "index.html"
        }));
})

function bundle() {
    return w.bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("export"));
}

gulp.task("bundleJS", bundle);

gulp.task("default", ["bundleJS", "webserver"]);
w.on("update", bundle);
w.on("log", gutil.log);