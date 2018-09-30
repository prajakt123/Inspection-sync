define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measurement_Id : function(val, state){
			state['Measurement_Id'] = val;
		},
		Measurement_Max_Value : function(val, state){
			state['Measurement_Max_Value'] = val;
		},
		Measurement_Min_Value : function(val, state){
			state['Measurement_Min_Value'] = val;
		},
		Measurement_Range_Id : function(val, state){
			state['Measurement_Range_Id'] = val;
		},
		Measurement_Valid_Values : function(val, state){
			state['Measurement_Valid_Values'] = val;
		},
		Response_Type : function(val, state){
			state['Response_Type'] = val;
		},
		Timestamp : function(val, state){
			state['Timestamp'] = val;
		},
		Validate_Min_Max : function(val, state){
			state['Validate_Min_Max'] = val;
		},
	};
	
	
	//Create the Model Class
	function measurement_range(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Measurement_Id = defaultValues?(defaultValues["Measurement_Id"]?defaultValues["Measurement_Id"]:null):null;
			privateState.Measurement_Max_Value = defaultValues?(defaultValues["Measurement_Max_Value"]?defaultValues["Measurement_Max_Value"]:null):null;
			privateState.Measurement_Min_Value = defaultValues?(defaultValues["Measurement_Min_Value"]?defaultValues["Measurement_Min_Value"]:null):null;
			privateState.Measurement_Range_Id = defaultValues?(defaultValues["Measurement_Range_Id"]?defaultValues["Measurement_Range_Id"]:null):null;
			privateState.Measurement_Valid_Values = defaultValues?(defaultValues["Measurement_Valid_Values"]?defaultValues["Measurement_Valid_Values"]:null):null;
			privateState.Response_Type = defaultValues?(defaultValues["Response_Type"]?defaultValues["Response_Type"]:null):null;
			privateState.Timestamp = defaultValues?(defaultValues["Timestamp"]?defaultValues["Timestamp"]:null):null;
			privateState.Validate_Min_Max = defaultValues?(defaultValues["Validate_Min_Max"]?defaultValues["Validate_Min_Max"]:null):null;
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
				"Measurement_Id" : {
					get : function(){return privateState.Measurement_Id},
					set : function(val){
						setterFunctions['Measurement_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Measurement_Max_Value" : {
					get : function(){return privateState.Measurement_Max_Value},
					set : function(val){
						setterFunctions['Measurement_Max_Value'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Measurement_Min_Value" : {
					get : function(){return privateState.Measurement_Min_Value},
					set : function(val){
						setterFunctions['Measurement_Min_Value'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Measurement_Range_Id" : {
					get : function(){return privateState.Measurement_Range_Id},
					set : function(val){throw Error("Measurement_Range_Id cannot be changed."); },
					enumerable : true,
				},
				"Measurement_Valid_Values" : {
					get : function(){return privateState.Measurement_Valid_Values},
					set : function(val){
						setterFunctions['Measurement_Valid_Values'].call(this,val,privateState);
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
				"Validate_Min_Max" : {
					get : function(){return privateState.Validate_Min_Max},
					set : function(val){
						setterFunctions['Validate_Min_Max'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(measurement_range);
	
	//Create new class level validator object
	BaseModel.Validator.call(measurement_range);
	
	var registerValidatorBackup = measurement_range.registerValidator;
	
	measurement_range.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( measurement_range.isValid(this, propName, val) ){
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
	
	measurement_range.relations = relations;
	
	measurement_range.prototype.isValid = function(){
		return measurement_range.isValid(this);
	};
	
	measurement_range.prototype.objModelName = "measurement_range";
	
	return measurement_range;
});