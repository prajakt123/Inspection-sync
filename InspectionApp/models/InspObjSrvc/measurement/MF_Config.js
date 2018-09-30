define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"Description" : "Description",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Measurement_Id" : "Measurement_Id",
		"Name" : "Name",
		"UOM" : "UOM",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"Description" : "string",
		"LastUpdatedTimestamp" : "date",
		"Measurement_Id" : "number",
		"Name" : "string",
		"UOM" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Measurement_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "measurement"
	};
	Object.freeze(config);
	
	return config;
})
