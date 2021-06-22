'use strict';

const {CliCommandName} = require(`../../enums`);
const {arrayUtils, fileUtils, numberUtils} = require(`../../utils`);
const {MockPostsMaxCountExceededError} = require(`../../errors`);

// region Constants
const FILE_NAME = `mocks.json`;

const PostsCount = {
  DEFAULT: 1,
  MAX: 1000,
};

// endregion Constants

// region Titles
const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];
// endregion Titles

// region Sentences
const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];
const AnnounceSentencesCountRestriction = {
  MIN: 1,
  MAX: 5
};
const FullTextSentencesCountRestriction = {
  MIN: 1,
  MAX: SENTENCES.length
};
// endregion Sentences

// region CreatedDate
const currentDateMs = Date.now();
const CreatedDateRestriction = {
  MIN: (() => {
    const minDate = new Date(currentDateMs);
    minDate.setMonth(minDate.getMonth() - 3);

    return +minDate;
  })(),
  MAX: currentDateMs,
};
// endregion CreatedDate

// region Categories
const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];
const CategoriesCountRestriction = {
  MIN: 1,
  MAX: CATEGORIES.length
};
// endregion Categories

function generatePosts(count = PostsCount.DEFAULT) {
  if (count > PostsCount.MAX) {
    throw new MockPostsMaxCountExceededError(PostsCount.MAX);
  }

  return Array(count).fill(null).map(() => {
    return {
      title: getRandomItemFromCollection(TITLES),
      createdDate: (() => {
        const date = new Date(getRandomRestrictedNumber(CreatedDateRestriction));
        date.toJSON = () => date.toLocaleString();

        return date;
      })(),
      announce: getRandomItemsFromCollection(SENTENCES, AnnounceSentencesCountRestriction).join(` `),
      fullText: getRandomItemsFromCollection(SENTENCES, FullTextSentencesCountRestriction).join(` `),
      category: getRandomItemsFromCollection(CATEGORIES, CategoriesCountRestriction),
    };
  });
}

function getRandomItemFromCollection(collection) {
  return collection[numberUtils.getRandomInt(0, collection.length - 1)];
}

function getRandomItemsFromCollection(collection, restriction) {
  const count = getRandomRestrictedNumber(restriction);

  return arrayUtils.shuffle(collection).slice(0, count);
}

function getRandomRestrictedNumber(restriction) {
  const {MIN = 0, MAX = MIN} = restriction;

  return numberUtils.getRandomInt(MIN, MAX);
}

module.exports = {
  name: CliCommandName.Generate,
  async run(args = []) {
    const [countArg] = args;

    const count = Number.parseInt(countArg, 10) || PostsCount.DEFAULT;

    const posts = generatePosts(count);
    const content = JSON.stringify(posts, null, `\t`);

    await fileUtils.create(FILE_NAME, content);
  }
};
