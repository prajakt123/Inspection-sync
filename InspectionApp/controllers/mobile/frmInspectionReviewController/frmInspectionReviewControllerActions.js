define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_f9bd3fb9e4034aa7b89d981bbb1bc609: function AS_FlexContainer_f9bd3fb9e4034aa7b89d981bbb1bc609(eventobject) {
        var self = this;
        this.navigateBack();
    },
    /** onClick defined for flxHistory **/
    AS_FlexContainer_gfc1d1306dff46178a1befcc58edf46d: function AS_FlexContainer_gfc1d1306dff46178a1befcc58edf46d(eventobject) {
        var self = this;
        this._onClickOfHistory();
    },
    /** onTouchEnd defined for lblAssetDetails **/
    AS_Label_ebc1e7cec7434291ae9fb4f0ffa5db78: function AS_Label_ebc1e7cec7434291ae9fb4f0ffa5db78(eventobject, x, y) {
        var self = this;
        this.showAssetDetailContainer();
    },
    /** onClick defined for btnSubmitInspection **/
    AS_Button_ee690f1d08684c248ac1078dd9d7d105: function AS_Button_ee690f1d08684c248ac1078dd9d7d105(eventobject) {
        var self = this;
        this.submitInspection();
        //this.getInspectedData();
    },
    /** onClick defined for flxOverlay **/
    AS_FlexContainer_d882eeb72ab74dbbaee4d8b1d83b1dd1: function AS_FlexContainer_d882eeb72ab74dbbaee4d8b1d83b1dd1(eventobject) {
        var self = this;
        this.hideAssetDetailContainer();
    },
    /** postShow defined for frmInspectionReview **/
    AS_Form_caa5a6a05f8c4917954a258c222d8a27: function AS_Form_caa5a6a05f8c4917954a258c222d8a27(eventobject) {
        var self = this;
        this.onPostShow();
    },
    /** onDeviceBack defined for frmInspectionReview **/
    AS_Form_iba544177efd42089b10576e190ec482: function AS_Form_iba544177efd42089b10576e190ec482(eventobject) {
        var self = this;

        function doNothing() {};
        doNothing();
    }
});