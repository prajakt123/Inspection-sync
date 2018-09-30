define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Type_Id : function(val, state){
			state['Asset_Type_Id'] = val;
		},
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		Description : function(val, state){
			state['Description'] = val;
		},
		Id : function(val, state){
			state['Id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		Timestamp : function(val, state){
			state['Timestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function asset_type(defaultValues){
		var privateState = {};
			privateState.Asset_Type_Id = defaultValues?(defaultValues["Asset_Type_Id"]?defaultValues["Asset_Type_Id"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.Id = defaultValues?(defaultValues["Id"]?defaultValues["Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.Timestamp = defaultValues?(defaultValues["Timestamp"]?defaultValues["Timestamp"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Asset_Type_Id" : {
					get : function(){return privateState.Asset_Type_Id},
					set : function(val){throw Error("Asset_Type_Id cannot be changed."); },
					enumerable : true,
				},
				"CreatedTimestamp" : {
					get : function(){return privateState.CreatedTimestamp},
					set : function(val){
						setterFunctions['CreatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Description" : {
					get : function(){return privateState.Description},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Id" : {
					get : function(){return privateState.Id},
					set : function(val){
						setterFunctions['Id'].call(this,val,privateState);
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
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Timestamp" : {
					get : function(){return privateState.Timestamp},
					set : function(val){
						setterFunctions['Timestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(asset_type);
	
	//Create new class level validator object
	BaseModel.Validator.call(asset_type);
	
	var registerValidatorBackup = asset_type.registerValidator;
	
	asset_type.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( asset_type.isValid(this, propName, val) ){
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
	
	asset_type.relations = relations;
	
	asset_type.prototype.isValid = function(){
		return asset_type.isValid(this);
	};
	
	asset_type.prototype.objModelName = "asset_type";
	
	return asset_type;
});