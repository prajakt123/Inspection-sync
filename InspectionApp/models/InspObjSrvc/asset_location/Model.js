define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Location_Id : function(val, state){
			state['Asset_Location_Id'] = val;
		},
		City : function(val, state){
			state['City'] = val;
		},
		Country : function(val, state){
			state['Country'] = val;
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
		Latitude : function(val, state){
			state['Latitude'] = val;
		},
		Longitude : function(val, state){
			state['Longitude'] = val;
		},
		Post_Code : function(val, state){
			state['Post_Code'] = val;
		},
		Region : function(val, state){
			state['Region'] = val;
		},
		Street : function(val, state){
			state['Street'] = val;
		},
	};
	
	
	//Create the Model Class
	function asset_location(defaultValues){
		var privateState = {};
			privateState.Asset_Location_Id = defaultValues?(defaultValues["Asset_Location_Id"]?defaultValues["Asset_Location_Id"]:null):null;
			privateState.City = defaultValues?(defaultValues["City"]?defaultValues["City"]:null):null;
			privateState.Country = defaultValues?(defaultValues["Country"]?defaultValues["Country"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.Id = defaultValues?(defaultValues["Id"]?defaultValues["Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Latitude = defaultValues?(defaultValues["Latitude"]?defaultValues["Latitude"]:null):null;
			privateState.Longitude = defaultValues?(defaultValues["Longitude"]?defaultValues["Longitude"]:null):null;
			privateState.Post_Code = defaultValues?(defaultValues["Post_Code"]?defaultValues["Post_Code"]:null):null;
			privateState.Region = defaultValues?(defaultValues["Region"]?defaultValues["Region"]:null):null;
			privateState.Street = defaultValues?(defaultValues["Street"]?defaultValues["Street"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Asset_Location_Id" : {
					get : function(){return privateState.Asset_Location_Id},
					set : function(val){throw Error("Asset_Location_Id cannot be changed."); },
					enumerable : true,
				},
				"City" : {
					get : function(){return privateState.City},
					set : function(val){
						setterFunctions['City'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Country" : {
					get : function(){return privateState.Country},
					set : function(val){
						setterFunctions['Country'].call(this,val,privateState);
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
				"Latitude" : {
					get : function(){return privateState.Latitude},
					set : function(val){
						setterFunctions['Latitude'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Longitude" : {
					get : function(){return privateState.Longitude},
					set : function(val){
						setterFunctions['Longitude'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Post_Code" : {
					get : function(){return privateState.Post_Code},
					set : function(val){
						setterFunctions['Post_Code'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Region" : {
					get : function(){return privateState.Region},
					set : function(val){
						setterFunctions['Region'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Street" : {
					get : function(){return privateState.Street},
					set : function(val){
						setterFunctions['Street'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(asset_location);
	
	//Create new class level validator object
	BaseModel.Validator.call(asset_location);
	
	var registerValidatorBackup = asset_location.registerValidator;
	
	asset_location.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( asset_location.isValid(this, propName, val) ){
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
	
	asset_location.relations = relations;
	
	asset_location.prototype.isValid = function(){
		return asset_location.isValid(this);
	};
	
	asset_location.prototype.objModelName = "asset_location";
	
	return asset_location;
});