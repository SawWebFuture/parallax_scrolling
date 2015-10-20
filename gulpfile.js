//Parallax Scrolling

var gulp = require ('gulp'),
	gutil = require ('gulp-util'),
	compass = require ('gulp-compass'),
	gulpif = require ('gulp-if'),
	minifyHTML = require ('gulp-minify-html'),
	imagemin = require ('gulp-imagemin'),
	pngcrush = require ('imagemin-pngcrush'),
	connect = require ('gulp-connect'),
	concat = require('gulp-concat');

//var outputDir = 'site/production/';
//var cssStyle = 'compressed';
var outputDir = 'site/development/';
var cssStyle = 'expanded';

var sassSources = ['components/sass/styles.sass'];
var htmlSources = [outputDir + '*.html'];
var cssSources = [outputDir + 'css'];
var jsSources = ['components/scripts/script.js'];

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			css: outputDir + 'css',
			sass: 'components/sass',
			image: outputDir + 'images',
			style: cssStyle
		}))
		.pipe(gulp.dest(outputDir + 'css'))
		.on('error', gutil.log)
		.pipe(connect.reload())
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('html', function(){
	gulp.src('site/development/*.html')
		.pipe(gulpif(outputDir === 'site/production/', minifyHTML()))
		.pipe(gulpif(outputDir === 'site/production/', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('images', function(){
	gulp.src('site/development/images/**/*.*')
		.pipe(gulpif(outputDir === 'site/production/', imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false}],
			use: [pngcrush()]
		})))
		.pipe(gulpif(outputDir === 'site/production/', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('components/sass/*.sass', ['compass']);
	gulp.watch(cssSources, ['connect']);
	gulp.watch('site/development/*.html', ['html']);
	gulp.watch('site/development/images/**/*.*', ['images']);
	gulp.watch(jsSources, ['js']);
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});


gulp.task('default', ['compass', 'html', 'images', 'watch', 'connect', 'js']);