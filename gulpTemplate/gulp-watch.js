/* NPM PACKAGE */
const gulp          =   require('gulp')
    , watch         =   require('gulp-watch');


/* GULP PATH [module] */
const command       =   require('./gulp-command.js')
    , config        =   require('./gulp-config.js')
    , taskJs        =   require('./gulp-js.js')
    , taskInternalJs =  require('./gulp-internal-js.js')
    , srcWatch      =   require('./gulp-srcFilesWatch');


exports.mainWatchTask = function(taskName) {


    const srcWatchSCSS  = srcWatch.scssFiles
        , srcWatchLESS  = srcWatch.lessFiles
        , srcWatchJADE  = srcWatch.jadeFiles
        , srcWatchJSON  = srcWatch.jsonFiles
        , srcWatchJS    = srcWatch.jsFiles
        , srcWatchInternalJS = srcWatch.jsInternalFiles
        , srcWatchICON  = srcWatch.iconFiles
        , srcWatchIMG   = srcWatch.imageFiles;


    return gulp.task(taskName, function() {

        watch(srcWatchSCSS, function () {
            gulp.start(command.buildScss);
        });

        watch(srcWatchLESS, function () {
            gulp.start(command.buildLess);
        });

        watch(srcWatchJADE, function() {
            gulp.start(command.buildJade);
        });

        watch(srcWatchJS).on("change", function(ev) {

            const strFrom   = ev.lastIndexOf('\\') + 1
                , strTo     = ".js".length,
                fileName    = ev.slice(strFrom, -strTo);

            taskJs.mainScriptTask(command.buildScript, fileName);

            gulp.start(command.buildScript)
        });

        watch(srcWatchInternalJS).on("change", function(ev) {
            
            const fileNameChanged = ev.slice((ev.lastIndexOf('\\') + 1), -(".js".length)),
                pathNameChanged = ev.slice(ev.lastIndexOf('_template') + "_template".length + 1),
                mainFileCompile = pathNameChanged.substring(0, fileNameChanged.length + 3);

            taskInternalJs.internalScriptTask(command.buildInternalScript, mainFileCompile);

            gulp.start(command.buildInternalScript);
        });

        watch(srcWatchJSON, function() {
            gulp.start(command.buildJade);
        });

        watch(srcWatchICON, function() {
            gulp.start(command.sprites)
        });

        watch(srcWatchIMG, function() {
            gulp.start(command.buildImg);
        });
    });
};