define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"id" : "id",
		"Inspection_Id" : "Inspection_Id",
		"Inspection_Timestamp" : "Inspection_Timestamp",
		"Inspection_Value" : "Inspection_Value",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Measurement_History_Id" : "Measurement_History_Id",
		"Measurement_Images_Id" : "Measurement_Images_Id",
		"Measurement_Range_Id" : "Measurement_Range_Id",
		"Measurement_Set_Id" : "Measurement_Set_Id",
		"Response_Type" : "Response_Type",
		"Timestamp" : "Timestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"id" : "number",
		"Inspection_Id" : "number",
		"Inspection_Timestamp" : "date",
		"Inspection_Value" : "string",
		"LastUpdatedTimestamp" : "date",
		"Measurement_History_Id" : "number",
		"Measurement_Images_Id" : "number",
		"Measurement_Range_Id" : "number",
		"Measurement_Set_Id" : "number",
		"Response_Type" : "string",
		"Timestamp" : "date",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Measurement_History_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "measurement_hstry"
	};
	Object.freeze(config);
	
	return config;
})
