define(['./KonyLogger', './StringEncoder'], function(konyLoggerModule, stringEncoder) {
  var konymp = konymp || {};
  konymp.logger = new konyLoggerModule("signaturecapture/ControllerImplementation");
  var ControllerImplementation = function(componentInstance, componentName) {
    this.componentInstance = componentInstance;
    this._key = "";
    /**
         * @function encrypt
         * @private
         * @description: encrypts the base 64
         */
    this.encrypt = function(imgBase64) {
      try{
        var prptobj = {
          padding: "pkcs5",
          mode: "cbc",
          initializationvector: "1234567890123456"
        };
        var encryptDecryptKey = kony.crypto.newKey("passphrase", 128, {
          passphrasetext: ["SignaturePassPhrase"],
          subalgo: "aes",
          passphrasehashlogo: "md5"
        });
        this._key = encryptDecryptKey;
        var encryptedBytes = kony.crypto.encrypt("aes", encryptDecryptKey, imgBase64, prptobj);
        var encryptedBase64 = kony.convertToBase64(encryptedBytes);

        return encryptedBase64;
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function getDecryptedSignature
         * @private
         * @description: returns the decrypted signature
         */
    this.getDecryptedSignature = function() {
      try{
        var prptobj = {
          padding: "pkcs5",
          mode: "cbc",
          initializationvector: "1234567890123456"
        };
        var storedB64 = kony.store.getItem("signature");
        var bytesToDecrypt = kony.convertToRawBytes(storedB64);
        var decryptedBase64 = kony.crypto.decrypt("aes", this._key, bytesToDecrypt, prptobj);
        return decryptedBase64;
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function makeNFSCall
         * @private
         * @description: makes network call for binary upload
         */
    this.makeNFSCall = function(base64) {

      try{
        var doubleEncode = stringEncoder.encodeString(base64);
        function onRawBytesUploadStartCallback(res) {
          konymp.logger.trace("-- Entering onRawBytesUploadStartCallback -- ", konymp.logger.FUNCTION_ENTRY);  
        }

        function onRawBytesChunkUploadCompleteCallback(res) {
          konymp.logger.trace("-- Entering onRawBytesChunkUploadCompleteCallback -- ", konymp.logger.FUNCTION_ENTRY);  
        }

        function onRawBytesUploadCompleteCallback(res) {
          konymp.logger.trace("-- Entering onRawBytesUploadCompleteCallback -- ", konymp.logger.FUNCTION_ENTRY);  
          kony.application.dismissLoadingScreen();
          this.componentInstance.onSaveImageSuccess(res);
        }

        function onRawBytesUploadFailureCallback(err) {
          konymp.logger.trace("-- Entering onRawBytesUploadFailureCallback -- ", konymp.logger.FUNCTION_ENTRY);  
          kony.application.dismissLoadingScreen();
          this.componentInstance.onSaveImageFailure(err);
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        }
        var params = {};
        var integrationSvc = kony.sdk.getCurrentInstance().getIntegrationService("uploadImageService");
        this.counter++;
        var tsp = new Date().getTime().toString();
        params.fileNameWithExtension = "signature" + tsp + "." + this.componentInstance._saveAs;
        var rawBytesToUpload = kony.convertToRawBytes(doubleEncode);
        params.rawBytes = rawBytesToUpload;
        params.securityKey = "";
        kony.application.showLoadingScreen("loadskin", "Uploading", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        integrationSvc.uploadBinaryData("postFile", params, onRawBytesUploadStartCallback, onRawBytesChunkUploadCompleteCallback, onRawBytesUploadCompleteCallback,
                                        onRawBytesUploadFailureCallback, {});
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function saveToDevice
         * @private
         * @description: saves encrypted base64 to device
         */
    this.saveToDevice = function(encryptedImage) {
      try{
        kony.application.showLoadingScreen("loadskin","Saving",constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true,true,null);
        kony.store.setItem("signature", encryptedImage);
        kony.application.dismissLoadingScreen();
        this.componentInstance.onSaveImageSuccess();
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function errorCallback
         * @private
         * @description: invokes onErrorCallback event
         */
    this.errorCallback = function(error) {
      konymp.logger.trace("----------Entering errorCallback Function---------", konymp.logger.FUNCTION_ENTRY);
      if(this.componentInstance.onErrorCallback) {
        this.componentInstance.onErrorCallback(error);
        konymp.logger.trace("------Exiting errorCallback Function------", konymp.logger.FUNCTION_EXIT);
      }
      else {
        konymp.logger.error("onErrorCallback event undefined, throwing the exception to application context", konymp.logger.EXCEPTION);
        throw error;
      }
    };
    /**
         * @function getNativeController
         * @private
         */
    this.getNativeController = function() {
      try{
        if (this.nativeControllerInstance === undefined) {
          var deviceInfo = kony.os.deviceInfo();
          var platformName = null;
          if (deviceInfo.name.toLowerCase() === 'iphone' || deviceInfo.name.toLowerCase() === 'iphone') {
            platformName = 'IOS';
          } else if (deviceInfo.name.toLowerCase() === 'android') {
            platformName = 'Android';
          } else {
            platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
          }
          var nativeControllerPath = 'com/konymp/' + componentName + '/NativeController' + platformName + '.js';
          var nativeController = require(nativeControllerPath);
          this.nativeControllerInstance = new nativeController(componentInstance);
        }
        return this.nativeControllerInstance;
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function addSignatureCanvas
         * @private
         * @description: adds the canvas object to the view
         */
    this.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
      try{
        this.getNativeController().addSignatureCanvas(eventobj, penColor, bgColor, saveType);
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    /**
         * @function onClickClear
         * @private
         * @description: invokes the clear operation
         */
    this.onClickClear = function() {
      try{
        this.getNativeController().onClickClear();
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    this.getSignature=function(){
      var imgBase64="";
      try{
        imgBase64 = this.getNativeController().onClickSave();
      }catch(excp){
        konymp.logger.error(JSON.stringify(excp), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(excp));
      }
      return imgBase64;
    }
    /**
         * @function onClickClear
         * @private
         * @description: invokes the save operation
         */
    this.onClickSave = function() {
      try{
        var imgBase64 = this.getNativeController().onClickSave();
        if(this.componentInstance._saveTo === "Device"){
          var encryptedImage = this.encrypt(imgBase64);
          this.saveToDevice(encryptedImage);
        }
        else if(this.componentInstance._saveTo === "Network File System"){
          this.makeNFSCall(imgBase64);
        }
      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };
    this.getSignatureFromDevice = function(){
      try{
        var sig = this.getDecryptedSignature();
        return sig;

      }catch(exception){
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        this.errorCallback(JSON.stringify(exception));
      }
    };

  };
  return ControllerImplementation;
});