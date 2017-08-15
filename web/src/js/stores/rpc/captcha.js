
var Reflux                  = require('reflux');
var StatefulMixinStore      = require('js/stores/mixins/stateful');

var CaptchaActions    = require('js/actions/windows/captcha');
var WindowsActions          = require('js/actions/window');

var clone                   = require('js/util').clone;

var CaptchaRPCStore = Reflux.createStore({
    listenables : [
      CaptchaActions
    ],

    mixins : [
        StatefulMixinStore
    ],

    getDefaultData : function() {
        return {
            guid   : '',
            url    : '',
            solved : 0,
            window : ''
        };
    },

    onCaptchaWindowClear : function() {
        this.emit(this.getDefaultData());
    },

    onSuccessCaptchaRPCFetch : function(result) {
        var update = clone(this.state);
        update.guid = result.guid;
        update.url  = result.url;

        this.emit(update);
    },

    onSuccessCaptchaRPCSolve : function(result) {
        var update = clone(this.state);
        update.solved = 1;

        this.emit(update);
        WindowsActions.windowCloseByType('captcha');
    },

    onCaptchaWindowShow : function(window) {
        var update = clone(this.state);
        update.window = window;
        this.emit(update);
    },

    onCaptchaWindowRefresh : function() {
        this.onCaptchaWindowClear();
    }
});

module.exports = CaptchaRPCStore;
