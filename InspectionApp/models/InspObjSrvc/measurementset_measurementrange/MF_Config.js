define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"MeasurementSet_MeasurementRange_Id" : "MeasurementSet_MeasurementRange_Id",
		"Measurement_Range_Id" : "Measurement_Range_Id",
		"Measurement_Set_Id" : "Measurement_Set_Id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"LastUpdatedTimestamp" : "date",
		"MeasurementSet_MeasurementRange_Id" : "number",
		"Measurement_Range_Id" : "number",
		"Measurement_Set_Id" : "number",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"MeasurementSet_MeasurementRange_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "measurementset_measurementrange"
	};
	Object.freeze(config);
	
	return config;
})
