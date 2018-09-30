define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		Inspection_Id : function(val, state){
			state['Inspection_Id'] = val;
		},
		Inspection_Measurement_Set_Id : function(val, state){
			state['Inspection_Measurement_Set_Id'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measurement_Set_Id : function(val, state){
			state['Measurement_Set_Id'] = val;
		},
	};
	
	
	//Create the Model Class
	function inspection_measurement(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Inspection_Id = defaultValues?(defaultValues["Inspection_Id"]?defaultValues["Inspection_Id"]:null):null;
			privateState.Inspection_Measurement_Set_Id = defaultValues?(defaultValues["Inspection_Measurement_Set_Id"]?defaultValues["Inspection_Measurement_Set_Id"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
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
				"Inspection_Id" : {
					get : function(){return privateState.Inspection_Id},
					set : function(val){
						setterFunctions['Inspection_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Inspection_Measurement_Set_Id" : {
					get : function(){return privateState.Inspection_Measurement_Set_Id},
					set : function(val){throw Error("Inspection_Measurement_Set_Id cannot be changed."); },
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
	BaseModel.isParentOf(inspection_measurement);
	
	//Create new class level validator object
	BaseModel.Validator.call(inspection_measurement);
	
	var registerValidatorBackup = inspection_measurement.registerValidator;
	
	inspection_measurement.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( inspection_measurement.isValid(this, propName, val) ){
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
	
	inspection_measurement.relations = relations;
	
	inspection_measurement.prototype.isValid = function(){
		return inspection_measurement.isValid(this);
	};
	
	inspection_measurement.prototype.objModelName = "inspection_measurement";
	
	return inspection_measurement;
});