

var _ = require('lodash');

//var linuxConfig = require('config/linux.json');
//var macConfig   = require('config/mac.json');

let globalConfig = {
  "assets_url": "/assets/",
  "server_url": "http://localhost:5000",
  "ws_server_url": "ws://localhost:8090/ws/user"
}

var userConfig = {};

try {
    //userConfig = require('config/user.json');
} catch (e) {
    // Do nothing.
}

var config = {
    hasLoaded    : false,
    loadedConfig : {},

    get : function(key) {
        if (!this.hasLoaded) {
            this.load();
        }

        return this.loadedConfig[key] || undefined;
    },

    load : function() {
        // Determine what platform so we know which config to load.
        // var plat = window.navigator.platform.toLowerCase();
        //
        // if (plat.indexOf('mac') > -1) {
        //     console.log('Loading mac config');
        //     this.loadedConfig = _.merge({}, macConfig, userConfig);
        //     this.hasLoaded = true;
        // } else if (plat.indexOf('linux') > -1) {
        //     console.log('Loading linux config');
        //     this.loadedConfig = _.merge({}, linuxConfig, userConfig);
        //     this.hasLoaded = true;
        // } else {
        //     console.log('Platform ("' + plat + '") not supported - loading user config anyway');
        //     this.loadedConfig = _.merge({}, userConfig);
        //     this.hasLoaded = true;
        // }

        this.hadLoaded = true
        this.loadedConfig = globalConfig
    }
};

module.exports = config;
