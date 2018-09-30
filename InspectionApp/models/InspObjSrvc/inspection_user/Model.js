define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		CreatedTimestamp : function(val, state){
			state['CreatedTimestamp'] = val;
		},
		email : function(val, state){
			state['email'] = val;
		},
		FirstName : function(val, state){
			state['FirstName'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		LastName : function(val, state){
			state['LastName'] = val;
		},
		LastUpdatedTimestamp : function(val, state){
			state['LastUpdatedTimestamp'] = val;
		},
		Password : function(val, state){
			state['Password'] = val;
		},
		Role : function(val, state){
			state['Role'] = val;
		},
		User_Id : function(val, state){
			state['User_Id'] = val;
		},
	};
	
	
	//Create the Model Class
	function inspection_user(defaultValues){
		var privateState = {};
			privateState.CreatedTimestamp = defaultValues?(defaultValues["CreatedTimestamp"]?defaultValues["CreatedTimestamp"]:null):null;
			privateState.email = defaultValues?(defaultValues["email"]?defaultValues["email"]:null):null;
			privateState.FirstName = defaultValues?(defaultValues["FirstName"]?defaultValues["FirstName"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.LastName = defaultValues?(defaultValues["LastName"]?defaultValues["LastName"]:null):null;
			privateState.LastUpdatedTimestamp = defaultValues?(defaultValues["LastUpdatedTimestamp"]?defaultValues["LastUpdatedTimestamp"]:null):null;
			privateState.Password = defaultValues?(defaultValues["Password"]?defaultValues["Password"]:null):null;
			privateState.Role = defaultValues?(defaultValues["Role"]?defaultValues["Role"]:null):null;
			privateState.User_Id = defaultValues?(defaultValues["User_Id"]?defaultValues["User_Id"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"CreatedTimestamp" : {
					get : function(){return privateState.CreatedTimestamp},
					set : function(val){
						setterFunctions['CreatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"email" : {
					get : function(){return privateState.email},
					set : function(val){
						setterFunctions['email'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"FirstName" : {
					get : function(){return privateState.FirstName},
					set : function(val){
						setterFunctions['FirstName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"LastName" : {
					get : function(){return privateState.LastName},
					set : function(val){
						setterFunctions['LastName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"LastUpdatedTimestamp" : {
					get : function(){return privateState.LastUpdatedTimestamp},
					set : function(val){
						setterFunctions['LastUpdatedTimestamp'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Password" : {
					get : function(){return privateState.Password},
					set : function(val){
						setterFunctions['Password'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"Role" : {
					get : function(){return privateState.Role},
					set : function(val){
						setterFunctions['Role'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"User_Id" : {
					get : function(){return privateState.User_Id},
					set : function(val){
						setterFunctions['User_Id'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(inspection_user);
	
	//Create new class level validator object
	BaseModel.Validator.call(inspection_user);
	
	var registerValidatorBackup = inspection_user.registerValidator;
	
	inspection_user.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( inspection_user.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	
	var relations = [
	];
	
	inspection_user.relations = relations;
	
	inspection_user.prototype.isValid = function(){
		return inspection_user.isValid(this);
	};
	
	inspection_user.prototype.objModelName = "inspection_user";
	
	return inspection_user;
});