'use strict';

const console = require('console');

const settings = require('../settings');

class ManagerBase {

  constructor() {
    this.CLASS_NAME = this.constructor.name;
    this.SETTINGS = settings;
    this.method = '()';
  }

  logging(message) {
    console.log(this.CLASS_NAME + '.' + this.method + ': ' + message);
  }

  getUri(path) {
    const uri = this.SETTINGS.API_SERVER + path;
    this.logging('API call uri: ' + uri);
    return uri;
  }

  getArgs(args) {
    for (let key in args) {
      this.logging('* arg: ' + key + ': ' + args[key]);
    }
    return args;
  }

  checkApiCallResult(error, response, body) {
    let success = false;
    if (error) {
      this.logging('Connection error: ', error);
    }
    if (response.statusCode !== 200) {
      this.logging('API does not return 200: ' + response.statusCode);
    }
    if (!body) {
      this.logging('body is empty.');
    }
    else if (!body.status) {
      this.logging('API return [false]');
    }
    else {
      this.logging('API return [true]');
      success = true;
    }

    return success;
  }
}

module.exports = ManagerBase;
