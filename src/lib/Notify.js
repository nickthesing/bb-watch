import chalk from 'chalk';
import printMessage from 'print-message';
import notifier from 'node-notifier';
import path from 'path';
import config from '../config';
import { parseHrtimeToSeconds } from './helpers';

/**
 * Easier way to use console.log
 *
 */
let _log = console.log;

/**
 * Show welcome message in console
 *
 * @return {void}
 */
const welcome = () => {
	// clear out console 
	process.stdout.write('\x1Bc'); 

	// print message to console
	printMessage(config.welcome, {borderColor: 'gray'});
}

/**
 * Log message to console
 *
 * @type {string} what
 */
const log = (what) => {
	_log(what);
}

/**
 * Displays offline message when portalserver is not running
 *
 * @return {void}
 */
const offline = () => {
	welcome();
	log(chalk.red('\n Error: portalserver is not running on localhost:7777.. aborting..\n'));
}

/**
 * Import start message shown when import is started
 *
 * @return {void}
 */
const importStart = () => {
	log(chalk.bold.yellow('\n --- Starting Import:'));
}

/**
 * Import end message shown when import is done
 *
 * @return {void}
 */
const importEnd = (packageTime, importTime) => {
	let packageTimeInSeconds = parseHrtimeToSeconds(process.hrtime(packageTime));
	let importTimeInSeconds = parseHrtimeToSeconds(process.hrtime(importTime));

	let msg = `\u00A0[Package: ${packageTimeInSeconds}s & Import: ${importTimeInSeconds}s]`;
	log(chalk.bold.yellow('--- Done Importing') + chalk.bold.black(msg));
}

/**
 * Logs error message in red
 *
 * @type {string} msg
 */
const error = (msg) => {
	msg = '\n--- Backbase Watcher Error: ' + msg;
	_log(chalk.red(msg));
}

/**
 * Start message when watcher is watching
 *
 * @return {void}
 */
const start = () => {
	_log(chalk.bold.green(config.messages.START));
}	

/**
 * Message when watcher detecs a change
 *
 * @return {void}
 */
const changed = (fileName) => {
	_log(chalk.bold.yellow(config.messages.RESTART), chalk.bold.black(`[${fileName.split('/').pop()}]`));
}

/**
 * Notify function to show desktop notification
 *
 * @type {what}
 */
const notify = (msg, type = 'success') => {
	notifier.notify({
		title: 'Backbase Watch',
		message: msg,
		icon: path.join(__dirname, '../../icons/' + (type === 'success') ? 'fail.png' : 'pass.png')
	});
}

module.exports = {
	welcome,
	offline,
	importStart,
	importEnd,
	notify,
	log,
	start,
	changed,
	error
};