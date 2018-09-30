define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		extension : function(val, state){
			state['extension'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		media_id : function(val, state){
			state['media_id'] = val;
		},
		Timestamp : function(val, state){
			state['Timestamp'] = val;
		},
		type : function(val, state){
			state['type'] = val;
		},
		url : function(val, state){
			state['url'] = val;
		},
	};
	
	
	//Create the Model Class
	function media(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.extension = defaultValues?(defaultValues["extension"]?defaultValues["extension"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.media_id = defaultValues?(defaultValues["media_id"]?defaultValues["media_id"]:null):null;
			privateState.Timestamp = defaultValues?(defaultValues["Timestamp"]?defaultValues["Timestamp"]:null):null;
			privateState.type = defaultValues?(defaultValues["type"]?defaultValues["type"]:null):null;
			privateState.url = defaultValues?(defaultValues["url"]?defaultValues["url"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"CreatedTimestamp" : {
					get : function(){return privateState.CreatedTimestamp},
					set : function(val){
						setterFunctions['CreatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"extension" : {
					get : function(){return privateState.extension},
					set : function(val){
						setterFunctions['extension'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedTimestamp" : {
					get : function(){return privateState.LastUpdatedTimestamp},
					set : function(val){
						setterFunctions['LastUpdatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"media_id" : {
					get : function(){return privateState.media_id},
					set : function(val){throw Error("media_id cannot be changed."); },
					enumerable : true,
				},
				"Timestamp" : {
					get : function(){return privateState.Timestamp},
					set : function(val){
						setterFunctions['Timestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"type" : {
					get : function(){return privateState.type},
					set : function(val){
						setterFunctions['type'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"url" : {
					get : function(){return privateState.url},
					set : function(val){
						setterFunctions['url'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(media);
	
	//Create new class level validator object
	BaseModel.Validator.call(media);
	
	var registerValidatorBackup = media.registerValidator;
	
	media.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( media.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	
	var relations = [
	];
	
	media.relations = relations;
	
	media.prototype.isValid = function(){
		return media.isValid(this);
	};
	
	media.prototype.objModelName = "media";
	
	return media;
});