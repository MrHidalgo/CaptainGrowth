'use strict';

/* PLUGINS */
const gulp              =   require('gulp')
    , plumber           =   require('gulp-plumber')
    , prefixer          =   require('gulp-autoprefixer')
    , less              =   require('gulp-less')
    , stripCssComments  =   require('gulp-strip-css-comments')
    , sourcemaps        =   require('gulp-sourcemaps')
    , notify            =   require('gulp-notify')
    , cssmin            =   require('gulp-cssmin')
    , rename            =   require('gulp-rename')
    , debug             =   require('gulp-debug')
    , logger            =   require('gulp-logger')
    , changedInPlace    =   require('gulp-changed-in-place');


/* ERROR HANDLER */
const onErrorHandler      =   require('./gulp-onError.js');


/* OPTION */
const plumberOption = {
    errorHandler: onErrorHandler
};
const sassOptions = {
    errLogToConsole : true,
    outputStyle     : 'expanded',
    sourceComments  : true
};
const autoPrefixOptions = {
    browsers: [
        "last 10 versions",
        "> 0.00001%",
        "explorer >= 8",
        "chrome >= 21",
        "firefox esr",
        "opera >= 15",
        "android >= 2.3",
        "safari >= 6.2.6",
        "explorermobile >= 10",
        "ios >= 6",
        "blackberry >= 10"
    ],
    cascade: true
};
const cssMinOption = {
    showLog : true,
    compatibility : 'ie7',
    keepSpecialComments : 1
};
const renameOption = {
    suffix : '.min'
};


exports.styleMainTask = function(taskName) {


    const srcFiles                = './src/less/**.less'
        , distFolderDeveloper     = './Content/'
        , distFolderProduction    = './distProduction/style/';


    return gulp.task(taskName, function() {

        gulp.src(srcFiles)
            .pipe(
                plumber(plumberOption)
            )
			.pipe(
                less()
            )
			.pipe(
			    prefixer(autoPrefixOptions)
            )
            .pipe(
                stripCssComments()
            )
            .pipe(
                changedInPlace({
                    firstPass : true,
                })
            )
            .pipe(
                debug({
                    title: "Change file LESS:"
                })
            )
            .pipe(
                gulp.dest(distFolderDeveloper)
            )
            .pipe(
                cssmin(cssMinOption)
            )
            .pipe(
                rename(renameOption)
            )
            .pipe(
                gulp.dest(distFolderDeveloper)
            )
            //.pipe(
            //    gulp.dest(distFolderProduction)
            //)
	});
};

