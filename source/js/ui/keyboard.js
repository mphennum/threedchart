/*
Keyboard: keyboard controls / actions
*/

THREEDCHARTS.Keyboard = function(params){
	var _this = this;

	function construct(){
		_this.controller = params.controller;
		_this.canvas = _this.controller.canvas;

		_this.canvas.addEventListener('keydown', keydown, false);
		_this.canvas.addEventListener('keyup', keyup, false);
	}

	// keyboard

	function keydown(event){
		//console.log(event.keyCode);

		switch(event.keyCode){
			default:
				break;
		}
	}

	function keyup(event){
		//console.log(event.keyCode);

		switch(event.keyCode){
			default:
				break;
		}
	}

	construct();
};
