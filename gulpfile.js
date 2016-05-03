var gulp = require('gulp');
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
  css: 'src/css/**/*.css', // Will need a rule hear for ignoring partials
  images: 'src/img/**/*'
};


// - - - Tasks - - - //

// cli
gulp.task('build', gulp.series(
  clean,
  gulp.parallel(css, images)
));

// Default
gulp.task('default', gulp.series('build'));


// - - - Functions - - - //

// css
var processors = [
  precss,
  autoprefixer({browsers: ['last 2 versions']}),
  cssnano,
];
function css() {
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
