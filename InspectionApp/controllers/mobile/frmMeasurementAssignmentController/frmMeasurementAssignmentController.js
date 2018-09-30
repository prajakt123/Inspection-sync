define({
    onNavigate: function(data) {
        this._navigationData = data;
        this._userData = data.userData;
        this._userRole = data.userData.userRole;
        if((this._userRole+"").toLowerCase()=="admin"){
          this._fetchUserData();
          //this.view.lbxAssignedTo.isVisible = true;
          this.view.segAssignedTech.removeAll();
          this.view.flxAssignedToAdmin.isVisible = true;
          this.view.lblTechnicianName.text = "";
          this.view.lblMemberName.text = data.userData.firstName + " "+ data.userData.lastName;
          this.view.flxAssignedToMember.isVisible = false;
        }
        else{
		  //this.view.lbxAssignedTo.isVisible = false;
          this.view.flxAssignedToAdmin.isVisible = false;
          this.view.lblTechnicianName.text = data.userData.firstName + " "+ data.userData.lastName;
          this.view.lblMemberName.text = data.userData.firstName + " "+ data.userData.lastName;
          this.view.flxAssignedToMember.isVisible = true;
        }
        this._selectedIndex = -1;
        this.view.flxMeasurementSet.removeAll();
        this.view.flxPDFContainer.removeAll();
        this._data = data.rowData;
        this._addDataToAssetCard(data.rowData);
        this._createDynamicMeasurementSet(data.rowData);
    },
    _addDataToAssetCard: function(data) {
        if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
            this.view.lblAssetId.text = data[0].asset_Id;
            this.view.lblAssetType.text = data[0].asset_Type_Name;
            this.view.lblAssetDescription.text = data[0].asset_Type_Description;
            if (data[0].reference_doc.toLowerCase()!=="null" && data[0].reference_doc !== "" && data[0].reference_doc !== undefined) {
                var pdfviewer = new com.konymp.pdfviewer({
                    "clipBounds": true,
                    "height": "100%",
                    "id": "pdfviewer",
                    "isVisible": false,
                    "layoutType": kony.flex.FREE_FORM,
                    "left": "0dp",
                    "masterType": constants.MASTER_TYPE_USERWIDGET,
                    "skin": "sknFlxICDefault",
                    "top": "0dp",
                    "width": "100%"
                }, {}, {});
                pdfviewer.url = data[0].reference_doc;
                pdfviewer.pdfType = "Online";
                pdfviewer.setAndroidPath = "";
                pdfviewer.setIphonePath = "";
                if (this.view.flxPDFContainer.pdfviewer !== undefined) {
                    this.view.flxPDFContainer.remove(this.view.flxPDFContainer.pdfviewer);
                }
                this.view.flxPDFContainer.add(pdfviewer);
            }

            //this.view.pdfviewer.setURL(data[0].reference_doc);
        }

    },
    _createDynamicMeasurementSet: function(data) {
        if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
            if (data[0].measurementSet !== undefined && Array.isArray(data[0].measurementSet)) {
                for (var i = 0; i < data[0].measurementSet.length; i++) {
                    data[0].measurementSet = data[0].measurementSet.sort(function(a, b) {
                        var nameA = a.measurement_setID.toLowerCase();
                        var nameB = b.measurement_setID.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                    var set = this._getDynamicMeasurementSet(data[0].measurementSet, i);
                    this.view.flxMeasurementSet.add(set);
                }
            }
        }
    },
    _onClickPDF: function() {
      if(!kony.sdk.isNullOrUndefined(this.view.pdfviewer)){
        this.view.pdfviewer.isVisible = true;
        this.view.flxPDFViewer.left = "0%";
      }
        
    },
    _getDynamicMeasurementSet: function(data, index) {
        var flxSet = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flxSet" + index,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "sknFlxICDefault",
            "top": "0dp",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxSet.setDefaultUnit(kony.flex.DP);
        var flxSetHeader = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "60dp",
            "id": "flxSetHeader" + index,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "left": "0dp",
            "skin": "sknFlxICDefault",
            "top": "14dp",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxSetHeader.setDefaultUnit(kony.flex.DP);
        var flxRadioImage = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "clipBounds": true,
            "height": "60dp",
            "id": "flxRadioImage" + index,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "21dp",
            "skin": "sknFlxICDefault",
            "top": "0dp",
            "width": "30dp",
            "zIndex": 1,
            "onClick": this._onClickOfRadioButtion.bind(this)
        }, {}, {});
        flxRadioImage.setDefaultUnit(kony.flex.DP);
        var imgRadio = new kony.ui.Image2({
            "centerY": "50%",
            "height": "20dp",
            "id": "imgRadio" + index,
            "isVisible": true,
            "left": "5dp",
            "skin": "sknImgICDefault",
            "src": "fsins_ic_radio_unselected.png",
            "top": "0dp",
            "width": "20dp",
            "zIndex": 1
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        flxRadioImage.add(imgRadio);
        var lblSetHeader = new kony.ui.Label({
            "centerY": "50%",
            "id": "lblSetHeader" + index,
            "isVisible": true,
            "left": "5dp",
            "skin": "sknlblICBg000000RCSFPDisReg130",
            "text": data[index].measurement_setID.toUpperCase(),
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "10%",
            "width": kony.flex.USE_PREFFERED_SIZE,
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxSetHeader.add(flxRadioImage, lblSetHeader);
        var flxSetBody = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": "flxSetBody" + index,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "skin": "sknFlxICDefault",
            "top": "5dp",
            "width": "100%",
            "zIndex": 1
        }, {}, {});
        flxSetBody.setDefaultUnit(kony.flex.DP);
        if (!kony.sdk.isNullOrUndefined(data[index].measurements) && Array.isArray(data[index].measurements)) {

            for (var i = 0; i < data[index].measurements.length; i++) {
                var flxMeasurement = this._getDynamicSetBody(data[index].measurements, index, i, data[index].measurement_setID);
                flxSetBody.add(flxMeasurement);
            }
        }
        flxSet.add(flxSetHeader, flxSetBody);
        return flxSet;
    },
    _getDynamicSetBody: function(data, index, i, measurementID) {

        var flxMeasurement = new kony.ui.FlexContainer({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "bottom": "14dp",
            "clipBounds": true,
            //"height": "46dp",
            "id": "flxMeasurement" + index + i,
            "isVisible": true,
            "layoutType": kony.flex.FLOW_HORIZONTAL,
            "left": "13%",
            "skin": "sknFlxBr666effRound",
            "top": "0dp",
            "width": "77%",
            "zIndex": 1
        }, {}, {});
        flxMeasurement.setDefaultUnit(kony.flex.DP);
        var imgMeasurement = new kony.ui.Image2({
            //                 "centerY": "50%",
            "height": "22dp",
            "id": "imgMeasurement" + index + i,
            "isVisible": true,
            "left": "14dp",
            "skin": "sknImgICDefault",
            "src": "fsins_ic_info.png",
            "top": "12dp",
            "bottom": "12dp",
            "width": "22dp",
            "zIndex": 1,
            "onTouchEnd": this._onClickOfInfoImage.bind(this, data, index, i, measurementID, data[i].measurement_Range_Id)
        }, {
            "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {});
        var lblMeasurementName = new kony.ui.Label({
            //                 "centerY": "50%",
            "id": "lblMeasurementName" + index + i,
            "isVisible": true,
            "left": "13dp",
            "skin": "sknLblICBg666EFFDisMed120",
            "text": data[i]["name"],
            "textStyle": {
                "letterSpacing": 0,
                "strikeThrough": false
            },
            "top": "10dp",
            "bottom": "10dp",
            "width": "74.44%",
            "zIndex": 1
        }, {
            "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
            "padding": [0, 0, 0, 0],
            "paddingInPixel": false
        }, {
            "textCopyable": false
        });
        flxMeasurement.add(imgMeasurement, lblMeasurementName);
        return flxMeasurement;
    },
    _onClickOfInfoImage: function(data, index, i, measurementID, measurement_Range_ID, eventObject, x, y) {
        this.view.loadingScreen.show();
//         kony.application.showLoadingScreen("", "Please wait...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        var queryParams = {
            "msid": measurementID
        };
        this._fetchFromODataService("inspectionObjService", "MeasurementSet", queryParams, this.onSuccesCallbackInfo.bind(this, measurement_Range_ID), this.errorCallbackInfo.bind(this));
    },
    onSuccesCallbackInfo: function(measurement_Range_ID, response) {
        this.view.loadingScreen.hide();
        kony.application.dismissLoadingScreen();
        var data = response.records[0].MeasurementHistoryList;
        var measurement_Range_Id = measurement_Range_ID;
        if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
            data = data.filter(function(element) {
                if (element.measurement_Range_Id == measurement_Range_Id)
                    return true;
                return false;
            }.bind(this));
            data = this._processData(data);
            this.view.flxInfoCard.left = "0%";

            this.view.InfoCard.setData(data);
        }
    },
    _processData: function(data) {
        var result = {};
        if (!kony.sdk.isNullOrUndefined(this._data) && Array.isArray(this._data) && data.length > 0) {
            result.measurement_name = data[0].measurement_name;
            result.measurement_Id = "#" + data[0].measurement_Id;
            result.measurement_description = data[0].measurement_description;
            var values = [];
            for (var i = 0; i < data.length; i++) {
                var tempJSON = {};
                tempJSON.date = this._getUTCDate(parseInt(data[i].inspection_Timestamp));
                tempJSON.time = this._getUTCTime(parseInt(data[i].inspection_Timestamp));
                tempJSON.value = data[i].inspection_Value;
                tempJSON.responseType = data[i].response_Type;
                values.push(tempJSON);
            }
            result.values = values;
        }
        return result;
    },
    errorCallbackInfo: function(response) {
        this.view.loadingScreen.hide();
		kony.application.dismissLoadingScreen();
        alert(response);
    },
    _getUTCDate: function(epochTime) {
        var result = "";
        var date = new Date(epochTime);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        result = this._addZeroPrefix(day) + "/" + this._addZeroPrefix(month) + "/" + year;
        return result;
    },
    _getUTCTime: function(epochTime) {
        var result;
        var currDate = new Date();
        var date = new Date(epochTime);
        var hr = this._addZeroPrefix(date.getHours());
        var min = this._addZeroPrefix(date.getMinutes());
        result = hr + ":" + min + " Hrs";
        return result;
    },
    _addZeroPrefix: function(number) {
        var result;
        if (number >= 0 && number < 10) {
            result = "0" + number;
        } else {
            result = number;
        }
        return result;
    },
    _onClickOfRadioButtion: function(eventobject) {
        var index = eventobject.id.replace("flxRadioImage", "");
        //eventobject["imgRadio"+index].src = "radio_selected.png";
        this._selectedIndex = index;
        if (!kony.sdk.isNullOrUndefined(this._data) && Array.isArray(this._data) && this._data.length > 0 && !kony.sdk.isNullOrUndefined(this._data[0].measurementSet) && Array.isArray(this._data[0].measurementSet) && this._data[0].measurementSet.length > 0) {
            for (var i = 0; i < this._data[0].measurementSet.length; i++) {
                if (i == this._selectedIndex) {
                    this.view["imgRadio" + i].src = "fsins_ic_radio_selected.png";
                } else {
                    this.view["imgRadio" + i].src = "fsins_ic_radio_unselected.png";
                }
            }
        }
    },
    _onClickofSubmit: function() {
        if (this._selectedIndex !== -1 && !kony.sdk.isNullOrUndefined(this._data[0].measurementSet) && !kony.sdk.isNullOrUndefined(this._data[0].measurementSet[this._selectedIndex].measurement_setID)) {
            var measurementSetId = this._data[0].measurementSet[this._selectedIndex].measurement_setID;
            var assigned_to = "";
            if(this._userRole.toLowerCase()=="admin"){
              if(!kony.sdk.isNullOrUndefined(this.view.segAssignedTech.selectedRowItems) && this.view.segAssignedTech.selectedRowItems.length>0){
                assigned_to = this.view.segAssignedTech.selectedRowItems[0].email;
              }
              else{
                alert("Select Technician to Assign");
                return;
              }
              //assigned_to = this.view.lbxAssignedTo.selectedKey;
            }
            else{
              assigned_to = this._userData.email;
            }            
		    var scheduledTimestamp = this._getScheduledDate();
            if (kony.sdk.isNullOrUndefined(scheduledTimestamp)) {
              alert("Select scheduled timestamp.");
              return;
            }
            var createdTimestamp = this._getCurrentTimeStamp();
            this.view.loadingScreen.show();
//             kony.application.showLoadingScreen("", "Please wait...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
            var data = {
                  "asset_Id": this._data[0].asset_Id,
                  "Inspection_Id": "9",
                  "assigned_Timestamp": scheduledTimestamp,
                  "assigned_To": assigned_to,
                  "inspectedBy": "",
                  "inspection_Images_Id": "23",
                  "signature": "nothing",
                  "status": "Assigned",
                  "timestamp": scheduledTimestamp,
                  "measurement_Set_Id": measurementSetId
                };
            this._insertRecords("inspectionObjService", "Inspection", data, this._insertSuccessCallback.bind(this), this._insertFailureCallback.bind(this));

        } else {
            alert("Measurement Id Not defined.");
        }


    },
    _insertSuccessCallback: function(response) {
        this.view.loadingScreen.hide();
        kony.application.dismissLoadingScreen();
        if (response.opstatus == 0) {
          this.view.alertpopup.showPopUp((response.id + " created successfully for "+this._data[0].asset_Id));
        }
    },
    _insertFailureCallback: function(response) {
        this.view.loadingScreen.hide();
        kony.application.dismissLoadingScreen();
        alert(response);
    },
    _getCurrentTimeStamp: function() {
        var date = new Date();
        var userTimezoneOffset = date.getTimezoneOffset() * 60000;
        date = new Date(date.getTime() + userTimezoneOffset);
        var currDay = this._addZeroPrefix(date.getDate());
        var currMonth = this._addZeroPrefix(date.getMonth() + 1);
        var currYear = this._addZeroPrefix(date.getFullYear());
        var hr = this._addZeroPrefix(date.getHours());
        var min = this._addZeroPrefix(date.getMinutes());
        var sec = this._addZeroPrefix(date.getSeconds());
        var dateinSQLFormat = currYear + "-" + currMonth + "-" + currDay + "T" + hr + ":" + min + ":" + sec;
        return dateinSQLFormat;
    },
    _addZeroPrefix: function(number) {
        var result;
        if (number >= 0 && number < 10) {
            result = "0" + number;
        } else {
            result = number;
        }
        return result;
    },
    _insertRecords: function(objectService, dataModel, dataFields, successCallback, failureCallback) {
        try {
            var sdkClient = new kony.sdk.getCurrentInstance();
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
            var dataObject = new kony.sdk.dto.DataObject(dataModel);
            dataObject.setRecord(dataFields);
            var options = {
                "dataObject": dataObject,
                "headers": {
                    "Content-Type": "application/json"
                },
                "queryParams": {}
            };
            if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
                objectInstance.create(options, successCallback, failureCallback);
            }
        } catch (exception) {
            this.view.loadingScreen.hide();
            kony.application.dismissLoadingScreen();
            throw exception;
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
    _fetchUserData: function(){
      this.view.loadingScreen.show();
//       kony.application.showLoadingScreen("","please wait...",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true,null);
      var objectService = "inspectionObjService";
      var dataModelObject = "UserList";
      var queryParams = {};
      this._fetchFromODataService(objectService, dataModelObject, queryParams, this._fetchUserData_Success.bind(this), this._fetchUserData_Failure.bind(this));
    },
    _fetchUserData_Success: function(response){
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      var data = response.records;
      if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
      	data = data[0].Users;
        data = this._processUserData(data);
        this._setUserData(data);
      }
    },
    _fetchUserData_Failure: function(response){
      this.view.loadingScreen.hide();
      kony.application.dismissLoadingScreen();
      alert(response);
    },
    _processUserData: function(data){
      var result = [];
      if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
      	for(var i=0;i<data.length;i++){
            var tempJSON = [];
            var name = data[i].FirstName+" "+data[i].LastName;
            var initials  ="";
            if(data[i].FirstName!==undefined && data[i].LastName)
            	initials = data[i].FirstName.charAt(0)+ data[i].LastName.charAt(0);
            
            tempJSON.email = data[i].email;
            tempJSON.name =name;
          	tempJSON.initials = initials;
            result.push(tempJSON);
        }
      }
      return result;
    },
    _setUserData: function(data){
      if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length > 0) {
        var widgetDataMap = {
          "lblInitials":"initials",
          "lblName":"name",
          "lblEmail":"email"
        };
        this.view.segAssignedTech.widgetDataMap = widgetDataMap;
		this.view.segAssignedTech.setData(data);
      }
      
    },
    _getDateComponent: function(){
      var hrs = this.view.lbxScheduledHours.selectedKey;
      var min = this.view.lbxScheduledMinutes.selectedKey; 
      if(kony.sdk.isNullOrUndefined(this.view.calScheduledDate.dateComponents)){
        return;
      }
      var dateComponent = this.view.calScheduledDate.dateComponents;
      if(dateComponent[0]==-1 && dateComponent[1]==-1){
        return;
      }
      var jsDateComponent = new Date(dateComponent[2],dateComponent[1]-1,dateComponent[0],parseInt(hrs),parseInt(min),0);
      return jsDateComponent;
    },
    _getScheduledDate: function(){
      
	  var date = this._getDateComponent();
      if(kony.sdk.isNullOrUndefined(date)){
        return;
      }
      var currentDate = new Date();
      var userTimezoneOffset = currentDate.getTimezoneOffset() * 60000;
      date = new Date(date.getTime() + userTimezoneOffset);
      var currDay = this._addZeroPrefix(date.getDate());
      var currMonth = this._addZeroPrefix(date.getMonth() + 1);
      var currYear = this._addZeroPrefix(date.getFullYear());
      var hr = this._addZeroPrefix(date.getHours());
      var min = this._addZeroPrefix(date.getMinutes());
      var sec = this._addZeroPrefix(date.getSeconds());
      var dateinSQLFormat = currYear + "-" + currMonth + "-" + currDay + "T" + hr + ":" + min + ":" + sec;
      return dateinSQLFormat;
    },
    _onClickHistory: function(){
      var navObj=new kony.mvc.Navigation("frmInspectionHistory");
      var obj={};
      obj.navigationData = this._navigationData;
      obj.asset_id = this._data[0].asset_Id;
      obj.previousForm = "frmMeasurementAssignment";
      navObj.navigate(obj);
    },
    _onClickBack: function(){
      var navObj=new kony.mvc.Navigation("frmInspectionCreation");
      this._userData.previousForm = "frmMeasurementAssignment";
      navObj.navigate(this._userData);
    },
    _onClickCloseAssignedTech: function(){
      this.view.flxAssignedTechnician.top = "100%";
    },
    _showAssignedListBox: function(){
      this.view.flxAssignedTechnician.top = "0%";
    },
    _onRowClickAssignedTech: function(){
      var data = this.view.segAssignedTech.selectedRowItems[0];
      this.view.lblTechnicianName.text = data.name;
      this.view.flxAssignedTechnician.top = "100%";
	}



});