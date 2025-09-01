const { src, dest, watch, series, parallel } = require('gulp');
const cache = require('gulp-cache');
const cp = require('child_process');
const browserSync = require('browser-sync').create();

const jekyll = process.platform === 'win32' ? 'bundle.bat' : 'bundle';

// Build the Jekyll Site
function jekyllBuild(done) {
    return cp.spawn(jekyll, ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
        .on('close', (code) => {
            if (code === 0) {
                done();
            } else {
                console.warn(`Jekyll build failed with code ${code}. This might be expected if Jekyll is not installed.`);
                done();
            }
        })
        .on('error', (error) => {
            console.warn('Jekyll not found. Skipping Jekyll build. Error:', error.message);
            done();
        });
}

// Copy CSS files
function copyCSS() {
    return src('assets/css/**/*.css')
        .pipe(dest('_site/assets/css'))
        .pipe(browserSync.stream());
}

// Copy JavaScript files
function copyJS() {
    return src('assets/js/**/*.js')
        .pipe(dest('_site/assets/js'))
        .pipe(browserSync.stream());
}

// Copy images
function copyImages() {
    return src('assets/img/**/*')
        .pipe(dest('_site/assets/img'))
        .pipe(browserSync.stream());
}

// Copy other static files
function copyStatic() {
    return src(['*.html', '*.json', '*.xml', '*.txt'], { allowEmpty: true })
        .pipe(dest('_site'))
        .pipe(browserSync.stream());
}

// Start BrowserSync server
function serve(done) {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        notify: false,
        open: false
    });
    done();
}

// Reload browser
function reload(done) {
    browserSync.reload();
    done();
}

// Watch files for changes
function watchFiles() {
    watch('assets/css/**/*.css', copyCSS);
    watch('assets/js/**/*.js', copyJS);
    watch('assets/img/**/*', copyImages);
    watch(['*.html', '*.json', '*.xml', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], series(jekyllBuild, reload));
}

// Build task
const build = series(parallel(copyCSS, copyJS, copyImages, copyStatic), jekyllBuild);

// Development task
const dev = series(build, serve, watchFiles);

// Export tasks
exports.css = copyCSS;
exports.js = copyJS;
exports.images = copyImages;
exports.jekyll = jekyllBuild;
exports.build = build;
exports.watch = watchFiles;
exports.serve = serve;
exports.default = dev;