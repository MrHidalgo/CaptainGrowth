const gulp = require('gulp')
	, plumber = require('gulp-plumber')
	, rename = require('gulp-rename')
	, uglify = require('gulp-uglify')
	, fixmyjs = require("gulp-fixmyjs")
	, debug = require('gulp-debug')
	, babel = require('gulp-babel')
	, concat = require('gulp-concat')
	, changedInPlace = require('gulp-changed-in-place');


/* ERROR HANDLER */
const onErrorHandler = require('./gulp-onError.js');


/* OPTION */
const plumberOption = {
	errorHandler: onErrorHandler
};
const fixmyjsOption = {
	legacy: true
};
const uglifyOption = {
	compress: true
};
const renameOption = {
	suffix: '.min'
};


exports.internalScriptTask = function (taskName, fileName) {
	
	console.log("fileName: ", fileName);
	
	const srcFiles = './src/js/' + fileName + '.js'
		, srcFilesConcat = './src/js/_template/' + fileName + "/**.js"
		, distFolderDeveloper = './distDeveloper/script/'
		, distFolderProduction = './distProduction/script/';
	
	
	return gulp.task(taskName, function (file) {
		
		gulp.src([srcFilesConcat, srcFiles])
			.pipe(
				plumber(plumberOption)
			)
			.pipe(concat(fileName + ".js"))
			.pipe(babel({
				presets: ['es2015']
			}))
			// .pipe(
			//     fixmyjs(fixmyjsOption)
			// )
			// .pipe(
			//     changedInPlace({
			//         firstPass : true,
			//     })
			// )
			.pipe(
				debug({
					title: "Change file JS:"
				})
			)
			.pipe(
				gulp.dest(distFolderDeveloper)
			)
			.pipe(
				uglify(uglifyOption)
			)
			.pipe(
				rename(renameOption)
			)
			.pipe(
				gulp.dest(distFolderDeveloper)
			)
		//.pipe(
		//    gulp.dest(distFolderProduction)
		//);
	});
};
