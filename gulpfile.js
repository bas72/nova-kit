var gulp = require('gulp');
// html
var pug          = require('gulp-pug');
var data         = require('gulp-data');
// css
var postcss      = require('gulp-postcss');
var precss       = require('precss');
var autoprefixer = require('autoprefixer')
var cssnano      = require('cssnano');
// Images
var imagemin     = require('gulp-imagemin');
// Clean
var del          = require('del');



// - - - Paths - - - //
var paths = {
  html: 'src/html/**/*.pug',
  css: 'src/css/**/*.css', // Will need a rule hear for ignoring partials
  images: 'src/img/**/*'
};


// - - - Tasks - - - //

// cli
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(template, styles, images)
));

// Default
gulp.task('default', gulp.series('build'));


// - - - Functions - - - //

// html
function template () {
  return gulp.src(paths.html)
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('build'))
};

// css
var processors = [
  precss,
  autoprefixer({browsers: ['last 2 versions']}),
  cssnano,
];
function styles() {
  return gulp.src(paths.css)
    .pipe(postcss(processors))
    .pipe(gulp.dest('build/css'));
};

// Images
function images() {
  return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'))
};

// Clean
function clean(done) {
  return del(['build/**/*'], done)
};
