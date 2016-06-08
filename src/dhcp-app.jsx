import React from 'react';
import ReactDOM from 'react-dom';
import {Translator, updateTranslations} from './lang.jsx';
import * as F from './bootstrap-lib/form-utils.jsx';

/* Div <--> Input (prop edit) */
var InEdit = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { value: this.props.children }
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
			return (<div  > {this.state.value} </div>);
		}
	}
});


var DdEdit = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { value: this.props.values[0] }
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
					{this.props.values.map(this.makeOption)}
				</F.Dropdown_internal>
			);
		} else {
			return (<div > {this.state.value} </div>);
		}
	}
});



/* props: model [ ["field" , "type", "name"], ... ]
 * data: { "name1" : ... , "name2" : .... }
 * submit: func(obj)
 */
var Editable_tr = React.createClass({

	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { edit: false };
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
	
	render: function(){
		
		return (
			<tr>
				{this.props.model.map(this.renderChild)}
				<td className="outside">
					<F.Button onClick={this.switchMode}>
						Button
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


	getInitialState: function(){
		return { 
		 };
	},

	data: /* TODO API */
		[ 
		{ "name1": "asd1" , "name2" : [1,2,3] , "name3" : "asd3" },
		{ "name1": "asd1" , "name2" : [1,2,3] , "name3" : "asd3" },
		{ "name1": "asd1" , "name2" : [1,2,3] , "name3" : "asd3" }
	],

	renderRow: function (data , index){
		return ( <Editable_tr model={this.props.model} 
				      data={data}
			/>
		);

	},

	render: function(){
		return (
			<table className="table table-bordered">
			<tbody>
				{this.data.map(this.renderRow)}
			</tbody>
			</table>
		);
	}
});
	
/** 
 */
var App = React.createClass({


	/* This will force a rerendering on languae change */
 	contextTypes : {lang: React.PropTypes.string},

	model: [
		[ "Field1" , "Input" , "name1"],
		[ "Field2" , "Dropdown" , "name2"],
		[ "Field3" , "Input" , "name3"]
	],

	render: function () {
		return ( 
			<Table model={this.model} name="prompter-example" > </Table>
		);

	}
});


/* Rendering the app on the node with id = 'app'
   change in case of conflict */
var dom_node = document.getElementById('app');

ReactDOM.render( <Translator> <App /> </Translator>, dom_node);



