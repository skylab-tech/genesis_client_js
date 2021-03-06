const restler = require('restler');

module.exports = function profiles(SkylabGenesis) {
  // eslint-disable-next-line no-param-reassign
  SkylabGenesis.prototype.listProfiles = function listProfiles(data, callback) {
    const url = this._buildUrl('profiles', null, null, data.params);

    const options = this._getOptions();

    const that = this;

    this.emit('request', 'GET', url, options.headers, data);

    restler
      .get(url, data, options)
      .once('complete', (result, response) => {
        that._handleResponse.call(that, result, response, callback);
      });
  };

  // eslint-disable-next-line no-param-reassign
  SkylabGenesis.prototype.createProfile = function createProfile(data, callback) {
    const url = this._buildUrl('profiles', data.id);

    const options = this._getOptions();

    const that = this;

    this.emit('request', 'POST', url, options.headers, {});

    restler
      .postJson(url, data, options)
      .once('complete', (result, response) => {
        that._handleResponse.call(that, result, response, callback);
      });
  };

  // eslint-disable-next-line no-param-reassign
  SkylabGenesis.prototype.getProfile = function getProfile(data, callback) {
    const url = this._buildUrl('profiles', data.id);

    const options = this._getOptions();

    const that = this;

    this.emit('request', 'GET', url, options.headers, {});

    restler
      .get(url, options)
      .once('complete', (result, response) => {
        that._handleResponse.call(that, result, response, callback);
      });
  };

  // eslint-disable-next-line no-param-reassign
  SkylabGenesis.prototype.updateProfile = function updateProfile(data, callback) {
    const url = this._buildUrl('profiles', data.id);

    const options = this._getOptions();

    const that = this;

    this.emit('request', 'PATCH', url, options.headers, {});

    restler
      .patchJson(url, data, options)
      .once('complete', (result, response) => {
        that._handleResponse.call(that, result, response, callback);
      });
  };

  // eslint-disable-next-line no-param-reassign
  SkylabGenesis.prototype.deleteProfile = function deleteProfile(data, callback) {
    const url = this._buildUrl('profiles', data.id);

    const options = this._getOptions();

    const that = this;

    this.emit('request', 'DELETE', url, options.headers, {});

    restler
      .del(url, options)
      .once('complete', (result, response) => {
        that._handleResponse.call(that, result, response, callback);
      });
  };
};
