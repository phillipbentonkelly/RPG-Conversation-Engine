var RPGcEngine = {};

(function(){
	RPGcEngine = function( config, stage ){
        if( !(this instanceof RPGcEngine))
            return new RPGcEngine( config, stage );

        this.config = config;
        this.scriptCurrTurn = 0;
        this.stage = stage;
        this.stageObj = $(this.stage);
        this.openedDialogs = [];
        this.charOpenDialogs = [];
        this.currDialogInfo = {
        	"position": "",
        	"characterId": ""
        };

        console.log(this);
	};

	RPGcEngine.prototype = {
		newScript: function(){

		},
		// Treat playScript as the init ...
		playScript: function(){
			var thisRef = this;
			var dialogArr = this.config.scriptContent.dialog;

			this.scriptTurn( dialogArr[this.scriptCurrTurn] );
		},
		scriptTurn: function( scriptDataObj ){
			var thisRef = this;
			this.scriptCurrTurn += 1;

			if(this.scriptCurrTurn <= this.config.scriptContent.dialog.length){
				//console.log(scriptDataObj);

				this.targetObj = $(thisRef.stage);
				thisRef.createSpeechBubble( scriptDataObj );
			}
		},
		createSpeechBubble: function( dataObj ){
			var thisRef = this;
			var targetCharObj = $('#' + dataObj.characterId);

			var ui = {
				"mainContainer": $('<div class="rpgcEngine_dialogBox" />'),
				"upArrow": $('<div class="dialogArrow_Up" />'),
				"downArrow": $('<div class="dialogArrow_Down" />'),
				"wrapperContainer": $('<div class="wrapperContainer">'),
				"innerContainer": $('<div class="innerContainer row">'),
				"profile": $('<img class="profile" />'),
				"characterName": $('<label class="characterName" />'),
				"dialogCol": $('<div class="dialogCol col" />')
			};


			if(this.currDialogInfo.characterId != dataObj.characterId){
				this.currDialogInfo.characterId = dataObj.characterId;
				this.currDialogInfo.position = (this.currDialogInfo.position == 'Down')? 'Up' : 'Down';
			}else{

			}
			//console.log(this.currDialogInfo.position);


				ui.profile.attr('src', '');

				// Append the content (text) in order mark the dimesion that will be set before rewriting
				ui.characterName.text( dataObj.characterName );
				ui.dialogCol.append( dataObj.lines );

					ui.mainContainer.attr('character', dataObj.characterId);
					ui.innerContainer
						.append( ui.profile )
						.append( ui.characterName )
						.append( ui.dialogCol );
						
						ui.wrapperContainer.append( ui.innerContainer );

						if(this.currDialogInfo.position == 'Down'){
							ui.mainContainer.append( ui.upArrow );
						}
						
						ui.mainContainer.append( ui.wrapperContainer );

						if(this.currDialogInfo.position == 'Up'){
							ui.mainContainer.append( ui.downArrow );
						}

				ui.mainContainer
					.css('top', Math.round(targetCharObj.position().top) + targetCharObj.height() + 10)
					.css('left', Math.round(targetCharObj.position().left) - (ui.mainContainer.width()/2));

				
				
			this.targetObj.append( ui.mainContainer ).promise().done(function(){
				thisRef.speechBubbleAdjustments( ui.mainContainer, thisRef.targetObj, dataObj, targetCharObj );
			});
		},
		speechBubbleAdjustments: function( mainContainer, targetObj, dataObj, targetCharObj ){
			var thisRef = this;
			var dialogCol = $(mainContainer.find('.dialogCol'));
			var arrowObj = {};
			var dialogTopPos = (Math.round(targetCharObj.offset().top)-targetCharObj.height()) - 40;
			
			if(thisRef.currDialogInfo.position == 'Down'){
				arrowObj = $(mainContainer.find('.dialogArrow_Up'));
			}else{
				arrowObj = $(mainContainer.find('.dialogArrow_Down'));
				mainContainer.css('top', dialogTopPos);
			}

			if((Math.round(mainContainer.position().left) + (mainContainer.width()+20)) > targetObj.width()){
				mainContainer.css('left', (targetObj.width() - mainContainer.width() - 115));
			}


			arrowObj.css('margin-left', (Math.round(targetCharObj.offset().left))-Math.round(mainContainer.offset().left)+13);

			mainContainer.css('width', mainContainer.width());
			mainContainer.css('height', mainContainer.height());

			/* Rewrite the content setting it to empty. After this is set you can start printing 
			it to the area (one letter/word) */
			dialogCol.html( '' ).promise().done(function(){
				mainContainer.animate({
					opacity: 1.0
				}, 1500, function(){
					thisRef.typeContent( dataObj.lines, dialogCol, dataObj, mainContainer );
				});
			});
		},
		typeContent: function( contentString, targetObj, dataObj, parentObj ){
			var thisRef = this;
			var textInterval = {};
			var currStringIndex = 0;

			if(typeof(contentString) != 'undefined' && contentString.length){
				textInterval = setInterval(function(){
					if(currStringIndex == contentString.length){
						clearInterval(textInterval);

						//console.log("Finished!");
						thisRef.handleDialogOnFinishStage( dataObj, parentObj );
					}else{
						targetObj.text( targetObj.text() + contentString.charAt(currStringIndex) );
						currStringIndex = currStringIndex + 1;
					}

					
				}, thisRef.config.textSpeed);
			}
		},
		handleDialogOnFinishStage: function( dataObj, targetObj ){
			var thisRef = this;

			if(typeof(dataObj.onFinish.type) != 'undefined' && dataObj.onFinish.type.length > 0){
				switch(dataObj.onFinish.type){
					case "onFinish":
						setTimeout(function(){
							thisRef.removeDialogBubble( targetObj, dataObj, dataObj.onFinish.advance );
						}, dataObj.onFinish.delay);
					default: ""
				}
			}
			if(dataObj.onFinish.type == 'onFinish'){

			}
		},
		removeDialogBubble: function( targetObj, dataObj, advance ){
			var thisRef = this;

			targetObj.animate({
				opacity: 0
			}, 400, function(){
				targetObj.remove().promise().done(function(){
					if(advance == true){
						thisRef.playScript();
					}
					/*
					console.log(targetObj);
					console.log("ADVANCE!!!");
					*/
				});
			});
		}
	};

	RPGcEngine.SceneUI = function( sceneCanvas ){
        if( !(this instanceof RPGcEngine.SceneUI))
            return new RPGcEngine.SceneUI( sceneCanvas );

        this.sceneCanvas = sceneCanvas;
        this.sceneCanvasObj = $(this.sceneCanvas);

        /*console.log(this);*/
	};

	RPGcEngine.SceneUI.prototype = {
	};
})();