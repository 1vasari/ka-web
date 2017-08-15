
var React                   = require('react');
var Reflux                  = require('reflux');

var CaptchaActions    = require('js/actions/windows/captcha');
var WindowActions           = require('js/actions/window');

var CaptchaRPCStore         = require('js/stores/rpc/captcha');

var Captcha = React.createClass({
    statics : {
        options : {
            title  : 'Verify Your Humanity',
            width  : 320,
            height : 'auto'
        }
    },

    propTypes : {
        options : React.PropTypes.object.isRequired
    },

    mixins : [
        Reflux.connect(CaptchaRPCStore, 'captchaRPCStore')
    ],

    componentWillMount : function() {
      CaptchaActions.fetch()
    },

    componentWillUnmount : function() {
        var success = this.props.options.success;

        if (typeof success === 'function') {
            if (this.state.captchaRPCStore.solved) {
                success();
            }
        }
    },

    componentDidUpdate : function(prevProps, prevState) {
        if (prevState.captchaRPCStore.url !== this.state.captchaRPCStore.url) {
            this.clearSolutionField();
        }
    },

    onWindowShow : function() {
        this.clearSolutionField();
        CaptchaActions.fetch();
    },

    handleEnterKey : function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.onClickSolve();
        }
    },

    onClickSolve : function() {
        var solution = this.refs.solution.value;

        CaptchaActions.solve({
            guid     : this.state.captchaRPCStore.guid,
            solution : solution
        });
    },

    onClickRefresh : function() {
        this.clearSolutionField();
        CaptchaActions.refresh();
    },

    onClickClose : function() {
        this.clearSolutionField();
        WindowActions.closeByType('captcha');
    },

    clearSolutionField : function() {
        this.refs.solution.value = '';
    },

    render : function() {
        return (
            <div>
                <div
                    style={{
                        backgroundImage : 'url(' + this.state.captchaRPCStore.url + ')',
                        width           : 300,
                        height          : 80
                    }}
                />

                <br />

                <div className="ui action input">
                    <input
                        type="text"
                        ref="solution"
                        onKeyDown={this.handleEnterKey}
                        placeholder="Captcha Solution"
                        style={{
                            // Magic number to make it the same width as the image.
                            width : 140
                        }}
                    />

                    <div className="ui large icon buttons">
                        <div className="ui green button" onClick={this.onClickSolve}>
                            <i className="checkmark icon"></i>
                        </div>
                        <div className="ui blue button" onClick={this.onClickRefresh}>
                            <i className="refresh icon"></i>
                        </div>
                        <div className="ui red button" onClick={this.onClickClose}>
                            <i className="remove icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Captcha;
