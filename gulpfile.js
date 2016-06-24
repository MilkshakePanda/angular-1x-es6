// Dependencies

const gulp       = require('gulp')
const browserify = require('browserify')
const source     = require('vinyl-source-stream')
const gutil      = require('gulp-util')
const babelify   = require('babelify')
const browserSync = require('browser-sync')
const uglify     = require('gulp-uglify')
const buffer     = require('vinyl-buffer')
const reload     = browserSync.reload

let bundler = browserify({
    entries: 'assets/js/app.js',
    debug: true
}) .transform(babelify, { presets: ['es2015'] })


let bundleApp = () => {
    
    bundler.bundle()
    // listen for errors (and log them using gutil.log)
    .on('error', gutil.log)
    // then use the source function and pass it the path to the app.js file
    .pipe(source('app.js'))
    // Buffer (dunno why but that's the fix)
    .pipe(buffer())
    // uglify the output
    .pipe(uglify())
    // then gulp.dest it
    .pipe(gulp.dest('public/js/'))
    // finally reload the page
    .pipe(reload({stream: true}))

}


// BrowserSync Task

gulp.task('browser-sync', () => {
    
    browserSync.init({

        server : {
            baseDir: './'
        }
    })
})

// Scripts Task
gulp.task('scripts', () => bundleApp() )

// Watch task 
gulp.task('watch', () => {

    gulp.watch(['assets/js/**/*.js'], ['scripts'])

})

gulp.task('default', ['browser-sync', 'scripts', 'watch'])

