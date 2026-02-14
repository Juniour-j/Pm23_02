"use strict";

const { src, dest, watch, series, parallel } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include"); // ← ✅ додали

const paths = {
    html: {
        src: ["app/**/*.html", "!app/**/_*.html", "!app/**/partials/**"],
        dest: "dist/"
    },
    scss: { src: "app/scss/*.scss", dest: "dist/css/" },
    js:   { src: "app/js/**/*.js", dest: "dist/js/" },
    img:  { src: "app/img/**/*.{png,jpg,jpeg,svg,gif,webp}", dest: "dist/img/" },
    bs: {
        css: "node_modules/bootstrap/dist/css/bootstrap.min.css",
        js:  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    },
    htmlWatch: ["app/**/*.html", "app/**/_*.html", "app/**/partials/**/*.html"],

    json: { src: "app/*.json", dest: "dist/" }
};

function json() {
    return src(paths.json.src)
        .pipe(dest(paths.json.dest))
        .pipe(browserSync.stream());
}



function bootstrapCss() {
    return src(paths.bs.css)
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function bootstrapJs() {
    return src(paths.bs.js)
        .pipe(dest(paths.js.dest))
        .pipe(browserSync.stream());
}
// -----------------------------------------------------

function html() {
    return src(paths.html.src)
        .pipe(fileinclude({
            prefix: '@@',          // @@include
            basepath: '@file',     // шукати partials відносно файл
            indent: true, // зберігати відступи(
        }))
        .pipe(rename(p => { p.dirname = ""; }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

function styles() {
    return src(paths.scss.src)
        .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(paths.js.src)
        .pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(paths.js.dest))
        .pipe(browserSync.stream());
}

function images() {
    return src(paths.img.src, {encoding: false})
        .pipe(imagemin())
        .pipe(dest(paths.img.dest));
}

function reload(done) { browserSync.reload(); done(); }

function serve() {
    browserSync.init({ server: { baseDir: "dist" }, open: false, notify: false });

    watch(paths.htmlWatch, html);
    watch("app/scss/**/*.scss", styles);
    watch(paths.js.src, scripts);
    watch(paths.img.src, series(images, reload));

    watch(paths.json.src, json);
}


const build = series(
    parallel(bootstrapCss, bootstrapJs, html, styles, scripts, images, json)
);

exports.bootstrapCss = bootstrapCss;
exports.bootstrapJs  = bootstrapJs;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.json = json;
exports.build = build;
exports.default = series(build, serve);
