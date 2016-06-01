import React from 'react';
import ReactDOM from 'react-dom';
import {Translator} from './lang.jsx';
import {Tabs, Pane} from './bootstrap-lib/tabs.jsx';
import {Add_host, Add_block } from './forms/add.jsx';


var App = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	componentWillMount: function(){
		var el = $("#langButton")[0];
		el.onclick = function(){ 

			var html = document.documentElement;

			if (html.lang == "fr" )
				html.lang = "en";
			else 
				html.lang = "fr";

			updateTranslations();
		}
	},

	render: function () {
		return ( 
				<Tabs >
					<Pane label="Add single host" >
						<Add_host id="asdasd" />
					</Pane> 
					<Pane label="Add address block" >
						<Add_block />
					</Pane> 
					<Pane label="Others..." >
						<div> This is my tab 3 contents! </div> 
					</Pane> 
				</Tabs> 
		);
	}
});

ReactDOM.render( <Translator> <App /> </Translator>, document.getElementById('app'));
