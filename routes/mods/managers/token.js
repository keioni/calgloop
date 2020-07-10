'use strict';

const apiCaller = require('request');
const jwt = require('jsonwebtoken');

const ManagerBase = require('./base');


const LOGIN_API_PATH = '/api/v1/login';

class TokenManager extends ManagerBase {

  constructor () {
    super();
  }

  authenticate(caller, login_id, password, postprocess) {
  // authenticate(caller, login_id, password) {
    this.method = 'authenticate';

    const uri = this.getUri(LOGIN_API_PATH);
    const args = this.getArgs({
      caller: caller,
      login_id: login_id,
      password: password
    });

    apiCaller({
      method: 'POST',
      uri: uri,
      json: args
    }, (error, response, body) => {
      let jwt = null;
      if (!this.checkApiCallResult(error, response, body)) {
        this.logging('Failed to call API: ' + uri);
      }
      else if (!body.result) {
        this.logging('Fatal: body.result is empty.');
      }
      else {
        jwt = body.result.jwt;
        // this.logging('body (request): ' + body);
        // this.logging('jwt (return): ' + jwt);
      }
      this.logging('Authenticated (jwt): ' + jwt);
      postprocess(jwt);
    });
  }

  verify(jwt_str, postprocess) {
    this.method = 'verify';

    let token = null;
    this.logging('* arg: jwt_str: ' + jwt_str);
    if (!jwt_str) {
      this.logging('jwt_str is null.');
    }
    else {
      this.logging('jwt_str (request): ' + jwt_str);
      try {
        token = jwt.verify(jwt_str, this.SETTINGS.JWT_SECRET);
      }
      catch (e) {
        this.logging('Failed.');
        this.logging(e.name);
        this.logging(e.message);
      }
      this.logging('token (return): ' + token);
    }
    postprocess(token);
  }

}

module.exports = new TokenManager();
