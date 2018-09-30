define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._callerID=null;
      this._base64=null;
      this._isBackgroundShown=false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setCallerID:function(callerID){
      this._callerID=callerID;
    },
    setImageData:function(){
      try{
        if(this.view_callerID!==null){
          this.view[this._callerID].setImageBase64(this._base64);
        }
      }catch(excp){
        alert(JSON.stringify(excp));
      }
    },
    toggleBackground:function(status){
      switch(status){
        case true:
          this.view.flxDummey.setVisibility(true);
          this._isBackgroundShown=true;
          break;
        case false:
          this.view.flxDummey.setVisibility(false);
          this._isBackgroundShown=false;
          break;
        default:
          this._isBackgroundShown=!this._isBackgroundShown;
          this.view.flxDummey.setVisibility(this._isBackgroundShown);
      }
      this.view.forceLayout();
    },
    triggerDummeyFlexClickEvent:function(){
      if(this.onDummyFlexClick!==null && this.onDummyFlexClick){
        this.onDummyFlexClick();
      }
    },
    setCameraRawBytes:function(){
      debugger;
      var imgBage64=kony.convertToBase64(this.view.camCapture.rawBytes);
      if(this.onImageSelection!==null && this.onImageSelection!==undefined){
        var compressedImage=this.scaleDownImage(imgBage64);
        this.onImageSelection(compressedImage);
      }
      /*if(eventobject!==null&&eventobject!==undefined){
        //if(eventobject.rawBytes!==null&&eventobject.rawBytes===undefined){
          var cameraRawBytes = eventobject.rawBytes;
          var imgBage64=kony.convertToBase64(cameraRawBytes);
          if(this.onImageSelection!==null && this.onImageSelection!==undefined){
            this.onImageSelection(imgBage64);
          }
       // }
      }*/
    },
    scaleDownImage:function(imgBase64){
      var raw_byte=kony.convertToRawBytes(imgBase64);
      var img;//=new kony.image.createImage(raw_byte);
      if(kony.os.deviceInfo().name==="android"){
        img=new kony.image.createImage(raw_byte);
      }else{
        img= kony.image.createImage(raw_byte);
      }
      
      img.scale(0.08);
      var newBase64=kony.convertToBase64(img.getImageAsRawBytes());
      return newBase64;
    },
    selectImage:function(){
      var onselectioncallback=function(rawbytes,permStatus,mimeType){
        var imageRawByte=rawbytes;
        if(imageRawByte===null)return;
        //var resourcePath=imageRawByte.getResourcePath();
        //var fileObj=kony.io.FileSystem.getFile(resourcePath);
        //fileObj.
        //alert("imageRawByte: "+imageRawByte);
        //alert("resourcePath: "+resourcePath);
        //return;
        //var arr=resourcePath.split("/");
        //var arrLength=arr.length;
        //var imageName=arr[arrLength-1];
        //var imageType=imageName.split(".");
        //imageType=imageType[1];
        /*if(imageType!==".png"&&imageType!=="jpg"&&imageType!=="jpeg"){
          alert("Only png, jpg & jpeg file format supported!");
          return;
        }*/
        var imageBase64=kony.convertToBase64(rawbytes);
        if(this.onImageSelection!==null && this.onImageSelection!==undefined){
          var compressedImage=this.scaleDownImage(imageBase64);
          this.onImageSelection(compressedImage);
        }
        /*alert("selected image: "+imageName);
        alert("rawbytes: "+rawbytes);
        alert("permStatus:"+permStatus);
        alert("mimeType:"+mimeType);*/
        //this.uploadImage(imageName, imageBase64);
      };
      try{
        var querycontext={"mimetype":"image/*"};
        kony.phone.openMediaGallery(onselectioncallback.bind(this), querycontext)
      }catch(excp){
        kony.print(JSON.stringify(excp));
      }
    }

  };
});