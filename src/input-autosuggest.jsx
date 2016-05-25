import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';



/* Common part */

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion;                 	  // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

class Simplesuggester extends React.Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }


  getSuggestions(value){
    var handler = eval("getSuggestions_"+this.props.inputProps.name);
    return handler(value);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }



  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    this.props.inputProps.value = value;
    this.props.inputProps.onChange = this.onChange;

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={this.props.inputProps} />
    );
  }
}





var copyAttributes = function (element) {
	var properties = {}; 
	var attributes = element.attributes;

	/* Copy each attribute */
	for (var i = 0; i < attributes.length; i++){
		properties[attributes[i].name] = attributes[i].value;
	}

	
	var style_obj = {}; // The style property is empty by default

	/* Convert the style attribute into an object 
	 * @warn: somehow the module react-autosuggest consider only the first
	 *	  style property. In general is better to use stylesheets.
	*/

	/*
	var style_chunks = attributes["style"].value.split(';');
	style_chunks.forEach(function(property) {
    		var tup = property.split(':');
    		style_obj[tup[0]] = tup[1];
		console.log(style_obj);
	});
	*/

	properties["style"] = style_obj;

	return properties;
}



/* Get all the elements whose class is autosuggest */
var elements_list = document.getElementsByClassName('autosuggest-input');

/* Render the list of elements */
for (var i = 0; i < elements_list.length; i++){
	
	/* Copy all the attributes */
	var properties = copyAttributes(elements_list[i]);

	/* Render passing the attributes */
	ReactDOM.render( <Simplesuggester inputProps={properties} />, elements_list[i]);
}
