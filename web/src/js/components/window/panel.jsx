/* eslint-env jquery */

var React         = require('react');
var Draggable     = require('react-draggable');

var PanelHeader   = require('js/components/window/panel/panelHeader');
var PanelContent  = require('js/components/window/panel/panelContent');

var WindowActions = require('js/actions/window');

var Panel = React.createClass({

    propTypes : {
        type    : React.PropTypes.string,
        zIndex  : React.PropTypes.number,
        options : React.PropTypes.object,
        window  : React.PropTypes.func
    },

    onBringToTop : function() {
        WindowActions.windowBringToTop(this.props.type);
    },

    closeWindow : function() {
        WindowActions.windowCloseByType(this.props.type);
    },

    handleCentering : function() {
        return ($(window.document).width() - this.props.window.options.width) / 2;
    },

    render : function() {
        var subPanel = React.createElement(this.props.window, {
            zIndex  : this.props.zIndex,
            options : this.props.options
        });

        return (
            <Draggable handle=".drag-handle" zIndex={this.props.zIndex}>
                <div
                    ref="container"
                    style={{
                        position : 'absolute',
                        zIndex   : this.props.zIndex,
                        left     : this.handleCentering()
                    }}
                    onClick={this.onBringToTop}
                >
                    <PanelHeader
                        title={this.props.window.options.title}
                        panelWidth={this.props.window.options.width}
                        onClose={this.closeWindow}
                    />

                    <PanelContent
                        panelWidth={this.props.window.options.width}
                        panelHeight={this.props.window.options.height}
                    >
                        {subPanel}
                    </PanelContent>
                </div>
            </Draggable>
        );
    }
});

module.exports = Panel;
