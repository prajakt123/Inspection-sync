define([],function(){
	var mappings = {
		"Asset_Location_Id" : "Asset_Location_Id",
		"City" : "City",
		"Country" : "Country",
		"CreatedTimestamp" : "CreatedTimestamp",
		"Description" : "Description",
		"Id" : "Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Latitude" : "Latitude",
		"Longitude" : "Longitude",
		"Post_Code" : "Post_Code",
		"Region" : "Region",
		"Street" : "Street",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Asset_Location_Id" : "number",
		"City" : "string",
		"Country" : "string",
		"CreatedTimestamp" : "date",
		"Description" : "string",
		"Id" : "string",
		"LastUpdatedTimestamp" : "date",
		"Latitude" : "string",
		"Longitude" : "string",
		"Post_Code" : "string",
		"Region" : "string",
		"Street" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Asset_Location_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "asset_location"
	};
	Object.freeze(config);
	
	return config;
})
