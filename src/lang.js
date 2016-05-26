'use strict';

/* Object containing all the translations */
var translations = null;

/* Get document lang attribute (ex: <html lang="fr">). 
   English is the default language */
var lang = document.documentElement.lang || "en";



/* Get the file containing the translations and assign his 
   contents to the global var translations */
function getTranslations()  {
	$.ajax({
		url:'http://localhost:82/nm_pages/lang/'+lang+'.json', 
		dataType: 'json',
		async: false,
	    	success: function(response, status, xhr){ translations = response; },
	    	error: function(xhr, status, error){ console.error(status+" "+error); }
	 });
};



/* If the language is english we don't need to load any translation */
if (lang != "en" ) getTranslations();



/* Translate a given string if only there is a tranlation available.
   Returns the original string otherwise */
function translate(text){
	if (translations && translations[text]) return translations[text];

	return text;
}	

