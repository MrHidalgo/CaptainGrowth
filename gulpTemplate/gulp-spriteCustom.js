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


exports.imageSpritesCustom = function (taskName) {


    const imgPathName = process.argv[4],
        spName = process.argv[6];


    gulp.task(taskName, function() {


        const src               = './src/' + imgPathName + '/*.png'
            , spImgPath         = '../image/sprite' + spName + '.png'
            , retinaspImgPath   = '../image/sprite' + spName + '@2x.png'
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
                    imgName         : 'sprite' + spName + '.png',
                    imgPath         : spImgPath,
                    retinaImgPath   : retinaspImgPath,
                    cssName         : '_sprite' + spName + '.scss',
                    retinaSrcFilter :
                        [
                            './src/' + imgPathName + '/*@2x.png'
                        ],
                    retinaImgName   : 'sprite' + spName + '@2x.png',
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
