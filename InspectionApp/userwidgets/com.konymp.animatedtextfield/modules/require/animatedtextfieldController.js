/*
#
#  Created by Team Kony.
#  Copyright (c) 2017 Kony Inc. All rights reserved.
#
*/

define(function() {
	var konymp = konymp || {};
  	var KonyLoggerModule = require("com/konymp/animatedtextfield/KonyLogger");
  	konymp.logger = (new KonyLoggerModule("Animated Text Field")) || function(){};
	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          	konymp.logger.info("Entered constructor of component", konymp.logger.FUNCTION_ENTRY);
			this._placeholderSkin = null;
          	this._placeholderFocusSkin = null;
          	this._underlineSkin = null;
          	this._underlineFocusSkin = null;
          	this._textboxSkin = null;
          	if(baseConfig.placeholderSkin !== null){
              	this._placeholderSkin = baseConfig.placeholderSkin;
            }
          	if(baseConfig.placeholderFocusSkin !== null){
              	this._placeholderFocusSkin = baseConfig.placeholderFocusSkin;
            }
          	if(baseConfig.underlineSkin !== null){
              	this._underlineSkin = baseConfig.underlineSkin;
            }
          	if(baseConfig.underlineFocusSkin !== null){
              	this._underlineFocusSkin = baseConfig.underlineFocusSkin;
            }
          	if(baseConfig.textboxSkin !== null){
              	this._textboxSkin = baseConfig.textboxSkin;
            }
          	konymp.logger.info("Exiting constructor of component", konymp.logger.FUNCTION_EXIT);
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
          	konymp.logger.info("Entered initGettersSetters function of component", konymp.logger.FUNCTION_ENTRY);
			defineSetter(this, "placeholderSkin", function(val) {
              	this.view.lblPlaceholder.skin = val;
      			this._placeholderSkin = val;
            });
          	defineGetter(this, "placeholderSkin", function() {
              	return this._placeholderSkin;
            });
          	defineSetter(this, "placeholderFocusSkin", function(val) {
              	this._placeholderFocusSkin = val;
            });
          	defineGetter(this, "placeholderFocusSkin", function() {
              	return this._placeholderFocusSkin;
            });
          	defineSetter(this, "underlineSkin", function(val) {
              	this.view.lblUnderline.skin = val;
              	this._underlineSkin = val;
            });
          	defineGetter(this, "underlineSkin", function() {
              	return this._underlineSkin;
            });
          	defineSetter(this, "underlineFocusSkin", function(val) {
              	this._underlineFocusSkin = val;
            });
          	defineGetter(this, "underlineFocusSkin", function() {
              	return this._underlineFocusSkin;
            });
          	defineSetter(this, "textboxSkin", function(val) {
              	this.view.txtBoxComponent.skin = val;
            });
          	defineGetter(this, "textboxSkin", function() {
              	return this.view.txtBoxComponent.skin;
            });
          	if(this._placeholderSkin !== null){
              	this.placeholderSkin = this._placeholderSkin;
            }
          	if(this._underlineSkin !== null){
              	this.underlineSkin = this._underlineSkin;
            }
          	if(this._textboxSkin !== null){
              	this.textboxSkin = this._textboxSkin;
            }
          	konymp.logger.info("Exiting initGettersSetters function of component", konymp.logger.FUNCTION_EXIT);
		},
      
      	preshow: function(){
          	if(this.view.txtBoxComponent.text !== null && this.view.txtBoxComponent.text !== ""){
              	this.view.lblPlaceholder.skin = this.placeholderFocusSkin;
              	this.view.lblPlaceholder.padding = [0, 0, 0, 0];
              	this.view.lblPlaceholder.width = "90%";
              	this.view.lblUnderline.height = "2dp";
          		this.view.lblUnderline.skin = this.underlineFocusSkin;
              	this.view.lblPlaceholder.top = "-30%";
            }
        },
      
      	animateComponent: function(obj) {
          	konymp.logger.info("Entered animateComponent function of component", konymp.logger.FUNCTION_ENTRY);
          	konymp.logger.info("Parameter to be animated " + JSON.stringify(obj));
          	obj.animate(
    			kony.ui.createAnimation({
        		"100": {
            		"top": "-20%",
            		"stepConfig": {
               			"timingFunction": kony.anim.EASE
            		},
				}
    			}), {
        			"delay": 0,
        			"iterationCount": 1,
        			"fillMode": kony.anim.FILL_MODE_FORWARDS,
        			"duration": 0.25
    			}, {
       				"animationEnd": this.changeSkins(obj, "animate")
    			}
            );
          	konymp.logger.info("Exiting animateComponent function of component", konymp.logger.FUNCTION_EXIT);
        },
        resetTxtbox:function()
      {
        this.changeSkins(this.view.lblPlaceholder,"");
      },
      	changeSkins: function(obj, animateVal){
          	konymp.logger.info("Entered changeSkins function of component", konymp.logger.FUNCTION_ENTRY);
          	konymp.logger.info("Parameter obj " + JSON.stringify(obj) + "animateVal is "+animateVal);
          	if(animateVal  === "animate"){
          		obj.skin = this.placeholderFocusSkin;
              	obj.padding = [0, 0, 0, 0];
              	obj.width = "90%";
          		this.view.txtBoxComponent.setFocus(true);
          		this.view.lblUnderline.height = "2dp";
          		this.view.lblUnderline.skin = this.underlineFocusSkin;
            }
          	else{
              	obj.padding = [0, 10, 0, 0];
              	obj.skin = this.placeholderSkin;
              	obj.width = "100%";
          		this.view.lblUnderline.height = "2dp";
              	this.view.lblPlaceholder.setFocus(true);
          		this.view.lblUnderline.skin = this.underlineSkin;
            }
          	this.view.forceLayout();
          	konymp.logger.info("Exiting changeSkins function of component", konymp.logger.FUNCTION_EXIT);
        },
      
		onDone: function(obj){
          	konymp.logger.info("Entered onDone function of component", konymp.logger.FUNCTION_ENTRY);
          	konymp.logger.info("Parameter obj is " + JSON.stringify(obj));
          	if(this.onTextBoxDone !== null && this.onTextBoxDone !== undefined){
          		this.onTextBoxDone();
            }
          	else{
              	if(this.view.txtBoxComponent.text === null || this.view.txtBoxComponent.text === ""){
          			obj.animate(
    					kony.ui.createAnimation({
        					"100": {
            				"top": "0%",
            				"stepConfig": {
               					"timingFunction": kony.anim.EASE
            				},
						}
    					}), {
        					"delay": 0,
        					"iterationCount": 1,
        					"fillMode": kony.anim.FILL_MODE_FORWARDS,
        					"duration": 0.25
    					}, {
       						"animationEnd": this.changeSkins(obj, "reverse")
    					}
                	);
            	}
            }
          	konymp.logger.info("Exiting onDone function of component", konymp.logger.FUNCTION_EXIT);
     	},
      
      	getText : function(){
          	konymp.logger.info("Entered getText API of component", konymp.logger.FUNCTION_ENTRY);
      		konymp.logger.info("Exiting getText API of component", konymp.logger.FUNCTION_EXIT);
          	return this.view.txtBoxComponent.text;
    	}
	};
});