define({ 

  //Type your controller code here 
  count:0,
  inspectionUser:null,
  assetGroupnames:null,
  groupNameList:null,
  inspectionMeasurement:null,
  measurementRange:null,
  measurementSetRange:null,
  measurementList:null,
  asset:null,
  measurementMap:null,
  selectedMeasurement:null,
  measurementSetId:null,


  measurementHistory:null,

  inspection:null,
  assetDetail:null,
  isContainerShown:false,
  imageCallBackFunction:null,
  onNavigate:function(inspection){
    debugger;
    if(inspection===null||inspection===undefined)
      return;
    this.inspection=inspection;
    this.assetDetail=null;
    this.count=0;
    try{
      this.getInspectionListData();
      //this.populateInspectionInfo(this.inspection);
    }catch(excp){
      alert(JSON.stringify(excp));
      alert(excp.message);
      kony.print("#### Exception occured in fetching the inspectionlist records ####"+excp);
    }
    /*try{
      this.populateData();
    }catch(excp){
      alert("Excp occured while populating data: "+JSON.stringify(excp));
    }*/
  },
  onPostShow:function(){
    debugger;
    return;
    /*if(this.inspection===null||this.inspection===undefined)return;
    else if(this.assetDetail===null)
      this.getAssetDetail(validateText(this.inspection["asset_Id"]));*/
    try{
      this.getInspectionListData();
      //this.populateInspectionInfo(this.inspection);
    }catch(excp){
      alert(JSON.stringify(excp));
      alert(excp.message);
      kony.print("#### Exception occured in fetching the inspectionlist records ####"+excp);
    }
  },

  /***************** sync module start ***********************************/
  onSuccesCallbackInfo: function(measurementInfo,measurementHistory){
    //var data = response.records[0].MeasurementHistoryList;
    //var measurement_Range_Id = measurement_Range_ID;
    //alert(data);
    debugger;
    if(Array.isArray(measurementInfo) &&  measurementInfo.length>0 &&
       Array.isArray(measurementHistory)){
      var data = this._processData(measurementInfo,measurementHistory);
      this.view.flxInfoCardContainer.right="0%";
      this.view.InfoCard.setData(data);
    }


    /*if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
      data = data.filter(function(element){
        if(element.measurement_Range_Id==measurement_Range_Id)
          return true;
        return false;
      }.bind(this));
      data = this._processData(data);
      this.view.flxInfoCardContainer.right="0%";

      this.view.InfoCard.setData(data);
    }*/
  },
  getMesurementInfo:function(measurementID,measurement_Range_ID){
    if((typeof measurementID==='string' || typeof measurementID==='number') && 
       (typeof measurement_Range_ID==='string' || typeof measurement_Range_ID=='number')){
      if(typeof this.measurementMap==='object' && typeof this.measurementMap!==null){
        var measurement=this.measurementMap[measurementID];
        if(typeof measurement==='object' && typeof measurement!==null){
          this.selectedMeasurement=measurement;
        }
        if(Array.isArray(this.inspectionMeasurement)&& (this.inspectionMeasurement).length>0){
          if(typeof this.inspectionMeasurement[0]["Measurement_Set_Id"]==='string' ||
             typeof this.inspectionMeasurement[0]["Measurement_Set_Id"]==='number' ){
            var options={};
            options["whereConditionAsAString"]="Measurement_Set_Id = '"+this.inspectionMeasurement[0]["Measurement_Set_Id"]+
              "' AND Measurement_Range_Id ='"+measurement_Range_ID+"'" ;
            this.count=0;
            this._fetchRecords("measurement_hstry", options);
          }
        }
      }
    }
  },
  //to fetch all the records related to this form controller.
  populateInspectionInfo:function(inspection){
    if(typeof inspection==='object' && typeof inspection!==null){
      this.view.lblInspectionID.text=app_constant.inspection+InspectionUtil.validateText(inspection["Inspection_Id"]);
      this.view.lblInspectionStatus.text=InspectionUtil.validateText(inspection["Status"]);
      this.view.lblDay.text=InspectionUtil.getReadableDateString(inspection["Assigned_Timestamp"]);
      this.view.lblTime.text=InspectionUtil.getReadableTimeString(inspection["Assigned_Timestamp"]);
      if(Array.isArray(this.inspectionUser) && (this.inspectionUser).length>0){
        this.view.lblUserName.text=InspectionUtil.validateText(this.inspectionUser[0]["FirstName"])+
          InspectionUtil.validateText(this.inspectionUser[0]["LastName"]);
      }else{
        this.view.lblUserName.text="NA";
      }
      this.view.lblAssetId.text=app_constant.asset+inspection["Asset_Id"];
      var asset=inspection["asset"];
      if(InspectionUtil.isJsonObject(asset)){
        var assetType=asset["type"];
        if(InspectionUtil.isJsonObject(assetType)){
          this.view.lblAssetTypeId.text=InspectionUtil.validateText(assetType["Name"]);
        }
      }
      this.processMeasurement();

    }
  },
  processMeasurement:function(){
    if(Array.isArray(this.measurementList)){
      var measurementMap=InspectionUtil.parseRecords(this.measurementList, "Measurement_Id");
      this.measurementMap=measurementMap;
      var parsedMeasurementList=[];
      if(Array.isArray(this.measurementRange) && InspectionUtil.isJsonObject(measurementMap) ){
        var measurementRangeLength=this.measurementRange.length;
        var measurementRange;
        for(var i=0;i<measurementRangeLength;i++){
          measurementRange=this.measurementRange[i];
          if(typeof measurementRange["Measurement_Id"]==='string' || typeof measurementRange["Measurement_Id"]==='number' ){
            if(Array.isArray(measurementMap[measurementRange["Measurement_Id"]]) && measurementMap[measurementRange["Measurement_Id"]].length>0){
              measurementRange["measurement"]=measurementMap[measurementRange["Measurement_Id"]][0];
              parsedMeasurementList.push(measurementRange);
            }
          }
        }
        this.view.measurement.setData(parsedMeasurementList,this.addImageCallback,this.showInfoCallBack);
        this.view.forceLayout();
      }
    }
  },
  getInspectionListData:function(){
    debugger;
    this.count=0;
    var options={};
    var userId=this.inspection["Assigned_To"];
    var asset=this.inspection["asset"];
    if(typeof asset ==='object' && typeof asset!==null){
      this.asset=asset;
    }
    if(typeof userId==='string'){
      options["whereConditionAsAString"]="User_Id = '"+userId+"'";
      this._fetchRecords("inspection_user",options);
    }

    var assetId=this.inspection["Asset_Id"];
    if(typeof assetId==='string' ||typeof assetId==='number'){
      options={};
      options["whereConditionAsAString"]="Asset_Id = '"+assetId+"'";
      this._fetchRecords("asset_groupnames",options);
    }
    var inspectionId=this.inspection["Inspection_Id"];
    if(typeof inspectionId==='number'){
      options={};
      options["whereConditionAsAString"]="Inspection_Id = '"+inspectionId+"'";
      this._fetchRecords("inspection_measurement",options);
    }
    //this._fetchRecords("measurement_hstry");
  },
  //to read records from table
  _fetchRecords:function(dataModel,options){
    var inspObj=new kony.sdk.KNYObj(dataModel);

    function successCB(record){
      switch(dataModel){
        case "inspection_user":
          this.inspectionUser=record;
          break;
        case "asset_groupnames":
          this.assetGroupnames=record;
          var groupClause="Group_Id IN (";
          if(Array.isArray(record)&&record.length>0){
            var i=0;
            for(;i<record.length-1;i++){
              groupClause=groupClause+record[i]["Group_Id"]+",";
            }
            groupClause=groupClause+record[i]["Group_Id"]+")";
            var options={};
            options["whereConditionAsAString"]=groupClause;//"Group_Id IN (1,2)";
            this._fetchRecords("groupnames",options);
          }
          break;
        case "groupnames":
          this.groupNameList =record;
          if(typeof this.asset==='object' && typeof this.asset!==null){
            this.asset["group_name"]=this.groupNameList;
          }
          this.populateAssetDetail(this.asset);
          break;
        case "inspection_measurement":
          this.inspectionMeasurement =record;
          var measurementSetClause="Measurement_Set_Id IN (";
          if(Array.isArray(record)&&record.length>0){
            this.measurementSetId=record[0]["Measurement_Set_Id"];
            var i=0;
            for(;i<record.length-1;i++){
              measurementSetClause=measurementSetClause+record[i]["Measurement_Set_Id"]+",";
            }
            measurementSetClause=measurementSetClause+record[i]["Measurement_Set_Id"]+")";
            var options={};
            options["whereConditionAsAString"]=measurementSetClause;
            this._fetchRecords("measurementset_measurementrange",options);
          }
          break;
        case "measurementset_measurementrange":
          this.measurementSetRange =record;
          var measurementRangeClause="Measurement_Range_Id IN (";
          if(Array.isArray(record)&&record.length>0){
            var i=0;
            for(;i<record.length-1;i++){
              measurementRangeClause=measurementRangeClause+record[i]["Measurement_Range_Id"]+",";
            }
            measurementRangeClause=measurementRangeClause+record[i]["Measurement_Range_Id"]+")";
            var options={};
            options["whereConditionAsAString"]=measurementRangeClause;
            this._fetchRecords("measurement_range",options);
          }
          break;
        case "measurement_range":
          this.measurementRange =record;
          var measurementClause="Measurement_Id IN (";
          if(Array.isArray(record)&&record.length>0){
            var i=0;
            for(;i<record.length-1;i++){
              measurementClause=measurementClause+record[i]["Measurement_Id"]+",";
            }
            measurementClause=measurementClause+record[i]["Measurement_Id"]+")";
            var options={};
            options["whereConditionAsAString"]=measurementClause;
            this._fetchRecords("measurement",options);
          }
          break;
        case "measurement":
          this.measurementList =record;
          break;
        case "measurement_hstry":
          this.measurementHistory =record;
          this.onSuccesCallbackInfo(this.selectedMeasurement ,this.measurementHistory);
      }
      /*if(this.count==4){
        alert("all records fetched");
        this.processRecords();
      }*/
      // alert(this.count);
      if(this.count===6){
        this.populateInspectionInfo(this.inspection);
      }
      this.count=this.count+1;
    }
    function failureCB(error){
      alert(JSON.stringify(error));
    }
    try{
      if(options===undefined){
        options=null;
      }
      inspObj.get(options,successCB.bind(this),failureCB.bind(this));
    }catch(excp){
      alert(excp.message);
    }
  },

  /***************** sync module ends***********************************/

  toggleImageGalleryContainer:function(){
    this.isContainerShown=!this.isContainerShown;
    if(this.isContainerShown){
      this.showImageGallery();
    }else{
      this.hideImageGallery();
    }
    this.view.forceLayout();
  },
  addImageCallback:function(callbackFunction){
    debugger;
    //alert(typeof callbackFunction);

    if(typeof callbackFunction==="function"){
      this.imageCallBackFunction=callbackFunction;
      this.toggleImageGalleryContainer();
    }
    //this.toggleImageGalleryContainer();

  },
  onImageSelected:function(imgBase64){
    this.toggleImageGalleryContainer();
    if(this.imageCallBackFunction!==null&& this.imageCallBackFunction!==undefined){
      this.imageCallBackFunction(imgBase64);
    }
    //debugger;
  },
  showImageGallery:function(eventobject){
    var self=this;
    this.view.flxImageGalleryContainer.isVisible=true;
    this.view.flxImageGalleryContainer.animate(
      kony.ui.createAnimation({100:{top:"0%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
      {animationEnd: function() {
        self.view.imagegallery.toggleBackground(true);
        self.view.forceLayout();
      } 
      });

  },
  hideImageGallery:function(){
    var self=this;
    this.view.flxImageGalleryContainer.isVisible=false;
    this.view.imagegallery.toggleBackground(false);
    this.view.flxImageGalleryContainer.animate(
      kony.ui.createAnimation({100:{top:"100%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.1},
      {animationEnd: function() {
        self.view.forceLayout();
      } 
      });
  },
  showInfoCallBack:function(measurementID,measurementRangeID){
    debugger;
    //this.view.flxInfoCardContainer.right="0%";
    this.getMesurementInfo(measurementID,measurementRangeID);
  },
  populateData:function(){
    debugger;
    if(this.inspection===null||this.inspection===undefined){
      return;
    }
    //this.view.measurement;
    //this.view.add(widgetArray)
    this.view.measurement.setData(this.inspection.measurementRangeList,this.addImageCallback,this.showInfoCallBack);
    this.view.forceLayout();
    var status=this.inspection["status"];
    if(status!==null&&status!==undefined){
      status=status.toLowerCase();
    }
    switch(status){
      case "assigned":
        this.view.lblInspectionStatus.text="Assigned";
        break;
      case "in progress":
        this.view.lblInspectionStatus.text="In-progress";
        break;
      case "completed":
        this.view.lblInspectionStatus.text="Completed";
        break;
      default:
        this.view.lblInspectionStatus.text="NA";
    }
    this.view.lblAssetId.text=validateText(this.inspection["asset_Id"]);
    this.view.lblInspectionID.text=validateText(this.inspection["inspection_Id"]);
    this.view.lblAssetCode.text=validateText(this.inspection["asset_type"]);
    this.view.lblAssetName.text=getAssatName(this.inspection["asset_type"]);
    var timeStamp=this.inspection["assigned_Timestamp"];
    timeStamp=_convertDateStringToEpochTime(timeStamp);
    this.view.lblTime.text=getTimeString(timeStamp);
    this.view.lblDay.text=getDateString(timeStamp);
    if(!kony.sdk.isNullOrUndefined(this.inspection["asset_type"])){
      this.view.lblAssetTypeId.text = this.inspection["asset_type"];
    }
    /*if(timeStamp!==null && timeStamp!==undefined){
      try{
        var date=new Date(timeStamp);
        this.view.lblTime.text=date.getHours()+" Hrs";
        this.view.lblDay.text=(timeStamp.split(" "))[0];
      }catch(excp){
        kony.print(JSON.stringify(excp));
      }
    }*/
    this.view.lblUserName.text=validateText(this.inspection["inspectedBy"]);//@TODO change value 
    this.view.lblDistance.text=this.inspection["distance"];
    this.view.lblAddress.text=validateText(this.inspection["asset_location_description"]);
  },
  showAssetDetailContainer:function(){
    debugger;
    var self=this;
    this.view.flxScAssetDetailsContainer.animate(
      kony.ui.createAnimation({100:{left:"20%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
    self.view.flxOverlay.animate(
      kony.ui.createAnimation({100:{left:"0%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
  },
  hideAssetDetailContainer:function(){
    debugger;
    var self=this;
    this.view.flxScAssetDetailsContainer.animate(
      kony.ui.createAnimation({100:{left:"100%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.10},
      {animationEnd: function() {

      } 
      });
    self.view.flxOverlay.animate(
      kony.ui.createAnimation({100:{left:"-20%","stepConfig":{}}}),
      {delay:0,fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.01},
      {animationEnd: function() {

      } 
      });
  },
  getAssetDetailSuccessCB:function(result){
    debugger;
    kony.application.dismissLoadingScreen();
    this.view.loadingScreen.hide();
    if(result!==null&&result!==undefined){
      if(Array.isArray(result.Assets)){
        this.populateAssetDetail(result.Assets[0]);
      }
    }
  },
  populateAssetDetail:function(asset){
    if(asset!==null&&asset!==undefined){
      this.assetDetail=asset;
      this.view.lblAssetDetail.text =app_constant.asset+InspectionUtil.validateText(asset.Asset_Id);
      //this.view.lblAssetId2.text=validateText(asset.asset_Id);
      var assetType=asset["type"];
      if(typeof assetType==='object' && typeof assetType!==null){
        this.view.lblAssetCode.text=InspectionUtil.validateText(assetType.Name);
        this.view.lblAssetName.text=InspectionUtil.validateText(assetType.Description);
      }else{
        this.view.lblAssetCode.text="";
        this.view.lblAssetName.text="";
      }
      this.view.lblAssetDescription.text=InspectionUtil.validateText(asset.Asset_Description);

      var assetLocation=asset["location"];
      if(typeof assetLocation==='object' && typeof assetLocation!==null){
        this.view.lblLocationCode.text=InspectionUtil.validateText(assetLocation["Id"]);
        this.view.lblAssetAddress.text=InspectionUtil.validateText(assetLocation["Description"])+
          " "+InspectionUtil.validateText(asset["Street"]);
      }else{
        this.view.lblAssetAddress.text="";
        this.view.lblLocationCode.text="";
      }
      var assetGroup=asset["group_name"];
      if(Array.isArray(assetGroup)){
        if(assetGroup[0]!==undefined){
          this.view.lblAssetGroup0.text=InspectionUtil.validateText(assetGroup[0]["Name"]);
        }
        if(assetGroup[1]!==undefined){
          this.view.lblAssetGroup1.text=InspectionUtil.validateText(assetGroup[1]["Name"]);
        }
      }
      this.view.lblPartNumber.text=InspectionUtil.validateText(asset.Manufacture_Part_Nbr);
      this.view.lblModelNumber.text=InspectionUtil.validateText(asset.Manufacture_Model_Nbr);
      this.view.lblSerialNumberValue.text=InspectionUtil.validateText(asset.Manufacture_Serial_Nbr);
    }
  },
  populateAssetDetail2:function(asset){
    if(asset!==null&&asset!==undefined){
      this.assetDetail=asset;
      this.view.lblAssetDetail.text = validateText(asset.asset_Id);;
      //this.view.lblAssetId2.text=validateText(asset.asset_Id);
      this.view.lblAssetCode.text=validateText(asset.asset_Type_Name);
      this.view.lblAssetName.text=validateText(asset.asset_Type_Description);
      this.view.lblAssetDescription.text=validateText(asset.asset_Description);
      this.view.lblLocationCode.text=validateText(asset.asset_Location_Id);
      this.view.lblAssetAddress.text=validateText(asset.locationDes)+" "+validateText(asset.street);
      this.view.lblAssetGroup0.text="XXX";
      this.view.lblAssetGroup1.text="XXX";
      this.view.lblPartNumber.text=validateText(asset.manufacture_Part_Nbr);
      this.view.lblModelNumber.text=validateText(asset.manufacture_Model_Nbr);
      this.view.lblSerialNumberValue.text=validateText(asset.manufacture_Serial_Nbr);
    }
  },
  getAssetDetailFailureCB:function(result){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    alert("error:"+result)
  },
  readMeasurement:function(){
    var results=this.view.measurement.getResult();
    var navObj=new kony.mvc.Navigation("frmInspectionReview");
    var reviewData={};
    reviewData["inspection"]=this.inspection;
    reviewData["measurement"]=results;
    reviewData["assetDetail"]=this.assetDetail;
    reviewData["measurementSetId"]=this.measurementSetId;
    try{
      navObj.navigate(reviewData);
    }catch(excp){
      alert("Excp: "+JSON.stringify(excp));
    }
  },
  /**********************************************************************************
   *	Name	:	getAssetDetail
   *	Author	:	Kony
   *	Purpose	:	To get the detail of the asset for the provided asset id.
   ***********************************************************************************/
  getAssetDetail:function(assetId){
    if(assetId===null || assetId===undefined){
      return;
    }

    /*try{
      var objectInstance=getObjectInstance("AssetDetail");
      if(objectInstance!==null){
        var dataObject = new kony.sdk.dto.DataObject("Asset");
        var options = {
          "dataObject": dataObject,
          "headers": {},
          //"queryParams": {"$filter":"((someid eq '"+assetId+"' ) and ((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"}
          "queryParams": {"$filter":"someid eq '"+assetId+"'" }
        };
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          kony.application.showLoadingScreen("sknLoading","please wait..",constants.
                                             LOADING_SCREEN_POSITION_FULL_SCREEN, true,false,null);
          objectInstance.fetch(options, this.getAssetDetailSuccessCB.bind(this),this.getAssetDetailFailureCB.bind(this));
        } else {
          dismissLoadingScreen();
          alert("No Network connected");
        }
      }
    }catch(excp){
      dismissLoadingScreen();
      kony.application.dismissLoadingScreen();
      kony.print("Exception occured in getting asset details: "+JSON.stringify(excp) );
    }*/


    try{
      var client = kony.sdk.getCurrentInstance();
      var intgService;
      intgService = client.getIntegrationService("Assets");
      this.view.loadingScreen.show();
      //kony.model.ApplicationContext.showLoadingScreen("Please wait..");
      intgService.invokeOperation("getAssetById",{},{"id":assetId},this.getAssetDetailSuccessCB.bind(this),this.getAssetDetailFailureCB.bind(this));
    }catch(excp){
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      kony.print(JSON.stringify(excp));
    }
  },


  getMesurementInfo2:function(measurementID,measurement_Range_ID){
    if(measurementID!==null && measurementID!==undefined && measurement_Range_ID!==null && measurement_Range_ID!==undefined){
      var queryParams = {"msid":measurementID};
      this._fetchFromODataService("inspectionObjService", "MeasurementSet", queryParams, this.onSuccesCallbackInfo.bind(this,measurement_Range_ID), this.errorCallbackInfo.bind(this));
    }

  },
  _fetchFromODataService: function(objectService, dataModelObject, queryParams, successCallback, errorCallback) {
    try {
      var sdkClient = new kony.sdk.getCurrentInstance();
      var objectInstance;
      if (Object.keys(sdkClient).length !== 0) {
        objectInstance = sdkClient.getObjectService(objectService, {
          "access": "online"
        });
      }
      if (objectInstance === null || objectInstance === undefined) {
        this.view.loadingScreen.hide();
        kony.application.dismissLoadingScreen();
        throw {
          "error": "ConnectionError",
          "message": "Please connect app to MF"
        };
        return;
      }
      var dataObject = new kony.sdk.dto.DataObject(dataModelObject);
      var options = {
        "dataObject": dataObject,
        "headers": {
          "Content-Type": "application/json"
        },
        "queryParams": queryParams
      };
      if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        objectInstance.fetch(options, successCallback, errorCallback);
      }
    } catch (exception) {
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      //@TODO remove alerts
      alert(exception);
    }
  },


  errorCallbackInfo: function(response){

    kony.print("Error in errorCallbackInfo:"+response.toString());

  },
  onSuccesCallbackInfo2: function(measurement_Range_ID,response){
    var data = response.records[0].MeasurementHistoryList;
    var measurement_Range_Id = measurement_Range_ID;
    //alert(data);
    if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
      data = data.filter(function(element){
        if(element.measurement_Range_Id==measurement_Range_Id)
          return true;
        return false;
      }.bind(this));
      data = this._processData(data);
      this.view.flxInfoCardContainer.right="0%";
      this.view.InfoCard.setData(data);
    }
  },
  _processData: function(measurementInfo,measurementHistory){
    var result = {};
    if(Array.isArray(measurementInfo) && measurementInfo.length>0){
      result.measurement_name = measurementInfo[0]["Name"];
      result.measurement_Id = "#"+ measurementInfo[0]["Measurement_Id"];
      result.measurement_description = measurementInfo[0]["Description"];
    }
    if(Array.isArray(measurementHistory) && measurementHistory.length>0 ){
      var values = [];
      var tempJSON;
      for(var i=0;i<measurementHistory.length;i++){
        tempJSON = {};
        tempJSON.date = this._getUTCDate(measurementHistory[i].Inspection_Timestamp);
        tempJSON.time = this._getUTCTime(measurementHistory[i].Inspection_Timestamp);
        tempJSON.value = measurementHistory[i].Inspection_Value;
        tempJSON["Response_Type"]=measurementHistory[i]["Response_Type"];
        values.push(tempJSON);
      }
      result.values = values;
    }


    /*if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
      result.measurement_name = data[0].measurement_name;
      result.measurement_Id = "#"+ data[0].measurement_Id;
      result.measurement_description = data[0].measurement_description;
      var values = [];
      var tempJSON;
      for(var i=0;i<data.length;i++){
        tempJSON = {};
        tempJSON.date = this._getUTCDate(parseInt(data[i].inspection_Timestamp));
        tempJSON.time = this._getUTCTime(parseInt(data[i].inspection_Timestamp));
        tempJSON.value = data[i].inspection_Value;
        values.push(tempJSON);
      }
      result.values = values;
    }*/
    return result;
  },
  _getUTCDate: function (epochTime){
    var result = "";
    var date = new Date(epochTime);
    var day =  date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    result = this._addZeroPrefix(day)+ "/"+ this._addZeroPrefix(month)+"/"+year;
    return result;
  },
  _getUTCTime: function (epochTime){
    var result;
    var currDate = new Date();
    var date = new Date(epochTime);
    var hr = this._addZeroPrefix(date.getHours());
    var min = this._addZeroPrefix(date.getMinutes());
    result = hr +":"+min+" Hrs";
    return result;
  },
  _addZeroPrefix: function (number){
    var result;
    if(number>=0 && number<10){
      result = "0"+number;
    }
    else{
      result = number;
    }
    return result;
  },
  _onClickOfHistory: function(){
    var navigationObj = new kony.mvc.Navigation("frmInspectionHistory");
    var navigationData = {};
    navigationData.previousForm = "frmInspectionExecution";
    navigationData.asset_id = this.inspection["asset_Id"];
    navigationObj.navigate(navigationData);
  }





});