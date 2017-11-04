'use strict';

const gulp              =   require('gulp')
    , plumber           =   require('gulp-plumber')
    , data              =   require('gulp-data')
    , jade              =   require('gulp-jade')
    , fs                =   require('fs')
    , glob              =   require('glob')
    , path              =   require('path')
    , foreach           =   require('gulp-foreach')
    , debug             =   require('gulp-debug')
    , changedInPlace    =   require('gulp-changed-in-place');


/* ERROR HANDLER */
const onErrorHandler      =   require('./gulp-onError.js');


/* JSON Templates */
function getJsonData(file, cb) {

    const srcFiles = './src/_data/*.json';

    glob(srcFiles, {}, function(err, files) {

        let data = {};

        if (files.length) {
            files.forEach(function(fPath){

                let baseName = path.basename(fPath, '.json');

                data[baseName] = JSON.parse(fs.readFileSync(fPath));
            });
        }

        cb(undefined, data);
    });
}


/* OPTION */
const plumberOption = {
    errorHandler: onErrorHandler
};
const jadeOption = {
    pretty : true
};


exports.jadeMainTask = function (taskName) {


    const srcFiles              = './src/jade/**.jade'
        , distFolderDeveloper   = './distDeveloper/';


    return gulp.task(taskName, function() {

        gulp.src(srcFiles)
            .pipe(
                plumber(plumberOption)
            )
            .pipe(
                data(getJsonData)
            )
            .pipe(
                jade(jadeOption)
            )
            .pipe(
                changedInPlace({
                    firstPass : true,
                })
            )
            .pipe(
                debug({
                    title: "Change file Jade/Pug:"
                })
            )
            .pipe(
                gulp.dest(distFolderDeveloper)
            );
    })
};