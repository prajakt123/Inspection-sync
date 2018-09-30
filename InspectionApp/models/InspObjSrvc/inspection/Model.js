define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		Asset_Id : function(val, state){
			state['Asset_Id'] = val;
		},
		Assigned_Timestamp : function(val, state){
			state['Assigned_Timestamp'] = val;
		},
		Assigned_To : function(val, state){
			state['Assigned_To'] = val;
		},
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		InspectedBy : function(val, state){
			state['InspectedBy'] = val;
		},
		Inspection_Id : function(val, state){
			state['Inspection_Id'] = val;
		},
		Inspection_Images_Id : function(val, state){
			state['Inspection_Images_Id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Signature : function(val, state){
			state['Signature'] = val;
		},
		Status : function(val, state){
			state['Status'] = val;
		},
	};
	
	
	//Create the Model Class
	function inspection(defaultValues){
		var privateState = {};
			privateState.Asset_Id = defaultValues?(defaultValues["Asset_Id"]?defaultValues["Asset_Id"]:null):null;
			privateState.Assigned_Timestamp = defaultValues?(defaultValues["Assigned_Timestamp"]?defaultValues["Assigned_Timestamp"]:null):null;
			privateState.Assigned_To = defaultValues?(defaultValues["Assigned_To"]?defaultValues["Assigned_To"]:null):null;
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.InspectedBy = defaultValues?(defaultValues["InspectedBy"]?defaultValues["InspectedBy"]:null):null;
			privateState.Inspection_Id = defaultValues?(defaultValues["Inspection_Id"]?defaultValues["Inspection_Id"]:null):null;
			privateState.Inspection_Images_Id = defaultValues?(defaultValues["Inspection_Images_Id"]?defaultValues["Inspection_Images_Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Signature = defaultValues?(defaultValues["Signature"]?defaultValues["Signature"]:null):null;
			privateState.Status = defaultValues?(defaultValues["Status"]?defaultValues["Status"]:null):null;
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
				"Assigned_Timestamp" : {
					get : function(){return privateState.Assigned_Timestamp},
					set : function(val){
						setterFunctions['Assigned_Timestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Assigned_To" : {
					get : function(){return privateState.Assigned_To},
					set : function(val){
						setterFunctions['Assigned_To'].call(this,val,privateState);
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
				"id" : {
					get : function(){return privateState.id},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"InspectedBy" : {
					get : function(){return privateState.InspectedBy},
					set : function(val){
						setterFunctions['InspectedBy'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Inspection_Id" : {
					get : function(){return privateState.Inspection_Id},
					set : function(val){throw Error("Inspection_Id cannot be changed."); },
					enumerable : true,
				},
				"Inspection_Images_Id" : {
					get : function(){return privateState.Inspection_Images_Id},
					set : function(val){
						setterFunctions['Inspection_Images_Id'].call(this,val,privateState);
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
				"Signature" : {
					get : function(){return privateState.Signature},
					set : function(val){
						setterFunctions['Signature'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Status" : {
					get : function(){return privateState.Status},
					set : function(val){
						setterFunctions['Status'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(inspection);
	
	//Create new class level validator object
	BaseModel.Validator.call(inspection);
	
	var registerValidatorBackup = inspection.registerValidator;
	
	inspection.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( inspection.isValid(this, propName, val) ){
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
	
	inspection.relations = relations;
	
	inspection.prototype.isValid = function(){
		return inspection.isValid(this);
	};
	
	inspection.prototype.objModelName = "inspection";
	
	return inspection;
});