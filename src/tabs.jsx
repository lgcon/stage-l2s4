import React from 'react';
import ReactDOM from 'react-dom';
import {Add_host} from './add_forms.jsx';


var Tabs = React.createClass({

	/* The first tab is the one active by default */
	getInitialState: function () {
		return { selected: this.props.selected || 0 };
	},

	/* Change state */
	handleClick: function (index, event) {
		event.preventDefault(); // Stop other things from happening
		this.setState({selected: index});
	},


	/* Render the navigation bar */
	_renderTitles: function () {

		function labels(child, index) {
			var activeClass = (this.state.selected === index ? 'active' : '');
			return ( 
				<li key = {index} className = {activeClass} >
					<a href = "#" onClick = {this.handleClick.bind(this, index)} > 
						{child.props.label} 
					</a> 
				</li>
			);
		}

		return ( 
			<ul className = "nav nav-tabs" >
				{this.props.children.map(labels.bind(this))}
			</ul>
		);
	},



	/* Render the content of the selected child */
	_renderContent: function () {
		return ( 
			<div className = "tabs-content" > 
				{this.props.children[this.state.selected]} 
			</div>
		);
	},



	/* Main render */
	render: function () {
		return ( 
			<div className = "tabs" > 
				{this._renderTitles()} 
				{this._renderContent()} 
			</div>
		);
	}

});




/* Just render the children */
var Pane = React.createClass({
	render: function () {
		return ( 
			<div> {this.props.children} </div>
		);
	}
});



var App = React.createClass({
	render: function () {
		return ( 
				<Tabs >
					<Pane label="Tab 1" >
						<Add_host />
					</Pane> 
					<Pane label="Tab 2" >
						<div> This is my tab 2 contents! </div> 
					</Pane> 
					<Pane label="Tab 3" >
						<div> This is my tab 3 contents! </div> 
					</Pane> 
				</Tabs> 
		);
	}
});

ReactDOM.render( <App /> , document.getElementById('app'));
