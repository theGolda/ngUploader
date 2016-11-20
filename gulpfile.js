const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const BROWSERSYNC_DELAY = 600;


//nodemon task
gulp.task('nodemon', function (cb) {
  const called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './dist/app.js',

    // watch core server file(s) that require server restart on change
    watch: ['./dist/app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BS_DELAY);
    });
});

//browserSync setup
gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
  });
});

//browserSync reload
gulp.task('bs-reload', function () {
  browserSync.reload();
});

//load dependencies and libraries
gulp.task('setup', function(done) {
	gulp.src([
		'node_modules/angular2/bundles/js',
		'node_modules/angular2/bundles/angular2.*.js*',
		'node_modules/angular2/bundles/http.*.js*',
		'node_modules/angular2/bundles/router.*.js*',
		'node_modules/es6-shim/es6-shim.js*',
		'node_modules/systemjs/dist/*.*',
		'node_modules/@reactivex/rxjs/dist/global/Rx.js'
	]).pipe(gulp.dest('dist/lib'));
});

//move static files to distribution folder
gulp.task('assets', function() {
	gulp.src([
		'./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.css',
		'./src/**/*.js'
	]).pipe(gulp.dest('./dist'));
});

//watch assets and invoke assets task to copy non-typescript files
gulp.task('watch.assets', ['assets'], function() {
	return gulp.watch([
		'./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.css'],
		['assets']);
});

//compile typescript
gulp.task('ts', function(done) {
	const tsResult = gulp.src([
		"node_modules/angular2/bundles/typings/angular2/angular2.d.ts",
		"node_modules/angular2/bundles/typings/angular2/http.d.ts",
		"node_modules/angular2/bundles/typings/angular2/router.d.ts",
		"node_modules/@reactivex/rxjs/dist/es6/Rx.d.ts",
		"src/**/*.ts"			
	])
	.pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
	return tsResult.js.pipe(gulp.dest('dist'));
});

//watch typescript files and invoke ts task
gulp.task('watch.ts', ['ts'], function(){
	return gulp.watch(
		'src/**/*.ts', 
		['ts']);
});

//watch changes in distribution folder to reload page
gulp.task('watch.dist', function(){
	gulp.watch('dist/**');
});

//bundle watchers and invoke with single command
gulp.task('watch', ['watch.assets', 'watch.ts', 'watch.dist']);

gulp.task('default', ['watch']);