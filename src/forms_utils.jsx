import React from 'react';
import ReactDOM from 'react-dom';
import {translate} from './lang.jsx';
import {AutoInput} from './inputs.jsx';


/* Props: label, dimension="2+3"*/
/* note: value =/= defaultvalue */
export var F_input = React.createClass({
	
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
					<input {...this.props} className="form-control" />
				</div>
			</div>
		);
		
	}

});

export var F_ainput = React.createClass({
	
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


/* @prec a button can have only text as a child */
export var F_button = React.createClass({
	
 	contextTypes : {lang: React.PropTypes.string},
	
	render: function(){
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




/* @prec a button can have only wrapped text as a child */
var Dropdown = React.createClass({

	getInitialState: function(){
		return { selected: this.props.selected || 0 };
	},

 	contextTypes : {lang: React.PropTypes.string},

	handleClick: function(index, event){
			event.preventDefault();
			this.setState({selected: index});
	},

	makeOption: function(child, index){
			return (
				<li key={"dopt"+index}>
					<a href="#" onClick={this.handleClick.bind(this,index)} >
					{translate(child.props.children)}
					</a>
				</li>
			);
	},


	render: function(){
		
		var value = this.props.children[this.state.selected].props.children;

		return (
			<div className={this.props.superClass}>
				<button className="btn btn-default dropdown-toggle" 
				 type="button"  data-toggle="dropdown" aria-haspopup="true"
				 aria-expanded="true" {...this.props} >
					{translate(value)}
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
/* TODO add label */
export var F_dropdown = React.createClass({

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
					<Dropdown {...this.props} />
				</div>
			</div>
		);
	}
});

export var F_inputdr = React.createClass({

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
				     style={{"padding-left": "15px", "float": "left"}} >
					<input className="form-control" {...props} />
					<Dropdown name={this.props.ddname} 
					 superClass="input-group-btn" >
						{this.props.children}
					</Dropdown>
				</div>
			</div>
		);
	}

});

/* Props side=[right|left] */
export var F_checkbox = React.createClass({
	
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
					<input type="checkbox" /> 
					{side === 'right' ? label : null}
				</label>
  			</div>
		);
	}
});


export var F_fgroup = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){

		return (
			<div className="form-group row">
				{this.props.children}
			</div>
		);
	}

});



export var F_form = React.createClass({
	
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
