'use strict';

var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var $ = require('js/hacks/jquery');

var EmpireRPCStore = require('js/stores/rpc/empire');
var BodyRPCStore = require('js/stores/rpc/body');

var RightSidebarActions = require('js/actions/menu/rightSidebar');
var MapActions = require('js/actions/menu/map');

var PlanetListItem = React.createClass({
    getInitialProps: function() {
        return {
            name: '',
            id: '',
            current: '',
        };
    },
    propTypes: {
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    },
    handleClick: function() {
        console.log('Chaning to planet (#' + this.props.id + ').');
        RightSidebarActions.toggle();
        MapActions.changePlanet(this.props.id);
    },
    render: function() {
        var Class = this.props.current == this.props.id ? "ui large teal label" : "item";
        return (
                <a className={Class} onClick={this.handleClick} style={{
                // For some reason this doesn't get set on the items (by Semantic) when it should.
                cursor: 'pointer'
            }}>
                {this.props.name}
            </a>
        );
    }
});

var BodyList = React.createClass({
    getInitialProps: function() {
        return {
            list: [],
            current: '',
        };
    },
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    render: function() {
        var list = [];
        var bl = this;

        _.each(this.props.list, function(planet) {
            list.push(
                <PlanetListItem name={planet.name} id={planet.id} key={planet.id} current={bl.props.current} />
            );
        });

        return <div>{list}</div>;
    }
});

var RightSidebar = React.createClass({
    mixins: [
        Reflux.connect(EmpireRPCStore, 'empire'),
        Reflux.connect(BodyRPCStore, 'body')
    ],

    getInitialState: function() {
        return {
            scrollY: 0
        };
    },

    handleScroll: function(event) {
        this.setState({
            scrollY: $(event.target).scrollTop()
        });
    },

    render: function() {
        return (
            <div className="ui right vertical inverted sidebar menu" onScroll={this.handleScroll}>

                <div className="ui horizontal inverted divider">
                    My Colonies
                </div>
                <BodyList list={this.state.empire.colonies} current={this.state.body.id} />

                {
                    this.state.empire.stations.length > 0 ?
                        <div>
                            <div className="ui horizontal inverted divider">
                                My Stations
                            </div>
                            <BodyList list={this.state.empire.stations} current={this.state.body.id}/>
                        </div>
                    :
                        ''
                }
            </div>
        );
    }
});

module.exports = RightSidebar;