'use strict';

const generate = require(`./generate`);
const help = require(`./help`);
const server = require(`./server`);
const version = require(`./version`);

module.exports = {
  [generate.name]: generate,
  [help.name]: help,
  [server.name]: server,
  [version.name]: version,
};
