'use strict';

class MockPostsMaxCountExceededError extends Error {
  constructor(maxCount) {
    super(`Не больше ${maxCount} публикаций.`);

    this.maxCount = maxCount;
  }
}

class FileGenerationFailedError extends Error {
  constructor(fileName, message) {
    super(`Ошибка при записи в файл '${fileName}': ${message}.`);

    this.fileName = fileName;
  }
}

class FileContentReadingFailedError extends Error {
  constructor(fileName, message) {
    super(`Ошибка при чтении файла '${fileName}': ${message}.`);

    this.fileName = fileName;
  }
}

module.exports = {
  FileContentReadingFailedError,
  FileGenerationFailedError,
  MockPostsMaxCountExceededError
};
