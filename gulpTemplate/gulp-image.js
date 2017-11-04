const gulp      =   require('gulp')
    , plumber   =   require('gulp-plumber')
    , imagemin  =   require('gulp-tinypng');


/* ERROR HANDLER */
const onErrorHandler      =   require('./gulp-onError.js');


/* OPTION */
const plumberOption = {
    errorHandler: onErrorHandler
};
const tinyPngAPI = 'w2hECd9nCvKWfBj49LZrOPa6Ws7ws8uE';


exports.mainImageTask = function (taskName) {

    const srcFile           = "./src/image/*",
        distFolderDeveloper = "./distDeveloper/image/";

    return gulp.task(taskName, function() {
        gulp.src(srcFile)
            .pipe(
                plumber(plumberOption)
            )
            .pipe(
                imagemin(tinyPngAPI)
            )
            .pipe(
                gulp.dest(distFolderDeveloper)
            );
    });
};
