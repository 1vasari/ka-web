/* eslint-disable */


window.YAHOO.namespace("lacuna.buildings");

if (typeof window.YAHOO.lacuna.buildings.ThemePark == "undefined" || !window.YAHOO.lacuna.buildings.ThemePark) {

(function(){
    var Lang = window.YAHOO.lang,
        Util = window.YAHOO.util,
        Dom = Util.Dom,
        Event = Util.Event,
        Lacuna = window.YAHOO.lacuna,
        Game = Lacuna.Game,
        Lib = Lacuna.Library;

    var ThemePark = function(result){
        ThemePark.superclass.constructor.call(this, result);

        this.service = Game.Services.Buildings.ThemePark;
    };

    Lang.extend(ThemePark, Lacuna.buildings.Building, {
        getChildTabs : function() {
            return [this._getTab()];
        },
        _getTab : function() {
            this.tab = new window.YAHOO.widget.Tab({ label: "Operations", content: [
                '<div id="ThemeParkWorking" style="display:none;">',
                '    Time left on current operations: <span id="ThemeParkTime"></span>',
                '</div>',
                '<div id="ThemeParkMessage" style="margin-top:5px;"></div>',
                '<div id="ThemeParkDisplay" style="display:none;margin:5px 0;">',
                '    <button type="button" id="Operate">Open Theme Park</button>',
                '</div>'
            ].join('')});

            Event.on("Operate", "click", this.operate, this, true);

            this.subscribe("onLoad", function() {
                this.updateDisplay(this.result); //first load this will be accurate
            }, this, true);

            return this.tab;
        },

        operate : function() {
            require('js/actions/menu/loader').show();

            this.service.operate({
                session_id:Game.GetSession(),
                building_id:this.building.id
            }, {
                success : function(o){
                    require('js/actions/menu/loader').hide();
                    this.rpcSuccess(o);

                    this.updateDisplay(o.result);
                },
                scope:this
            });
        },
        updateDisplay : function(result) {
            var isWorking = result.building.work && result.building.work.seconds_remaining > 0;
            if(isWorking) {
                Dom.setStyle("ThemeParkWorking","display","");
                this.resetQueue();
                this.addQueue(result.building.work.seconds_remaining, this.parkQueue, "ThemeParkTime");
            }
            else {
                Dom.setStyle("ThemeParkWorking","display","none");
            }

            if(result.themepark.can_operate) {
                Dom.setStyle("ThemeParkDisplay","display","");
                if(isWorking) {
                    Dom.get("Operate").innerHTML = "Extend Theme Park Operations";
                }
                else {
                    Dom.get("Operate").innerHTML = "Open Theme Park";
                }
            }
            else {
                Dom.setStyle("ThemeParkDisplay","display","none");
                Dom.get("ThemeParkMessage").innerHTML = result.themepark.reason[1];
            }

        },
        parkQueue : function(remaining, el){
            if(remaining <= 0) {
                var span = Dom.get(el),
                    p = span.parentNode;
                p.removeChild(span);
                p.innerHTML = "Park is closed.";
            }
            else {
                Dom.get(el).innerHTML = Lib.formatTime(Math.round(remaining));
            }
        }

    });

    window.YAHOO.lacuna.buildings.ThemePark = ThemePark;

})();
window.YAHOO.register("ThemePark", window.YAHOO.lacuna.buildings.ThemePark, {version: "1", build: "0"});

}
