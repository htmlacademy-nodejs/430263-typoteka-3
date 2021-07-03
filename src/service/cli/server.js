'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const http = require(`http`);
const {DEFAULT_PORT, MOCKS_FILE_NAME, NOT_FOUND_TEMPLATE} = require(`../../constants`);
const {CliCommandName, HttpResponseCode} = require(`../../enums`);
const {ServerError} = require(`../../errors`);
const {templateUtils} = require(`../../utils`);

async function onClientConnect(req, res) {
  try {
    switch (req.url) {
      case `/`:
        const posts = await getPosts();
        const postsTemplate = getPostsTemplate(posts);

        sendResponse(res, HttpResponseCode.Success, postsTemplate);

        break;
      default:
        sendResponse(res, HttpResponseCode.NotFound, NOT_FOUND_TEMPLATE);
    }
  } catch (error) {
    sendResponse(res, HttpResponseCode.NotFound, NOT_FOUND_TEMPLATE);
  }
}

async function getPosts() {
  const fileContent = await fs.readFile(MOCKS_FILE_NAME);
  const posts = JSON.parse(fileContent);

  return posts;
}

function getPostsTemplate(posts) {
  return `
    <ul>
      ${posts.map((post) => `<li>${post.title}</li>`).join(`\n`)}
    </ul>
  `;
}

function sendResponse(res, code, content) {
  res.writeHead(code, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(templateUtils.getPageTemplate(content));
}

module.exports = {
  name: CliCommandName.Server,
  run(args) {
    const [portArg] = args;

    const port = Number.parseInt(portArg, 10) || DEFAULT_PORT;

    http.createServer((req, res) => onClientConnect(req, res))
      .listen(port)
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на порт ${port}...`));
      })
      .on(`error`, ({message}) => {
        throw new ServerError(message);
      });
  },
};
