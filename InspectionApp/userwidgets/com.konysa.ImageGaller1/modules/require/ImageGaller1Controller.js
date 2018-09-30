define(function() {
  var konyLoggerModule = require('com/konysa/ImageGaller1/konyLogger');
  var konysa =konysa || {};
  konysa.logger = new konyLoggerModule("ImageGallery") || function(){};
  return {
    /**
     * @function constructor
     * @private
     * @param {Object} baseConfig
     * @param {Object} layoutConfig
     * @param {Object} pspConfig
     */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      debugger;
      /** Global variables for custom properties */
      this._appUserID=null;
      this._rootFolderID="0";
      this._id=0;
    },
    /**
     * @function initGettersSetters
     * @description contains getters/setters for custom properties
     */
    initGettersSetters: function() {
      debugger;
      defineGetter(this,"appUserID",function(){
        return this._appUserID;});
      defineGetter(this,"rootFolderID",function(){
        return this._rootFolderID;});
      defineSetter(this,"appUserID",function(appUserID){
        this._appUserID=appUserID;
      });
      defineSetter(this,"rootFolderID",function(rootFolderID){
        this._rootFolderID=rootFolderID;
      });
    },
    /**
     * @function getImages
     * @description This function is used to invoke integration service for fetching image from Box.
     * @private
     * @param {string} folderID
     * @param {string} top
     */
    getImages:function(folderID){
      debugger;
      var imageList=[];
      var self=this;
      if(folderID===null||folderID===undefined){
        folderID=this._rootFolderID;
      }
      var appUserID=this._appUserID;
      if(appUserID===""||appUserID===null||appUserID===undefined){
        alert("please provide the app user ID");
        return;
      }
      try{
        var client = kony.sdk.getCurrentInstance();
        var intgService = client.getIntegrationService("BoxService");
        kony.model.ApplicationContext.showLoadingScreen("fetching image..");
        intgService.invokeOperation("getFilesInFolder",{},{
          "appUserID":appUserID,
          "folderID":folderID
        },function(successResponse){
          // alert(successResponse.results.result);
          kony.model.ApplicationContext.dismissLoadingScreen();
          imageList=successResponse.results;
          imageList=JSON.parse(imageList);
          self.setImage(imageList.result);
        },function(error){
          kony.model.ApplicationContext.dismissLoadingScreen();
          alert(error);
        });
      }catch(e){
        kony.model.ApplicationContext.dismissLoadingScreen();
        alert(e.message);
      }
      // return imageList;
    },
    /**
     * @function setImage
     * @description This function is used to display the image in the UI 
     * @private
     * @param {string} response
     */
    setImage:function(response){
      var flxItem;
      var id=0;
      var fileName;
      this.view.flxScThumbImage.removeAll();
      //this.view.imgEvent.src = response[0].image_url;
      var firstImage=response[0];
      for(var i=0;i<response.length;i++){
            this.view.imgEvent.src=firstImage;
            flxItem=this.getFlexItem(id,response[i]);
            this.view.flxScThumbImage.add(flxItem);
            id++;
      }
      //flxItem=this.getFlexItem(id,"create_new_event_icon.png");
      this._id=++id;
      //this.view.flxScThumbImage.add(flxItem);
      this.view.forceLayout();
    },
    selectImage:function(){
      var onselectioncallback=function(rawbytes,permStatus,mimeType){
        var imageRawByte=rawbytes;
        if(imageRawByte===null)return;
        var resourcePath=imageRawByte.getResourcePath();
        alert("imageRawByte: "+imageRawByte);
        alert("resourcePath: "+resourcePath);
        return;
        var arr=resourcePath.split("/");
        var arrLength=arr.length;
        var imageName=arr[arrLength-1];
        var imageType=imageName.split(".");
        imageType=imageType[1];
        if(imageType!==".png"&&imageType!=="jpg"&&imageType!=="jpeg"){
          alert("Only png, jpg & jpeg file format supported!");
          return;
        }
        var imageBase64=kony.convertToBase64(rawbytes);
        /*alert("selected image: "+imageName);
        alert("rawbytes: "+rawbytes);
        alert("permStatus:"+permStatus);
        alert("mimeType:"+mimeType);*/
        this.uploadImage(imageName, imageBase64);
      };
      try{
        var querycontext={"mimetype":"image/*"};
        kony.phone.openMediaGallery(onselectioncallback.bind(this), querycontext)
      }catch(excp){
        kony.print(JSON.stringify(excp));
      }
    },
    uploadImage:function(imageName,imageBase64) {
      if(imageName===null||imageName===undefined||imageBase64===null||imageBase64===undefined){
        return;
      }
      var folderID=this._rootFolderID;
      if(folderID===null||folderID===undefined){
        alert("please provide folder id");
        return;
      }
      var appUserID=this._appUserID;
      if(appUserID===""||appUserID===null||appUserID===undefined){
        alert("please provide the app user ID");
        return;
      }
      try{
        var uploadSuccess=function(response){
          kony.model.ApplicationContext.dismissLoadingScreen();
          var toast=new kony.ui.Toast({"text":"upload success!","duration":constants.TOAST_LENGTH_SHORT });
          toast.show();
          this.getImages(null);
          return;
          /*if(response.status==="200"){
            flxItem=this.getFlexItem.bind(this)(this._id,response.results.download_url );
            this._id=this._id+1;
            this.view.flxScThumbImage.add(flxItem);
            this.view.forceLayout();
          }*/
        };
        var client = kony.sdk.getCurrentInstance();
        var intgService = client.getIntegrationService("BoxService");
        kony.model.ApplicationContext.showLoadingScreen("please wait..");
        intgService.invokeOperation("UploadFilesInfFolderMob",{},{
          "appUserID":appUserID,
          "folderID":folderID,
          "imageBase64":imageBase64,
          "imageName":imageName
        },uploadSuccess.bind(this),function(error){
          kony.model.ApplicationContext.dismissLoadingScreen();
          alert(error);
        });
      }catch(e){
        kony.model.ApplicationContext.dismissLoadingScreen();
        alert(e.message);
      }
    },
    /**
     * @function getFlexItem
     * @description This function is used to create flex container with image dynamically. 
     * @private
     * @param {string} id
     * @param {string} imageUrl
     */
    getFlexItem:function(id,imageUrl){
      var self=this;
      function test(eventobject){
        var flexId=eventobject.id;
        var id=flexId.split("flxItem");
        var imageSrc=self.view["imgThumb"+id[1]].src;
        self.view.imgEvent.src=imageSrc;
        //alert(eventobject.id);
      }
      var left;
      left=(id===0)?0:5;
      var flxItem = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "clipBounds": true,
        "height": "80dp",
        "id": "flxItem"+id,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": left+"dp",
        "onClick": test,
        "skin": "sknFlxThumbBG",
        "top": "dp",
        "width": "80dp",
        "zIndex": 1
      }, {}, {});
      // flxItem.setDefaultUnit(kony.flex.DP);
      var imgThumb = new kony.ui.Image2({
        "centerX": "50%",
        "centerY": "50%",
        "height": "100%",
        "id": "imgThumb"+id,
        "isVisible": true,
        "skin": "slImage",
        "src": imageUrl,
        // "imageWhileDownloading": "eventske.png",
        "width": "100%",
        "zIndex": 1
      }, {
        "imageScaleMode": constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS,
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {});
      flxItem.add(imgThumb);
      return flxItem;
    }
  };
});