define([],function(){
	var mappings = {
		"Asset_Id" : "Asset_Id",
		"Assigned_Timestamp" : "Assigned_Timestamp",
		"Assigned_To" : "Assigned_To",
		"CreatedTimestamp" : "CreatedTimestamp",
		"id" : "id",
		"InspectedBy" : "InspectedBy",
		"Inspection_Id" : "Inspection_Id",
		"Inspection_Images_Id" : "Inspection_Images_Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Signature" : "Signature",
		"Status" : "Status",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Asset_Id" : "number",
		"Assigned_Timestamp" : "date",
		"Assigned_To" : "string",
		"CreatedTimestamp" : "date",
		"id" : "number",
		"InspectedBy" : "string",
		"Inspection_Id" : "number",
		"Inspection_Images_Id" : "string",
		"LastUpdatedTimestamp" : "date",
		"Signature" : "string",
		"Status" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Inspection_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "inspection"
	};
	Object.freeze(config);
	
	return config;
})
