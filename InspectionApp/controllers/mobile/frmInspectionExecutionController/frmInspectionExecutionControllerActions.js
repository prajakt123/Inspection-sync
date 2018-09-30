define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_ac7c8f153265423eb7701d9b3ed8aa71: function AS_FlexContainer_ac7c8f153265423eb7701d9b3ed8aa71(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmInspectionsList");
        ntf.navigate();
    },
    /** onClick defined for flxHistory **/
    AS_FlexContainer_c201748a9dec4316aa2cd4d2129297cc: function AS_FlexContainer_c201748a9dec4316aa2cd4d2129297cc(eventobject) {
        var self = this;
        this._onClickOfHistory();
    },
    /** onTouchEnd defined for lblAssetDetails **/
    AS_Label_a415b30c54724509aaa865da39e079ac: function AS_Label_a415b30c54724509aaa865da39e079ac(eventobject, x, y) {
        var self = this;
        this.showAssetDetailContainer();
    },
    /** onClick defined for btnPdf **/
    AS_Button_cf5f6f219d124ff38e7377f98b743bdd: function AS_Button_cf5f6f219d124ff38e7377f98b743bdd(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmPdfViewer");
        ntf.navigate();
    },
    /** onMeasurementDone defined for measurement **/
    AS_UWI_e0d8fba678a04b90b0aeb77e87201a1f: function AS_UWI_e0d8fba678a04b90b0aeb77e87201a1f(result) {
        var self = this;
        this.testFun(result);
    },
    /** onClick defined for btnSubmitInspection **/
    AS_Button_fd1ea9f17e8f402b9308f98701c9d1c5: function AS_Button_fd1ea9f17e8f402b9308f98701c9d1c5(eventobject) {
        var self = this;
        this.readMeasurement();
        //this.view.measurement.getResult();
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_c093bdb0e21a4b879485cb2d4c68a97b: function AS_FlexContainer_c093bdb0e21a4b879485cb2d4c68a97b(eventobject) {
        var self = this;
        this.hideAssetDetailContainer();
    },
    /** onImageSelection defined for imagegallery **/
    AS_UWI_a1b59751fa004ffa920ea30ec240ef2d: function AS_UWI_a1b59751fa004ffa920ea30ec240ef2d(imgBase64) {
        var self = this;
        this.onImageSelected(imgBase64);
    },
    /** onDummyFlexClick defined for imagegallery **/
    AS_UWI_ccdf895437c74cbbb0fa0c74edbdcf40: function AS_UWI_ccdf895437c74cbbb0fa0c74edbdcf40() {
        var self = this;
        this.hideImageGallery();
    },
    /** onClick defined for flxInfoCardContainer **/
    AS_FlexContainer_cab224a773954dada7335615f6a475be: function AS_FlexContainer_cab224a773954dada7335615f6a475be(eventobject) {
        var self = this;
        this.view.flxInfoCardContainer.right = "-100%";
    },
    /** onClick defined for flxImageViewer **/
    AS_FlexContainer_i3adc522cfd64b28bd7a3914a395519d: function AS_FlexContainer_i3adc522cfd64b28bd7a3914a395519d(eventobject) {
        var self = this;
        this.view.flxImageViewer.left = "100%";
    },
    /** postShow defined for frmInspectionExecution **/
    AS_Form_c5361963c5af48daa8c0d8764385d978: function AS_Form_c5361963c5af48daa8c0d8764385d978(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** onDeviceBack defined for frmInspectionExecution **/
    AS_Form_g2d25845c203450b81203d701b8a4fd1: function AS_Form_g2d25845c203450b81203d701b8a4fd1(eventobject) {
        var self = this;

        function doNothing() {};
        doNothing();
    }
});