import React from 'react';
import ReactDOM from 'react-dom';



var Dict = {

	lang: "en",

	loading: false,

	translations: null,

	changeLang_event: new Event('changeLang'),

	/* Get document lang attribute (ex: <html lang="fr">). 
   	   English is the default language */
	getLang: () => document.documentElement.lang || "en",
	
	/* Get the file containing the translations and assign his 
  	    contents to the global var translations */
	updateTranslations: function() { 
		this.lang = this.getLang();
		if (this.lag == "en") return;
		
		this.loading = true;
		$.ajax({
			url:'http://localhost:82/nm_pages/lang/'+this.lang+'.json', 
			dataType: 'json',
	    		success: function(response, status, xhr){ 
					this.translations = response;
				 }.bind(this),
	    		error: function(xhr, status, error){
					 console.error(status+" "+error);
				}.bind(this),
	    		complete: function(xhr, status){
					this.loading = false;
					window.dispatchEvent(this.changeLang_event);
				}.bind(this)
	 	});
	}
}
	

/* Translate a given string if only there is a tranlation available.
   Returns the original string otherwise */
export var translate = function (text) {
			
		/* If loading just put spaces */
		if (Dict.loading) return " ".repeat(text.length);

		/* If there is a translation use it */
		var tr = Dict.translations;
		if (tr && tr[text]) return tr[text];

		/* Otherwise do not translate */
		return text;
}



export var Translator = React.createClass({
	
	childContextTypes : {
		lang : React.PropTypes.string
	},

	getChildContext: function(){
		console.log("getChildContext");
		return ({
			lang: Dict.lang
		});
	},

	componentWillMount: function(){
		console.log("Listening...");
		window.addEventListener('changeLang',
			function(){
				console.log("Go!");
				this.forceUpdate();
			}.bind(this)
		);
	},
		
			
	render: function(){
			console.log("Rendering");
			return ( <div> {this.props.children} </div> );	
		}
});

/* Trigger update */
Dict.updateTranslations();
