define([], function() {
    var NativeController = function(componentInstance) {
        this.componentInstance = componentInstance;

    };
    NativeController.prototype.addSignatureCanvas = function(eventobj,penColor,bgColor,saveType) {
        throw new Error('You have to implement the method addSignatureCanvas!');
    };

    NativeController.prototype.onClickClear = function() {
        throw new Error('You have to implement the method onClickClear!');
    };
    NativeController.prototype.onClickSave = function() {
        throw new Error('You have to implement the method onClickSave!');
    };
    NativeController.prototype.getSignatureFromDevice=function(){
      throw new Error('You have to implement the method getSignatureFromDevice!');
    };

    return NativeController;
});