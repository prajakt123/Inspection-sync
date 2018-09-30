define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		Inspection_Id : function(val, state){
			state['Inspection_Id'] = val;
		},
		Inspection_Timestamp : function(val, state){
			state['Inspection_Timestamp'] = val;
		},
		Inspection_Value : function(val, state){
			state['Inspection_Value'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measurement_History_Id : function(val, state){
			state['Measurement_History_Id'] = val;
		},
		Measurement_Images_Id : function(val, state){
			state['Measurement_Images_Id'] = val;
		},
		Measurement_Range_Id : function(val, state){
			state['Measurement_Range_Id'] = val;
		},
		Measurement_Set_Id : function(val, state){
			state['Measurement_Set_Id'] = val;
		},
		Response_Type : function(val, state){
			state['Response_Type'] = val;
		},
		Timestamp : function(val, state){
			state['Timestamp'] = val;
		},
	};
	
	
	//Create the Model Class
	function measurement_hstry(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.Inspection_Id = defaultValues?(defaultValues["Inspection_Id"]?defaultValues["Inspection_Id"]:null):null;
			privateState.Inspection_Timestamp = defaultValues?(defaultValues["Inspection_Timestamp"]?defaultValues["Inspection_Timestamp"]:null):null;
			privateState.Inspection_Value = defaultValues?(defaultValues["Inspection_Value"]?defaultValues["Inspection_Value"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Measurement_History_Id = defaultValues?(defaultValues["Measurement_History_Id"]?defaultValues["Measurement_History_Id"]:null):null;
			privateState.Measurement_Images_Id = defaultValues?(defaultValues["Measurement_Images_Id"]?defaultValues["Measurement_Images_Id"]:null):null;
			privateState.Measurement_Range_Id = defaultValues?(defaultValues["Measurement_Range_Id"]?defaultValues["Measurement_Range_Id"]:null):null;
			privateState.Measurement_Set_Id = defaultValues?(defaultValues["Measurement_Set_Id"]?defaultValues["Measurement_Set_Id"]:null):null;
			privateState.Response_Type = defaultValues?(defaultValues["Response_Type"]?defaultValues["Response_Type"]:null):null;
			privateState.Timestamp = defaultValues?(defaultValues["Timestamp"]?defaultValues["Timestamp"]:null):null;
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
				"id" : {
					get : function(){return privateState.id},
					set : function(val){
						setterFunctions['id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Inspection_Id" : {
					get : function(){return privateState.Inspection_Id},
					set : function(val){
						setterFunctions['Inspection_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Inspection_Timestamp" : {
					get : function(){return privateState.Inspection_Timestamp},
					set : function(val){
						setterFunctions['Inspection_Timestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Inspection_Value" : {
					get : function(){return privateState.Inspection_Value},
					set : function(val){
						setterFunctions['Inspection_Value'].call(this,val,privateState);
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
				"Measurement_History_Id" : {
					get : function(){return privateState.Measurement_History_Id},
					set : function(val){throw Error("Measurement_History_Id cannot be changed."); },
					enumerable : true,
				},
				"Measurement_Images_Id" : {
					get : function(){return privateState.Measurement_Images_Id},
					set : function(val){
						setterFunctions['Measurement_Images_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Measurement_Range_Id" : {
					get : function(){return privateState.Measurement_Range_Id},
					set : function(val){
						setterFunctions['Measurement_Range_Id'].call(this,val,privateState);
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
				"Response_Type" : {
					get : function(){return privateState.Response_Type},
					set : function(val){
						setterFunctions['Response_Type'].call(this,val,privateState);
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
	BaseModel.isParentOf(measurement_hstry);
	
	//Create new class level validator object
	BaseModel.Validator.call(measurement_hstry);
	
	var registerValidatorBackup = measurement_hstry.registerValidator;
	
	measurement_hstry.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( measurement_hstry.isValid(this, propName, val) ){
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
	
	measurement_hstry.relations = relations;
	
	measurement_hstry.prototype.isValid = function(){
		return measurement_hstry.isValid(this);
	};
	
	measurement_hstry.prototype.objModelName = "measurement_hstry";
	
	return measurement_hstry;
});