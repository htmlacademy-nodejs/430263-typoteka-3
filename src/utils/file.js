'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {FileGenerationFailedError} = require(`../errors`);

module.exports.create = async (filePath, content) => {
  const fileName = path.basename(filePath);

  try {
    await fs.writeFile(filePath, content);

    console.info(chalk.green(`Файл ${fileName} сформирован.`));
  } catch (error) {
    throw new FileGenerationFailedError(fileName, error.message);
  }
};
