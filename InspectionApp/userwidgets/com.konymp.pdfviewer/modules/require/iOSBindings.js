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
              	nativeClasses.UIWebView = objc.import("UIWebView");
                nativeClasses.NSURLObj = objc.import("NSURL");
                nativeClasses.NSURLRequestObj = objc.import("NSURLRequest");
              	nativeClasses.NSFileManager = objc.import("NSFileManager");
              	nativeClasses.NSBundle = objc.import("NSBundle");
              	this.seed = Math.random();
              	var x = (Math.sin(this.seed++) * 10000);
                var randomNumber = x-Math.floor(x);
              	nativeClasses.UIWebViewDelegate = objc.newClass('uiWebViewDelegate' + randomNumber, 'NSObject', ['UIWebViewDelegate'], {
                    webViewDidStartLoad: this.webViewStartLoad.bind(this),
                    webViewDidFinishLoad: this.webViewFinishLoad.bind(this),
                    webViewDidFailLoadWithError: this.webViewFailLoadWithError.bind(this)
                });
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
        },
      	/**
         * @function webViewStartLoad
         * @description This function is called when web view start loading
         * @private
         * @param webview
         */
        webViewStartLoad: function(webview) {
            try {
                konymp.logger.trace("----------Entering webViewStartLoad Function---------", konymp.logger.FUNCTION_ENTRY);
                kony.application.showLoadingScreen(null, "Rendering pdf",
                    constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {
                        shouldShowLabelInBottom: "true",
                        separatorHeight: 20,
                        progressIndicatorType: constants.PROGRESS_INDICATOR_TYPE_SMALL,
                        progressIndicatorColor: "Gray"
                    });
                konymp.logger.trace("----------Entering webViewStartLoad Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
		/**
         * @function webViewFinishLoad
         * @description This function is called when web view loading is finished
         * @private
         * @param webview
         */
        webViewFinishLoad: function(webview) {
            try {
                konymp.logger.trace("----------Entering webViewFinishLoad Function---------", konymp.logger.FUNCTION_ENTRY);
                kony.application.dismissLoadingScreen();
                konymp.logger.trace("----------Entering webViewFinishLoad Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
		/**
         * @function webViewFailLoadWithError
         * @description This function is called when web view rendering is finished with errors
         * @private
         * @param webview , error
         */
        webViewFailLoadWithError: function(webview, error) {
            try {
                konymp.logger.trace("----------Entering webViewFailLoadWithError Function---------", konymp.logger.FUNCTION_ENTRY);
                kony.application.dismissLoadingScreen();
                konymp.logger.trace("----------Entering webViewFailLoadWithError Function---------", konymp.logger.FUNCTION_EXIT);
                throw error;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
    };
});