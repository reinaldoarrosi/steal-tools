
/**
 * Adds node to bundle to preload npm packages for dev bundles
 *
 * @param {{}} bundle The bundle to be mutated
 * @param {{}} npmContext The context containing the npm packages loaded
 */
module.exports = function(bundle, npmContext) {
	var unshift = [].unshift;

	unshift.apply(bundle.nodes, [
		makeAddNpmPackagesNode(npmContext)
	]);
};

function makeAddNpmPackagesNode(npmContext) {
	var packages = npmContext.packages || [];

	return {
		deps: [],
		load: {
			name: "[steal-add-npm-packages]",
			metadata: {
				format: "global"
			},
			source: [
				"if (steal && typeof steal.addNpmPackages === 'function') {",
				"steal.addNpmPackages(" + JSON.stringify(packages) + ");",
				"}"
			].join(" ")
		}
	};
}
