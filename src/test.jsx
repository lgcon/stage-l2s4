import React from 'react';
import ReactDOM from 'react-dom';


class Translator extends React.Component {
	
	constructor(){
		super();

		/* If the language is english we don't need to load any translation */
		if (this.getLang() != "en" ){
			this.state ={translation: null, loading: true};
			this.updateTranslations();
		} else {
			this.state ={translation: null, loading: false};
		}

	}

	/* Get the file containing the translations and assign his 
  	    contents to the global var translations */
	updateTranslations() { 
			$.ajax({
				url:'http://localhost:82/nm_pages/lang/'+this.getLang()+'.json', 
				dataType: 'json',
		    		success: function(response, status, xhr){ 
						this.setState({translations: response, loading: false});
					 }.bind(this),
		    		error: function(xhr, status, error){
						 console.error(status+" "+error);
						 this.setState({translations: null, loading: false});
					}.bind(this)
		 	});
	}


	/* Get document lang attribute (ex: <html lang="fr">). 
   	   English is the default language */
	getLang(){return document.documentElement.lang || "en";}


	/* Translate a given string if only there is a tranlation available.
   	   Returns the original string otherwise */
	translate(text) {
			
			/* If loading just put spaces */
			if (this.state.loading) return " ".repeat(text.length);

			/* If there is a translation use it */
			var tr = this.state.translations;
			if (tr && tr[text]) return tr[text];

			/* Otherwise do not translate */
			return text;
	}

	getChildContext(){
		console.log("getChildContext");
		return ({
			lang: this.getLang(),
			translate: this.translate
		});
	}
	
			
	render(){
			console.log("Rendering");
			return ( <div> {this.props.children} </div> );	
		}
}


		
/* The children context */
Translator.childContextTypes =  {
		lang : React.PropTypes.string,
		translate : React.PropTypes.func
}

export default Translator;
