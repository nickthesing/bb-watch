/**
 * Enable / Disable debug mode
 *
 * @type {Boolean}
 */
const debug = true;

/**
 * Default package name, used for packaging and importing
 *
 * @type {string}
 */
const packageName = 'package.zip';

/**
 * Default portalcontext, application context of the targeted Backbase server
 *
 * @type {string}
 */
const portalContext = 'portalserver';

/**
 * Exclude exententions for watcher
 *
 * @type {array} with {strings}
 */
const excludeExtentions = ['.zip'];

/**
 * Do you want to get notification spam? (its a joke)
 *
 * @type {Boolean}
 */
const notifications = true;

/**
 * Global messages
 *
 * @type {Object}
 */
const messages = {
	"START": "\n\n --- Now watching: " + process.cwd().split('/').pop(),
	"STOPPED": "\n --- Stopped watching...",
	"RESTART": "\n --- File change detected, running again..."
};

/**
 * Port used for import
 *
 * @type {string}
 */
const port = 7777;

/**
 * Welcome message show when watcher is started
 *
 * @type {array}
 */
const welcome = [
	"Hello!",
    "Simple watcher to run bb-package && bb-import.",
    "Have a nice day!"
];

export {
	port,
	debug,
	welcome,
	excludeExtentions,
	messages,
	notifications,
	packageName
}