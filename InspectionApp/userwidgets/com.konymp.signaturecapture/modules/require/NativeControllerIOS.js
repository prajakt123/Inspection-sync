define(['./Inherits', './NativeController', './KonyLogger'], function(Inherits, NativeController, konyLoggerModule) {
    var konymp = konymp || {};
    konymp.logger = new konyLoggerModule("signaturecapture/NativeControllerIOS");
    var NativeControllerIOS = function(componentInstance) {
        konymp.logger.trace("-- Start constructor NativeControllerIOS --", konymp.logger.FUNCTION_ENTRY);
        self = this;
        var UIView = objc.import("UIView");
        var UIColor = objc.import("UIColor");
        var UIScreen = objc.import("UIScreen");
        var signatureClass = objc.import('UviSignatureView');
        this.signatureObj = signatureClass.alloc().initWithFrame(UIScreen.mainScreen().bounds);
        this._saveType = "";
        this.componentInstance = componentInstance;

        NativeController(componentInstance);
        konymp.logger.trace("-- Exit constructor NativeControllerIOS -- ", konymp.logger.FUNCTION_EXIT);
    };
    Inherits(NativeControllerIOS, NativeController);

    NativeControllerIOS.prototype.addSignatureCanvas = function(eventobj, penColor, bgColor, saveType) {
        konymp.logger.trace("-- Entering addSignatureCanvas in NativeControllerIOS -- ", konymp.logger.FUNCTION_ENTRY);
        this._saveType = saveType;
        if (penColor) {
            this.signatureObj.changeLineColor(penColor);
        }
        if (bgColor) {
            this.signatureObj.changebackgroundColor(bgColor);
        }
        eventobj.addSubview(this.signatureObj);
        konymp.logger.trace("-- Exiting addSignatureCanvas in NativeControllerIOS-- ", konymp.logger.FUNCTION_EXIT);
    };

    NativeControllerIOS.prototype.onClickClear = function() {
        konymp.logger.trace("-- Entering onClickClear in NativeControllerIOS -- ", konymp.logger.FUNCTION_ENTRY);
        this.signatureObj.erase();
        konymp.logger.trace("-- Exiting onClickClear in NativeControllerIOS-- ", konymp.logger.FUNCTION_EXIT);
    };
    NativeControllerIOS.prototype.onClickSave = function() {
        konymp.logger.trace("-- Entering onClickSave in NativeControllerIOS -- ", konymp.logger.FUNCTION_ENTRY);
        var imageBitmap = this.signatureObj.captureSignature();
        return imageBitmap;
    };
    return NativeControllerIOS;
});