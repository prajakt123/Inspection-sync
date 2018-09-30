define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		Description : function(val, state){
			state['Description'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Measurement_Id : function(val, state){
			state['Measurement_Id'] = val;
		},
		Name : function(val, state){
			state['Name'] = val;
		},
		UOM : function(val, state){
			state['UOM'] = val;
		},
	};
	
	
	//Create the Model Class
	function measurement(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.Description = defaultValues?(defaultValues["Description"]?defaultValues["Description"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Measurement_Id = defaultValues?(defaultValues["Measurement_Id"]?defaultValues["Measurement_Id"]:null):null;
			privateState.Name = defaultValues?(defaultValues["Name"]?defaultValues["Name"]:null):null;
			privateState.UOM = defaultValues?(defaultValues["UOM"]?defaultValues["UOM"]:null):null;
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
				"Description" : {
					get : function(){return privateState.Description},
					set : function(val){
						setterFunctions['Description'].call(this,val,privateState);
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
					set : function(val){throw Error("Measurement_Id cannot be changed."); },
					enumerable : true,
				},
				"Name" : {
					get : function(){return privateState.Name},
					set : function(val){
						setterFunctions['Name'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"UOM" : {
					get : function(){return privateState.UOM},
					set : function(val){
						setterFunctions['UOM'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(measurement);
	
	//Create new class level validator object
	BaseModel.Validator.call(measurement);
	
	var registerValidatorBackup = measurement.registerValidator;
	
	measurement.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( measurement.isValid(this, propName, val) ){
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
	
	measurement.relations = relations;
	
	measurement.prototype.isValid = function(){
		return measurement.isValid(this);
	};
	
	measurement.prototype.objModelName = "measurement";
	
	return measurement;
});