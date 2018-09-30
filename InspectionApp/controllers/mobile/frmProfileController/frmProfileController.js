define({ 
	onNavigate:function(Obj){
      this._navigationData = Obj.userAttribute;
      this.setData(this._navigationData);
  	},
  _onClickBack: function(){
      var navObj=new kony.mvc.Navigation("frmInspectionsList");
      var navigationData = {};
      navigationData = this._navigationData;
      navObj.navigate(navigationData);
    },
   onClickofSignOut: function(){
     var navObj=new kony.mvc.Navigation("frmLogin");
     var navigationData = {};
     navObj.navigate(navigationData);
   },
   setData: function(data){
     this.view.lblUserFullName.text = data.firstName+" "+data.lastName;
     this.view.lblEmail.text = data.email;
     this.view.lblInitials.text = data.firstName.charAt(0)+data.lastName.charAt(0);
   }

 });