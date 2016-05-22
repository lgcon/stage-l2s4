import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';


const networks = [ '192.0.2.0/23', '203.34.9.0/24', '188.231.0.0/16'];

function getSuggestions_cidr(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : networks.filter( network =>
    network.toLowerCase().slice(0, inputLength) === inputValue
  );
}



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
      suggestions: []//getSuggestions('') TODO
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


/* Get all the elements whose class is autosuggest */
var elements_list = document.getElementsByClassName('autosuggest-input');

/* Render the list of elements */
for (var i = 0; i < elements_list.length; i++){
	
	/* Collect all the attributes */
	var props = {}; var attributes = elements_list[i].attributes;
	for (var j = 0; j < attributes.length; j++){
		props[attributes[j].name] = attributes[j].value;
	}

	/* Render passing the attributes */
	ReactDOM.render( <Simplesuggester inputProps={props}/>, elements_list[i]);
}
