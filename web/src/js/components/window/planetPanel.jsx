
var React                   = require('react');
var Reflux                  = require('reflux');

var GetBodyStatusRPCStore   = require('js/stores/rpc/body/getBodyStatus');

var WindowActions           = require('js/actions/window');

var PlanetDetailsTab        = require('js/components/window/planetPanel/planetDetailsTab');
var Tabber                  = require('js/components/tabber');

var Tabs                    = Tabber.Tabs;
var Tab                     = Tabber.Tab;

var PlanetPanel = React.createClass({
    statics : {
        options : {
            title  : 'Planet Details',
            width  : 700,
            height : 450
        }
    },

    propTypes : {
        options : React.PropTypes.object
    },

    mixins : [
        Reflux.connect(GetBodyStatusRPCStore, 'getBodyStatusStore')
    ],

    componentWillMount : function() {
      console.log('TODO')
        // BodyRPCActions.requestBodyRPCGetBodyStatus({
        //     bodyId : this.props.options.data.id
        // });
    },

    closeWindow : function() {
        WindowActions.windowCloseByType('planetPanel');
    },

    render : function() {
        var tabs = [];
        tabs.push(
            <Tab title="Planet Details" key="Planet Details" >
                <PlanetDetailsTab />
            </Tab>
        );

        tabs.push(
            <Tab title="My Fleets" key="My Fleets" >
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title="Foreign Fleets" key="Foreign Fleets" >
                <p>Not Yet Implemented</p>
            </Tab>
        );
        return (
            <div>
                <div>
                    <Tabs>
                        {tabs}
                    </Tabs>
                </div>
            </div>
        );
    }
});

module.exports = PlanetPanel;
