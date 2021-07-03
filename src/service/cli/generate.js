'use strict';

const path = require(`path`);
const {MOCKS_FILE_NAME} = require(`../../constants`);
const {CliCommandName} = require(`../../enums`);
const {arrayUtils, fileUtils, numberUtils, typeUtils} = require(`../../utils`);
const {MockPostsMaxCountExceededError} = require(`../../errors`);

// region Constants
const DATA_DIR_PATH = path.normalize(`${__dirname}/../../data`);
const CATEGORIES_FILE_PATH = path.join(DATA_DIR_PATH, `categories.txt`);
const TITLES_FILE_PATH = path.join(DATA_DIR_PATH, `titles.txt`);
const SENTENCES_FILE_PATH = path.join(DATA_DIR_PATH, `sentences.txt`);

const PostsCount = {
  DEFAULT: 1,
  MAX: 1000,
};

// region Restrictions
const AnnounceSentencesCountRestriction = {
  MIN: 1,
  MAX: 5
};
const FullTextSentencesCountRestriction = {
  MIN: 1,
};

const currentDateMs = Date.now();
const CreatedDateRestriction = {
  MIN: (() => {
    const minDate = new Date(currentDateMs);
    minDate.setMonth(minDate.getMonth() - 3);

    return +minDate;
  })(),
  MAX: currentDateMs,
};

const CategoriesCountRestriction = {
  MIN: 1,
};
// endregion Restrictions
// endregion Constants

// region Utility functions
async function getData() {
  const categoriesPromise = fileUtils.read(CATEGORIES_FILE_PATH);
  const titlesPromise = fileUtils.read(TITLES_FILE_PATH);
  const sentencesPromise = fileUtils.read(SENTENCES_FILE_PATH);

  return Promise.all([categoriesPromise, titlesPromise, sentencesPromise])
    .then(([categories, titles, sentences]) => ({
      categories,
      titles,
      sentences,
    }));
}

function generatePosts(categories, titles, sentences, count = PostsCount.DEFAULT) {
  if (count > PostsCount.MAX) {
    throw new MockPostsMaxCountExceededError(PostsCount.MAX);
  }

  return Array(count).fill(null).map(() => {
    return {
      title: getRandomItemFromCollection(titles),
      createdDate: (() => {
        const date = new Date(getRandomRestrictedNumber(CreatedDateRestriction));
        date.toJSON = () => date.toLocaleString();

        return date;
      })(),
      announce: getRandomItemsFromCollection(sentences, AnnounceSentencesCountRestriction).join(` `),
      fullText: getRandomItemsFromCollection(sentences, FullTextSentencesCountRestriction).join(` `),
      category: getRandomItemsFromCollection(categories, CategoriesCountRestriction),
    };
  });
}

function getRandomItemFromCollection(collection) {
  return collection[numberUtils.getRandomInt(0, collection.length - 1)];
}

function getRandomItemsFromCollection(collection, restriction) {
  const _restriction = {
    MIN: typeUtils.isNullOrUndefined(restriction.MIN) ? 0 : restriction.MIN,
    MAX: typeUtils.isNullOrUndefined(restriction.MAX) ? (collection.length - 1) : restriction.MAX
  };
  const count = getRandomRestrictedNumber(_restriction);

  return arrayUtils.shuffle(collection).slice(0, count);
}

function getRandomRestrictedNumber(restriction) {
  const {MIN, MAX} = restriction;

  return numberUtils.getRandomInt(MIN, MAX);
}
// endregion Utility functions

module.exports = {
  name: CliCommandName.Generate,
  async run(args = []) {
    const [countArg] = args;

    const count = Number.parseInt(countArg, 10) || PostsCount.DEFAULT;

    const {categories, titles, sentences} = await getData();

    const posts = generatePosts(categories, titles, sentences, count);
    const content = JSON.stringify(posts, null, `\t`);

    await fileUtils.create(MOCKS_FILE_NAME, content);
  }
};
