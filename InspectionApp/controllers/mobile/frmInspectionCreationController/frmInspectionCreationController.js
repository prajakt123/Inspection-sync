define({
  onNavigate:function(Obj){
    return;
    if(!kony.sdk.isNullOrUndefined(Obj.previousForm) && Obj.previousForm=="frmInspectionsList"){
      this._navigationData = Obj.userAttribute;

    }
    else if(!kony.sdk.isNullOrUndefined(Obj.previousForm) && Obj.previousForm=="frmInspectionsList"){
      this._navigationData = Obj; 
    }
    else{
      this.view.flxBack.isVisible=false;
      this._navigationData = Obj;
    }
    if(this._navigationData.userRole=="Admin"){
      this.view.flxBack.isVisible=false;
      this.view.flxSearch.left = "6.5%";
    }
    else{
      this.view.flxBack.isVisible=true;
    }
    this.view.lblTaskNumbers.text ="Total 0";
  },
  _assetDistance:[],
  _assetData: [],
  _filteredData: [],
  _assetTypes: [],
  _selectedFilter: [],
  _isFilterEnabled : false,
  _checkEmptySegment: function(){
    var data = this.view.segAssets.data;
    if (kony.sdk.isNullOrUndefined(data) || (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length == 0)) {
      this.view.flxEmptyContainer.isVisible = true;
    }
    else{
      this.view.flxEmptyContainer.isVisible = false;
    }
  },
  onFormPostShow:function(){
    debugger;
    
  },
  _fetchData: function() {
    if (this._assetTypes.length == 0) {
      this._fetchAssetTypes();
    }
    this._fetchAssetData();
  },
  _checkPermission: function(){
    var options = {"isAccessModeAlways":true};
    var result = kony.application.checkPermission(kony.os.RESOURCE_LOCATION ,options);
    if(result.status == kony.application.PERMISSION_DENIED){ //Indicates permission denied
      if(result.canRequestPermission){
        kony.application.requestPermission(kony.os.RESOURCE_LOCATION, this.permissionStatusCallback.bind(this));
      }
      else{
        this._setDataToTotalTask(this._assetData);
        this._setDataToSegment(this._assetData);
      }
    }
    else if(result.status == kony.application.PERMISSION_GRANTED){
      this._getCurrentLocation();
    }
    else if(result.status == kony.application.PERMISSION_RESTRICTED){
      this._setDataToTotalTask(this._assetData);
      this._setDataToSegment(this._assetData);
      alert("Resource Access Restricted for User");
    }
  },
  permissionAlertHandler:function(){
    if(resp)
      kony.application.openApplicationSettings();
  },
  permissionStatusCallback: function(response){
    if(response.status == kony.os.PERMISSION_GRANTED){
      this._getCurrentLocation();
    }
    else if(response.status == kony.os.PERMISSION_DENIED){
      this._setDataToTotalTask(this._assetData);
      this._setDataToSegment(this._assetData);
    }
    this.view.loadingScreen.hide();
    this._setDataToTotalTask(this._assetData);
    this._setDataToSegment(this._assetData);
  },
  _fetchAssetData: function(){
    this.view.segAssets.data = [];
    this._checkEmptySegment();
    var objectService = "inspectionObjService";
    var dataModelObject = "AssetList";
    var queryParams = {};
    this.view.loadingScreen.show();
    //kony.application.showLoadingScreen("","Please wait..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
    this._fetchFromODataService(objectService, dataModelObject, queryParams, this._fetchDataSuccess.bind(this), this._fetchDataFailure.bind(this));
  },
  _getCurrentLocation: function(){
    if(kony.os.deviceInfo().name==="android"){
      kony.location.getCurrentPosition(this._getCurrentLocationSuccess.bind(this),this._getCurrentLocationFailure.bind(this));
    }
    else{
      this.view.loadingScreen.hide();
      this._setDataToTotalTask(this._assetData);
      this._setDataToSegment(this._assetData);
    }
  },
  _getCurrentLocationSuccess: function(res){
    this.view.loadingScreen.show();
    //kony.application.showLoadingScreen("","Please wait..",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
    var lat = "35.1343495";//res.coords.latitude;
    var long = "-90.0349313";//res.coords.longitude;
    var source = "{\"lat\":\""+lat+"\",\"long\":\""+ long+"\"}";
    var destinations="";
    if (!kony.sdk.isNullOrUndefined(this._assetData) && Array.isArray(this._assetData) && this._assetData.length > 0) {

      var temp="";
      for (var i = 0; i < this._assetData.length; i++) {
        //                 var temp = {};
        //                 temp.asset_id = this._assetData[i].asset_Id;
        //                 temp.lat = this._assetData[i].latitude;
        //                 temp.long = this._assetData[i].longitude;
        if(i==this._assetData.length-1)
          temp = temp+"{\"asset_id\":\""+ this._assetData[i].asset_Id +"\",\"lat\":\""+this._assetData[i].latitude+"\",\"long\":\""+this._assetData[i].longitude+"\"}";
        else{
          temp = temp+"{\"asset_id\":\""+ this._assetData[i].asset_Id +"\",\"lat\":\""+this._assetData[i].latitude+"\",\"long\":\""+this._assetData[i].longitude+"\"},";
        }
      }
      destinations = "["+ temp+"]";
    }
    var serviceName = "Location";
    var operationName ="getDistance";
    var data = {
      "source": source,
      "destinations": destinations};
    this._fetchDataIntegration(serviceName, operationName, data, this._getDistanceSuccess.bind(this),this._getCurrentLocationFailure.bind(this));
  },
  _getDistanceSuccess: function(res){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    if (!kony.sdk.isNullOrUndefined(res.location) && Array.isArray(res.location) && res.location.length > 0){
      this._assetDistance = res.location;
      for(var i=0;i<res.location.length;i++){
        for(var j=0;j<this._assetData.length;j++){
          if(res.location[i].asset_id==this._assetData[j].asset_Id){
            this._assetData[j].distance = res.location[i].distance;
          }
        }
      }
    }
    this._setDataToTotalTask(this._assetData);
    this._setDataToSegment(this._assetData);
  },
  _getCurrentLocationFailure: function(res){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    this._setDataToTotalTask(this._assetData);
    this._setDataToSegment(this._assetData);
  },
  _fetchDataIntegration: function(serviceName, operationName, data, succescallback, errorcallback) {
    try {
      var KNYMobileFabric = new kony.sdk.getCurrentInstance();
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      integrationObj.invokeOperation(operationName, {}, data, succescallback, errorcallback);
    } 
    catch (exception) {

    }
  },
  _fetchDataSuccess: function(response) {
    //this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();

    var data = this._processData(response.records[0].Assets);
    this._assetData = data;
    if (this._assetDistance.length == 0) {

      this._checkPermission();
    }
    else{
      this._modifyAssetData();
      this._setDataToTotalTask(this._assetData);
      this._setDataToSegment(this._assetData);
    }
  },
  _modifyAssetData: function(){
    for(var i=0;i<this._assetDistance.length;i++){
      for(var j=0;j<this._assetData.length;j++){
        if(this._assetDistance[i].asset_id==this._assetData[j].asset_Id){
          this._assetData[j].distance = this._assetDistance[i].distance;
        }
      }
    }
  },
  _setDataToTotalTask: function(data) {
    this.view.lblTaskNumbers.text = "Total " +data.length;
  },
  _processData: function(data) {
    var result = [];
    if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {

      for (var i = 0; i < data.length; i++) {
        var temp = {};
        temp.asset_Id = data[i].asset_Id;
        temp.asset_Type_Name = data[i].asset_Type_Name;
        temp.asset_Type_Description = data[i].asset_Type_Description;
        temp.latitude = data[i].latitude;
        temp.longitude = data[i].longitude;
        temp.asset_Img_URL = {
          "src": data[i].asset_Img_URL,
          "imageWhileDownloading": "fsins_ic_loader.gif"
        };
        temp.distance = " ";
        temp.address = data[i].locationDes + ", " + data[i].street + ", " + data[i].city + ", " + data[i].region + ", " + data[i].post_Code;
        temp.measurementSet = data[i].asset_measurement_set;
        temp.reference_doc = data[i].reference_doc;
        result.push(temp);
      }
    }
    return result;
  },
  _setDataToSegment: function(data) {
    return;
    var widgetDataMap = {
      "lblAssetId": "asset_Id",
      "lblAssetType": "asset_Type_Name",
      "lblAssetDescription": "asset_Type_Description",
      "imgAssetImage": "asset_Img_URL",
      "lblDistance": "distance",
      "lblAddress": "address"
    };
    this.view.segAssets.widgetDataMap = widgetDataMap;
    this.view.segAssets.data = data;
    this._checkEmptySegment();
  },
  _fetchDataFailure: function(response) {
    alert("Error::"+JSON.stringify(response));
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();

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
  _onTextChangeOfSearch: function(eventobject, changedtext) {
    try {
      if (changedtext.length > 0) {
        this.view.imgSearchCancel.isVisible = true;
        this.view.flxCancel.isVisible = true;
      } else {
        this.view.imgSearchCancel.isVisible = false;
      }
      changedtext = (changedtext + "").toLowerCase();
      var filteredSearchData = null;
      if(this._isFilterEnabled == false){
        filteredSearchData = this._getFilteredSearchData(this._assetData, changedtext);
      }
      else{
        filteredSearchData = this._getFilteredSearchData(this._filteredData, changedtext);
      }
      this.view.segAssets.data = filteredSearchData;
      this._checkEmptySegment();
      this.view.lblTaskNumbers.text = "Total "+filteredSearchData.length ;
    } catch (exception) {}
  },
  _onClickSearchClear: function() {
    this.view.txtSearch.text = "";
    this.view.imgSearchCancel.isVisible = false;

  },
  _getFilteredSearchData: function(data, changedtext) {
    var filteredData = null;
    try {
      if (Array.isArray(data) && data.length > 0) {
        filteredData = data.filter(function(str) {
          if (((str.asset_Id + "").toLowerCase()).indexOf(changedtext) >= 0)
            return true;
          else
            return false;
        });
      } else {
        filteredData = [];
      }
    } catch (exception) {}
    return filteredData;
  },
  _onClickCancel: function() {
    this.view.imgSearchCancel.isVisible = false;
    this.view.txtSearch.text = "";
    this.view.flxCancel.isVisible = false;
    if(this._isFilterEnabled == false){
      this.view.segAssets.data = this._assetData;
    }
    else{
      this.view.segAssets.data = this._filteredData;
    }
    this._checkEmptySegment();
    if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
      this.view.lblTaskNumbers.text = "Total "+this.view.segAssets.data.length ;
    }
    else{
      this.view.lblTaskNumbers.text = "Total 0" ;
    }
  },
  _createDynamicAssetType: function(data) {
    if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
      var lblAssetHeader = new kony.ui.Label({
        "id": "lblAssetType",
        "isVisible": true,
        "left": "6%",
        "skin": "sknlblICBg00000Op0SFPTxtReg100",
        "text": "TYPE",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "bottom":"6dp",
        "width": "70%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });
      this.view.flxFilterContent.add(lblAssetHeader);
      for (var i = 0; i < data.length; i++) {
        var flxAssetType = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "50dp",
          "id": "flxAssetType" + i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0dp",
          //"onTouchStart": controller.AS_FlexContainer_d5a5ff8a346b47df92465b2a12965089,
          "skin": "slFbox",
          "top": "0dp",
          "width": "100%",
          "zIndex": 1
        }, {}, {});
        flxAssetType.setDefaultUnit(kony.flex.DP);
        var flxAssetDivider = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "1dp",
          "id": "flxAssetDivider" + i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "6%",
          "skin": "CopyslFSbox0g22f430158ba45",
          "top": "49dp",
          "width": "88%",
          "zIndex": 1
        }, {}, {});
        flxAssetDivider.setDefaultUnit(kony.flex.DP);
        var lblAssetType = new kony.ui.Label({
          "centerY": "50%",
          "id": "lblAssetType" + i,
          "isVisible": true,
          "left": "6%",
          "skin": "CopydefLabel0i31aeac2462e49",
          "text": data[i].name,
          "textStyle": {
            "letterSpacing": 0,
            "strikeThrough": false
          },
          "top": "0dp",
          "width": "70%",
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "textCopyable": false
        });
        var flxImageBox = new kony.ui.FlexContainer({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "clipBounds": true,
          "height": "100%",
          "id": "flxImageBox" + i,
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "right": "1%",
          "skin": "slFbox",
          "top": "0dp",
          "width": "15%",
          "onClick": this._onClickFlxImageBox.bind(this),
          "zIndex": 1
        }, {}, {});
        flxImageBox.setDefaultUnit(kony.flex.DP);
        var imgFilterBox = new kony.ui.Image2({
          "centerX": "50%",
          "centerY": "50%",
          "height": "20dp",
          "id": "imgFilterBox" + i,
          "isVisible": true,
          "skin": "slImage",
          "src": "fsins_ic_checkbox_unselected.png",
          "width": "20dp",
          "zIndex": 1
        }, {
          "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        flxImageBox.add(imgFilterBox);
        flxAssetType.add(lblAssetType, flxImageBox, flxAssetDivider);
        this.view.flxFilterContent.add(flxAssetType);
      }
    }

  },

  _fetchAssetTypes: function() {
    var objectService = "inspectionObjService";
    var dataModelObject = "AssetTypes";
    var queryParams = {};
    this.view.loadingScreen.show();
    //kony.application.showLoadingScreen("","Please wait...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
    this._fetchFromODataService(objectService, dataModelObject, queryParams, this._successFetchAssetTypes.bind(this), this._failureFetchAssetTypes.bind(this));
  },
  _successFetchAssetTypes: function(response) {
    //         this.view.loadingScreen.hide();
    //         kony.application.dismissLoadingScreen();
    this._assetTypes = response.records[0].AssetType;
    this._assetTypes = this._assetTypes.sort(function(a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.view.flxFilterContent.removeAll();
    this._createDynamicAssetType(this._assetTypes);
  },
  _failureFetchAssetTypes: function(res){
    this.view.loadingScreen.hide();
    kony.application.dismissLoadingScreen();
    alert(res);
  },
  _onClickFlxImageBox: function(eventobject) {
    var id = eventobject.id.replace("flxImageBox", "");
    if (this.view.flxFilterContent["imgFilterBox" + id].src == "fsins_ic_checkbox_selected.png") {
      this.view.flxFilterContent["imgFilterBox" + id].src = "fsins_ic_checkbox_unselected.png";
    } else {
      this.view.flxFilterContent["imgFilterBox" + id].src = "fsins_ic_checkbox_selected.png";
    }
  },
  _onClickApplyFilter: function() {
    var widgets = this.view.flxFilterContent.widgets();
    var selectedAssetTypes = [];
    for (var i = 0; i < widgets.length-1; i++) {
      if (this.view.flxFilterContent["imgFilterBox" + i].src == "fsins_ic_checkbox_selected.png") {
        selectedAssetTypes.push(this._assetTypes[i].name);
      }
    }
    this._selectedFilter = selectedAssetTypes;
    var filteredData = this._assetData;
    filteredData = filteredData.filter(function(element) {
      return this._isStringInArray(element["asset_Type_Name"], selectedAssetTypes);
    }.bind(this));
    this._filterCount = this._selectedFilter.length;
    this.populateFilterCount();
    this._filteredData = filteredData;
    this.view.segAssets.data = filteredData;
    this._checkEmptySegment();
    this.view.lblTaskNumbers.text = "Total "+filteredData.length;
    this._isFilterEnabled = true;
    this._hideFilterScreen();
  },
  populateFilterCount: function(){
    if(this._filterCount>0){
      //       this.view.lblFilterCount.isVisible=true;
      this.view.lblFilterScreen.text = "("+Number(this._filterCount).toFixed()+")"+ " FILTER";
      this.view.lblFilter.skin = "sknLblInspectionFIlter666eff";
      this.view.lblFilterCount.text = Number(this._filterCount).toFixed();
      this.view.imgFilter.src = "filter_blue.png";//change to filter blue
      this.view.flxFilterCountContainer.isVisible = true;
    }
    else{
      //       this.view.lblFilterCount.isVisible=false;
      this.view.lblFilterScreen.text = "FILTER";
      this.view.lblFilter.skin = "sknLblInspectionFIlter";
      this.view.lblFilterCount.text = "";
      this.view.imgFilter.src = "filter.png";
      this.view.flxFilterCountContainer.isVisible = false;
    }
    this._filterCount=0;
  },
  _isStringInArray: function(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
      if (strArray[j].match(str))
        return true;
    }
    return false;
  },
  _showFilterScreen: function() {
    this.view.flxFilterScreen.left = "0%";
  },
  _hideFilterScreen: function() {
    this.view.flxFilterScreen.left = "100%";
  },
  _onClickSegAsset: function() {
    var navigationObj = new kony.mvc.Navigation("frmMeasurementAssignment");
    var navigationData = {};
    navigationData.previousForm = "frmInspectionCreation";
    navigationData.rowData = this.view.segAssets.selectedRowItems;
    navigationData.userData = this._navigationData;
    navigationObj.navigate(navigationData);
  },
  _onClickFilterReset: function() {
    this.view.lblTaskNumbers.text = "Total "+ this._assetData.length;
    this.view.segAssets.data = this._assetData;
    this._checkEmptySegment();
    this._selectedFilter = [];
    this._hideFilterScreen();
    this._filteredData = [];
    this._isFilterEnabled = false;
    var widgets = this.view.flxFilterContent.widgets();
    for (var i = 0; i < widgets.length-1; i++) {
      this.view["imgFilterBox" + i].src = "fsins_ic_checkbox_unselected.png";
    }

  },
  _onClickBack: function(){
    var navObj=new kony.mvc.Navigation("frmInspectionsList");
    var navigationData = {};
    navigationData = this._navigationData;
    navObj.navigate(navigationData);
  },
  _parseRecords:function(records,key){
    debugger;
    var recordLength=records.length;
    var mappedData={};
    var recordKey;
    for(var i=0;i<recordLength;i++){
      recordKey=records[i][key];
      if(mappedData[recordKey]===null||mappedData[recordKey]===undefined){
        mappedData[recordKey]=[records[i]];
      }else{
        mappedData[recordKey].push(records[i]);
      }
    }
    return mappedData;
  },


});