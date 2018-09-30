define(['./ControllerImplementation.js','./KonyLogger'], function(ControllerImplementation,konyLoggerModule) {

  var konymp = konymp || {};
  konymp.logger = new konyLoggerModule("signaturecapture/signatureCaptureController");
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      konymp.logger.trace("-- Entering constructor signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
      this.canvas_width = "94%";
      this.canvas_height = "75%";
      this._image = "";
      this._saveAs = "";
      this._saveTo = "";
      this._saveSignature = "";
      this._penColor = "";
      this._backgroundHex = "";
      this.handler = new ControllerImplementation(this, baseConfig.id);
      konymp.logger.trace("-- Exiting constructor signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

      defineSetter(this, "penColor", function(val) {
        konymp.logger.trace("-- Entering setter penColor in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {

          var regex = /(?:[0-9a-fA-F]{3}){1,2}$/gm;
          if (regex.test(val)) {
            this._penColor = val;
          } else {
            this.onErrorCallback("please povide valid hex color code. Do not prefix #");
          }
        }
        konymp.logger.trace("-- Exiting setter penColor in signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "penColor", function() {
        konymp.logger.trace("-- Entering getter penColor in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        return this._penColor;
      });

      defineSetter(this, "canvasBackground", function(val) {

        konymp.logger.trace("-- Entering setter canvasBackground in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          var regex = /(?:[0-9a-fA-F]{3}){1,2}$/gm;
          if (regex.test(val)) {
            this._backgroundHex = val;
          } else {
            this.onErrorCallback("please povide valid hex color code. Do not prefix #");
          }
        }
        konymp.logger.trace("-- Exiting setter canvasBackground in signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "canvasBackground", function() {
        konymp.logger.trace("-- Entering getter canvasBackground in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        return this._backgroundHex;
      });

      defineSetter(this, "saveAs", function(val) {
        konymp.logger.trace("-- Entering setter saveAs in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveAs = val;
        }
        konymp.logger.trace("-- Exiting setter saveAs in signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveAs", function() {
        konymp.logger.trace("-- Entering getter saveAs in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        return this._saveAs;
      });
      defineSetter(this, "saveTo", function(val) {
        konymp.logger.trace("-- Entering setter saveTo in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveTo = val;
        }
        konymp.logger.trace("-- Exiting setter saveTo in signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveTo", function() {
        konymp.logger.trace("-- Entering getter saveTo in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        return this._saveTo;
      });
      //saveSignature
      defineSetter(this, "saveSignature", function(val) {
        konymp.logger.trace("-- Entering setter saveSignature in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        if (val !== undefined && val !== "") {
          this._saveSignature = val;
        }
        konymp.logger.trace("-- Exiting setter saveSignature in signatureCaptureController --", konymp.logger.FUNCTION_EXIT);
      });

      defineGetter(this, "saveSignature", function() {
        konymp.logger.trace("-- Entering getter saveSignature in signatureCaptureController --", konymp.logger.FUNCTION_ENTRY);
        return this._saveSignature;
      });
    },
    /**
         * @function addSignatureCanvas
         * @private
         */
    addSignatureCanvas: function(eventobject) {

      konymp.logger.trace("-- Entering addSignatureCanvas --", konymp.logger.FUNCTION_ENTRY);
      this.handler.addSignatureCanvas(eventobject, this._penColor, this._backgroundHex, this._saveAs);
      konymp.logger.trace("-- Exiting addSignatureCanvas --", konymp.logger.FUNCTION_EXIT);
    },

    clearSignature:function(){
      konymp.logger.trace("-- Entering clearSignature --", konymp.logger.FUNCTION_ENTRY);
      this.onClickClear();
      konymp.logger.trace("-- Exiting clearSignature --", konymp.logger.FUNCTION_ENTRY);
    },
    /**
         * @function onClickClear
         * @private
         */
    onClickClear: function() {
      konymp.logger.trace("-- Entering onClickClear --", konymp.logger.FUNCTION_ENTRY);
      this.handler.onClickClear();
      konymp.logger.trace("-- Exiting onClickClear --", konymp.logger.FUNCTION_EXIT);
    },
    getSignatureFromDevice:function(){
      konymp.logger.trace("-- Entering getSignatureFromDevice --", konymp.logger.FUNCTION_ENTRY);
      this.handler.getSignatureFromDevice();
      konymp.logger.trace("-- Exiting getSignatureFromDevice --", konymp.logger.FUNCTION_EXIT);
    },

    getSignature:function(){
      var imgBase64="";
      konymp.logger.trace("-- Entering getSignature --", konymp.logger.FUNCTION_ENTRY);
      try{
        imgBase64 = this.handler.getSignature();
      }catch(excp){
        konymp.logger.error(JSON.stringify(excp), konymp.logger.EXCEPTION);
      }
      konymp.logger.trace("-- Exiting getSignature --", konymp.logger.FUNCTION_ENTRY);
      return imgBase64;
    },
    /**
         * @function onClickSave
         * @private
         */
    onClickSave: function() {
      konymp.logger.trace("-- Entering onClickSave --", konymp.logger.FUNCTION_ENTRY);
      if(this._saveSignature){
        this.handler.onClickSave();
      }
      else{
        //logic for Save signature option set to off
        //not yet known 
      }
      konymp.logger.trace("-- Exiting onClickSave --", konymp.logger.FUNCTION_EXIT);
    },
    /**
         * @function addSignatureCanvas
         * @exposed
         * @description event for image save success
         */
    onSaveImageSuccess: function(){

    },        
    /**
         * @function addSignatureCanvas
         * @exposed
         * @description event for image save failure
         */
    onSaveImageFailure: function(){

    },
    /**
         * @function addSignatureCanvas
         * @exposed
         * @description event for component exception
         */
    onErrorCallback: function(){

    }
  };

});