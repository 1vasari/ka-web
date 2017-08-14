/* eslint-disable */


window.YAHOO.namespace("lacuna.modules");

if (typeof window.YAHOO.lacuna.modules.StationCommand == "undefined" || !window.YAHOO.lacuna.modules.StationCommand) {

(function(){
    var Lang = window.YAHOO.lang,
        Util = window.YAHOO.util,
        Dom = Util.Dom,
        Event = Util.Event,
        Sel = Util.Selector,
        Lacuna = window.YAHOO.lacuna,
        Game = Lacuna.Game,
        Lib = Lacuna.Library;

    var StationCommand = function(result){
        StationCommand.superclass.constructor.call(this, result);

        this.service = Game.Services.Modules.StationCommand;
    };

    Lang.extend(StationCommand, Lacuna.buildings.PlanetaryCommand);

    Lacuna.modules.StationCommand = StationCommand;

})();
window.YAHOO.register("StationCommand", window.YAHOO.lacuna.modules.StationCommand, {version: "1", build: "0"});

}
