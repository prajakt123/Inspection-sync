//Type your code here

var app_constant={
  "inspection":"Inspection0",
  "asset":"Asset0",
  "user":"User000"
};

var InspectionUtil=(function(){
  return{
    isJsonObject:function(param){
      var isJson;
      if(typeof param==='object' && typeof param!==null){
        isJson=true;
      }else{
        isJson=false;
      }
      return isJson;
    },
    addZeroPrefix:function(number) {
      var result;
      if (number >= 0 && number < 10) {
        result = "0" + number;
      } else {
        result = number;
      }
      return result;
    },
    validateText:function (param){
      var text="";
      if(param!==null&&param!==undefined){
        param=param+"";
        text=param.trim();
      }
      return text;
    },
    getReadableTimeString:function (param){
      var timeString="";
      if(param!==null && param!==undefined){
        try{
          var dateObj=new Date(param);
          var hrs = dateObj.getHours();
          hrs=this.addZeroPrefix(hrs);//+"";
          var min = dateObj.getMinutes();
          min=this.addZeroPrefix(min);
          timeString=hrs+":"+min+" Hrs";
        }catch(excp){
          kony.print(excp.toString());
        }
      }
      return timeString;
    },
    getReadableDateString:function (param){
      var dateString="";
      if(param!==null && param!==undefined){
        try{
          var dateObj=new Date(param);
          var mDate=dateObj.getDate();
          var mMonth=dateObj.toLocaleString("en-us", { month: "short" });
          dateString=mDate+" "+mMonth;
        }catch(excp){
          kony.print(excp.toString());
        }
      }
      return dateString;
    },
    parseRecords:function(records,key){
      var mappedData=null;
      if(Array.isArray(records) && typeof key ==='string'){
        var recordLength=records.length;
        var recordKey;
        mappedData={};
        for(var i=0;i<recordLength;i++){
          recordKey=records[i][key];
          if(typeof recordKey === 'string' || typeof recordKey === 'number'){
            if(mappedData[recordKey]===null || mappedData[recordKey]===undefined){
              mappedData[recordKey]=[records[i]];
            }else{
              mappedData[recordKey].push(records[i]);
            }
          }
        }
      }
      return mappedData;
    },
    filterByStatus:function (statusKeyList,recordList){
      var filteredRecords=[];
      var status;
      if(Array.isArray(recordList)&&Array.isArray(statusKeyList)){
        var recordLength=recordList.length;
        var statusKeyListLength=statusKeyList.length;
        var record;
        var statusKey;
        if(statusKeyListLength===0)
          return recordList;
        for(var i=0;i<recordLength;i++){
          record=recordList[i];
          if(typeof record["Status"]==='string' && record["Status"]!==null){
            status=record["Status"].toLowerCase();
            for(var j=0;j<statusKeyListLength;j++){
              statusKey=statusKeyList[j];
              if(typeof statusKey==='string' && statusKey!==null){
                statusKey=statusKey.toLowerCase();
                if(status===statusKey){
                  filteredRecords.push(record);
                  break;
                }
              }
            }
          }
        }
      }else{
        filteredRecords= [];
      }
      return filteredRecords;
    },
    sortByDate:function(inspectionList){
      //debugger;
      if(Array.isArray(inspectionList)){
        inspectionList.sort(function(a,b){
          var date1=a["Assigned_Timestamp"];
          //date1=_convertDateStringToEpochTime(date1);
          date1=new Date(date1);
          var date2=b["Assigned_Timestamp"];
          //date2=_convertDateStringToEpochTime(date2);
          date2=new Date(date2);
          return date2-date1;
        });
      }
    }
  };
})();
var Inspection= (function (){
  var assetGroupsList=null;
  var assetLocationsList=null;
  var assetMeasurementsList=null;
  var assetsList=null;
  var assetGroupNameList=null;
  var assetTypesList=null;
  var inspectionMeasurementList=null;
  var inspectionList=null;
  var measurementHistoryList=null;
  var measurementImageList=null;
  var measurementRangeList=null;
  var measurementList=null;
  var measurementSetRangeList=null;
  var mediaList=null;
  var userList=null;
  return{
    getAssetGroupList:function(){
      return assetGroupsList;
    },
    setAssetGroupsList:function(val){
      assetGroupsList=val;
    },
    getAssetLocationsList:function(){
      return assetLocationsList;
    },
    getAssetMeasurementsList:function(){
      return assetMeasurementsList;
    },
    setAssetMeasurementsList:function(val){
      assetMeasurementsList=val;
    },
    getAssetsList:function(){
      return assetsList;
    },
    setAssetsList:function(val){
      assetsList=val;
    },
    getAssetGroupNameList:function(){
      return assetGroupNameList;
    },
    setAssetGroupNameList:function(val){
      assetGroupNameList=val;
    },
    getAssetTypesList:function(){
      return assetTypesList;
    },
    setAssetTypesList:function(val){
      assetTypesList=val;
    },
    getInspectionMeasurementList:function(){
      return inspectionMeasurementList;
    },
    setInspectionMeasurementList:function(val){
      inspectionMeasurementList=val;
    },
    getInspectionList:function(){
      return inspectionList;
    },
    setInspectionList:function(val){
      inspectionList=val;
    },
    getMeasurementHistoryList:function(){
      return measurementHistoryList;
    },
    setMeasurementHistoryList:function(val){
      measurementHistoryList=val;
    },
    getMeasurementImageList:function(){
      return measurementImageList;
    },
    setMeasurementImageList:function(val){
      measurementImageList=val;
    },
    getMeasurementRangeList:function(){
      return measurementRangeList;
    },
    setMeasurementRangeList:function(val){
      measurementRangeList=val;
    },
    getMeasurementList:function(){
      return measurementList;
    },
    setMeasurementList:function(val){
      measurementList =val;
    },
    getMeasurementSetRangeList:function(){
      return measurementSetRangeList;
    },
    setMeasurementSetRangeList:function(val){
      measurementSetRangeList =val;
    },
    getMediaList:function(){
      return mediaList;
    },
    setMediasList:function(val){
      mediaList =val;
    },
    getUserList:function(){
      return userList;
    },
    setUserList:function(val){
      userList =val;
    }
  };
})();