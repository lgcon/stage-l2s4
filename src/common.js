import React from 'react';


export var APIURL = "http://130.79.91.54/stage-l2s4/nm_pages/api";


/* Same as $.getJSON but defines mimeType
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
 
