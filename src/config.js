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

const port = '7777';

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