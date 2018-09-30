define({ 

 //Type your controller code here 
  callShowFilter:function(widget,context){
    this.executeOnParent("showFilterContainer",context);
  },
  onClickAddBtn:function(widget,context){
    this.executeOnParent("_onClickAddBtn",context);
  }

 });