

var Reflux = require('reflux');

var WindowActions = Reflux.createActions([
    'add',
    'close',
    'closeByType',
    'closeAll',
    'bringToTop'
]);

module.exports = WindowActions;
