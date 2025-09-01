const { src, dest, watch, series, parallel } = require('gulp');
const cache = require('gulp-cache');
const cp = require('child_process');
const browserSync = require('browser-sync').create();
const { deleteSync } = require('del');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Clean build directory
function clean(done) {
    deleteSync(['_site']);
    done();
}

// Build the Jekyll Site
function jekyllBuild(done) {
    return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
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
        .pipe(browserSync.stream())
        .on('error', function(err) {
            console.error('CSS Error:', err);
            this.emit('end');
        });
}

// Copy JavaScript files
function copyJS() {
    return src('assets/js/**/*.js')
        .pipe(dest('_site/assets/js'))
        .pipe(browserSync.stream())
        .on('error', function(err) {
            console.error('JS Error:', err);
            this.emit('end');
        });
}

// Copy images
function copyImages() {
    return src('assets/img/**/*')
        .pipe(dest('_site/assets/img'))
        .pipe(browserSync.stream())
        .on('error', function(err) {
            console.error('Images Error:', err);
            this.emit('end');
        });
}

// Copy other static files
function copyStatic() {
    return src(['*.html', '*.json', '*.xml', '*.txt'], { 
            allowEmpty: true,
            ignore: ['package*.json'] 
        })
        .pipe(dest('_site'))
        .pipe(browserSync.stream())
        .on('error', function(err) {
            console.error('Static files Error:', err);
            this.emit('end');
        });
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
const build = series(clean, parallel(copyCSS, copyJS, copyImages, copyStatic), jekyllBuild);

// Development task
const dev = series(build, serve, watchFiles);

// Export tasks
exports.clean = clean;
exports.css = copyCSS;
exports.js = copyJS;
exports.images = copyImages;
exports.jekyll = jekyllBuild;
exports.build = build;
exports.watch = watchFiles;
exports.serve = serve;
exports.default = dev;