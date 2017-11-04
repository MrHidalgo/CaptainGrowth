const command    =   require('./gulp-command.js');


const mainConfig = {

	build                       : {
		arr : [
			command.buildScss,
			command.buildLess,
			command.buildJade,
			command.buildScript
		]
	}
};


module.exports.mainConfig = mainConfig;