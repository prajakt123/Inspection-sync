define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._measurementReaderList=[];
      this.view.flxMeasurementContainer.removeAll();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    getResult:function(){
      //this.view.flxMeasurementContainer.c
      var readerLength=this._measurementReaderList.length;
      var reader,result;
      var resultList=[];
      for(var i=0;i<readerLength;i++){
        reader=this._measurementReaderList[i];
        result=reader.getResult();
        resultList.push(result);
      }
      return resultList;
    },
    getHorizontalLine:function(id){
      var lblHLine = new kony.ui.Label({
        "centerX": "50%",
        "height": "1dp",
        "id": "lblHLine"+id,
        "isVisible": true,
        "skin": "sknLblLine",
        "textStyle": {
          "letterSpacing": 0,
          "strikeThrough": false
        },
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false
      });
      return lblHLine;
    },
    getBooleanMeasurement:function(id,data,addImageCBFunction){
      var msrmntboolean=new com.konysa.msrmntboolean({
        "clipBounds": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "id": "msrmntboolean"+id,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "skin": "sknFlxMeasurementCompWhiteBG",
        "top": "0dp",
        "width": "100%"
      }, {}, {});
      msrmntboolean.setData(data,addImageCBFunction);
      return msrmntboolean;
    },
    getStringMeasurement:function(id,data,addImageCBFunction){
      var msrmntdescription=new com.konysa.msrmntdescription({
        "clipBounds": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "id": "msrmntdescription"+id,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "skin": "sknFlxMeasurementCompWhiteBG",
        "top": "0dp",
        "width": "100%"
      }, {}, {});
      msrmntdescription.setData(data,addImageCBFunction);
      return msrmntdescription;
    },
    getListMeasurement:function(id,data,addImageCBFunction){
      var msrmntlist=new com.konysa.msrmntlist({
        "clipBounds": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "id": "msrmntlist"+id,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "skin": "sknFlxMeasurementCompWhiteBG",
        "top": "0dp",
        "width": "100%"
      }, {}, {});
      msrmntlist.setData(data,addImageCBFunction);
      return msrmntlist;
    },
    getRangeMeasurement:function(id,data,addImageCBFunction){
      var msrmntrange=new com.konysa.msrmntrange({
        "clipBounds": true,
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "id": "msrmntrange"+id,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "skin": "sknFlxMeasurementCompWhiteBG",
        "top": "0dp",
        "width": "100%"
      }, {}, {});
      msrmntrange.setData(data,addImageCBFunction);
      return msrmntrange;
    },
    setData:function(data,addImageCBFunction,infoCallback){
      this.view.flxMeasurementContainer.removeAll();
      debugger;
      if(Array.isArray(data)){
        this._measurementReaderList=[];
        var measrementLength=data.length;
        var lblHline;
        var measurementComponent;
        this.view.flxMeasurementContainer.removeAll();
        for(var i=0;i<measrementLength;i++){
          switch(data[i]["Response_Type"]){
            case "Pass/Fail":
              measurementComponent=this.getBooleanMeasurement(i, data[i],addImageCBFunction);
              this.view.flxMeasurementContainer.add(measurementComponent);
              
              break;
            case "Text":
              measurementComponent=this.getStringMeasurement(i, data[i],addImageCBFunction);
              this.view.flxMeasurementContainer.add(measurementComponent);
              break;
            case "Listbox":
              measurementComponent=this.getListMeasurement(i, data[i],addImageCBFunction);
              this.view.flxMeasurementContainer.add(measurementComponent);
              break;
            case "Numeric":
              measurementComponent=this.getRangeMeasurement(i, data[i],addImageCBFunction);
              this.view.flxMeasurementContainer.add(measurementComponent);
          }
          if(i===0){
            measurementComponent.toggleVisibility(1);
          }else{
            measurementComponent.toggleVisibility(0);
          }
          if(i+1<measrementLength){
            lblHLine = this.getHorizontalLine(i);
            this.view.flxMeasurementContainer.add(lblHLine);
          }
          if(typeof infoCallback==='function'){
            measurementComponent.infoCallback=infoCallback;
          }else{
            measurementComponent.infoCallback=null;
          }
          this._measurementReaderList.push(measurementComponent);
        }
      }
      this.view.forceLayout();
    }
  };
});