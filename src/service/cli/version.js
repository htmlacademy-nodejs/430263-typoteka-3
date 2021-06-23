'use strict';

const chalk = require(`chalk`);
const {CliCommandName} = require(`../../enums`);
const packageJsonFile = require(`../../../package.json`);

const version = packageJsonFile.version;

module.exports = {
  name: CliCommandName.Version,
  async run() {
    console.info(chalk.blue(version));
  }
};
