'use strict';

class MockPostsMaxCountExceededError extends Error {
  constructor(maxCount) {
    super(`Не больше ${maxCount} публикаций.`);

    this.maxCount = maxCount;
  }
}

class FileGenerationFailedError extends Error {
  constructor(message) {
    super(`Ошибка при записи в файл: ${message}.`);
  }
}

module.exports = {
  FileGenerationFailedError,
  MockPostsMaxCountExceededError
};
