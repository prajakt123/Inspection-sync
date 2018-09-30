define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Id : function(val, state){
			state['Asset_Id'] = val;
		},
		Asset_Measurement_Set_Id : function(val, state){
			state['Asset_Measurement_Set_Id'] = val;
		},
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measurement_Set_Id : function(val, state){
			state['Measurement_Set_Id'] = val;
		},
	};
	
	
	//Create the Model Class
	function asset_measurement_set(defaultValues){
		var privateState = {};
			privateState.Asset_Id = defaultValues?(defaultValues["Asset_Id"]?defaultValues["Asset_Id"]:null):null;
			privateState.Asset_Measurement_Set_Id = defaultValues?(defaultValues["Asset_Measurement_Set_Id"]?defaultValues["Asset_Measurement_Set_Id"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Measurement_Set_Id = defaultValues?(defaultValues["Measurement_Set_Id"]?defaultValues["Measurement_Set_Id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Asset_Id" : {
					get : function(){return privateState.Asset_Id},
					set : function(val){
						setterFunctions['Asset_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Asset_Measurement_Set_Id" : {
					get : function(){return privateState.Asset_Measurement_Set_Id},
					set : function(val){throw Error("Asset_Measurement_Set_Id cannot be changed."); },
					enumerable : true,
				},
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
				"Measurement_Set_Id" : {
					get : function(){return privateState.Measurement_Set_Id},
					set : function(val){
						setterFunctions['Measurement_Set_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(asset_measurement_set);
	
	//Create new class level validator object
	BaseModel.Validator.call(asset_measurement_set);
	
	var registerValidatorBackup = asset_measurement_set.registerValidator;
	
	asset_measurement_set.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( asset_measurement_set.isValid(this, propName, val) ){
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
	
	asset_measurement_set.relations = relations;
	
	asset_measurement_set.prototype.isValid = function(){
		return asset_measurement_set.isValid(this);
	};
	
	asset_measurement_set.prototype.objModelName = "asset_measurement_set";
	
	return asset_measurement_set;
});