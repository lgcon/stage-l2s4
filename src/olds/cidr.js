'use strict';

var networks = [];


function updateNetworks()  {
	$.getJSON('http://localhost:82/networks', 
	    function(response, statut, xhr){
		for (var i = 0; i < response.length; i++){
			networks.push(response[i]["addr4"]);
			networks.push(response[i]["addr6"]);
                }
	 });
};
updateNetworks();


function getSuggestions_cidr(value) {
  var inputValue = value.trim().toLowerCase();
  var inputLength = inputValue.length;

  return inputLength === 0 ? [] : networks.filter(function (network) {
    return network.toLowerCase().slice(0, inputLength) === inputValue;
  });
};







