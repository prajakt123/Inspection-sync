define([],function(){
	var mappings = {
		"Asset_Description" : "Asset_Description",
		"Asset_Id" : "Asset_Id",
		"Asset_Img_URL" : "Asset_Img_URL",
		"Asset_Location_Id" : "Asset_Location_Id",
		"Asset_Type_Id" : "Asset_Type_Id",
		"CreatedTimestamp" : "CreatedTimestamp",
		"Id" : "Id",
		"LastUpdatedTimestamp" : "LastUpdatedTimestamp",
		"Manufacture_Model_Nbr" : "Manufacture_Model_Nbr",
		"Manufacture_Part_Nbr" : "Manufacture_Part_Nbr",
		"Manufacture_Serial_Nbr" : "Manufacture_Serial_Nbr",
		"Reference_Doc" : "Reference_Doc",
	};
	Object.freeze(mappings);
	
	var typings = {
		"Asset_Description" : "string",
		"Asset_Id" : "number",
		"Asset_Img_URL" : "string",
		"Asset_Location_Id" : "string",
		"Asset_Type_Id" : "string",
		"CreatedTimestamp" : "date",
		"Id" : "string",
		"LastUpdatedTimestamp" : "date",
		"Manufacture_Model_Nbr" : "string",
		"Manufacture_Part_Nbr" : "string",
		"Manufacture_Serial_Nbr" : "string",
		"Reference_Doc" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"Asset_Id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "InspObjSrvc",
		tableName : "asset"
	};
	Object.freeze(config);
	
	return config;
})
