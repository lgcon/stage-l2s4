import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import {Dropdown_internal} from './bootstrap-lib/form-utils.jsx';
import {translate} from './lang.jsx';



/* XXX this is a temporary url to the api */
var apiURL = 'http://130.79.91.54/stage-l2s4/nm_pages/api';


/* XXX same as $.getJSON but defines mimeType
   usefull in case of static files */
export var getJSON = function(url, success, callback){
	$.ajax({
		url: url,
		dataType: 'json',
		mimeType: 'application/json',
		success:  success,
		complete: callback
	});
}
		

/**
 * Prompters is the object containing all the handlers that AutoInput
 * can use. Every handler is an object containing one or more functions 
 * and all the usefull stuffs you need in order to manage your suggestions. 
 * There are few things to know:
 *
 * - The name of the handler must correspond with the contents of 
 *   the `name` props passed to `AutoInput`
 * 
 * - Every handler must/can (see required/optional) contain the 
 *   following stuffs:
 *	- A function `init(callback)` (optional):
 *		this function will be called once when the element
 *		is about to be mounted.
 *	- A function `getSuggestions(value,callback)` (required if input):
 *		this function take the actual value of the input and 
 *		must return an array of suggestions
 * 	- A function `getValues()` (required if dropdown):
 *		same as getSuggestions but used for the dropdown
 */

var Prompters = {
	
	/*************************  Handler name="cidr" ***********************/
	cidr: { 
		/* Here will be stored all the network addresses */
		networks: [],

		/* Fill the networks array with the API answer */
		init : function (callback)  { 
			console.log("init");
			console.log(this.networks);
			getJSON(apiURL+'/networks', function(response){
				for (var i = 0; i < response.length; i++){
					this.networks.push(response[i]["addr4"]);
					this.networks.push(response[i]["addr6"]);
				}
			}.bind(this), callback);
		},

		/* Case-insensitive suggestions based on the 
		   beginning of the addresses*/
		getSuggestions: function (value, callback){
			var inputValue = value.trim().toLowerCase();
			var inputLength = inputValue.length;

			if (inputLength === 0) return [];

			return this.networks.filter(function (network) {
		    		return network.toLowerCase().slice(0, inputLength) === inputValue;
		  	});
		},

		getValues: function (){
			return this.networks;
		}
	},

	/*************************  Handler name="machine" ***********************/

	machines: {
		machines: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/machines', function(response){
					this.machines = response;
					
			}.bind(this), callback);
		},

		/* Gives all the machines */
		getValues: function (){
			return this.machines;
		}
	},


	/*************************  Handler name="domain" ***********************/
		
	domain: {
		domains: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/domains', function(response){
					this.domains= response;
					
			}.bind(this), callback);
		},

		/* Gives all the machines */
		getValues: function (){
			return this.domains;
		}
	},

	/*************************  Handler name="addr" ***********************/

	addr: {
		addrs: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/addr', function(response){
					this.addrs= response;
					
			}.bind(this), callback);
		},

		getSuggestions: function (value, callback){
			var inputValue = value.trim().toLowerCase();
			var inputLength = inputValue.length;

			if (inputLength === 0) return [];

			return this.addrs.filter(function (addr) {
		    		return addr.toLowerCase().slice(0, inputLength) === inputValue;
		  	});
		},

		/* Gives all the addresses */
		getValues: function (){
			return this.addrs;
		}
	}

}



/**
 * Use this component to generate an input field with automatic suggestions.
 * Note that all the properties of AutoInput will be passed to the imput field.
 * AutoInput must have a `name` property and it's value must correspond
 * with the name of an handler contained inside the Prompters (see above).
 * 
 * Example of use:
 *
 *	ReactDOM.render(
 *		<AutoInput placeholder="Insert a network address" name="cidr" 
 *		   className="myclassname" style={{width: "30%"}} />, 
 *		document.getElementById('app')
 * 	);
 */
export var AutoInput = React.createClass({


	/* The state contains the current value of the input
	   and an array of suggestions (output of getSuggestions)*/
	getInitialState: function(){
		return { value: this.props.defaultValue || '', suggestions: [] };
	},




	/* An AutoInput element must have a name prop */
	propTypes: { name: React.PropTypes.string.isRequired },	



	/* At the very beginning call check for the existens of the
	   prompter and call his init function if it's defined */
	componentWillMount: function () {
		var prompter = Prompters[this.props.name];

		if (!prompter) {
			console.error(this.props.name+" is not a prompter!");

		} else if (prompter.init) {
			prompter.init();
			
		}
	},

	/* Use the function getSuggestions defined by the prompter
	   to get the actual suggestions from the current value */
	getSuggestions: function (value) {
		return Prompters[this.props.name].getSuggestions(value);
	},



	/* In this component we consider suggestions to always be strings,
	   this function tells Autosuggest how to map the suggestion to 
	   the input value when the first is selected */
	getSuggestionValue:(suggestions) => suggestions,



	/* As this is controlled Update the state with the new value */
	onChange: function (event, {newValue}) {
		this.setState({value: newValue});
	},

	/* */
	onSuggestionsUpdateRequested: function ({value}) {
		this.setState({suggestions: this.getSuggestions(value)});
	},


	/* Suggestions are rendered wrapping them in a <span> element */
	renderSuggestion: (suggestion) => (<span>{suggestion}</span>),

	
	/* Main render */
	render: function () {

		/* Pass the value and the onChange function to the
		   input. So it will work as a controlled component */
		var inputProps = {
			value : this.state.value,
			onChange : this.onChange
		};

		/* Copy all the properties of AutoInput in order to
		   pass them to Autosuggest */
		$.extend(inputProps, this.props);

		return ( 
			<Autosuggest 
			suggestions = {this.state.suggestions} 
			onSuggestionsUpdateRequested = {this.onSuggestionsUpdateRequested}
			getSuggestionValue = {this.getSuggestionValue}
			renderSuggestion = {this.renderSuggestion}
			inputProps = {inputProps}
			/>
		);
	}
});







export var AJXdropdown = React.createClass({
	
        contextTypes : {lang: React.PropTypes.string},


	/* An AJXdropdown have a name prop */
	propTypes: { name: React.PropTypes.string.isRequired },	

	componentWillMount: function () {
		var prompter = Prompters[this.props.name];

		if (!prompter) {
			console.error(this.props.name+" is not a prompter!");

		} else if (prompter.init) {
			prompter.init(function(){this.forceUpdate();}.bind(this));
			
		}
	},

	render: function(){
		var values = Prompters[this.props.name].getValues();

		function makeElement(val, index) { 
			return (<el key={"ajd"+index} > {val} </el>); 
		}
		
		return (
			<Dropdown_internal {...this.props}  >
				{values.map(makeElement)}
			</ Dropdown_internal>
		);
	}


});


export var FilteredDd = React.createClass({
	
        contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return {value: ""};
	},


	/* An AJXdropdown have a name prop */
	propTypes: { name: React.PropTypes.string.isRequired },	

	componentWillMount: function () {
		var prompter = Prompters[this.props.name];

		if (!prompter) {
			console.error(this.props.name+" is not a prompter!");

		} else if (prompter.init) {
			prompter.init(function(){this.forceUpdate();}.bind(this));
			
		}
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
	},
	
	getValues: function(){
		var values = Prompters[this.props.name].getValues();
		var inputValue = this.state.value.trim().toLowerCase();
		var inputLength = inputValue.length;

		if (inputLength === 0) return values;

		return values.filter(function (val) {
	    		return val.toLowerCase().slice(0, inputLength) === inputValue;
		 });
		
	},

	render: function(){

		var values = this.getValues();

		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','2','2'];

		function makeElement(val, index) { 
			return (<el key={"ajd"+index} > {val} </el>); 
		}
		
		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"col-md-"+grid_vals[1]}>
					<input className="form-control" value={this.state.value} onChange={this.handleChange} />
				</div>
				<div className={"dropdown col-md-"+grid_vals[2]}>
					<Dropdown_internal {...this.props}  >
						{values.map(makeElement)}
					</ Dropdown_internal>
				</div>
			</div>
		);
	}

});
