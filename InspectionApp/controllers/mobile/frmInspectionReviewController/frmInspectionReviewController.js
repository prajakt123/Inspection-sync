define({ 
  //Type your controller code here 
  record:null,
  imageCount:0,
  from:null,
  assetDetail:null,
  _inspection:null,
  measurementSetId:null,
  //reviewData["measurementSetId"]=this.measurementSetId;
  onNavigate:function(data){
    debugger;
    if(data===null||data===undefined)
      return;
    this.record=data;
    this.measurementSetId=data["measurementSetId"];
    var inspection=data.inspection;
    this._inspection=inspection;
    this.view.signaturecapture.clearSignature();
    if(data.from=="frmInspectionsList"){
      //this.showMeasuredData();
      this.from="frmInspectionsList";
      this.view.lblCaptureSignatureTitle.setVisibility(false);
      this.view.flxSignatureComp.setVisibility(false);
      this.view.btnSubmitInspection.setVisibility(false);
      //return;
    }else{
      this.from="frmInspectionExecution";
      this.view.lblCaptureSignatureTitle.setVisibility(true);
      this.view.flxSignatureComp.setVisibility(true);
      this.view.btnSubmitInspection.setVisibility(true);
    }
    this.view.lblAssetIdValue.text=app_constant.asset+InspectionUtil.validateText(inspection.Asset_Id);
    this.view.lblInspectionIDValue.text=app_constant.inspection+InspectionUtil.validateText(inspection.Inspection_Id);
    var status=validateText(inspection["Status"]).toLowerCase();
    if(typeof status==='string'){
      status=status.toLocaleLowerCase();
      status=status.trim();
    }
    switch(status){
      case "assigned":
        this.view.lblInspectionStatus.text="Assigned";
        break;
      case "in-progress":
        this.view.lblInspectionStatus.text="In-progress";
        break;
      case "completed":
        this.view.lblInspectionStatus.text="Completed";
    }
    //     this.view.lblAssetCode.text=validateText(inspection.asset_type);
    //     this.view.lblAssetNameValue.text=validateText(inspection.asset_description);
    this.view.lblAssetCode.text=app_constant.asset+InspectionUtil.validateText(inspection.Asset_Id);
    var asset=inspection["asset"];
    if(typeof asset==='object' && typeof asset!==null){
      var assetType=asset["type"];
      if(typeof assetType==='object' && typeof asset!==null){
        this.view.lblAssetNameValue.text=InspectionUtil.validateText(assetType["Description"]);
      }else{
        this.view.lblAssetNameValue.text="NA";
      }
    }else{
      this.view.lblAssetNameValue.text="NA";
    }
    this.setMeasurementToSegment(data.measurement);
    //this.populateAssetDetail(data.assetDetail);
    this.setCapturedImage(data.measurement);
  },
  /************************** sync module start *****************************/
  /**
   * @function
   *
   */
  submitInspection:function(){
    debugger;
    kony.print("in submit inspection!");
    try{
      var inspObj=this.getInspectedData();
      if(typeof inspObj==='object' && typeof inspObj!==null){
        var measurementHistoryList=inspObj["measurementHistroyRecord"];
        if(Array.isArray(measurementHistoryList)){
          //for(var i=0;i<measurementHistoryList.length;i++){
          this.createMeasurementHistory(measurementHistoryList,0);
          return;
          for(var i=0;i<1;i++){
            var measurementHistory=measurementHistoryList[i];
            //this.createMeasurementHistory(measurementHistory,i);
          }
        }
      }
    }catch(excp){
      kony.print("Exception occured:- "+JSON.stringify(excp));
    }
  },
  /**
   * @function createMeasurement
   *
   */
  createMeasurementHistory:function(measurementList,index){
    debugger;
    function successCB(result){
      debugger;
      this.createMeasurementHistory(measurementList, index+1);
      if(index+1===measurementList.length){
        alert("All measurement captured");
      }
    }
    function errorCB(result){
      debugger;
    }
    if(Array.isArray(measurementList) && typeof index==='number' && index<measurementList.length){
      var measurement=measurementList[index];
      var mHistory={
        "CreatedTimestamp": null,
        "id": 0,
        "Inspection_Id": measurement["inspection_Id"],
        "Inspection_Timestamp": measurement["inspection_Timestamp"],
        "Inspection_Value": measurement["inspection_Value"]+"",
        "LastUpdatedTimestamp": null,
        "Measurement_Images_Id": null,
        "Measurement_Range_Id": measurement["measurement_Range_Id"],
        "Measurement_Set_Id": measurement["measurement_Set_Id"],
        "Response_Type": measurement["response_Type"],
        "SoftDeleteFlag": false,
        "Timestamp": measurement["Timestamp"]
      };
      try{
        var measurementHistory=new kony.sdk.KNYObj("measurement_hstry");
        measurementHistory.create(mHistory, {}, successCB.bind(this), errorCB.bind(this,index));
      }catch(excp){
        debugger;
        alert(excp.message);
      }
    }
  },
  /************************** sync module end *****************************/
  setCapturedImage:function(measurement){
    this.view.flxInspectionImage.removeAll();
    if(Array.isArray(measurement)){
      var length=measurement.length;
      var mediaList;
      var flexItem;
      if(length===0){
        this.view.flxInspectionImage.setVisibility(false);
        return;
      }
      else{
        this.view.flxInspectionImage.setVisibility(true);
      }
      for(var i=0;i<length;i++){
        mediaList=measurement[i].media_list;
        if(Array.isArray(mediaList)){
          for(var j=0;j<mediaList.length;j++){
            flexItem=this.getFlexImageItem(i+""+j, mediaList[j]);
            this.view.flxInspectionImage.add(flexItem);
          }
        }

      }
      this.view.forceLayout();
    }

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
  /*populateAssetDetail2:function(asset){
    if(asset!==null&&asset!==undefined){
      this.view.lblAssetId2.text=validateText(asset.asset_Id);
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
  },*/
  setMeasurementToSegment:function(data){
    if(Array.isArray(data)){
      var meausermentLength=data.length;
      var segObj={};
      var segList=[];
      var measurement;
      for(var i=0;i<meausermentLength;i++){
        measurement=data[i];
        segObj={};
        /*if(measurement["measurement_value"]===null){
          continue;
        }*/
        segObj["lblMeasurementTitle"]=measurement["measurement_name"];
        if(measurement["measurement_value"]===null || measurement["measurement_value"]==="null"){
          segObj["lblMeasurementvalue"]={"text":"Not captured","skin":"sknLblDay"};
        }else if(measurement["measurement_type"]==="Text"){
          segObj["lblMeasurementvalue"]={"text":measurement["measurement_value"],"skin":"sknLblDay"};
        }else{
          segObj["lblMeasurementvalue"]={"text":measurement["measurement_value"]};
        }


        /*if(measurement["measurement_type"]==="Text"){
          segObj["lblMeasurementvalue"]={"text":measurement["measurement_value"],"skin":"sknLblDay"};
        }else{
          if(measurement["measurement_value"]===null || measurement["measurement_value"]==="null"){
            segObj["lblMeasurementvalue"]={"text":"Not captured","skin":"sknLblDay"};
          }else
            segObj["lblMeasurementvalue"]={"text":measurement["measurement_value"]};
        }*/
        segList.push(segObj);
      }
      this.view.segMeasurement.removeAll();
      this.view.segMeasurement.setData(segList);
    }  
  },
  getInspectedData:function(){
    var data={};
    var inspection=this.record.inspection;
    //this.inspectionValue;
    data["inspection_Id"]=inspection["Inspection_Id"];
    data["inspectedBy"]=inspection["Assigned_To"];
    //data["signature"]=this.view.signaturecapture.getSignature();
    var signa=this.view.signaturecapture.getSignature();
    var raw_byte=kony.convertToRawBytes(signa);
    var img=new kony.image.createImage(raw_byte);
    if(kony.os.deviceInfo().name==="android"){
      img=new kony.image.createImage(raw_byte);
    }else{
      img=kony.image.createImage(raw_byte);
    }
    img.scale(0.02);
    var newBase64=kony.convertToBase64(img.getImageAsRawBytes());
    data["signature"]=newBase64;
    data["status"]="Completed";
    data["timestamp"]=getUtcDateTimeString();
    //data["measurementHistroyRecord"]=[];
    var measurementList=this.record.measurement;
    var measurement={};
    var measurementHistroyRecord=[];
    //measurement["measurement_History_Id"];
    for(var i=0;i<measurementList.length;i++){
      measurement={};
      if(measurementList[i]["measurement_value"]===null){
        continue;
      }
      measurement["measurement_History_Id"]="";
      measurement["response_Type"]=measurementList[i]["measurement_type"]
      measurement["inspection_Timestamp"]=getUtcDateTimeString();
      measurement["inspection_Value"]=measurementList[i]["measurement_value"];
      measurement["Timestamp"]=getUtcDateTimeString();
      measurement["inspection_Id"]=inspection["Inspection_Id"];
      measurement["measurement_Range_Id"]=measurementList[i]["measurement_range_id"];
      measurement["measurement_Set_Id"]=this.measurementSetId;//inspection["Measurement_Set_Id"];
      measurement["Measurement_Images_Id"]="";
      measurement["mediaUrls"]=measurementList[i].media_list;
      measurementHistroyRecord.push(measurement);
    }
    data["measurementHistroyRecord"]=measurementHistroyRecord;
    kony.print(JSON.stringify(data));
    return data;
  },
  submitInspectionSuccessCB:function(result){
    debugger;

    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    if(kony.os.deviceInfo().name==="android"){
      var toast=new kony.ui.Toast({"text":"Submitted successfully!","duration":constants.TOAST_LENGTH_SHORT });
      toast.show();
    }
    try{
      var navObj=new kony.mvc.Navigation("frmInspectionsList");
      navObj.navigate();
    }catch(excp){
      alert(JSON.stringify(excp));
    }
    //alert(result);
    //this.populateInspectionsToSegment(this.inspectionList);
  },
  submitInspectionFailureCB:function(result){
    debugger;
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    alert("error:"+result)

  },

  submitInspection2:function(){
    debugger;
    kony.print("in getInspection!");
    try{
      var inspObj=this.getInspectedData();
      return;
      if(inspObj===null||inspObj===undefined)return;
      var objectInstance=getObjectInstance();
      if(objectInstance!==null){
        var dataObject = new kony.sdk.dto.DataObject("InspectionExecution");
        dataObject.setRecord(inspObj);
        var options = {
          "dataObject": dataObject,
          "headers": {},
          //"queryParams": {"$filter":"((SoftDeleteFlag ne true) or (SoftDeleteFlag eq null))"}
        };
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
          /*kony.application.showLoadingScreen("sknLoading","please wait..",constants.
                                             LOADING_SCREEN_POSITION_ONLY_CENTER, true,true,{enableMenuKey:true, 
                                                                                             enableBackKey:true, progressIndicatorColor : "ffffff77"});*/
          this.view.loadingScreen.show();
          //kony.model.ApplicationContext.showLoadingScreen("Please wait..");
          objectInstance.create(options, this.submitInspectionSuccessCB.bind(this),this.submitInspectionFailureCB.bind(this));
        } else {
          this.view.loadingScreen.hide();
          kony.application.dismissLoadingScreen();
          alert("No Network connected");
        }
      }
    }catch(excp){
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      kony.print("Exception occured in getDesignation: "+JSON.stringify(excp) );
    }
  },
  getFlexImageItem:function(id,imageUrl){
    var flxImageItem0 = new kony.ui.FlexContainer({
      "autogrowMode": kony.flex.AUTOGROW_NONE,
      "centerY": "50%",
      "clipBounds": true,
      "height": "80dp",
      "id": "flxImageItem"+id,
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "left": "0dp",
      "skin": "sknFlxInspectionListWhiteBGWithWhiteBorder",
      "width": "80dp",
      "zIndex": 1
    }, {}, {});
    flxImageItem0.setDefaultUnit(kony.flex.DP);
    var imgItem0 = new kony.ui.Image2({
      "centerX": "50%",
      "centerY": "50%",
      "height": "100%",
      "id": "imgItem"+id,
      "isVisible": true,
      "left": "10dp",
      "skin": "slImage",
      "imageWhileDownloading": "loader.gif",
      "top": "17dp",
      "width": "100%",
      "zIndex": 1
    }, {
      "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    imgItem0.src=imageUrl;
    flxImageItem0.add(imgItem0);
    return flxImageItem0;
  },
  navigateBack:function(){
    try{
      var formName=this.from;
      var navObj=new kony.mvc.Navigation(formName);
      navObj.navigate();
    }catch(excp){
      kony.print("Exception occured while navigating back: "+excp.toString());
    }
  },
  onPostShow:function(){
    debugger;
    return;
    if(this._inspection===null||this._inspection===undefined)return;
    else if(this.assetDetail===null)
      this.getAssetDetail(validateText(this._inspection["asset_Id"]));
    this.view.forceLayout();
  },
  getAssetDetailSuccessCB:function(result){
    debugger;
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    if(result!==null&&result!==undefined){
      if(Array.isArray(result.Assets)){
        this.populateAssetDetail(result.Assets[0]);
      }
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
  getAssetDetailFailureCB:function(result){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    alert("error:"+result)
  },
  populateAssetDetail:function(asset){
    if(asset!==null&&asset!==undefined){
      this.assetDetail=asset;
      this.view.lblAssetId2.text=validateText(asset.asset_Id);
      this.view.lblAssetCodeAssetDetailValue.text=validateText(asset.asset_Type_Name);
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
  _onClickOfHistory: function(){
    var navigationObj = new kony.mvc.Navigation("frmInspectionHistory");
    var navigationData = {};
    navigationData.previousForm = "frmInspectionReview";
    navigationData.asset_id = this._inspection["asset_Id"];
    navigationObj.navigate(navigationData);
  }

});