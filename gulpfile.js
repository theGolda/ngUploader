var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var BROWSERSYNC_DELAY = 600;


//nodemon task - necessary for express setup
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'dist/server.js',

    // watch core server file(s) that require server restart on change
    watch: ['dist/server.js']
  })
    .on('start', function() {
      // ensure start only got called once
      if (!called) { 
      	cb(); 
      }
      called = true;
    })
    .on('restart', function() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSERSYNC_DELAY);
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

//compile sass to css task
gulp.task('sass', function() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//compile component's sass
gulp.task('component.sass', function() {
	return gulp.src('./src/app/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/app'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//sass watcher
gulp.task('watch.sass', ['sass'], function() {
	gulp.watch('./src/scss/**/*.scss', ['sass'])
});

//component sass watcher
gulp.task('watch.component.sass', ['component.sass'], function() {
	gulp.watch('./src/app/**/*.scss', ['component.sass'])
});

//files watcher and browser reload
gulp.task('watch.dist', function() {
	gulp.watch([
		'./dist/**'
	], browserSync.reload);
});

//clean task - remove dist folder
gulp.task('clean', function() {
	return del([
		'dist/**/*'
	]);
});

gulp.task("setup", function(){
    return gulp.src([
            'es6-shim/es6-shim.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("dist/lib"));
});



//move static files to distribution folder
gulp.task('assets', function() {
	gulp.src([
		'./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.js',
		'./src/**/*.svg'
	]).pipe(gulp.dest('./dist'));
});

//watch assets and invoke assets task to copy non-typescript files
gulp.task('watch.assets', ['assets'], function() {
	return gulp.watch([
		'./src/**/*.json',
		'./src/**/*.html',
		'./src/**/*.js'],
		['assets']);
});

//compile typescript
gulp.task('ts', function(done) {
	var tsResult = gulp.src([
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

//bundle watchers and invoke with single command
gulp.task('watch', ['watch.assets', 'watch.ts', 'watch.dist', 'watch.sass', 'watch.component.sass']);

gulp.task('default', ['browser-sync', 'watch']);