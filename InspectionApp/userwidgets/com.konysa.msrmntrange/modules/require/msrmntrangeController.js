define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._isOpen=false;
      this._min=0;
      this._max=100;
      this._value=null;
      this._type="Numeric";
      this._title="";
      this._info="";
      this._measurementId=null;
      this._measurementRangeId=null;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this,"min",function(){
        return this._min;});
      defineSetter(this,"min",function(val){
        this._min=val;
      });
      defineGetter(this,"max",function(){
        return this._max;});
      defineSetter(this,"max",function(val){
        this._max=val;
      });
      defineGetter(this,"value",function(){
        return this._value;});
      defineSetter(this,"value",function(val){
        this._value=val;
      });

    },
    initializeRange:function(data){
      debugger;
      if(data!==undefined && data!==null){
        if(data.min!==null&&data.min!==undefined){
          this.min=data.min;
          this.view.lblMinValue.text=data.min;
        }
        if(data.max!==null&&data.max!==undefined){
          this.max=data.max;
          this.view.lblMaxValue.text=data.max;
        }
      }
    },
    setValue:function(value){
      if(this.validateValue(value)){
        this._value=value;
        this.view.txtBoxVoltValue.text=value;
        return true;
      }else{
        this.view.txtBoxVoltValue.skin="sknCompTxtBoxError";
        return false;
      }
    },
    validateValue:function(value){
      if(this._min<=value && value<=this._max){
        return true;
      }else return false;
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
    setData:function(data,addImageCBFunction){
     if(typeof data==='object' &&typeof data!==null){
       var measurement=data["measurement"];
        if(typeof measurement==='object' &&  typeof measurement!==null &&typeof measurement.Name ==='string'){
          this._title=(measurement.Name).trim();
        }
        //this._info=data.measurement_description;
        this.view.lblTitle.text=this._title;
        this._measurementId=data.Measurement_Id;
        this._measurementRangeId=data.Measurement_Range_Id;
        this.view.txtBoxVoltValue.placeholder="Enter value";
        this.view.lblMinTitle.text="MIN";
        this.view.lblMaxTitle.text="MAX";
        this._min=data.Measurement_Min_Value;
        this._max=data.Measurement_Max_Value;
        this._min=Number(this._min);
        this._max=Number(this._max);
        this.view.lblMinValue.text=this._min;
        this.view.lblMaxValue.text=this._max;
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
    onTextInputDone:function(){
      //this.setValue(this.view.txtAreaDescritption.text);
      var readingData=this.view.txtBoxVoltValue.text;
      readingData=readingData.trim();
      if(readingData.length>0){
        readingData=Number(readingData);
        if(!isNaN(readingData)){
          if(this._min<=readingData && this._max>=readingData ){
            this._value=readingData;
            this.view.txtBoxVoltValue.skin="sknCompTxtBoxNormal";
            this.view.txtBoxVoltValue.focusSkin="sknCompTxtBoxNormal";
            this.view.imgDone.setVisibility(true);
          }else{
            this._value=null;
            this.view.txtBoxVoltValue.skin="sknTxtCompError";
            this.view.txtBoxVoltValue.focusSkin="sknTxtCompError";
            this.view.imgDone.setVisibility(false);
          }
        }else{
          this._value=null;
          this.view.txtBoxVoltValue.skin="sknTxtCompError";
          this.view.txtBoxVoltValue.focusSkin="sknTxtCompError";
          this.view.imgDone.setVisibility(false);
        }
      }else{
        this._value=null;
        this.view.txtBoxVoltValue.skin="sknTxtCompError";
        this.view.imgDone.setVisibility(false);
      }
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