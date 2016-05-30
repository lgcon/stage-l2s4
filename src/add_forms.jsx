import React from 'react';
import ReactDOM from 'react-dom';
import {getJSON} from './inputs.jsx';
import * as F from './forms_utils.jsx';


export var Add_host = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){
		return (
			<F.Form id="Add_host">
				<F.Row>
					<F.InputAdrop label="Name" ddname="domain" />
					<F.Input label="TTL" dims="2+1"/>
				</F.Row>
				<F.Row>
					<F.Ainput label="Ip address" name="cidr" />
					<F.Dropdown label="View">
						<el>external</el>
						<el>internal</el>
					</F.Dropdown>
				</F.Row>
				<F.Row>
					<F.Input label="Mac address"/>
					<F.Space dims="2" />
					<F.Checkbox label="use SMTP" />
				</F.Row>
				<F.Row>
					<F.Adropdown label="Machine" name="machines" />
				</F.Row>
				<F.Row>
					<F.Input label="Comment"/>
				</F.Row>
				<F.Row>
					<F.Input label="Resp. name"/>
					<F.Input label="Resp. mail"/>
				</F.Row>
				<F.Row>
					<F.Space dims="5" />
					<F.Button dims="1" type="submit" >
						Add
					</F.Button>
				</F.Row>
					
			</F.Form>
		);
	}
});

var Select_block = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return { blocks: undefined};
	},

	handleSearch: function(){
			/* XXX this is just an example */
			var els = document.getElementById('Search block').elements;
			var query = "http://localhost/stage-l2s4/nm_pages/api/addrblock?net="+els[0].textContent+"&nb="+els[1].value;	

			console.log("Simulating a query: "+query);

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
				<F.Button dims="1" >
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

ReactDOM.render(<Select_block />, document.getElementById('app'));



