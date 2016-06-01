import React from 'react';
import ReactDOM from 'react-dom';
import {translate} from '../lang.jsx';
import Autosuggest from 'react-autosuggest';
import {Prompters} from './inputs.jsx';



/** 
 * Creates an uncontrolled Bootstrap-like input field preceded by a label.
 * Every property passed to this object is passed to the input field.
 *
 * @properties:
 *	-label: defines the contents of the label (required) //TODO make it optional
 *	-dims : defines the dimensions of this component following the
 *		Bootstrap grid system. Use the following syntax: "x+y"
 *		where x is the space reserved for the label and y is the
 *		space reserved for the input field.
 *	  
 * @note:  to fill the input with a default value use the React-specific prop 
 *	   'defaultValue' and not the prop 'value'.
 *	    more infos: https://facebook.github.io/react/docs/forms.html#uncontrolled-components
 */

export var Input = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},
	
	render: function(){
		
		/* The default value of dims is "2+3" */
		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];
			
		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"col-md-"+grid_vals[1]}>
					<input {...this.props} className="form-control" />
				</div>
			</div>
		);
		
	}

});





/**
 * Same as Input but uses the component AutoInput to perform live-suggestions.
 * Use the html attribute 'name' to link this component the correct
 * handler contained inside the object Propmters.
 *
 * @properties: (same as Input)
 * @see Input, AutoInput
 */

export var Ainput = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},
	
	render: function(){
		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];
			
		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"col-md-"+grid_vals[1]}>
					<AutoInput {...this.props} className="form-control" />
				</div>
			</div>
		);
		
	}

});


/**
 * Simple Bootstrap-like button. Every property passed to this button is 
 * passed as an attribute to the html button node. 
 * Use this component as a normal button to wrap some text.
 *
 * @properties:
 *	-dims : space reserved to the button following the Bootstrap grid system
 *		(ex. dims="3")
 *	
 * @prec this component should have only text as a child
 */
export var Button = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},
	
	render: function(){

		/* By default dims="2" */
		var grid_val = this.props.dims ? 
			this.props.dims : '2';

		return (
			<button className={"btn btn-default col-md-"+grid_val} 
			 {...this.props} >
				{translate(this.props.children)}
			</button>
		);
	}

});




export var Dropdown_internal = React.createClass({


 	contextTypes : {lang: React.PropTypes.string},


	getInitialState: function(){
	
		/* If defaultValue is defined use it as initial
 		   value, otherwise use the contents of the first
		   child */	

		if (this.props.defaultValue) 
			return {value: this.props.defaultValue};

		else if (this.props.children.length > 0 )
			return {value: this.props.children[0].props.children};

		else
			return {value: undefined};
		
	},



	/* At every update if possible use the contents of the first 
	   child as value: if the value is not defined or there are new
	   children (see filter dropdown)  */

	componentWillUpdate: function(newprops) {
			
		if (newprops.children.length > 0) {
			if ( this.state.value == undefined || 
			     this.props.children != newprops.children){

				this.setState(
					{value: newprops.children[0].props.children}
				);
			}
		}
	},

	
	
	/* Set the contents of the child that has been clicked as value */
	handleClick: function(child, event){
			event.preventDefault();
			this.setState({value: child.props.children});
	},


	makeOption: function(child, index){
			return (
				<li key={"dopt"+index}>
					<a href="#" onClick={this.handleClick.bind(this,child)} >
					{translate(child.props.children)}
					</a>
				</li>
			);
	},


	render: function(){

		return (
			<div className={this.props.superClass}>
				<button className="btn btn-default dropdown-toggle" 
				 type="button"  data-toggle="dropdown" aria-haspopup="true"
				 aria-expanded="true" {...this.props} >
					{translate(this.state.value)}
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" >
					{this.props.children.map(this.makeOption)}
				</ul>
			</div>
		);
	}
});


/* @prec a button can have only wrapped text as a child */
export var Dropdown = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];

		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"dropdown col-md-"+grid_vals[1]}>
					<Dropdown_internal {...this.props} />
				</div>
			</div>
		);
	}
});



export var Adropdown = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];

		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"dropdown col-md-"+grid_vals[1]}>
					<AJXdropdown {...this.props} />
				</div>
			</div>
		);
	}
});


export var Inputdrop = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];

		/* Make a copy of the props without the children */
		var props = {};
		$.extend(props,this.props);
		props.children = null;

		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"input-group col-md-"+grid_vals[1]}
				     style={{"paddingLeft": "15px", "float": "left"}} >
					<input className="form-control" {...props} />
					<Dropdown_internal name={this.props.ddname} defaultValue={this.props.ddDef}
					 superClass="input-group-btn" >
						{this.props.children}
					</Dropdown_internal>
				</div>
			</div>
		);
	}

});

export var InputAdrop = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		var grid_vals = this.props.dims ? 
			this.props.dims.split('+') : ['2','3'];

		/* Make a copy of the props without the children */
		var props = {};
		$.extend(props,this.props);
		props.children = null;

		return (
			<div>
				<label className={"control-label col-md-"+grid_vals[0]}>
				{translate(this.props.label)}
				</label>
				<div className={"input-group col-md-"+grid_vals[1]}
				     style={{"paddingLeft": "15px", "float": "left"}} >
					<input className="form-control" {...props} />
					<AJXdropdown name={this.props.ddname} defaultValue={this.props.ddDef}
					  superClass="input-group-btn" />
				</div>
			</div>
		);
	}

});

/* Props side=[right|left] */
export var Checkbox = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		var grid_val = this.props.dims ? 
			this.props.dims : '2';

		var side = this.props.side ? this.props.side : 'right';

		var label = translate(this.props.label);

		return (
			<div className={"checkbox col-md-"+grid_val}>
				<label>
					{side === 'left' ? label : null}
					<input type="checkbox" {...this.props} /> 
					{side === 'right' ? label : null}
				</label>
  			</div>
		);
	}
});


export var Space = React.createClass({


	render: function(){
		var grid_val = this.props.dims ? 
			this.props.dims : '2';

		return (
			<div className={"col-md-"+grid_val} />
		);
	}

});

export var Row = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		return (
			<div className="form-group row">
				{this.props.children}
			</div>
		);
	}

});



export var Form = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},

	render: function(){
		return (
			<form className="form-horizontal" role="form"
			 {...this.props} >
				{this.props.children}
			</form>
		);
	}
	
});




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
