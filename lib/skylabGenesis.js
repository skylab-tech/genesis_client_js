const events = require('events');
const queryString = require('query-string');
const util = require('util');

const packageData = require('../package.json');

const API_PROTOCOL = 'https';
const API_HOST = 'genesis.skylabtech.ai';
const API_VERSION = '1';
const API_HEADER_KEY = 'X-SLT-API-KEY';
const API_HEADER_CLIENT = 'X-SLT-API-CLIENT';
const API_CLIENT = `js-${packageData.version}`;

const SkylabGenesis = function SkylabGenesis(apiKey, debug) {
  events.EventEmitter.call(this); // call the prototype ctor

  this.API_KEY = apiKey;
  this.DEBUG = debug || false;

  this._debug('Debug enabled');
};

// extend the EventEmitter
util.inherits(SkylabGenesis, events.EventEmitter);

SkylabGenesis.prototype._debug = function _debug(str) {
  if (this.DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`SKYLABTECH: ${str}`);
  }
};

SkylabGenesis.prototype._buildHeaders = function _buildHeaders() {
  const headers = {};

  headers[API_HEADER_KEY] = this.API_KEY;
  headers[API_HEADER_CLIENT] = API_CLIENT;

  this._debug(`Set headers: ${JSON.stringify(headers)}`);

  return headers;
};

SkylabGenesis.prototype._getOptions = function _getOptions() {
  return {
    headers: this._buildHeaders(),
  };
};

SkylabGenesis.prototype._buildUrl = function _buildUrl(resource, identifier, action, params = {}) {
  let url = `${API_PROTOCOL}://${API_HOST}/api/v${API_VERSION}/`;

  if (resource) {
    url += resource;
  }
  if (identifier) {
    url += `/${identifier}`;
  }
  if (action) {
    url += `/${action}`;
  }

  url += queryString.stringify(params);

  this._debug(`Built url: ${url}`);

  return url;
};

SkylabGenesis.prototype._handleResponse = function _handleResponse(result, response, callback) {
  if (result instanceof Error) {
    this._handleClientError(result, response, callback);
  } else if (response.statusCode >= 200 && response.statusCode < 400) {
    this._handleSuccess(result, response, callback);
  } else {
    this._handleServerError(result, response, callback);
  }
};

SkylabGenesis.prototype._handleClientError = function _handleResponse(result, response, callback) {
  this._debug(`Request Error: ${result.stack}`);

  if (typeof callback === 'function') {
    callback(result);
  }
};

SkylabGenesis.prototype._handleSuccess = function _handleResponse(result, response, callback) {
  this.emit('response', response.statusCode, result, response);
  this._debug(`Response ${response.statusCode}: ${JSON.stringify(result)}`);

  if (typeof callback === 'function') {
    callback(null, result);
  }
};

SkylabGenesis.prototype._handleServerError = function _handleResponse(result, response, callback) {
  const err = new Error(`Request failed with ${response.statusCode}`);
  err.statusCode = response.statusCode;

  if (typeof callback === 'function') {
    callback(err, result);
  }
};


// //////////////////////////
// PUBLIC METHODS

require('./jobs')(SkylabGenesis);
require('./profiles')(SkylabGenesis);
require('./photos')(SkylabGenesis);

module.exports = function client(apiKey, debug) {
  return new SkylabGenesis(apiKey, debug);
};
