'use strict';

/* PLUGINS */
const gulp              =   require('gulp')
    , plumber           =   require('gulp-plumber')
    , prefixer          =   require('gulp-autoprefixer')
    , scss              =   require('gulp-sass')
    , stripCssComments  =   require('gulp-strip-css-comments')
    , sourcemaps        =   require('gulp-sourcemaps')
    , notify            =   require('gulp-notify')
    , cssmin            =   require('gulp-cssmin')
    , rename            =   require('gulp-rename')
    , debug             =   require('gulp-debug')
    , logger            =   require('gulp-logger')
    , changedInPlace    =   require('gulp-changed-in-place');


/* ERROR HANDLER */
const onErrorHandler    =   require('./gulp-onError.js');


/* OPTION */
const plumberOption = {
    errorHandler: onErrorHandler
};
const sassOptions = {
    errLogToConsole     : true
    , outputStyle       : 'compact'
    , sourceComments    : true
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
    showLog : true
    , compatibility : 'ie7'
    , keepSpecialComments : 1
};
const renameOption = {
    suffix : '.min'
};

/* outputStyle : [expanded, compact, nested, compressed] */
exports.styleMainTask = function(taskName) {


    const srcFiles              = './src/scss/**.scss'
        , distFolderDeveloper   = './distDeveloper/style/'
        , distFolderProduction  = './distProduction/style/';


    return gulp.task(taskName, function() {

        gulp.src(srcFiles)
            .pipe(
                plumber(plumberOption)
            )
			.pipe(
			    scss(sassOptions).on('error', scss.logError)
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
                    title: "Change file SCSS/SASS:"
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

