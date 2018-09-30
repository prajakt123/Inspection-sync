define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      debugger;
      this._value=null;
      this._type="Text"
      this._title="";
      _description="";
      _info="";
      _placeHolderText="";
      this._isOpen=false;
      this._measurementId=null;
      this._measurementRangeId=null;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this,"title",function(){
        return this._title;});
      defineSetter(this,"title",function(val){
        this._title=val;
      });
      defineGetter(this,"info",function(){
        return _info;});
      defineSetter(this,"info",function(val){
        _info=val;
      });
      defineGetter(this,"description",function(){
        return _description;});
      defineSetter(this,"description",function(val){
        _description=val;
      });
    },
    setData:function(data,addImageCBFunction){
      //alert("data");
      if(typeof data==='object' &&typeof data!==null){
       var measurement=data["measurement"];
        if(typeof measurement==='object' &&  typeof measurement!==null &&typeof measurement.Name ==='string'){
          this._title=(measurement.Name).trim();
        }
        _info="";
        _placeHolderText="Enter description";
        this._measurementId=data.Measurement_Id;
        this._measurementRangeId=data.Measurement_Range_Id;
        this.view.lblTitle.text=this._title;
        this.view.txtAreaDescritption.placeholder=_placeHolderText;
        this.view.imageupload.onAddImageClick=addImageCBFunction;
        this.view.imageupload.setData(data);
      }
    },
    toggleVisibility:function(status){
      switch(status){
        case 0:
          this.view.flxContainer.setVisibility(false);
          this._isOpen=false;
          this.view.imgIndicator.src="plus_icon.png";
          break;
        case 1:
          this.view.flxContainer.setVisibility(true);
          this._isOpen=true;
          this.view.imgIndicator.src="minus.png";
          break;
        default:
          this._isOpen=!this._isOpen;
          this.view.flxContainer.setVisibility(this._isOpen);
          if(this._isOpen){
            this.view.imgIndicator.src="minus.png";
          }
          else{
            this.view.imgIndicator.src="plus_icon.png";
          }
      }
      this.view.forceLayout();
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
    onTextInputDone:function(){
      this._desription=this.view.txtAreaDescritption.text;
      this._value=(this._desription).trim();
      if((this._value).length>0){
        this.view.imgDone.setVisibility(true);
      }else{
        this.view.imgDone.setVisibility(false);
      }
      //alert(this.description);
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