define(function() {

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {

        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {

        },
        setData: function(data) {
			this._setDataToHeaders(data);
            this.view.flxScrollPreviousValues.removeAll();
            this._createDynamicCardsAndSetData(data.values);
        },
        hideInfoCard: function() {

        },
        _setDataToHeaders: function(data) {
            this.view.lblMeasurementID.text = data.measurement_Id;
            this.view.lblMeasurementName.text = data.measurement_name;
            this.view.lblMeasurementDescription.text = data.measurement_description;
            this.view.lblPreviousValues.text = "Previous Values";
        },
        _createDynamicCardsAndSetData: function(data){
          if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data) && data.length>0){
            if(!kony.sdk.isNullOrUndefined(data[0].responseType)){
              if(data[0].responseType.toLowerCase()!=="text" || data[0].responseType.toLowerCase()!=="listbox"){
                this._createAnsSetDynamicDataNB(data);
              }
              else{
                this._createDynamicCardsNormal(data);
              }
            }
          }
        },
        _createDynamicCardsNormal: function(data) {
            if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    var flxValues = new kony.ui.FlexContainer({
                        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                        "clipBounds": true,
                        "id": "flxValues" + i,
                        "isVisible": true,
                        "layoutType": kony.flex.FLOW_VERTICAL,
                        "left": "12dp",
                        "right": "6dp",
                        "skin": "CopyslFbox0jc55fbcf074848",
                        "top": "5dp",
                        "width": "80%",
                        "zIndex": 1
                    }, {}, {});
                    if(i==0){
						flxValues.left = "7%";
                    }
                    flxValues.setDefaultUnit(kony.flex.DP);
                    var flxDateTime = new kony.ui.FlexContainer({
                        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                        "clipBounds": true,
                        "id": "flxDateTime" + i,
                        "isVisible": true,
                        "layoutType": kony.flex.FREE_FORM,
                        "left": "0dp",
                        "skin": "slFbox",
                        "top": "16dp",
                        "width": "100%",
                        "zIndex": 1
                    }, {}, {});
                    flxDateTime.setDefaultUnit(kony.flex.DP);
                    var lblDate = new kony.ui.Label({
                        "bottom": "3dp",
                        "id": "lblDate" + i,
                        "isVisible": true,
                        "left": "21dp",
                        "skin": "CopydefLabel0bddde4d4f0b842",
                        "text": data[i].date,
                        "textStyle": {
                            "letterSpacing": 0,
                            "strikeThrough": false
                        },
                        "top": "7dp",
                        "width": kony.flex.USE_PREFFERED_SIZE,
                        "zIndex": 1
                    }, {
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "padding": [0, 0, 0, 0],
                        "paddingInPixel": false
                    }, {
                        "textCopyable": false
                    });
                    var lblTime = new kony.ui.Label({
                        "bottom": "3dp",
                        "id": "lblTime" + i,
                        "isVisible": true,
                        "right": "21dp",
                        "skin": "CopydefLabel0bddde4d4f0b842",
                        "text": data[i].time,
                        "textStyle": {
                            "letterSpacing": 0,
                            "strikeThrough": false
                        },
                        "top": "7dp",
                        "width": kony.flex.USE_PREFFERED_SIZE,
                        "zIndex": 1
                    }, {
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "padding": [0, 0, 0, 0],
                        "paddingInPixel": false
                    }, {
                        "textCopyable": false
                    });
                    flxDateTime.add(lblDate, lblTime);
                    var flxInspectionValues = new kony.ui.FlexContainer({
                        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                        "bottom": 15,
                        "clipBounds": true,
                        "id": "flxInspectionValues" + i,
                        "isVisible": true,
                        "layoutType": kony.flex.FREE_FORM,
                        "left": "0dp",
                        "skin": "slFbox",
                        "top": "15dp",
                        "width": "100%",
                        "zIndex": 1
                    }, {}, {});
                    flxInspectionValues.setDefaultUnit(kony.flex.DP);
                    var lblValues = new kony.ui.Label({
                        "id": "lblValues" + i,
                        "isVisible": true,
                        "left": "23dp",
                        "skin": "CopydefLabel0bddde4d4f0b842",
                        "text": data[i].value,
                        "textStyle": {
                            "letterSpacing": 0,
                            "strikeThrough": false
                        },
                        "top": "13dp",
                        "width": "86%",
                        "zIndex": 1
                    }, {
                        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                        "padding": [0, 0, 0, 0],
                        "paddingInPixel": false
                    }, {
                        "textCopyable": false
                    });
                    flxInspectionValues.add(lblValues);
                    flxValues.add(flxDateTime, flxInspectionValues);
                    this.view.flxScrollPreviousValues.add(flxValues);
                }
            }

        },
        _createAnsSetDynamicDataNB: function(data){
          
          if (!kony.sdk.isNullOrUndefined(data) && Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var flxValueNB = new kony.ui.FlexContainer({
                  "autogrowMode": kony.flex.AUTOGROW_NONE,
                  "clipBounds": true,
                  "height": "120dp",
                  "id": "flxValueNB"+i,
                  "isVisible": true,
                  "layoutType": kony.flex.FLOW_VERTICAL,
                  "left": "12dp",
                  "right": "6dp",
                  "skin": "CopyslFbox0jc55fbcf074848",
                  "top": "5dp",
                  "width": "125dp",
                  "zIndex": 1
                }, {}, {});
                flxValueNB.setDefaultUnit(kony.flex.DP);
                var lblValuesNB = new kony.ui.Label({
                  "id": "lblValuesNB"+i,
                  "isVisible": true,
                  "left": "14dp",
                  "skin": "CopysknlblICBg0a06d9a7f61b546",
                  "text": data[i].value,
                  "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                  },
                  "top": "27dp",
                  "width": "86%",
                  "zIndex": 1
                }, {
                  "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                  "padding": [0, 0, 0, 0],
                  "paddingInPixel": false
                }, {
                  "textCopyable": false
                });
                var lblDateNB = new kony.ui.Label({
                  "bottom": "3dp",
                  "id": "lblDateNB"+i,
                  "isVisible": true,
                  "left": "14dp",
                  "skin": "CopydefLabel0bddde4d4f0b842",
                  "text": data[i].date,
                  "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                  },
                  "top": "3dp",
                  "width": "80%",
                  "zIndex": 1
                }, {
                  "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                  "padding": [0, 0, 0, 0],
                  "paddingInPixel": false
                }, {
                  "textCopyable": false
                });
                var lblTimeNB = new kony.ui.Label({
                  "bottom": "3dp",
                  "id": "lblTimeNB"+i,
                  "isVisible": true,
                  "left": "14dp",
                  "skin": "CopydefLabel0bddde4d4f0b842",
                  "text": data[i].time,
                  "textStyle": {
                    "letterSpacing": 0,
                    "strikeThrough": false
                  },
                  "top": "11dp",
                  "width": kony.flex.USE_PREFFERED_SIZE,
                  "zIndex": 1
                }, {
                  "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                  "padding": [0, 0, 0, 0],
                  "paddingInPixel": false
                }, {
                  "textCopyable": false
                });
                flxValueNB.add(lblValuesNB, lblDateNB, lblTimeNB);
                this.view.flxScrollPreviousValues.add(flxValueNB);
            }
          }
            
        }
    };
});