import React from 'react';
import ReactDOM from 'react-dom';
import {translate} from './lang.jsx';
import {AutoInput, AJXdropdown} from './inputs.jsx';


/* Props: label, dimension="2+3"*/
/* note: value =/= defaultvalue */
export var Input = React.createClass({
	
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


/* @prec a button can have only text as a child */
export var Button = React.createClass({
	
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
export var Dropdown_internal = React.createClass({

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

		var value = "";

		if (this.props.children.length != 0){
			value = this.props.children[this.state.selected].props.children;
		}

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
					<Dropdown_internal name={this.props.ddname} 
					 superClass="input-group-btn" >
						{this.props.children}
					</Dropdown_internal>
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
					<input type="checkbox" /> 
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
