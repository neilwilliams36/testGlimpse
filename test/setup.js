/**
 * Created by nwilliams on 15/03/2016.
 */
var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
// global.navigator = {useragent: 'node.js'};
global.navigator = global.window.navigator;


Object.keys(window).forEach((key) => {
	if (!(key in global)) {
	global[key] = window[key];
	}
});
