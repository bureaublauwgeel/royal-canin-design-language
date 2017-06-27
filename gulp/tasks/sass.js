module.exports = function (task, gulp, sitesettings, need, taskObj) {
  'use strict';


  var taskDetails = taskObj[global.process.argv[2]],
    enableSassLint = taskDetails.linting.testSass;

  var location = sitesettings.location;

  var sassOptions = {
    includePaths: ['node_modules/susy/sass', 'node_modules/normalize.css'],
    precision: 3,
    outputStyle: 'expanded'
  };

  var sassOptionsMin = {
    includePaths: ['node_modules/susy/sass', 'node_modules/normalize.css'],
    precision: 3,
    outputStyle: 'compressed'
  };


  var processors = [
    need.stylelint(location.linting.sass),
    need.reporter({
      clearMessages: true,
      throwError: true
    })
  ];

   // outputStyle


  gulp.task('sass', function () {
    return gulp.src(location['stylessrc'] + '/' + location['csssource'])
      .pipe(need.sassGlob())
      //.pipe(need.changed(location['csssource']))
      .pipe(need.gulpif(enableSassLint, need.postcss(processors, {syntax: need.syntax_scss})))
      .pipe(need.sass(sassOptions))
      .pipe(need.rename(location['cssoutput']))
      .pipe(gulp.dest(location['cssdest']))
      .pipe(need.sass(sassOptionsMin))
      .pipe(need.rename(location['cssoutput-min']))
      .pipe(gulp.dest(location['cssdest']))
      .on('end', function () {
        console.log(need.colors.inverse.green('----------- DEV sass files changed -----------'));
      });
  });
};
