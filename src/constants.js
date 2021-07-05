'use strict';

const {CliCommandName} = require(`./enums`);

module.exports = {
  DEFAULT_COMMAND_NAME: CliCommandName.Help,
  DEFAULT_PORT: 3000,
  MOCKS_FILE_NAME: `mocks.json`,
  NOT_FOUND_TEMPLATE: `<h1>Страница не найдена</h1>`,
  PAGE_TITLE: `Типотека`,
  USER_ARGV_INDEX: 2,
};
