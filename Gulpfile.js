'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var lr = require('tiny-lr');
var livereload = require('gulp-livereload');
var reloadServer = lr();


// Styles
gulp.task('styles', function () {
  gulp.src('./scss/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload({
      auto: false
    }));
});

// Compile Handlebars templates
gulp.task('templates', function () {
  var templateData = {
    title: 'Frontend Styleguide'
  };

  var options = {
    batch: ['./templates/partials']
  };

  return gulp.src('templates/index.handlebars')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('.'))
    .pipe(livereload({
      auto: false
    }));
});



// index.html live reload
gulp.task('html', function () {
  gulp.src('./index.html')
    .pipe(livereload({
      auto: false
    }));
});

// main.js live reload
gulp.task('js', function () {
  gulp.src('./js/main.js')
    .pipe(livereload({
      auto: false
    }));
});


// Server for development
gulp.task('server', function () {
  var http = require('http');
  var st = require('node-static');
  var opts = {
    cache: false
  };
  var file = new st.Server('./', opts);
  var port = process.env.PORT || 3000;

  http.createServer(function (req, res) {
    file.serve(req, res);
  }).listen(port);

  console.log('App running in http://localhost:%s', port);
});


// Watch files and run some tasks
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./scss/**/*.scss'], ['styles']);
  gulp.watch(['./index.html'], ['html']);
  gulp.watch(['./js/**/*.js'], ['js']);
  gulp.watch(['./templates/**/*.handlebars'], ['templates']);
});

gulp.task('default', ['watch', 'styles', 'templates', 'html', 'server']);
