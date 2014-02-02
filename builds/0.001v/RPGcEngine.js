var RPGcEngine = {};

(function(){
	RPGcEngine = function( config, stage ){
        if( !(this instanceof RPGcEngine))
            return new RPGcEngine( config, stage );

        this.config = config;
        this.stage = stage;

        if(typeof(this.config.scriptLocation) == "string"){
        	this.init();
        }
	};

	RPGcEngine.prototype = {
		init: function( params ){
			/*this.fetchJsonScript();*/
		},
		reset: function(){
			this = {};
		},
		playScript: function(){
			var thisRef = this;
			var dialogArr = this.config.scriptContent.dialog;
				//console.log(this.config);

			for(var i = 0; i < dialogArr.length; i++){
				console.log(dialogArr[i]);
			}
		}
	};
})();