'use strict';

const chalk = require(`chalk`);
const {ExitCode} = require(`../enums`);

class ErrorHandler {
  static handleError(error) {
    console.error(chalk.red(error.message));

    process.exit(ExitCode.Error);
  }
}

module.exports = {
  ErrorHandler
};
