'use strict';

const {PAGE_TITLE} = require(`../constants`);

module.exports.getPageTemplate = (bodyTemplate, title = PAGE_TITLE) => {
  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
          <title>${title.trim()}</title>
      </head>
      <body>
          ${bodyTemplate.trim()}
      </body>
    </html>
  `.trim();
};
