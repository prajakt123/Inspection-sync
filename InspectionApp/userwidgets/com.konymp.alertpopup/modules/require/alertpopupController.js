/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/
define(function() {
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

      },
      _setText: function(text){
        this.view.lblHeader.text = text;
      },
      showPopUp: function(text){
        this._setText(text);
        this.view.isVisible=true;
      },
      hidePopUp: function(){
        this.view.isVisible = false;
      }
	};
});