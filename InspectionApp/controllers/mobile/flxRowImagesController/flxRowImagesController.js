define({ 

 onClickImages:function(eventobject, context){
   var data = context.widgetInfo.selectedRowItems[0];
   this.executeOnParent("onClickOfSegRowObject",data);
 } 

 });