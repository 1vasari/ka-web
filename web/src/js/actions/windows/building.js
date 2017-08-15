

var Reflux = require('reflux');

var BuildingActions = Reflux.createActions([
    'view',
    'update',
    'clear',
    'upgrade',
    'downgrade',
    'demolish',
    'repair'
]);

module.exports = BuildingActions;
