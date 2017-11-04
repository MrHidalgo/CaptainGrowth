/* NPM PACKAGE */
const gulp          =   require('gulp')
    , browserSync   =   require('browser-sync').create()
    , del           =   require('del')
    , watch         =   require('gulp-watch');


/* GULP PATH [module] */
const command           =   require('./gulpTemplate/gulp-command.js')
    , taskScss          =   require('./gulpTemplate/gulp-scss.js')
    , taskLess          =   require('./gulpTemplate/gulp-less.js')
    , taskJade          =   require('./gulpTemplate/gulp-jade.js')
    , taskSprite        =   require('./gulpTemplate/gulp-sprite.js')
    , taskSpriteCustom  =   require('./gulpTemplate/gulp-spriteCustom')
    , taskImage         =   require('./gulpTemplate/gulp-image.js')
    , taskWatch         =   require('./gulpTemplate/gulp-watch.js');


/* MAIN TASK */
taskJade.jadeMainTask(command.buildJade);
taskScss.styleMainTask(command.buildScss);
taskLess.styleMainTask(command.buildLess);
taskSprite.imageSprites(command.sprites);
taskImage.mainImageTask(command.buildImg);


/* WATCH FILES FOR RELOAD ---> 'GULP WATCH'*/
taskWatch.mainWatchTask(command.watch);


/*
    CUSTOM SPRITE
    gulp spriteCustom --path spriteError --name -error
*/
taskSpriteCustom.imageSpritesCustom(command.spritesCustom);


/* BROWSER SYNC */
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./distDeveloper/"
            , index: "login.html"
        }
        , middleware: function(req,res,next) {
            if (req.url === '/register') {
                req.url = './register.html';
            } else if (req.url === '/confirm') {
                req.url = '/confirm.html';
            } else if (req.url === '/login') {
                req.url = '/login.html';
            }
            return next();
        }
        , tunnel      : "test"
        , online      : true
        , notify      : true
        , port        : 1234
        , logPrefix   : 'FrontEnd Server'
    });
});
