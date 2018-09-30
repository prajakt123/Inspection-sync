define(function () {
   	var konyLoggerModule = require('com/konymp/pdfviewer/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("PDF Viewer Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
  	this.instance = null;
    return {
        /**
		 * @function importClasses
		 * @private
		 * @description: this function will import all the classes from the franeworks and store in the nativeClasses variable
		 */
        importClasses : function(context){
          	try{
				konymp.logger.trace("----------Entering importClasses Function---------", konymp.logger.FUNCTION_ENTRY);
              	var nativeClasses = {};
              	nativeClasses.KonyMain = java.import('com.konylabs.android.KonyMain');
              	nativeClasses.WebView = java.import("android.webkit.WebView");
                nativeClasses.ViewGroup = java.import("android.view.ViewGroup");
                nativeClasses.WVClient = java.import("android.webkit.WebViewClient");
              	nativeClasses.File = java.import("java.io.File");
              	nativeClasses.Intent = java.import("android.content.Intent");
                nativeClasses.Uri = java.import("android.net.Uri");
              	nativeClasses.konycontext = nativeClasses.KonyMain.getActivityContext();
				konymp.logger.trace("----------Exiting importClasses Function---------", konymp.logger.FUNCTION_EXIT);
              	return nativeClasses;
            }
          	catch(exception){
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	throw exception;
            }
        },
		/**
		 * @function import
		 * @private
		 * @description: this function will be called from the androidTTS and this function will call importClasses function
		 */
      	import : function(context){
          	try{
				konymp.logger.trace("----------Entering import Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(this.instance === undefined || this.instance === null){
					this.instance = this.importClasses(context);
                }
				konymp.logger.trace("----------Exiting import Function---------", konymp.logger.FUNCTION_EXIT);
              	return this.instance;
            }
          	catch(exception){
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	throw exception;
            }
        }
    };
});