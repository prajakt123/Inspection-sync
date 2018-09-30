define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"Inspection_Id" : "Inspection_Id",
		"Inspection_Measurement_Set_Id" : "Inspection_Measurement_Set_Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Measurement_Set_Id" : "Measurement_Set_Id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"Inspection_Id" : "number",
		"Inspection_Measurement_Set_Id" : "number",
		"LastUpdatedTimestamp" : "date",
		"Measurement_Set_Id" : "number",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Inspection_Measurement_Set_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "inspection_measurement"
	};
	Object.freeze(config);
	
	return config;
})
