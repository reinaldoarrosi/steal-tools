var winston = require("winston");
var minifyJS = require("../buildTypes/minifyJS");
var minifyCSS = require("../buildTypes/minifyCSS");

module.exports = function(bundle, options) {
	options = options || {};

	if (options.minify) {
		try {
			bundle.source = bundle.buildType === "css" ?
				minifyCSS(bundle.source, options) :
				minifyJS(bundle.source, options);
		}
		catch(e) {
			winston.warn(
				"Error occured while minifying " + bundle.name + "\n" +
				e.message + "\n" +
				"Line: " + e.line + "\n" +
				"Col: " + e.col + "\n" +
				"Pos: " + e.pos
			);

			throw(e);
		}
	}

	return bundle;
};
