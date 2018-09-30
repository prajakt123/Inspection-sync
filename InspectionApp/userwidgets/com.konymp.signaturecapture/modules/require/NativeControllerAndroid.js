define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLoggerModule) {
    var konymp = konymp || {};
    konymp.logger = new konyLoggerModule("signaturecapture/NativeControllerAndroid");
    var NativeControllerAndroid = function(componentInstance) {
        konymp.logger.trace("-- Start constructor NativeControllerAndroid --", konymp.logger.FUNCTION_ENTRY);
        self = this;
        var signature = java.import("konymp.com.signatureview.SignatureView");
        var konymain = java.import("com.konylabs.android.KonyMain");
        var konyContext = konymain.getActivityContext();
        
        this.sigObj = new signature(konyContext);
        this._saveType = "";
        this.componentInstance = componentInstance;
        
        NativeController(componentInstance);
        konymp.logger.trace("-- Exit constructor NativeControllerAndroid -- ", konymp.logger.FUNCTION_EXIT);
    };
    Inherits(NativeControllerAndroid, NativeController);
    NativeControllerAndroid.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
        konymp.logger.trace("-- Entering addSignatureCanvas in NativeControllerAndroid -- ", konymp.logger.FUNCTION_ENTRY);
        this._saveType = saveType;
        if (penColor) {
            this.sigObj.setPenColor("#" + penColor);
        }
        if (bgColor) {
            this.sigObj.setCanvasColor("#" + bgColor);
        }
        if(self.sigObj.getParent()!==null){
    		(self.sigObj.getParent()).removeView(self.sigObj);
        } 
        eventobj.addView(self.sigObj);
        konymp.logger.trace("-- Exiting addSignatureCanvas in NativeControllerAndroid-- ", konymp.logger.FUNCTION_EXIT);
    };
    NativeControllerAndroid.prototype.onClickClear = function() {
        konymp.logger.trace("-- Entering onClickClear in NativeControllerAndroid -- ", konymp.logger.FUNCTION_ENTRY);
        this.sigObj.clearSignature();
        konymp.logger.trace("-- Exiting onClickClear in NativeControllerAndroid-- ", konymp.logger.FUNCTION_EXIT);
    };
    NativeControllerAndroid.prototype.onClickSave = function() {
        konymp.logger.trace("-- Entering onClickSave in NativeControllerAndroid -- ", konymp.logger.FUNCTION_ENTRY);
        var imgBase64 = this.sigObj.getSignature(this.componentInstance._saveAs);
        konymp.logger.trace("-- Exiting onClickSave in NativeControllerAndroid-- ", konymp.logger.FUNCTION_EXIT);
        return imgBase64;
    };
    return NativeControllerAndroid;
});