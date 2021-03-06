var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		postcss = require('gulp-postcss'),
		uncss = require('postcss-uncss'),
		rsync         = require('gulp-rsync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './everesttrek-dist/'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function(){
    return gulp.src('src/css/*.css')
    .pipe(concat('everesttrek.css'))
    .pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('everesttrek-dist/css'))
	.pipe(browserSync.stream())
});

gulp.task('uncss', function () {
    var plugins = [
        uncss({
            html: ['everesttrek-dist/*.html']
        }),
    ];
    return gulp.src('everesttrek-dist/css/*.css')
		.pipe(postcss(plugins))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('everesttrek-dist/css'));
});

gulp.task('watch', ['styles', 'browser-sync'], function() {
	gulp.watch('src/css/*.css', ['styles']);
	// gulp.watch('css/*.css', ['uncss']);
	gulp.watch('everesttrek-dist/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
