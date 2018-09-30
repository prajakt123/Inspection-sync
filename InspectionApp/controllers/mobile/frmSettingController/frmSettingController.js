define({ 

  count:0,
  objectList:["asset","asset_groupnames","asset_location","asset_measurement_set","asset_type","groupnames",
              "inspection","inspection_measurement",
              "inspection_user","measurement","measurement_history","measurement_images","measurement_range",
              "measurementset_measurementrange","media"],
  createInspection:function(){
    debugger;
    var inspection=new kony.sdk.KNYObj("inspection");
    var record={
      "Status":"Assigned",
      "Assigned_To":"Tony",
      "Asset_Id":1,
      "CreatedTimestamp":"2018-09-18T15:57:47+05:30",
      "InspectedBy":"Tony",
      //"Inspection_Id":93,
      "Signature":"",
      "LastUpdatedTimestamp":"2018-09-19T12:00:25+05:30",
      //"Inspection_Images_Id":"null",
      "Assigned_Timestamp":"2018-01-05T15:24:27+05:30",
      "SoftDeleteFlag":true,
      "id":0,
    };
    function successCB(result){
      debugger;
    }
    function errorCB(result){
      debugger;
    }
    try{
      inspection.create(record, {}, successCB, errorCB);
    }catch(excp){
      debugger;
      alert(excp.message);
    }

  },
  resetSync:function(){
    var options = {"deviceDbEncryptionKey" : "sample"};
    //kony.application.showLoadingScreen("please wait...");
    function setupSuccess(response){
      kony.application.dismissLoadingScreen();
      alert(response);
      //this.startSync();
    }
    function setupFailure(response){
      kony.application.dismissLoadingScreen();
      alert(response.message);
    }
    try{
      kony.application.showLoadingScreen("setting up...");
      KNYMobileFabric.OfflineObjects.setup(setupSuccess.bind(this), setupFailure.bind(this));
      //KNYMobileFabric.OfflineObjects.reset(setupSuccess.bind(this),setupFailure.bind(this));
    }catch(excp){
      kony.print("Excpetion: "+excp);
      kony.application.dismissLoadingScreen();
    }    
  },
  startSyncOnObject:function(){
    this.startSync(this.objectList[this.count]);
    this.count=this.count+1;
    if(this.count===15)
      this.count=0;
  },

  startSync:function(){
    debugger;
    var syncOptions={};//"downloadBatchSize":"100",
    syncOptions.uploadBatchSize="200";
    // "uploadBatchSize":"200"};
    try{
      var syncObjService= new kony.sdk.KNYObjSvc("InspObjSrvc");
      //var syncObjService=new kony.sdk.KNYObj("measurement");
      kony.application.showLoadingScreen("please wait...");
      syncObjService.startSync(syncOptions,this.successCB,this.failureCB,this.progressCB);
    }catch(excp){
      kony.print("Exception: "+excp);
      kony.application.dismissLoadingScreen();
    }
  },
  progressCB:function(result){
    kony.print("##########"+result);
  },
  successCB:function(response){
    debugger;
    alert("success: "+response);
    kony.application.dismissLoadingScreen();
    kony.logger.currentLogLevel = kony.logger.logLevel.ALL; 
    kony.logger.activatePersistors(kony.logger.consolePersistor);
    kony.print(response);
  },
  failureCB:function(response){
    alert("Failure: "+JSON.stringify(response));
    kony.application.dismissLoadingScreen();
    debugger;
    kony.print(response);
  },
  fetchRecords:function(){
    debugger;
    this.count=0;
    this._fetchRecords("asset");
    this._fetchRecords("asset_groupnames");
    this._fetchRecords("asset_location");
    this._fetchRecords("asset_measurement_set");
    this._fetchRecords("asset_type");
    this._fetchRecords("groupnames");
    this._fetchRecords("inspection");
    this._fetchRecords("inspection_measurement");
    this._fetchRecords("inspection_user");
    this._fetchRecords("measurement");
    this._fetchRecords("measurement_hstry");
    this._fetchRecords("measurement_images");
    this._fetchRecords("measurement_range");
    this._fetchRecords("measurementset_measurementrange");
    this._fetchRecords("media");

  },
  _fetchRecords:function(dataModel){
    var self=this;
    function successCB(record){
      //holderKey=record;
      switch(dataModel){
        case "asset_groupnames":
          assetGroupsList=record;
          break;
        case "asset_location":
          assetLocationsList=record;
          break;
        case "asset_measurement_set":
          assetMeasurementsList=record;
          break;
        case "asset":
          assetsList=record;
          break;
        case "groupnames":
          assetGroupNameList =record;
          break;
        case "asset_type":
          assetTypesList =record;
          break;
        case "inspection_measurement":
          inspectionMeasurementList =record;
          break;
        case "inspection":
          inspectionList =record;
          break;
        case "measurement_hstry":
          measurementHistoryList=record;
          break;
        case "measurement_images":
          measurementImageList=record;
          break;
        case "measurement_range":
          measurementRangeList=record;
          break;
        case "measurement":
          measurementList =record;
          break;
        case "measurementset_measurementrange":
          measurementSetRangeList=record;
          break;
        case "media":
          mediasList=record;
          break;
        case "inspection_user":
          mediasList=record;
      }
      if(this.count==14){
        //alert("all records fetched");
        try{
          var navObj=new kony.mvc.Navigation("frmInspectionsList");
          navObj.navigate([]);
        }catch(excp){
          alert(JSON.stringify(excp));
        }
      }
      this.count=this.count+1;
      //this.getAssetLocation();
    }
    function failureCB(error){
      alert(JSON.stringify(error));
      //this.getAssetLocation();
    }
    try{
      var inspObj=new kony.sdk.KNYObj(dataModel);
      inspObj.get(null,successCB.bind(this),failureCB.bind(this));
    }catch(excp){
      alert(excp.message);
      kony.print("Exception occured:- "+JSON.stringify(excp));      //this.getAssetLocation();
    }
  }
});