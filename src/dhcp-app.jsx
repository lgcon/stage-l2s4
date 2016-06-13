import React from 'react';
import ReactDOM from 'react-dom';
import {Translator, updateTranslations} from './lang.jsx';
import * as F from './bootstrap-lib/form-utils.jsx';
import {Prompters} from  './bootstrap-lib/prompters.jsx';

/* Div <--> Input (prop edit) 
 * Editable input field 
 */
var InEdit = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { value: this.props.children }
	},
	componentWillReceiveProps: function(newProps){
		//this.setState({ value: newProps.children });
		
	},
	/* As this is controlled Update the state with the new value */
	onChange: function (event) {
		this.setState({value: event.target.value});
	},

	render: function(){
		if (this.props.edit === true) {
			return (<input value={this.state.value} style={{width: "100%"}}
				 onChange={this.onChange} />
			);
		} else {
			return (<div> {this.state.value} </div>);
		}
	}
});

/* 
 * Editable dropdown
 * props:
 *	-values: either a list either an object containing an attribute values (a list) and an attribute value (default value)
 */
var DdEdit = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		if (Array.isArray(this.props.values)) {

			return { value: this.props.values[0],
				 values: this.props.values
			       };
		} else {

			return { value: this.props.values.value,
				 values: this.props.values.values
			       }
		}
	},

	/* As this is controlled Update the state with the new value */
	onChange: function (newValue) {
		this.setState({	value: newValue });
	},

	makeOption: function (val, index){
		return (<el> {val} </el>);
	},

	render: function(){
		if (this.props.edit === true) {
			return (<F.Dropdown_internal superClass="dropdown" 
				 onChange={this.onChange} value={this.state.value} >
					{this.state.values.map(this.makeOption)}
				</F.Dropdown_internal>
			);
		} else {
			return (<div > {this.state.value} </div>);
		}
	}
});


















/* props: model {key: ... , desc: [ ["field" , "type", "name"], ... ] }
 * data: { "name1" : ... , "name2" : .... }
 * submit: func(obj)
 */
var Editable_tr = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { edit: this.props.edit || false };
	},


	renderType: function (type, content){
		switch ( type.toLowerCase() ) {

			case "input" :
				return (
					<InEdit edit={this.state.edit}>
						{content}
					</InEdit>
				);

			case "dropdown":
				return (
					<DdEdit edit={this.state.edit} 
						values={content}
					/>
				);
				
			default: return (<div> {content} </div>);
		}
				
				
	},

	renderChild: function (desc, index) {

		// The label at desc[0] is not used by this component
		var type = desc[1]; var name = desc[2];
		var content = this.props.data[name];

		return (
			<td key={"edr"+index} className="col-md-1" > 
				{this.renderType(type, content)}
			</td>
		);
			
	},
	
	switchMode: function(){
		//  XXX do stuffs here
		this.setState({ edit: !this.state.edit });
	},

	deleteRow: function(){
		// XXX do stuffs here
		this.props.onRemove(this.props.index);
	},
	
	render: function(){
		return (
			<tr>
				{this.props.model.desc.map(this.renderChild)}
				<td className="outside">
					<F.Button onClick={this.switchMode}>
						Edit/Save
					</F.Button>
					<F.Button onClick={this.deleteRow}>
						Remove
					</F.Button>
				</td>
			</tr>
		);
	}
});


/* props: model [ ["field" , "type", "name"], ... ]
 * name: prompter
 */
var Table = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	/* has a name prop */
	propTypes: { name: React.PropTypes.string.isRequired },	

	getInitialState: function (){ return {values : [] }; },

	getValues: function(){
		this.setState({values: Prompters[this.props.name].getValues()})
	},


	componentWillMount: function () {
		var prompter = Prompters[this.props.name];

		if (!prompter) {
			console.error(this.props.name+" is not a prompter!");

		} else if (prompter.init) {
			prompter.init(this.getValues.bind(this));
			
		}
	},

	renderHead: function(){
		function headerEl(mod,index){ return (<th key={"th"+index}> {mod[0]} </th>);}
		return (
			<thead>
				<tr>
				{this.props.model.desc.map(headerEl)}
				</tr>
			</thead>
		);
	},

	renderRow: function (data , index){

		var uniqkey = data[this.props.model.key];

		return ( <Editable_tr key={"trw"+uniqkey}
				      model={this.props.model} 
				      data={data}
				      edit={data._edit}
				      index={index}
				      onRemove={this.removeRow}
			/>
		);

	},
	
	removeRow: function (index) {
		this.state.values.splice(index,1);
		this.setState({values: this.state.values});
	},





	emptyRowsCount: 0, // Used to define unique keys when adding empty rows

	addRow: function (){

		var newRow = { _edit: true }; // Add in edit mode
			
		if (this.state.values.length > 0){	

			/* Use the first row as example */
			newRow = $.extend(newRow,this.state.values[0]);
		
			for (var i = 0; i < this.props.model.desc.length; i++){
				/* Leave inputs blanks */
				var type = this.props.model.desc[i][1];
				if ( type.toLowerCase() == "input"){
					var field = this.props.model.desc[i][2];
					newRow[field] = "";
				}
			}

		} else if (Prompters[this.props.name].getEmptyRow) {
			/* Ask for an empty row to the prompter */
			var emptyRow = Prompters[this.props.name].getEmptyRow();
			newRow = $.extend(newRow,emptyRow);

		} else {
			console.error("Cannot fetch an the values of an empty row");
			return;
		}

		// Set an unique key
		newRow[this.props.model.key] = "___emptyRowId"+this.emptyRowsCount++;

		// Add to the state	
		this.state.values.push(newRow);
		this.setState({ values: this.state.values });
		
	},

	render: function(){
		return (
			<div>
				<table className="table table-bordered">
					{this.renderHead()}
					<tbody>
						{this.state.values.map(this.renderRow)}
					</tbody>
				</table>
				<F.Button onClick={this.addRow}>
					Button
				</F.Button>
			</div>
		);
	}
});
	
/** 
 * The input fields can be not defined ---> they will be rendered as empty
 */
var App = React.createClass({


	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	model: { key: "iddhcprange",
		 desc: [ 
				[ "Min" , "Input" , "min"],
				[ "Max" , "Input" , "max"],
				[ "Domain" , "Dropdown" , "domain"],
				[ "Default lease duration", "Input", "default_lease_time"],
				[ "Maximum lease duration", "Input", "max_lease_time"]
			/*      [ "DHCP profile", "Dropdown", "dhcpprof"] XXX dhcpprof could be in conflict*/ 
		]
	},
		
	render: function () {
		return ( 
			<Table model={this.model} name="dhcp" > </Table>
		);

	}
});


/* Rendering the app on the node with id = 'app'
   change in case of conflict */
var dom_node = document.getElementById('app');

ReactDOM.render( <Translator> <App /> </Translator>, dom_node);



