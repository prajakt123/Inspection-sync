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
              	this.iOSBindings = require("com/konymp/pdfviewer/iOSBindings");
              	this.context.nativeClasses = this.iOSBindings.import(context);
              	this.uIWebView = this.context.nativeClasses.UIWebView;
              	this.nSURLObj = this.context.nativeClasses.NSURLObj;
              	this.nSURLRequestObj = this.context.nativeClasses.NSURLRequestObj;
              	this.uiWebViewDelegate = this.context.nativeClasses.UIWebViewDelegate;
              	this.uiWebViewDelegateObj = this.uiWebViewDelegate.jsnew();
              	this.urlRequestObj = this.nSURLRequestObj.alloc().jsinit();
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
                    this.webViewObject = this.uIWebView.alloc().jsinit();
                    var width = eventObj.bounds.width;
                    var height = eventObj.bounds.height;
                    var frameVal = {
                        "x": 0,
                        "y": 0,
                        "width": width,
                        "height": height
                    };
                    this.webViewObject.frame = frameVal;
                    this.webViewObject.delegate = this.uiWebViewDelegateObj;
                    this.webViewObject.scalesPageToFit = true;
                    if (this.context.pdfType === this.context._online) {
                        if (this.context.url !== undefined && this.context.url !== null && (this.context.url).trim() !== "") {
                            this.setUrl(this.context.url);
                        } else {
                            throw this.context._urlError;
                        }
                    } else {
                        this.setLocalWebView();
                    }
                    if (eventObj.subviews.length > 0) {
                        var subviews = eventObj.subviews;
                        for (var i = 0; i < subviews.length; i++) {
                            subviews[i].removeFromSuperview();
                        }
                    }
                    eventObj.addSubview(this.webViewObject);
                    this.context._prevIphoneEventObj = eventObj;
                    this.context.view.forceLayout();
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
                if (this.webViewObject !== undefined && this.webViewObject !== null) {
                    if (this.context.setIphonePath.startsWith("file://")) {
                        var path = this.context.setIphonePath.replace("file://", "");
                        var urlPath = this.nSURLObj.URLWithString(path);
                        this.webViewObject.loadRequest(this.nSURLRequestObj.requestWithURL(urlPath));
                    } else if (this.context.setIphonePath.startsWith("/")) {
                        var nSFileManager = this.viewcontext.nativeClasses.NSFileManager;
                        var nsFileManager = nSFileManager.alloc().jsinit();
                        if (nsFileManager.fileExistsAtPath(this.context.setIphonePath)) {
                            var urlPath1 = this.nSURLObj.URLWithString(this.context.setIphonePath);
                            this.webViewObject.loadRequest(this.nSURLRequestObj.requestWithURL(urlPath1));
                        } else {
                            throw {
                                "Error": "Invalid Path",
                                "message": "The file path you given doesn't existes"
                            };
                        }
                    } else {
                        if (this.context.setIphonePath.charAt(".") !== -1) {
                            var nSBundle = this.context.nativeClasses.NSBundle;
                            var filePath = nSBundle.mainBundle().pathForResourceOfType(this.context.setIphonePath, this.context._iphoneType);
                            var urlPath2 = this.nSURLObj.URLWithString(filePath);
                            this.webViewObject.loadRequest(this.nSURLRequestObj.requestWithURL(urlPath2));
                        } else {
                            throw this.context._pathError;
                        }
                    }
                } else {
                    this.context.renderWebView();
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
              	this.context.pdfType = this.context._online;
              	this.context.url = url;
                if (this.webViewObject !== undefined && this.webViewObject !== null) {
                    var urlObj = this.nSURLObj.URLWithString(this.context.url);
                    this.urlRequestObj = this.nSURLRequestObj.requestWithURL(urlObj);
                    this.webViewObject.loadRequest(this.urlRequestObj);
                } else {
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
                konymp.logger.trace("----------Entering setFilePath Function---------", konymp.logger.FUNCTION_ENTRY);
                if (path !== undefined && path !== null && path !== "") {
                    this.context.setIphonePath = path;
                    this.context.pdfType = this.context._local;
                    this.setLocalWebView();
                } else {
                    throw this.context._pathError;
                }
                konymp.logger.trace("----------Exiting setFilePath ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }	
        }
    };
});