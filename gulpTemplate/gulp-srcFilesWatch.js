const srcWatch = {

	scssFiles : [
        './src/scss/**.scss',
        './src/scss/**/**.scss',
        './src/scss/**/**/**.scss',
        './src/scss/**/**/**/**.scss'
    ],
	lessFiles : [
        './src/less/**.less',
        './src/less/**/**.less',
        './src/less/**/**/**.less',
        './src/less/**/**/**/**.less'
    ],
	jadeFiles : [
        './src/jade/**.jade',
        './src/jade/**/**.jade',
        './src/jade/**/**/**.jade',
        './src/jade/**/**/**/**.jade'
    ],
	jsonFiles : [
        './src/_data/*.json'
    ],
	jsFiles : [
        './src/js/**.js'
    ],
    jsInternalFiles : [
        './src/js/**/**/**.js'
    ],
	iconFiles : [
        './src/icons/**.png'
    ],
	imageFiles : [
        './src/image/*'
    ]
};


module.exports = srcWatch;