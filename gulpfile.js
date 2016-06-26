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
const sass       = require("gulp-sass")


let bundler = browserify({
    entries: 'assets/js/app.js',
    debug: true
}) .transform(babelify, { presets: ['es2015', 'react'] })


let bundleApp = () => {
    
    bundler.bundle()
    // listen for errors (and log them using gutil.log)
    .on('error', gutil.log)
    // then use the source function and pass it the path to the app.js file
    .pipe(source('app.js'))
    // Buffer (dunno why but that's the fix)
    .pipe(buffer())
    // uglify the output
    .pipe(gutil.env.type === "production" ? uglify() : gutil.noop())
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

gulp.task("sass", () => {

    return gulp.src("./assets/sass/main.sass")
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['assets/sass/']
    }).on('error', sass.logError))
    .pipe(gulp.dest("./public/css"))
    .pipe(reload({stream: true}))

})

// Scripts Task
gulp.task('scripts', () => bundleApp() )

// Watch task 
gulp.task('watch', () => {

    gulp.watch(['assets/js/**/*.js'], ['scripts'])
    gulp.watch(['assets/sass/**/*.sass'], ['sass'])

})

gulp.task('default', ['browser-sync', 'scripts', 'sass','watch'])

