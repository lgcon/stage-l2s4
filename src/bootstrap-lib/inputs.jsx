import React from 'react';
import ReactDOM from 'react-dom';


/*************** TODO part of this file will be part of form-utils ********************/


/* XXX this is a temporary url to the api */
var apiURL = 'http://130.79.91.54/stage-l2s4/nm_pages/api';


/* XXX same as $.getJSON but defines mimeType
   usefull in case of static files */
export var getJSON = function(url, success, callback){
	$.ajax({
		url: url,
		dataType: 'json',
		mimeType: 'application/json',
		success:  success,
		complete: callback
	});
}
		

/**
 * Prompters is the object containing all the handlers that AutoInput
 * can use. Every handler is an object containing one or more functions 
 * and all the usefull stuffs you need in order to manage your suggestions. 
 * There are few things to know:
 *
 * - The name of the handler must correspond with the contents of 
 *   the `name` props passed to `AutoInput`
 * 
 * - Every handler must/can (see required/optional) contain the 
 *   following stuffs:
 *	- A function `init(callback)` (optional):
 *		this function will be called once when the element
 *		is about to be mounted.
 *	- A function `getSuggestions(value,callback)` (required if input):
 *		this function take the actual value of the input and 
 *		must return an array of suggestions
 * 	- A function `getValues()` (required if dropdown):
 *		same as getSuggestions but used for the dropdown
 */

export var Prompters = {
	
	/*************************  Handler name="cidr" ***********************/
	cidr: { 
		/* Here will be stored all the network addresses */
		networks: [],

		/* Fill the networks array with the API answer */
		init : function (callback)  { 
			console.log("init");
			console.log(this.networks);
			getJSON(apiURL+'/networks', function(response){
				for (var i = 0; i < response.length; i++){
					this.networks.push(response[i]["addr4"]);
					this.networks.push(response[i]["addr6"]);
				}
			}.bind(this), callback);
		},

		/* Case-insensitive suggestions based on the 
		   beginning of the addresses*/
		getSuggestions: function (value, callback){
			var inputValue = value.trim().toLowerCase();
			var inputLength = inputValue.length;

			if (inputLength === 0) return [];

			return this.networks.filter(function (network) {
		    		return network.toLowerCase().slice(0, inputLength) === inputValue;
		  	});
		},

		getValues: function (){
			return this.networks;
		}
	},

	/*************************  Handler name="machine" ***********************/

	machines: {
		machines: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/machines', function(response){
					this.machines = response;
					
			}.bind(this), callback);
		},

		/* Gives all the machines */
		getValues: function (){
			return this.machines;
		}
	},


	/*************************  Handler name="domain" ***********************/
		
	domain: {
		domains: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/domains', function(response){
					this.domains= response;
					
			}.bind(this), callback);
		},

		/* Gives all the machines */
		getValues: function (){
			return this.domains;
		}
	},

	/*************************  Handler name="addr" ***********************/

	addr: {
		addrs: [],

		/* Fill the machines array with the API answer */
		init : function (callback)  { 
			getJSON(apiURL+'/addr', function(response){
					this.addrs= response;
					
			}.bind(this), callback);
		},

		getSuggestions: function (value, callback){
			var inputValue = value.trim().toLowerCase();
			var inputLength = inputValue.length;

			if (inputLength === 0) return [];

			return this.addrs.filter(function (addr) {
		    		return addr.toLowerCase().slice(0, inputLength) === inputValue;
		  	});
		},

		/* Gives all the addresses */
		getValues: function (){
			return this.addrs;
		}
	}

}



