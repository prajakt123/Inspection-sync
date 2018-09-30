define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onCreated defined for nativePDF **/
    AS_NativeContainer_d6f9d7032d6949e9b47b68acfd90371c: function AS_NativeContainer_d6f9d7032d6949e9b47b68acfd90371c(eventobject) {
        var self = this;
        if (kony.os.deviceInfo().name === "android") {
            this.fetchAndDisplay(eventobject);
        }
    },
    /** onLayoutSubviews defined for nativePDF **/
    AS_NativeContainer_d14afdf76ddc45b3866de44ff24c4121: function AS_NativeContainer_d14afdf76ddc45b3866de44ff24c4121(eventobject) {
        var self = this;
        this.fetchAndDisplay(eventobject);
    }
});