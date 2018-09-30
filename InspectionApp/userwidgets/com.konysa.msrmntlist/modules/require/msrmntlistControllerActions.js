define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onTouchEnd defined for lblInfo **/
    AS_Label_d92924968edf4dc696bf735c5a44380e: function AS_Label_d92924968edf4dc696bf735c5a44380e(eventobject, x, y) {
        var self = this;
        this.triggerInfoCallback();
    },
    /** onClick defined for flxTitle **/
    AS_FlexContainer_jc572f292b3a4b06ae9a1fef1937b5fd: function AS_FlexContainer_jc572f292b3a4b06ae9a1fef1937b5fd(eventobject) {
        var self = this;
        this.toggleVisibility(null);
    },
    /** onSelection defined for radioStatus **/
    AS_RadioButtonGroup_e871390211af4f0e8096e28c9a1ce8c0: function AS_RadioButtonGroup_e871390211af4f0e8096e28c9a1ce8c0(eventobject) {
        var self = this;
        return self.onRadioSelectionDone.call(this);
    },
    /** onClick defined for flxItem0 **/
    AS_FlexContainer_edf24913cd654d239a979de1a4515852: function AS_FlexContainer_edf24913cd654d239a979de1a4515852(eventobject) {
        var self = this;
        this.checkUncheckItem(eventobject);
    },
    /** onClick defined for flxItem1 **/
    AS_FlexContainer_h8599b0dfd7a4db7b79a0843da95763a: function AS_FlexContainer_h8599b0dfd7a4db7b79a0843da95763a(eventobject) {
        var self = this;
        this.checkUncheckItem(eventobject);
    },
    /** onClick defined for flxItem2 **/
    AS_FlexContainer_cc3c3f2e0c58484ca97ca587c9cdde79: function AS_FlexContainer_cc3c3f2e0c58484ca97ca587c9cdde79(eventobject) {
        var self = this;
        this.checkUncheckItem(eventobject);
    }
});