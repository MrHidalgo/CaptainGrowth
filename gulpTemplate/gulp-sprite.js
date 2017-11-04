const gulp                =   require('gulp')
    , plumber           =   require('gulp-plumber')
    , spritesmith       =   require('gulp.spritesmith')
    // , imagemin          =   require('gulp-imagemin')
    , pngComp           =   require('imagemin-pngquant')
    , changedInPlace    =   require('gulp-changed-in-place')
    , debug             =   require('gulp-debug')
    , imagemin          =   require('gulp-tinypng');


/* ERROR HANDLER */
const onErrorHandler      =   require('./gulp-onError.js');


/* OPTION */
const plumberOption = {
    errorHandler: onErrorHandler
};


exports.imageSprites = function (taskName) {

    gulp.task(taskName, function() {


        const src               = './src/icons/*.png'
            , spImgPath         = '../image/sprite.png'
            , retinaspImgPath   = '../image/sprite@2x.png'
            , destImg           = './distDeveloper/image/'
            , destCss           = './src/scss/_variable/';


        const spriteData = gulp.src(src)
            .pipe(
                plumber(plumberOption)
            )
            .pipe(
                debug({
                    title: "Change icons for sprite:"
                })
            )
            .pipe(spritesmith(
                {
                    imgName         : 'sprite.png',
                    imgPath         : spImgPath,
                    retinaImgPath   : retinaspImgPath,
                    cssName         : '_sprite.scss',
                    retinaSrcFilter :
                        [
                            './src/icons/*@2x.png'
                        ],
                    retinaImgName   : 'sprite@2x.png',
                    algorithm       : 'binary-tree',
                    padding         : 5,
                    cssVarMap       : function(sprite) {
                        sprite.name = 'sp-' + sprite.name;
                    }
                }
            ));

            spriteData.img.pipe(
                gulp.dest(destImg)
            );

            spriteData.css.pipe(
                gulp.dest(destCss)
            );
    });
};
