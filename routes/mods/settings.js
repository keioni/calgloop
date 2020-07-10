'use strict';

class Settings {

  constructor() {
    this.API_SERVER = 'http://localhost';
    this.JWT_SECRET = '717ba8fe3ae9cc0006d7c451f0bb265ee07739daf76355d06366154ee68d221e';
    this.COOKIE_NAME = 'calgloop';
    this.COOKIE_EXPIRING_DATE = 365*86400*1000;
  }
}

module.exports = new Settings();
