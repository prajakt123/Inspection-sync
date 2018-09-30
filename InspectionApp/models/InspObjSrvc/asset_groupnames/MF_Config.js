define([],function(){
	var mappings = {
		"Asset_Group_Id" : "Asset_Group_Id",
		"Asset_Id" : "Asset_Id",
		"CreatedTimestamp" : "CreatedTimestamp",
		"Group_Id" : "Group_Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Asset_Group_Id" : "number",
		"Asset_Id" : "number",
		"CreatedTimestamp" : "date",
		"Group_Id" : "number",
		"LastUpdatedTimestamp" : "date",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Asset_Group_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "asset_groupnames"
	};
	Object.freeze(config);
	
	return config;
})
