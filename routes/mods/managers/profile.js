'use strict';

const apiCaller = require('request');

const ManagerBase = require('./base');


const PULL_API_PATH = '/api/v1/getMainInfo';
const PUSH_API_PATH = '/api/v1/updateProfile';

class ProfileManager extends ManagerBase {

  constructor() {
    super();
    this.profile = null;
  }

  fetch(caller, jwt, postprocess) {
    this.method = 'fetch';

    const uri = this.getUri(PULL_API_PATH);
    const args = this.getArgs({
      caller: caller,
      jwt: jwt
    });

    apiCaller({
      method: 'POST',
      uri: uri,
      json: args
    }, (error, response, body) => {
      if (!this.checkApiCallResult(error, response, body)) {
        this.logging('Failed to call API: ' + uri);
      }
      if (!body.result) {
        this.logging('Fatal: body.result is empty.');
      }
      else {
        this.logging('succeeded.');
        this.profile = body;
      }
      postprocess(this.profile);
    });
  }

  push(caller, jwt, postprocess) {
    this.method = 'push';

    const uri = this.getUri(PUSH_API_PATH);
    const args = this.getArgs({
      caller: caller,
      jwt: jwt,
      profile: this.profile,
    });

    apiCaller({
      method: 'POST',
      uri: uri,
      json: args
    }, (error, response, body) => {
      let success = false;
      if (!this.checkApiCallResult(error, response, body)) {
        this.logging('Failed to call API: ' + uri);
      }
      else {
        success = true;
      }
      postprocess(success);
    });
  }
}

module.exports = new ProfileManager();
