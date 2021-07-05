'use strict';

const chalk = require(`chalk`);
const {CliCommandName} = require(`../../enums`);

const text = `
  Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
`;

module.exports = {
  name: CliCommandName.Help,
  run() {
    console.info(chalk.gray(text));
  }
};
