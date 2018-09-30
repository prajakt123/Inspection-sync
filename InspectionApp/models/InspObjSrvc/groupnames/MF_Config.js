define([],function(){
	var mappings = {
		"CreatedTimestamp" : "CreatedTimestamp",
		"Description" : "Description",
		"Group_Id" : "Group_Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Name" : "Name",
	};
	Object.freeze(mappings);
	
	var typings = {
		"CreatedTimestamp" : "date",
		"Description" : "string",
		"Group_Id" : "number",
		"LastUpdatedTimestamp" : "date",
		"Name" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Group_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "groupnames"
	};
	Object.freeze(config);
	
	return config;
})
