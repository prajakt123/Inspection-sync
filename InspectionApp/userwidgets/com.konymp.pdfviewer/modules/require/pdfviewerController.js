define(function() {
    var konyLoggerModule = require('com/konymp/pdfviewer/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("PDF Viewer Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    
  	return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            konymp.logger.trace("----------Entering constructor Function---------", konymp.logger.FUNCTION_ENTRY);
          	this.konyDeviceInfo = kony.os.deviceInfo();
            this._url = "";
            this._googleBasicUrl = "https://docs.google.com/gview?embedded=true&url=";
            this._urlRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
            this._mimeType = "application/pdf";
            this._iphonePath = "";
            this._androidPath = "";
            this._pdfType = "";
            this._iphoneType = "pdf";
            this._renderType = "";
            this._prevIphoneEventObj = "";
            this.local = true;
          	this.seed = Math.random();
          	this._online = "Online";
          	this._local = "Local File Path";
            this._urlError = {
                "error": "Invalid Path",
                "message": "please give a valid URL"
            };
            this._pathError = {
                "error": "Invalid Path",
                "message": "please enter a valid path"
            };
            this._fileError = {
                "error": "File Creation Error",
                "message": "Unable to create file or Please provide valid filename"
            };
            this.type = {
                "Online": false,
                "Local File Path": true
            };
			this.deviceName = this.konyDeviceInfo.name;
          	if(this.deviceName === "android"){
               	this.nativeController = require("com/konymp/pdfviewer/androidPdfViewer");
            }
			else if(this.deviceName === "iPhone"){
               	this.nativeController = require("com/konymp/pdfviewer/iOSPdfViewer");
            }
            this.nativeController.getClasses(this);
            konymp.logger.trace("----------Exiting constructor ---------", konymp.logger.FUNCTION_EXIT);
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
            defineSetter(this, "url", function(val) {
                try {
                    this.validateUrl(val);
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "url", function() {
                try {
                    return this._url;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "setIphonePath", function() {
                try {
                    return this._iphonePath;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "setIphonePath", function(val) {
                try {
                    if (val !== undefined && val !== null && val !== "" || !this.local) {
                        this._iphonePath = val;
                    } else {
                        throw this._urlError;
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "setAndroidPath", function() {
                try {
                    return this._androidPath;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "setAndroidPath", function(val) {
                try {
                    if (val !== undefined && val !== null && val !== "" || !this.local) {
                        this._androidPath = val;
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineGetter(this, "pdfType", function() {
                try {
                    return this._pdfType;
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            defineSetter(this, "pdfType", function(val) {
                try {
                  	if(val === this._online || val === this._local){
                    	this._pdfType = val;
                    	this.local = this.type[val];  
                    }
                  	else{
                      	throw {
                			"error": "pdf type error",
                			"message": "Please select a valid pdf type"
            			};
                    }
                } catch (exception) {
                    konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                    throw exception;
                }
            });
            konymp.logger.trace("----------Exiting initsetgetter ---------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function validateUrl
         * @description This function is used to validate url
         * @private
         * @param val
         */
        validateUrl: function(val) {
            try {
                konymp.logger.trace("----------Entering validateUrl Function---------", konymp.logger.FUNCTION_ENTRY);
                var extenstion = val.substring(val.length - 3, val.length).toLowerCase();
                if (val !== null && this._urlRegex.test(val) && extenstion !== null && extenstion.endsWith("pdf")) {
                    this._url = val;
                } else {
                    throw this._urlError;
                }
                konymp.logger.trace("----------Exiting validateUrl ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
        /**
         * @function fetchAndDisplay
         * @description This function is used to render pdf in iOS
         * @private
         * @param eventObj
         */
        fetchAndDisplay: function(eventObj) {
            try {
              	konymp.logger.trace("----------Entering fetchAndDisplay Function---------", konymp.logger.FUNCTION_ENTRY);
                if (eventObj !== undefined && eventObj !== null) {
                  	this.nativeController.fetchAndDisplayPDF(eventObj);
                }
              	konymp.logger.trace("----------Exiting fetchAndDisplay Function ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
		/**
         * @function renderWebView
         * @description This function is used to render webview
         * @private
         * @param
         */
        renderWebView: function() {
            try {
                konymp.logger.trace("----------Entering renderWebview Function---------", konymp.logger.FUNCTION_ENTRY);
                if (this.view.nativePDF) {
                    this.view.remove(this.view.nativePDF);
                }
                var nativePDF = new kony.ui.NativeContainer({
                    "height": "100%",
                    "id": "nativePDF",
                    "isVisible": true,
                    "left": "0%",
                    "onCreated": this.fetchAndDisplay.bind(this),
                    "top": "0%",
                    "width": "100%",
                    "zIndex": 1
                }, {}, {});
                this.view.add(nativePDF);
                konymp.logger.trace("----------Exiting renderWebview ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
      	/**
         * @function setURL
         * @description Function used to change URL of the pdf dynamically
         * @public
         * @param url
         */
        setURL: function(url) {
            try {
                konymp.logger.trace("----------Entering setURL Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(url !== undefined && url !== null && url.trim() !== ""){
              		this.nativeController.setUrl(url);
                }
              	else{
                  	throw this._urlError;
                }
                konymp.logger.trace("----------Exiting setUrl ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
      	/**
         * @function setAndroidFilePath
         * @description This function is used to render android file path 
         * @private
         * @param path
         */
        setAndroidFilePath: function(path) {
            try {
              	konymp.logger.trace("----------Entering setAndroidFilePath Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(path !== undefined && path !== null && path.trim() !== ""){
              		this.nativeController.setFilePath(path);
                }
              	else{
                  	throw this._pathError;
                }
                konymp.logger.trace("----------Exiting setAndroidFilePath Function---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        },
		/**
         * @function setIphoneFilePath
         * @description This function is used to render iphone file path 
         * @private
         * @param path
         */
        setIphoneFilePath: function(path) {
            try {
                konymp.logger.trace("----------Entering setIphoneFilePath Function---------", konymp.logger.FUNCTION_ENTRY);
              	if(path !== undefined && path !== null && path.trim() !== ""){
              		this.nativeController.setFilePath(path);
                }
              	else{
                  	throw this._pathError;
                }
                konymp.logger.trace("----------Exiting setIphoneFilePath ---------", konymp.logger.FUNCTION_EXIT);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                throw exception;
            }
        }
    };
});