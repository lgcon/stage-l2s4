


var D = function(){

	this.b = function(){
		console.log(this.c);
	};

	this.c = "ciao";
}

export var A = new D();

