define({ 
  inspections:null,
  measurementHistory:null,
  measurementImages:null,
  mediaList:null,
  measurement:null,
  measurementRanges:null,
  count:0,

  _navigationData: null,
  /**
   * @function
   *
   * @param Obj 
   */
  onNavigate:function(Obj){
    this.count=0;
    this._navigationData = Obj;
    //this._fetchData();
    this.fetchRecords();
  },
  /**************************************  sync module starts *****************************/
  /**
   * @function
   *
   */
  fetchRecords:function(){
    this._fetchRecords("inspection");
    this._fetchRecords("measurement_hstry");
    this._fetchRecords("measurement_images");
    this._fetchRecords("media");
    this._fetchRecords("measurement");
    this._fetchRecords("measurement_range");
    //this.parseRecords();
  },
  /**
   * @function
   *
   * @param dataModel 
   */
  _fetchRecords:function(dataModel){
    var self=this;
    function successCB(record){
      switch(dataModel){
        case "inspection":
          self.inspections=record;
          break;
        case "measurement_hstry":
          self.measurementHistory=record;
          break;
        case "measurement_images":
          self.measurementImages=record;
          break;
        case "media":
          self.mediaList=record;
          break;
        case "measurement":
          self.measurement =record;
          break;
        case "measurement_range":
          self.measurementRanges =record;
          self.processRecord();
      }
      if(this.count===5){
        alert("all records are fetched");
        this.processRecord();
      }
      this.count=this.count+1;
    }
    function failureCB(error){
      alert(JSON.stringify(error));
    }
    try{
      var inspbj=new kony.sdk.KNYObj(dataModel);
      inspbj.get(null,successCB.bind(this),failureCB.bind(this));
    }catch(excp){
      alert(excp.message);
      //this.getAssetLocation();
    }
  },
  /**
   * @function
   *
   */
  processRecord:function(){

    debugger;
    this.measurementMap=InspectionUtil.parseRecords(this.measurement,"Measurement_Id");
    this.measurementRangeMap =InspectionUtil.parseRecords(this.measurementRanges,"Measurement_Range_Id");
    if(Array.isArray(this.measurementRanges)){
      for(var i=0;i<this.measurementRanges.length;i++){
        var measurementId=this.measurementRanges[i]["Measurement_Id"];
        if(typeof measurementId ==='string' || typeof measurementId==='number')
          if(Array.isArray(this.measurementMap[measurementId])){
            this.measurementRanges[i]["measurement"]=this.measurementMap[measurementId][0];
          }else{
            this.measurementRanges[i]["measurement"]={};
          }
      }
    }
    this.mediaListMap=InspectionUtil.parseRecords(this.mediaList,"media_id");
    if(Array.isArray(this.measurementImages)){
      for(var i=0;i<this.measurementImages.length;i++){
        var mediaId=this.measurementImages[i]["media_id"];
        if(typeof  mediaId==='string' || typeof mediaId ==='number' ){
          if(Array.isArray(this.mediaListMap[mediaId])){
            this.measurementImages[i]["media"]=this.mediaListMap[mediaId][0];
          }else{
            this.measurementImages[i]["media"]={};
          }
        }
      }
    }

    this.measurementImageMap=InspectionUtil.parseRecords(this.measurementImages,"Measurement_History_Id");
    if(Array.isArray(this.measurementHistory)){
      for(var i=0;i<this.measurementHistory.length;i++){
        var measurementHistoryID=this.measurementHistory[i]["Measurement_History_Id"];
        if(Array.isArray(this.measurementImageMap[measurementHistoryID])){
          this.measurementHistory[i]["measurementImageList"]=this.measurementImageMap[measurementHistoryID];
        }else{
          this.measurementHistory[i]["measurementImageList"]=[];
        }
        
        if(Array.isArray(this.measurementRangeMap[this.measurementHistory[i]["Measurement_Range_Id"]])){
          var measurement=this.measurementRangeMap[this.measurementHistory[i]["Measurement_Range_Id"]][0]["measurement"];
          if(typeof  measurement==='object' && typeof measurement!==null){
            this.measurementHistory[i]["measurement"]=measurement;
          }else{
            this.measurementHistory[i]["measurement"]={};
          }
        }
      }
    }
    this.measurementHistoryMap=InspectionUtil.parseRecords(this.measurementHistory,"Inspection_Id");
    var inspectionId;
    for(var i=0;i<this.inspections.length;i++){
      inspectionId=this.inspections[i]["Inspection_Id"];
      this.inspections[i]["measurementHistory"]= this.measurementHistoryMap[inspectionId];
    }
    this.inspectionMap=InspectionUtil.parseRecords(this.inspections,"Asset_Id");
    this._setDataToSegmentInspection(this.inspectionMap["1"]);
  },
  _setDataToSegmentInspection:function(records){
    if(Array.isArray(records)&&records.length>0){
      var segHeaderObj={};
      var segRowObj={};
      var segRowList;
      var headerRowList=[];
      var segDataList=[];
      var inspectionsLength=records.length;
      var measurementHistoryList;
      var measurementHistoryLength;
      for(var i=0;i<inspectionsLength;i++){
        segHeaderObj={};
        segHeaderObj["imgDot"]="fsins_ih_dot.png";
        segHeaderObj["imgDotted"]="verticalline.png";
        segHeaderObj["lblDate"]=this._getUTCDate(records[i]["Assigned_Timestamp"])+" "+this._getUTCTime(records[i]["Assigned_Timestamp"]);
        segHeaderObj["lblInspection"]="INSPECTION ID";
        segHeaderObj["lblInspectionId"]=records[i]["Inspection_Id"];
        segHeaderObj["lblTime"]="";
        segRowList=[];
        measurementHistoryList=records[i].measurementHistory;
        if(Array.isArray(measurementHistoryList)){
          measurementHistoryLength=measurementHistoryList.length;
          for(var j=0;j<measurementHistoryLength;j++){
            segRowObj={};
            segRowObj["imgDotted"]="fsins_ih_dot.png";
            if(typeof measurementHistoryList[j]["measurement"]==='object' && typeof measurementHistoryList[j]["measurement"]!==null){
              segRowObj["lblHeader"]=measurementHistoryList[j]["measurement"]["Name"];
            }else{
              segRowObj["lblHeader"]="NA";
            }
            
            segRowObj["lblValue"]=measurementHistoryList[j]["Inspection_Value"];
            segRowList.push(segRowObj);
          }
        }
        headerRowList=[];
        headerRowList.push(segHeaderObj);
        headerRowList.push(segRowList);
        segDataList.push(headerRowList);
      }
      this.view.segHistory.removeAll();
      this.view.segHistory.addAll(segDataList);
    }
  },

  /**************************************  sync module ends *****************************/


  _fetchData: function(){
    this.view.loadingScreen.show();
    //kony.application.showLoadingScreen("","Please wait..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
    this.view.segHistory.data = [];
    var objectService = "inspectionObjService";
    var dataModelObject = "inspectionHistory";
    var queryParams = {"id":this._navigationData.asset_id};
    this._fetchFromODataService(objectService, dataModelObject, queryParams, this._fetchDataSuccess.bind(this), this._fetchDataFailure.bind(this));
  },
  _fetchDataSuccess: function(response){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    var data = this._processData(response.records[0]);
    this._setDataToSegmentInspection(data);
  },
  _fetchDataFailure: function(response){
    alert("Error::"+JSON.stringify(response));
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
  },
  _processData: function(data){
    var result = [];
    var temp = {
      "asset":"Asset ID",
      "assetId":data.asset_id,
      "assetType":data.asset_Name,
      "assetDesc":data.asset_description,
      "template":"flxAssetCard"
    }; 
    data = data.inspectionData;
    var tempCardArray = [];
    tempCardArray.push(temp);
    tempCardArray.push([]);
    result.push(tempCardArray);
    if(!kony.sdk.isNullOrUndefined(data) && Array.isArray(data)){

      for(var i=0;i<data.length;i++){
        if(!kony.sdk.isNullOrUndefined( data[i].timestamp!=undefined) && data[i].timestamp.toLowerCase()!="null"){
          data[i].timestamp = this._convertDateStringToEpochTime(data[i].timestamp);
        }
      }
      data= data.sort((function (a, b) {
        if(!kony.sdk.isNullOrUndefined(a.timestamp!=undefined) && a.timestamp!="null" && !kony.sdk.isNullOrUndefined(b.timestamp!=undefined) && b.timestamp!="null")
          return new Date(b.timestamp) - new Date(a.timestamp);
        else
          return 0;
      }));
      for(var i = 1;i<=data.length;i++){
        var tempMainData = [];
        var tempSectionJSON = {};
        tempSectionJSON.inspectionIdText = "INSPECTION ID";
        tempSectionJSON.inspectionId = data[i-1].inspection_id;
        tempSectionJSON.measurementSet = data[i-1].measurementSet;
        if(!kony.sdk.isNullOrUndefined( data[i-1].timestamp!=undefined) && data[i-1].timestamp!="null"){
          tempSectionJSON.date = this._getUTCDate(data[i-1].timestamp);
          tempSectionJSON.time = this._getUTCTime(data[i-1].timestamp);
        }
        else{
          tempSectionJSON.date = "";
          tempSectionJSON.time = "";
        }

        var tempArry = [];
        var imageArray= [];
        if(!kony.sdk.isNullOrUndefined(data[i-1]["inspectedValues"]) && Array.isArray(data[i-1]["inspectedValues"])){
          for(var j=0;j<data[i-1]["inspectedValues"].length;j++){
            var tempRowData = {};
            tempRowData.id = data[i-1]["inspectedValues"][j].measurementNames;
            if(data[i-1]["inspectedValues"][j].inspectedValues.toLowerCase()=="null"){
              tempRowData.value = "Not Captured";
            }
            else{
              tempRowData.value = data[i-1]["inspectedValues"][j].inspectedValues;
            }

            tempArry.push(tempRowData);
            if(!kony.sdk.isNullOrUndefined(data[i-1]["inspectedValues"][j].media_URLs) && Array.isArray(data[i-1]["inspectedValues"][j].media_URLs)){
              for(var k=0;k<data[i-1]["inspectedValues"][j].media_URLs.length;k++){
                imageArray.push(data[i-1]["inspectedValues"][j].media_URLs[k].url)
              }
            }
          }
        }
        var imageRow  = this._getImageRowValue(imageArray);

        tempArry.push(imageRow);
        tempMainData.push(tempSectionJSON);
        tempMainData.push(tempArry);
        result.push(tempMainData);
      }
    }
    return result;
  },
  _getImageRowValue: function(imageArray){
    var imageRow;
    if(!kony.sdk.isNullOrUndefined(imageArray) && Array.isArray(imageArray)){
      switch(imageArray.length){
        case 0: imageRow = {
          "template":"flxRoundedBorder"
        };
          break;
        case 1: imageRow = {
          "template":"flxRowImages",
          "img1":{
            "src":imageArray[0], 
            "isVisible":true
          },
          "img2":{
            "src":"img.png", 
            "isVisible":false
          },
          "img3":{
            "src":"img.png", 
            "isVisible":false
          },
          "flxOverlay":{"isVisible":false},
          "imgArray":imageArray,
          "lblImageCount":"1"
        };
          break;
        case 2: imageRow = {
          "template":"flxRowImages",
          "img1":{
            "src":imageArray[0], 
            "isVisible":true
          },
          "img2":{
            "src":imageArray[1], 
            "isVisible":true
          },
          "img3":{
            "src":"img.png", 
            "isVisible":false
          },
          "flxOverlay":{"isVisible":false},
          "imgArray":imageArray,
          "lblImageCount":"2"
        };
          break;
        case 3: imageRow = {
          "template":"flxRowImages",
          "img1":{
            "src":imageArray[0], 
            "isVisible":true
          },
          "img2":{
            "src":imageArray[1], 
            "isVisible":true
          },
          "img3":{
            "src":imageArray[2], 
            "isVisible":true
          },
          "flxOverlay":{"isVisible":false},
          "imgArray":imageArray,
          "lblImageCount":"2"
        };
          break;
        default: imageRow = {
          "template":"flxRowImages",
          "img1":{
            "src":imageArray[0], 
            "isVisible":true
          },
          "img2":{
            "src":imageArray[1], 
            "isVisible":true
          },
          "img3":{
            "src":imageArray[2], 
            "isVisible":true
          },
          "flxOverlay":{"isVisible":true},
          "imgArray":imageArray,
          "lblImageCount":"+"+Number(imageArray.length-3).toFixed()
        };
      }
      return imageRow;
    }
  },
  _getUTCDate: function (epochTime){
    var result = "";
    var date = new Date(epochTime);
    //     var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    //     date = new Date(date.getTime() + userTimezoneOffset);
    var day =  date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if(this._isDateCurrentDate(epochTime)){
      result =  "Today, ";
    }
    else{
      result = this._findSuffixOf(day)+ " "+ months[month-1]+", ";
    }
    return result;
  },
  _findSuffixOf: function(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  },
  _isDateCurrentDate: function (epochTime){
    var date = new Date(epochTime);
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    date = new Date(date.getTime() - userTimezoneOffset);
    var day =  date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var todayDate = new Date();
    var currDay = todayDate.getDate();
    var currMonth = todayDate.getMonth()+1;
    var currYear = todayDate.getFullYear();
    if(day==currDay && month == currMonth && year==currYear){
      return true;
    }
    return false;
  },
  _getUTCTime: function (epochTime){
    var result;
    var currDate = new Date();
    var userTimezoneOffset = currDate.getTimezoneOffset() * 60000;
    //epochTime -=userTimezoneOffset;
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
  _setDataToSegmentInspection2: function(data){
    try{
      var widgetDataMap = {
        "lblInspection":"inspectionIdText",
        "lblDate":"date",
        "lblTime":"time",
        "lblInspectionId":"inspectionId",
        "lblHeader":"id",
        "lblValue":"value",
        "lblAssetId":"assetId",
        "lblAssetDescription":"assetDesc",
        "lblAssetType":"assetType",
        "lblAsset":"asset",
        "img1":"img1",
        "img2":"img2",
        "img3":"img3",
        "flxOverlay":"flxOverlay",
        "lblImageCount":"lblImageCount",
        "flxImages":"flxImages"
      };
      this.view.segHistory.widgetDataMap = widgetDataMap;
      this.view.segHistory.data = data;
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
    }
    catch(ex){
      alert(ex);
    }
  },
  _onClickBack: function(){
    var navigationObj = new kony.mvc.Navigation(this._navigationData.previousForm);
    var navigationData = {};
    if(this._navigationData.previousForm=="frmMeasurementAssignment"){
      navigationData = this._navigationData.navigationData;
      navigationData.previousForm = "frmInspectionHistory";
      navigationObj.navigate(navigationData);
    }
    else if(this._navigationData.previousForm=="frmInspectionExecution"){
      navigationObj.navigate();
    }
    else if(this._navigationData.previousForm=="frmInspectionReview"){
      navigationObj.navigate();
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
        throw {"error":"ConnectionError","message":"Please connect app to MF"};
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
  onClickOfSegRowObject: function(eventObject,data){
    this.view.flxImageViewer.left = "0%";
    this.view.ImageGallery.setImage(data.imgArray);
  },
  _convertDateStringToEpochTime: function(str){
    var dateTime = str.split(" ");
    var date = dateTime[0];
    var time = dateTime[1];
    var dateSplit = date.split("-");
    var year = parseInt(dateSplit[0]);
    var month = parseInt(dateSplit[1])-1;
    var day = parseInt(dateSplit[2]);
    var timeSplit = time.split(":");
    var hrs = parseInt(timeSplit[0]);
    var min = parseInt(timeSplit[1]);
    var sec = parseInt(timeSplit[2]);
    var dateObj = new Date(year,month,day,hrs,min,sec);
    var userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
    dateObj = new Date(dateObj.getTime() - userTimezoneOffset);
    return dateObj.getTime();
  }

});