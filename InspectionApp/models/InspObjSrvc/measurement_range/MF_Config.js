define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Measurement_Id" : "Measurement_Id",
		"Measurement_Max_Value" : "Measurement_Max_Value",
		"Measurement_Min_Value" : "Measurement_Min_Value",
		"Measurement_Range_Id" : "Measurement_Range_Id",
		"Measurement_Valid_Values" : "Measurement_Valid_Values",
		"Response_Type" : "Response_Type",
		"Timestamp" : "Timestamp",
		"Validate_Min_Max" : "Validate_Min_Max",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"LastUpdatedTimestamp" : "date",
		"Measurement_Id" : "number",
		"Measurement_Max_Value" : "number",
		"Measurement_Min_Value" : "number",
		"Measurement_Range_Id" : "number",
		"Measurement_Valid_Values" : "string",
		"Response_Type" : "string",
		"Timestamp" : "date",
		"Validate_Min_Max" : "boolean",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Measurement_Range_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "measurement_range"
	};
	Object.freeze(config);
	
	return config;
})
