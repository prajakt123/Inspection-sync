define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxBack **/
    AS_FlexContainer_b3c344f7df3643daab98014f02a825ba: function AS_FlexContainer_b3c344f7df3643daab98014f02a825ba(eventobject) {
        var self = this;
        this._onClickBack();
    },
    /** onTextChange defined for txtSearch **/
    AS_TextField_ec21736265f7427b8e5a572b9eb88048: function AS_TextField_ec21736265f7427b8e5a572b9eb88048(eventobject, changedtext) {
        var self = this;
        this._onTextChangeOfSearch(eventobject, changedtext);
    },
    /** onTouchEnd defined for imgSearchCancel **/
    AS_Image_a1b7f59bcb5040ccb85e07a7cc761dc5: function AS_Image_a1b7f59bcb5040ccb85e07a7cc761dc5(eventobject, x, y) {
        var self = this;
        this._onClickSearchClear();
    },
    /** onClick defined for flxCancel **/
    AS_FlexContainer_c090074a5ee14464ad81a84162114ac4: function AS_FlexContainer_c090074a5ee14464ad81a84162114ac4(eventobject) {
        var self = this;
        this._onClickCancel();
    },
    /** onRowClick defined for segAssets **/
    AS_Segment_d602395aae09499e87305c80fbd26a99: function AS_Segment_d602395aae09499e87305c80fbd26a99(eventobject, sectionNumber, rowNumber) {
        var self = this;
        this._onClickSegAsset();
    },
    /** onClick defined for flxFilterScreenClose **/
    AS_FlexContainer_gf12234f8f974643a773791b6b33696c: function AS_FlexContainer_gf12234f8f974643a773791b6b33696c(eventobject) {
        var self = this;
        this._hideFilterScreen();
    },
    /** onClick defined for flxFilterReset **/
    AS_FlexContainer_i3fdc61799ca4275b124340d9b6ae480: function AS_FlexContainer_i3fdc61799ca4275b124340d9b6ae480(eventobject) {
        var self = this;
        this._onClickFilterReset();
    },
    /** onClick defined for btnApplyFilter **/
    AS_Button_a0f0a9378a7949889806a909d327031b: function AS_Button_a0f0a9378a7949889806a909d327031b(eventobject) {
        var self = this;
        this._onClickApplyFilter();
    },
    /** onClick defined for flxFilter **/
    AS_FlexContainer_bf730e6ccefd4a1dab5c4b6f14eb4b79: function AS_FlexContainer_bf730e6ccefd4a1dab5c4b6f14eb4b79(eventobject, context) {
        var self = this;
        this._showFilterScreen();
    },
    /** preShow defined for frmInspectionCreation **/
    AS_Form_c916991bd6e141d8b0375246eabbf5b0: function AS_Form_c916991bd6e141d8b0375246eabbf5b0(eventobject) {
        var self = this;
        this._fetchData();
    },
    /** onDeviceBack defined for frmInspectionCreation **/
    AS_Form_g86c9a527d7d45dd8b26fc65cb87bbe1: function AS_Form_g86c9a527d7d45dd8b26fc65cb87bbe1(eventobject) {
        var self = this;

        function doNothing() {};
        doNothing();
    }
});