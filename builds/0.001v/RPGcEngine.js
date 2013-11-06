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
		}/*,
		fetchJsonScript: function( params ){
			var requestObj = {
                dataType: "jsonp",
                crossDomain: true,
                isLocal: true,
                timeout: 3000,
                context: this,
                complete: this.onComplete,
                error: this.getScriptError,
                success: this.getScriptSuccess
            };
		},
		onComplete: function(){},
		getScriptSuccess: function( response ){
			console.log(response);
		},
		getScriptError: function( response, textStatus, jqXHR, errorThrown ){
			console.log("Error getting Script");
			console.log(arguments);
		}*/,
		reset: function(){
			this = {};
		},
		playScript: function(){
			console.log(this.config);
		}
	};
})();