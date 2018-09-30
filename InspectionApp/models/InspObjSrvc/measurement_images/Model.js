define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measureemnt_Image_Id : function(val, state){
			state['Measureemnt_Image_Id'] = val;
		},
		Measurement_History_Id : function(val, state){
			state['Measurement_History_Id'] = val;
		},
		media_id : function(val, state){
			state['media_id'] = val;
		},
	};
	
	
	//Create the Model Class
	function measurement_images(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Measureemnt_Image_Id = defaultValues?(defaultValues["Measureemnt_Image_Id"]?defaultValues["Measureemnt_Image_Id"]:null):null;
			privateState.Measurement_History_Id = defaultValues?(defaultValues["Measurement_History_Id"]?defaultValues["Measurement_History_Id"]:null):null;
			privateState.media_id = defaultValues?(defaultValues["media_id"]?defaultValues["media_id"]:null):null;
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
				"LastUpdatedTimestamp" : {
					get : function(){return privateState.LastUpdatedTimestamp},
					set : function(val){
						setterFunctions['LastUpdatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Measureemnt_Image_Id" : {
					get : function(){return privateState.Measureemnt_Image_Id},
					set : function(val){throw Error("Measureemnt_Image_Id cannot be changed."); },
					enumerable : true,
				},
				"Measurement_History_Id" : {
					get : function(){return privateState.Measurement_History_Id},
					set : function(val){
						setterFunctions['Measurement_History_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"media_id" : {
					get : function(){return privateState.media_id},
					set : function(val){
						setterFunctions['media_id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(measurement_images);
	
	//Create new class level validator object
	BaseModel.Validator.call(measurement_images);
	
	var registerValidatorBackup = measurement_images.registerValidator;
	
	measurement_images.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( measurement_images.isValid(this, propName, val) ){
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
	
	measurement_images.relations = relations;
	
	measurement_images.prototype.isValid = function(){
		return measurement_images.isValid(this);
	};
	
	measurement_images.prototype.objModelName = "measurement_images";
	
	return measurement_images;
});