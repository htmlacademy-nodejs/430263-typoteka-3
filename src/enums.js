'use strict';

const CliCommandName = {
  Generate: `generate`,
  Help: `help`,
  Server: `server`,
  Version: `version`,
};

const ExitCode = {
  Error: 1,
  Success: 0,
};

const HttpResponseCode = {
  NotFound: 404,
  Success: 200,
};

module.exports = {
  CliCommandName,
  ExitCode,
  HttpResponseCode,
};
