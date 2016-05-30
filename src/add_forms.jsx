import React from 'react';
import ReactDOM from 'react-dom';
import {getJSON} from './inputs.jsx';
import * as F from './forms_utils.jsx';


/* prop id required */
export var Add_host = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	
	propTypes: { id: React.PropTypes.string.isRequired },	

	handleClick: function (event){
		event.preventDefault();

		var els = document.getElementById(this.props.id).elements;

		var el_val = []; // TODO complete
		
		if (this.props.submtCallback) this.props.submtCallback(els);

		console.log(els);

		
	},



	render: function(){

		var d = this.props.defValues || {};

		return (
			<div>
			<F.Form id={this.props.id}>
				<F.Row>
					<F.InputAdrop label="Name" ddname="domain" defaultValue={d.Name}/>
					<F.Input label="TTL" dims="2+1"/>
				</F.Row>
				<F.Row>
					<F.Ainput label="Ip address" name="cidr" defaultValue={d.Ipaddr}/>
					<F.Dropdown label="View" selected={d.View}>
						<el>external</el>
						<el>internal</el>
					</F.Dropdown>
				</F.Row>
				<F.Row>
					<F.Input label="Mac address"/>
					<F.Space dims="2" />
					<F.Checkbox label="use SMTP" defaultChecked={d["use SMTP"]} />
				</F.Row>
				<F.Row>
					<F.Adropdown label="Machine" name="machines" />
				</F.Row>
				<F.Row>
					<F.Input label="Comment"/>
				</F.Row>
				<F.Row>
					<F.Input label="Resp. name" defaultValue={d.Respname} />
					<F.Input label="Resp. mail" defaultValue={d.Respmail} />
				</F.Row>
					
			</F.Form>
			<F.Row>
				<F.Space dims="5" />
				<F.Button dims="1" onClick={this.handleClick} >
					Add
				</F.Button>
			</F.Row>
			</div>
		);
	}
});

var Select_block = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { blocks: undefined};
	},

	handleSearch: function(event){
		event.preventDefault();
		/* XXX this is just an example */
		var els = document.getElementById('Search block').elements;
		var query = "http://localhost/stage-l2s4/nm_pages/api/addrblock";//+els[0].textContent+"&nb="+els[1].value;	

		getJSON(query,function(res){this.setState({ blocks: res });}.bind(this));
	},

	search_form: function(){
		return (
			<F.Row>
				<F.Adropdown label="Network" name="cidr" dims="2+1" />
				<F.Input label="Address count" dims="1+1"/>
				<F.Space dims="1" />
				<F.Button dims="1" onClick={this.handleSearch}  >
					Search
				</F.Button>
			</F.Row>
		);
	},

	select_form: function(){
	
		if (!this.state.blocks) return null;

		function makeEl({first, size}){
			return (<el> {first+" (size: "+size+")"} </el>);
		}
		
		return (
			<F.Row>
				<F.Dropdown label="Block" name="cidr">
					{this.state.blocks.map(makeEl)}
				</F.Dropdown>
				<F.Space dims="1" />
				<F.Button dims="1" onClick={this.props.onSelect}>
					Select
				</F.Button>
			</F.Row>
		);
			

	},

	render: function(){
		return ( 
			<F.Form id='Search block'>
				{this.search_form()}
				{this.select_form()}
			</F.Form>
		);
	}
});

export var Add_block = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return {blockselected: false, defaultAddHost: {} };
	},


	handleSelect: function(event){
		event.preventDefault();
		this.setState({blockselected: true });
	},

	addNext: function(){
		return; 
		
		
	},


	render: function(){
		if (this.state.blockselected) {

			return ( 
				<Add_host id="Addblk_addh" defValues={this.defaultAddHost} submtCallback={this.addNext} />
			);
		

		} else {
			
			return ( <Select_block onSelect={this.handleSelect} /> );

		}
	}
});

ReactDOM.render(<Add_block />, document.getElementById('app'));



