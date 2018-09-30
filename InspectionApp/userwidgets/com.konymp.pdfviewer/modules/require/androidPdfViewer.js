define(function () {
   	var konyLoggerModule = require('com/konymp/pdfviewer/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("PDF Viewer Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    
  	return {
      	/**
		 * @function getClasses
		 * @private
		 * @description: get all the import statements from bindings and sets listeners
		 */
    	getClasses : function(context){
          	try{
              	konymp.logger.trace("----------Entering getClasses Function---------", konymp.logger.FUNCTION_ENTRY);
              	this.context = context;
              	this.androidBindings = require("com/konymp/pdfviewer/androidBindings");
              	this.context.nativeClasses = this.androidBindings.import(context);
              	this.konyContext = this.context.nativeClasses.konycontext;
              	konymp.logger.trace("----------Exiting getClasses Function---------", konymp.logger.FUNCTION_EXIT);
            }
          	catch(exception){
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				throw exception;
            }
        },
      	/**
         * @function fetchAndDisplayPDF
         * @description This function is used to render pdf
         * @private
         * @param eventObj
         */
        fetchAndDisplayPDF : function(eventObj) {
            try {
                if (eventObj !== undefined && eventObj !== null) {
                    konymp.logger.trace("----------Entering fetchAndDisplayPDF Function---------", konymp.logger.FUNCTION_ENTRY);
                    if (this.context.pdfType === this.context._online) {
                        var webview = this.context.nativeClasses.WebView;
                        var viewGroup = this.context.nativeClasses.ViewGroup;
                        var wvClient = this.context.nativeClasses.WVClient;
                        this.webViewObject = new webview(this.konyContext);
                        var layoutParams = viewGroup.LayoutParams;
                        this.webViewObject.getSettings().setAllowFileAccessFromFileURLs(true);
                        this.webViewObject.getSettings().setJavaScriptEnabled(true);
                        this.webViewObject.getSettings().setBuiltInZoomControls(true);
                        var konyDeviceInfoObject = this.context.konyDeviceInfo;
                        var layoutParamsObject = new layoutParams(konyDeviceInfoObject.deviceWidth, konyDeviceInfoObject.deviceHeight);
                        this.webViewObject.setLayoutParams(layoutParamsObject);
                        this.webViewObject.setWebViewClient(new wvClient());
                        var url = this.context._googleBasicUrl + this.context.url;
                        this.webViewObject.loadUrl(url);
                        eventObj.addView(this.webViewObject);
                        this.context.view.forceLayout();
                    } else {
                        this.setLocalWebView();
                    }
                    konymp.logger.trace("----------Exiting fetchAndDisplayPDF ---------", konymp.logger.FUNCTION_EXIT);
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
      	/**
         * @function setLocalWebView
         * @description This function is used to render android file path 
         * @private
         * @param
         */
        setLocalWebView : function() {
            try {
                konymp.logger.trace("----------Entering setLocalWebView Function---------", konymp.logger.FUNCTION_ENTRY);
                var val = this.context.setAndroidPath;
                var extenstion = val.substring(val.length - 3, val.length).toLowerCase();
                var file = this.context.nativeClasses.File;
                var fileObj = new file(this.context.setAndroidPath);
				if(this.context.nativeClasses.konycontext.getApplicationInfo().targetSdkVersion <=23){
					if (extenstion.endsWith("pdf") && fileObj.exists()) {
						var intent = this.context.nativeClasses.Intent;
						var Uri = this.context.nativeClasses.Uri;
						var sendIntent = new intent(intent.ACTION_VIEW);
						sendIntent.addFlags(intent.FLAG_GRANT_READ_URI_PERMISSION);
						sendIntent.setDataAndType(Uri.fromFile(fileObj), this.context._mimeType);
						this.konyContext.startActivity(sendIntent);
					} else {
						throw this.context._pathError;
					}
				}
				else{
					throw {
                      	"ERROR" : "SDK ERROR",
                      	"message" : "Please use targer sdk version 23 or below"
                    };
				}
                konymp.logger.trace("----------Exiting setLocalWebView function ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
		/**
         * @function setUrl
         * @description This function is used to render android url
         * @private
         * @param
         */
      	setUrl : function(url){
          	try{
              	konymp.logger.trace("----------Entering setUrl Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(this.webViewObject !== undefined && this.webViewObject !== null){
                  	this.context.url = url;
                  	kony.runOnMainThread(function() {
                  		var loadUrl = this.context._googleBasicUrl + this.context.url;
                    	this.webViewObject.loadUrl(loadUrl);
                	}.bind(this), [url]);
                }
              	else{
                  	this.local = this.context._online;
                	this.context.renderWebView();
                }
              	konymp.logger.trace("----------Exiting setUrl Function---------", konymp.logger.FUNCTION_EXIT);
            }
          	catch(exception){
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
				throw exception;
            }
        },
		/**
         * @function setFilePath
         * @description This function is used to render android file path
         * @private
         * @param
         */
      	setFilePath : function(path){
          	try {
                konymp.logger.trace("----------Entering setAndroidFilePath Function---------", konymp.logger.FUNCTION_ENTRY);
                if (path !== undefined && path !== null && path !== "") {
                    this.context._androidPath = path;
                    this.local = this.context._local;
                    this.setLocalWebView();
                } else {
                    throw this.context._pathError;
                }
                konymp.logger.trace("----------Exiting setAndroidFilePath ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }	
        }
    };
});