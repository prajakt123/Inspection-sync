define([],function(){
	var mappings = {
		"Asset_Id" : "Asset_Id",
		"Asset_Measurement_Set_Id" : "Asset_Measurement_Set_Id",
		"CreatedTimestamp" : "CreatedTimestamp",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Measurement_Set_Id" : "Measurement_Set_Id",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Asset_Id" : "number",
		"Asset_Measurement_Set_Id" : "number",
		"CreatedTimestamp" : "date",
		"LastUpdatedTimestamp" : "date",
		"Measurement_Set_Id" : "number",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Asset_Measurement_Set_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "asset_measurement_set"
	};
	Object.freeze(config);
	
	return config;
})
