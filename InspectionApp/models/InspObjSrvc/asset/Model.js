define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Description : function(val, state){
			state['Asset_Description'] = val;
		},
		Asset_Id : function(val, state){
			state['Asset_Id'] = val;
		},
		Asset_Img_URL : function(val, state){
			state['Asset_Img_URL'] = val;
		},
		Asset_Location_Id : function(val, state){
			state['Asset_Location_Id'] = val;
		},
		Asset_Type_Id : function(val, state){
			state['Asset_Type_Id'] = val;
		},
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		Id : function(val, state){
			state['Id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Manufacture_Model_Nbr : function(val, state){
			state['Manufacture_Model_Nbr'] = val;
		},
		Manufacture_Part_Nbr : function(val, state){
			state['Manufacture_Part_Nbr'] = val;
		},
		Manufacture_Serial_Nbr : function(val, state){
			state['Manufacture_Serial_Nbr'] = val;
		},
		Reference_Doc : function(val, state){
			state['Reference_Doc'] = val;
		},
	};
	
	
	//Create the Model Class
	function asset(defaultValues){
		var privateState = {};
			privateState.Asset_Description = defaultValues?(defaultValues["Asset_Description"]?defaultValues["Asset_Description"]:null):null;
			privateState.Asset_Id = defaultValues?(defaultValues["Asset_Id"]?defaultValues["Asset_Id"]:null):null;
			privateState.Asset_Img_URL = defaultValues?(defaultValues["Asset_Img_URL"]?defaultValues["Asset_Img_URL"]:null):null;
			privateState.Asset_Location_Id = defaultValues?(defaultValues["Asset_Location_Id"]?defaultValues["Asset_Location_Id"]:null):null;
			privateState.Asset_Type_Id = defaultValues?(defaultValues["Asset_Type_Id"]?defaultValues["Asset_Type_Id"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Id = defaultValues?(defaultValues["Id"]?defaultValues["Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Manufacture_Model_Nbr = defaultValues?(defaultValues["Manufacture_Model_Nbr"]?defaultValues["Manufacture_Model_Nbr"]:null):null;
			privateState.Manufacture_Part_Nbr = defaultValues?(defaultValues["Manufacture_Part_Nbr"]?defaultValues["Manufacture_Part_Nbr"]:null):null;
			privateState.Manufacture_Serial_Nbr = defaultValues?(defaultValues["Manufacture_Serial_Nbr"]?defaultValues["Manufacture_Serial_Nbr"]:null):null;
			privateState.Reference_Doc = defaultValues?(defaultValues["Reference_Doc"]?defaultValues["Reference_Doc"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"Asset_Description" : {
					get : function(){return privateState.Asset_Description},
					set : function(val){
						setterFunctions['Asset_Description'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Asset_Id" : {
					get : function(){return privateState.Asset_Id},
					set : function(val){throw Error("Asset_Id cannot be changed."); },
					enumerable : true,
				},
				"Asset_Img_URL" : {
					get : function(){return privateState.Asset_Img_URL},
					set : function(val){
						setterFunctions['Asset_Img_URL'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Asset_Location_Id" : {
					get : function(){return privateState.Asset_Location_Id},
					set : function(val){
						setterFunctions['Asset_Location_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Asset_Type_Id" : {
					get : function(){return privateState.Asset_Type_Id},
					set : function(val){
						setterFunctions['Asset_Type_Id'].call(this,val,privateState);
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
				"Manufacture_Model_Nbr" : {
					get : function(){return privateState.Manufacture_Model_Nbr},
					set : function(val){
						setterFunctions['Manufacture_Model_Nbr'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Manufacture_Part_Nbr" : {
					get : function(){return privateState.Manufacture_Part_Nbr},
					set : function(val){
						setterFunctions['Manufacture_Part_Nbr'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Manufacture_Serial_Nbr" : {
					get : function(){return privateState.Manufacture_Serial_Nbr},
					set : function(val){
						setterFunctions['Manufacture_Serial_Nbr'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Reference_Doc" : {
					get : function(){return privateState.Reference_Doc},
					set : function(val){
						setterFunctions['Reference_Doc'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(asset);
	
	//Create new class level validator object
	BaseModel.Validator.call(asset);
	
	var registerValidatorBackup = asset.registerValidator;
	
	asset.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( asset.isValid(this, propName, val) ){
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
	
	asset.relations = relations;
	
	asset.prototype.isValid = function(){
		return asset.isValid(this);
	};
	
	asset.prototype.objModelName = "asset";
	
	return asset;
});