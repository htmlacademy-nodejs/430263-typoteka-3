'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {FileContentReadingFailedError, FileGenerationFailedError} = require(`../errors`);

module.exports.create = async (filePath, content) => {
  const fileName = path.basename(filePath);

  try {
    await fs.writeFile(filePath, content);

    console.info(chalk.green(`Файл ${fileName} сформирован.`));
  } catch (error) {
    throw new FileGenerationFailedError(fileName, error.message);
  }
};

module.exports.read = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    return content.split(`\n`).filter((line) => line);
  } catch (error) {
    const fileName = path.basename(filePath);

    throw new FileContentReadingFailedError(fileName, error.message);
  }
};
