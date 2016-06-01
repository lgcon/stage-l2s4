import React from 'react';
import {getJSON, FilteredDd} from './inputs.jsx';
import * as F from './bootstrap-lib/form-utils.jsx';



function form2obj(id){
	var elements = document.getElementById(id).elements;
	
	var obj = {};

	for (var i = 0; i < elements.length; i++){
		
		var value;	
		var el = elements[i];
		var tag = el.tagName.toLowerCase();

		switch (tag) {
			
			case "input":	if (el.type.toLowerCase() == "text")
						value = el.value;
					else if (el.type.toLowerCase() == "checkbox")
						value = el.checked;
				break;

			case "button": value = el.textContent;
			
		}
		
		obj[elements[i].name] = value;
	}

	return obj;

}

/* prop id required */
export var Add_host = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	
	propTypes: { id: React.PropTypes.string.isRequired },	

	handleClick: function (event){
		event.preventDefault();

		var els = form2obj(this.props.id);

		alert("submit "+JSON.stringify(els));
	
		if (this.props.submtCallback) this.props.submtCallback(els);
		
	},



	render: function(){

		var d = this.props.defValues || {};

		return (
			<div>
			<F.Form id={this.props.id}>
				<F.Row>
					<F.InputAdrop label="Name" name ="name" ddname="domain" 
					              defaultValue={d["name"]} ddDef={d["domain"]} />
					<F.Input label="TTL" name="ttl" dims="2+1" defaultValue={d["ttl"]} />
				</F.Row>
				<F.Row>
					<F.Ainput label="Ip address" name="addr" defaultValue={d["addr"]} />
					<F.Dropdown label="View" name="view" defaultValue={d["view"]} >
						<el>external</el>
						<el>internal</el>
					</F.Dropdown>
				</F.Row>
				<F.Row>
					<F.Input label="Mac address" name="mac"/>
					<F.Space dims="2" />
					<F.Checkbox label="use SMTP" name="smtp" defaultChecked={d["smtp"]} />
				</F.Row>
				<F.Row>
					<F.Adropdown label="Machine" name="machines" defaultValue={d["machines"]} />
				</F.Row>
				<F.Row>
					<F.Input label="Comment" name="comment" />
				</F.Row>
				<F.Row>
					<F.Input label="Resp. name" name="rname" defaultValue={d["rname"]} />
					<F.Input label="Resp. mail" name="rmail" defaultValue={d["rmail"]} />
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
		var query = "http://130.79.91.54/stage-l2s4/nm_pages/api/addrblock";//+els[0].textContent+"&nb="+els[1].value;	

		getJSON(query,function(res){this.setState({ blocks: res });}.bind(this));
	},

	search_form: function(){
		return (
			<F.Row>
				<FilteredDd label="Network" name="cidr"  />
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



/* dotted-quad IP to integer */
function IPv4_dotquadA_to_intA( strbits ) {
	var split = strbits.split( '.', 4 );
	var myInt = (
		parseFloat( split[0] * 16777216 )	/* 2^24 */
	  + parseFloat( split[1] * 65536 )		/* 2^16 */
	  + parseFloat( split[2] * 256 )		/* 2^8  */
	  + parseFloat( split[3] )
	);
	return myInt;
}

/* integer IP to dotted-quad */
function IPv4_intA_to_dotquadA( strnum ) {
	var byte1 = ( strnum >>> 24 );
	var byte2 = ( strnum >>> 16 ) & 255;
	var byte3 = ( strnum >>>  8 ) & 255;
	var byte4 = strnum & 255;
	return ( byte1 + '.' + byte2 + '.' + byte3 + '.' + byte4 );
}

export var Add_block = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	getInitialState: function(){
		return {contents: 0, defaultAddHost: {} };
	},


	handleSelect: function(event){
		event.preventDefault();
		this.setState({contents: 1});
	},

	addNext: function(oldValues){
		
		oldValues["name"] = oldValues["name"]
			.replace(/[0-9][0-9]*$/,function(x){ return parseInt(x)+1; })		
	
		oldValues["addr"] = IPv4_intA_to_dotquadA(
					IPv4_dotquadA_to_intA(oldValues["addr"])+1
				    );
		
		this.setState({contents: 2, defaultAddHost: oldValues});	
		
	},

	componentDidUpdate: function(){
		if (this.state.contents == 2) 
			this.setState({contents: 1});
	},


	render: function(){

		switch (this.state.contents) {

			case 0: return ( <Select_block onSelect={this.handleSelect} /> );

			case 1: return ( 
					<Add_host id="Addblk_addh" defValues={this.state.defaultAddHost} submtCallback={this.addNext} />
				);

			case 2: return ( <div></div> ); // Little hack to rerender
		}
	}
});


