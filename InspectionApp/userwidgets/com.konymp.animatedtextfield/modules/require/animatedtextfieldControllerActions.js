define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onDone defined for txtBoxComponent **/
    AS_TextField_bd12b2785425422daec71bc2722ef1c1: function AS_TextField_bd12b2785425422daec71bc2722ef1c1(eventobject, changedtext) {
        var self = this;
        this.onDone(this.view.lblPlaceholder);
    },
    /** onTouchStart defined for lblPlaceholder **/
    AS_Label_acc0d2ac01dc4f8191d968f89d24d7f6: function AS_Label_acc0d2ac01dc4f8191d968f89d24d7f6(eventobject, x, y) {
        var self = this;
        this.animateComponent(this.view.lblPlaceholder);
    },
    /** preShow defined for animatedtextfield **/
    AS_FlexContainer_ga69f6eae1fa410187a6e919be851113: function AS_FlexContainer_ga69f6eae1fa410187a6e919be851113(eventobject) {
        var self = this;
        this.preshow();
    }
});