
require('es6-shim');
require('es6-promise');
require('reflect-metadata');
require('rxjs');
require('zone.js');

var testContext = require.context('./test', true, /\.ts/);
var appContext = require.context('./src', true, /\.ts/);

appContext.keys().forEach(appContext);
testContext.keys().forEach(testContext);

var domAdapter = require('angular2/src/platform/browser/browser_adapter');
domAdapter.BrowserDomAdapter.makeCurrent();
