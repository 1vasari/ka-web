

var Reflux = require('reflux');

var ServerStatusActions = Reflux.createActions([
    'serverStatusUpdate',
    'serverStatusClear'
]);

module.exports = ServerStatusActions;
