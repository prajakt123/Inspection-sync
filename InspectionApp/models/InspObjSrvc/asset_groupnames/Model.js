define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Group_Id : function(val, state){
			state['Asset_Group_Id'] = val;
		},
		Asset_Id : function(val, state){
			state['Asset_Id'] = val;
		},
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		Group_Id : function(val, state){
			state['Group_Id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function asset_groupnames(defaultValues){
		var privateState = {};
			privateState.Asset_Group_Id = defaultValues?(defaultValues["Asset_Group_Id"]?defaultValues["Asset_Group_Id"]:null):null;
			privateState.Asset_Id = defaultValues?(defaultValues["Asset_Id"]?defaultValues["Asset_Id"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Group_Id = defaultValues?(defaultValues["Group_Id"]?defaultValues["Group_Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Asset_Group_Id" : {
					get : function(){return privateState.Asset_Group_Id},
					set : function(val){throw Error("Asset_Group_Id cannot be changed."); },
					enumerable : true,
				},
				"Asset_Id" : {
					get : function(){return privateState.Asset_Id},
					set : function(val){
						setterFunctions['Asset_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"CreatedTimestamp" : {
					get : function(){return privateState.CreatedTimestamp},
					set : function(val){
						setterFunctions['CreatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Group_Id" : {
					get : function(){return privateState.Group_Id},
					set : function(val){
						setterFunctions['Group_Id'].call(this,val,privateState);
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
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(asset_groupnames);
	
	//Create new class level validator object
	BaseModel.Validator.call(asset_groupnames);
	
	var registerValidatorBackup = asset_groupnames.registerValidator;
	
	asset_groupnames.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( asset_groupnames.isValid(this, propName, val) ){
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
	
	asset_groupnames.relations = relations;
	
	asset_groupnames.prototype.isValid = function(){
		return asset_groupnames.isValid(this);
	};
	
	asset_groupnames.prototype.objModelName = "asset_groupnames";
	
	return asset_groupnames;
});