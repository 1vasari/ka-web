
var Reflux              = require('reflux');
var ReactTooltip        = require('react-tooltip');

var UserActions         = require('js/actions/user');
var MenuActions         = require('js/actions/menu');
var TickerActions       = require('js/actions/ticker');
var MapActions          = require('js/actions/menu/map');
var SessionActions = require('js/actions/session')

var BodyStatusActions = require('js/actions/bodyStatus')
var EmpireStatusActions = require('js/actions/empireStatus')
var ServerStatusActions = require('js/actions/serverStatus')

let server = require('js/server');

// TODO What is the purpose of this store? It does not store anything!
// (it should disappear when the yui code is replaced totally)
//
var UserStore = Reflux.createStore({
    listenables : [UserActions],

    onSignIn : function() {
        MenuActions.menuShow();
        TickerActions.tickerStart();
        // TODO This should be possible to be removed. BUT it is needed for
        // now. It is called in the map store by attaching tothe onUserSignin
        // event (as it does here) but perhaps it requires the other stores
        // to complete first before it works?
        console.log('Firing up the planet view');
        MapActions.mapChangePlanet(window.YAHOO.lacuna.Game.EmpireData.home_planet_id);
    },

    onSignOut: function() {
        server.call({
            module: 'empire',
            method: 'logout',
            params: [],
            success: function() {
                // Here be the traditional code to reset the game...
                window.YAHOO.lacuna.Game.Reset();
                window.YAHOO.lacuna.MapPlanet.Reset();
                window.YAHOO.lacuna.Game.DoLogin();

                // Let the React stuff know what happened.
                SessionActions.clear();
                BodyStatusActions.clear();
                EmpireStatusActions.clear();
                ServerStatusActions.clear();
                MenuActions.hide();
                TickerActions.stop();

                // Hide all our tooltips
                ReactTooltip.hide();
            }
        });
    }
});

module.exports = UserStore;
