

var Reflux = require('reflux');

var CaptchaActions = Reflux.createActions([
    'clear',
    'refresh',
    'show',
    'hide'
]);

module.exports = CaptchaActions;
