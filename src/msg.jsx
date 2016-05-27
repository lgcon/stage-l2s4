import React from 'react';
import ReactDOM from 'react-dom';
import { Translator, translate} from './modlang.jsx';


var Msg = React.createClass({
	
	contextTypes : {
		lang : React.PropTypes.string
	},

	render: function(){
			console.log("Rendering child");
			return ( <div>
					<p>ciao ciao</p> 
					<p>{translate("Try this")}</p> 
					<p>{translate("Last name")}</p> 
				</div>
			);
	}
});


ReactDOM.render( <Translator> <Msg /> </Translator> , document.getElementById('app'));

