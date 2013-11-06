var RPG_CE = {};

(function(){
	RPG_CE = function( config, stage,  ){
        if( !(this instanceof RPG_CE))
            return new RPG_CE();

        this.response = {found: false, filePath: ''};
	};

	RPG_CE.prototype = {
		init: function( params ){
			if(typeof(params) === 'object'){
				
			}
		},
		reset: function(){
			this = {};
		}
	};
})();