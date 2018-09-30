define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		MeasurementSet_MeasurementRange_Id : function(val, state){
			state['MeasurementSet_MeasurementRange_Id'] = val;
		},
		Measurement_Range_Id : function(val, state){
			state['Measurement_Range_Id'] = val;
		},
		Measurement_Set_Id : function(val, state){
			state['Measurement_Set_Id'] = val;
		},
	};
	
	
	//Create the Model Class
	function measurementset_measurementrange(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.MeasurementSet_MeasurementRange_Id = defaultValues?(defaultValues["MeasurementSet_MeasurementRange_Id"]?defaultValues["MeasurementSet_MeasurementRange_Id"]:null):null;
			privateState.Measurement_Range_Id = defaultValues?(defaultValues["Measurement_Range_Id"]?defaultValues["Measurement_Range_Id"]:null):null;
			privateState.Measurement_Set_Id = defaultValues?(defaultValues["Measurement_Set_Id"]?defaultValues["Measurement_Set_Id"]:null):null;
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
				"MeasurementSet_MeasurementRange_Id" : {
					get : function(){return privateState.MeasurementSet_MeasurementRange_Id},
					set : function(val){throw Error("MeasurementSet_MeasurementRange_Id cannot be changed."); },
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
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(measurementset_measurementrange);
	
	//Create new class level validator object
	BaseModel.Validator.call(measurementset_measurementrange);
	
	var registerValidatorBackup = measurementset_measurementrange.registerValidator;
	
	measurementset_measurementrange.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( measurementset_measurementrange.isValid(this, propName, val) ){
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
	
	measurementset_measurementrange.relations = relations;
	
	measurementset_measurementrange.prototype.isValid = function(){
		return measurementset_measurementrange.isValid(this);
	};
	
	measurementset_measurementrange.prototype.objModelName = "measurementset_measurementrange";
	
	return measurementset_measurementrange;
});