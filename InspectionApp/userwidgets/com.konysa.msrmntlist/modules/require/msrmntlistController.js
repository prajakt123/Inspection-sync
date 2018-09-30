define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._isOpen=false;
      this._title="";
      _info="";
      this._selectedItem=null;
      this._value=null;
      this._measurementId=null;
      this._measurementRangeId=null;
      this._type="Listbox";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    getResult:function(){
      var mediaList=this.view.imageupload.getResult();
      return {
        "media_list":mediaList,
        "measurement_id":this._measurementId,
        "measurement_name":this._title,
        "measurement_value":this._value,
        "measurement_type":this._type,
        "measurement_range_id":this._measurementRangeId
      };
    },
    toggleVisibility:function(status){
      switch(status){
        case 0:
          this.view.flxContainer.setVisibility(false);
          this.view.imageupload.setVisibility(false);
          this._isOpen=false;
          this.view.imgIndicator.src="plus_icon.png";
          break;
        case 1:
          this.view.flxContainer.setVisibility(true);
          this.view.imageupload.setVisibility(true);
          this._isOpen=true;
          this.view.imgIndicator.src="minus.png";
          break;
        default:
          this._isOpen=!this._isOpen;
          this.view.flxContainer.setVisibility(this._isOpen);
          this.view.imageupload.setVisibility(this._isOpen);
          if(this._isOpen){
            this.view.imgIndicator.src="minus.png";
          }
          else{
            this.view.imgIndicator.src="plus_icon.png";
          }
      }
      this.view.forceLayout();
    },
    checkUncheckItem:function(eventObject){
      if(eventObject!==null && eventObject!==undefined){
        if(this._selectedItem!==null){
          //var oldItemId=this._selectedItem.split("flxItem");
          //oldItemId=oldItemId[1];
          var oldImgId="imgCheckBox"+this._selectedItem;
          this.view[oldImgId].src="radio_unselected.png";
        }
        var id=eventObject.id;
        id=id.split("flxItem");
        id=id[1];
        var imgId="imgCheckBox"+id;
        this.view[imgId].src="radio_selected.png";
        this._selectedItem=id;
        this._value=(this.view["lblItem"+id].text).trim();
        this.view.imgDone.setVisibility(true);
        
      }
    },
    setData:function(data,addImageCBFunction){
      if(typeof data==='object' &&typeof data!==null){
        var measurement=data["measurement"];
        if(typeof measurement==='object' &&  typeof measurement!==null &&typeof measurement.Name ==='string'){
          this._title=(measurement.Name).trim();
        }
        this.view.lblTitle.text=this._title;
        this._measurementId=data.Measurement_Id;
        this._measurementRangeId=data.Measurement_Range_Id;
        var listItem=data.Measurement_Valid_Values;
        this.view.imageupload.onAddImageClick=addImageCBFunction;
        this.view.imageupload.setData(data);
        listItem=listItem.split(",");
        if(Array.isArray(listItem)){
          var itemListLength=listItem.length;
          this.view.flxContainer.removeAll();
          var flexItem,line;
          for(var i=0;i<itemListLength;i++){
            flexItem=this.getListItem(i,listItem[i]);
            this.view.flxContainer.add(flexItem);
            if(i+1<itemListLength){
              line=this.getHorizontalLine(i);
              this.view.flxContainer.add(line);
            }
          }
        }
        this.view.forceLayout();
      }
    },
    getListItem:function(id,text){
      var self=this;
      var top="0dp";
      if(id===0){
        top="13dp";
      }
      if(text!==null&&text!==undefined){
        text=text.trim();
      }else{
        text="";
      }
      var flxItem = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerX": "50%",
        "clipBounds": true,
        "height": "50dp",
        "id": "flxItem"+id,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_HORIZONTAL,
        "onClick": self.checkUncheckItem,
        "skin": "slFbox",
        "top": top,
        "width": "100%",
        "zIndex": 1
      }, {}, {});
      flxItem.setDefaultUnit(kony.flex.DP);
      var imgCheckBox = new kony.ui.Image2({
        "centerY": "50%",
        "height": "20dp",
        "id": "imgCheckBox"+id,
        "isVisible": true,
        "left": "0dp",
        "skin": "slImage",
        "src": "radio_unselected.png",
        "width": "20dp",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_MAINTAIN_ASPECT_RATIO,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      var lblItem = new kony.ui.Label({
        "centerY": "50%",
        "id": "lblItem"+id,
        "isVisible": true,
        "left": "10dp",
        "skin": "sknLblComRadioText",
        "text": text,
        "textStyle": {},
        "width": "300dp",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [1, 1, 0, 1],
        "paddingInPixel": false
      }, {
        "textCopyable": false,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
      });
      flxItem.add(imgCheckBox, lblItem);
      return flxItem;
    },
    getHorizontalLine:function(id){
      var lblHline = new kony.ui.Label({
        "centerX": "50%",
        "height": "1dp",
        "id": "lblHline"+id,
        "isVisible": true,
        "left": "39dp",
        "skin": "sknLblCompHline",
        "textStyle": {},
        "top": "0dp",
        "width": "100%",
        "zIndex": 1
      }, {
        "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "textCopyable": false,
        "wrapping": constants.WIDGET_TEXT_WORD_WRAP
      });
      return lblHline;
    },
    triggerInfoCallback:function(){
      if(this.infoCallback!==null && this.infoCallback!==undefined){
        try{
          this.infoCallback(this._measurementId,this._measurementRangeId);
        }catch(excp){
          kony.print("Exception occured while triggering the info callback"+excp);
        }
        
      }
    }
  };
});