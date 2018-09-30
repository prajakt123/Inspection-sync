define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      getEmail()
      {
        return this.view.txtEmail.getText();
      },
      getPassword()
      {
        return this.view.txtPassword.getText();
      },
      setLoading()
      {
        this.view.imgSignin.src="loader.gif";
      },
      resetLoading()
      {
        this.view.imgSignin.src="signin.png";
      },
      onSign : function(){
        this.onSignIn();
      }
	};
});