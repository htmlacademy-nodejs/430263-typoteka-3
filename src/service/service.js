'use strict';

const {DEFAULT_COMMAND_NAME} = require(`../constants`);
const {cliUtils, errorUtils} = require(`../utils`);
const cli = require(`./cli`);

const userArgs = cliUtils.getUserArgs();

const [commandArg] = userArgs;
const command = cliUtils.parseUserCommand(commandArg);

const commandArgs = userArgs.slice(1);
const commandName = command && cli[command] ? command : DEFAULT_COMMAND_NAME;

runCommand(commandName, commandArgs)
  .catch((error) => errorUtils.ErrorHandler.handleError(error));

async function runCommand(name, args) {
  return await cli[name].run(args);
}
