//Type your code here

function searchKeyInCollection(searchKey,itemList){
  var matchedRecord=[];
  if(searchKey===null||searchKey===undefined||itemList===null||itemList===undefined)
    return matchedRecord;
  var itemListLength=itemList.length;
  var item;
  for(var i=0;i<itemListLength;i++){
    item=itemList[i];
    item["inspection_Id"]=item["inspection_Id"]+"";
    item["asset_Id"]=item["asset_Id"]+"";
    if(item["inspection_Id"].toLowerCase().indexOf(searchKey)!==-1 ||
       item["asset_Id"].toLowerCase().indexOf(searchKey)!==-1 
      ){
      matchedRecord.push(item);
      //break;
    }
    /*for(var key in item){
      if(item[key].toLowerCase().indexOf(searchKey)!==-1){
        matchedRecord.push(item);
        break;
      }
    }*/
  }
  return matchedRecord;
}
function getObjectInstance(objService){
  if(objService===null||objService===undefined)
    objService="inspectionObjService";
  var objectInstance = null;
  var sdkClient = new kony.sdk.getCurrentInstance();
  if (Object.keys(sdkClient).length !== 0) {
    objectInstance = sdkClient.getObjectService(objService, {
      "access": "online"
    });
  }
  if (objectInstance === null || objectInstance === undefined) {
    kony.application.dismissLoadingScreen();
    kony.print("Authorization object null - Connect to MF");
    alert("Please connect app to MF");
    objectInstance= null;
  }
  return objectInstance;
}
function sortByDate(recordList){
  var sortedRecordList=[];
  if(Array.isArray(recordList)){
    recordList.sort(function(a,b){
      return new Date(a["assigned_Timestamp"])<new Date(b["assigned_Timestamp"]);
    });
    sortedRecordList=recordList;
  }else{
    sortedRecordList= [];
  }
  return sortedRecordList;
}
function sortByLocation(){
  if(Array.isArray(records)){
    records.sort(function(a,b){
    });
  }else{
    return [];
  }
}
function filterByType(typeList,recordList){
  var filteredRecords=[];
  if(Array.isArray(typeList)&&Array.isArray(recordList)){
    var recordLength=recordList.length;
    var record;
    var recordType;
    var typeKey;
    var typeLength=typeList.length;
    if(typeLength===0)
      return recordList;
    for(var i=0;i<recordLength;i++){
      record=recordList[i];
      if(typeof record === 'object' && typeof record!==null){
        var asset=record["asset"];
        if(typeof asset==='object' && typeof asset!==null){
          var assetType=asset["type"];
          if(typeof assetType==='object' && typeof assetType!==null){
            var assetName=assetType["Name"];
            if(typeof assetName==='string'){
              // recordType=record["asset_type"];
              //  if(recordType!==null&&recordType!==undefined){
              assetName=assetName.toLowerCase();
              for(var j=0;j<typeLength;j++){
                typeKey=typeList[j];
                if(typeKey!==null&&typeKey!==undefined){
                  typeKey=typeKey.toLowerCase();
                  if(assetName===typeKey){
                    filteredRecords.push(record);
                    break;
                  }
                }
              }
              // }
            }
          }
        }
      }
    }
  }else{
    filteredRecords=[];
  }
  return filteredRecords;
}
function validateText(param){
  var text="";
  if(param!==null&&param!==undefined){
    param=param+"";
    text=param.trim();
  }
  return text;
}
function getAssatName(assetCode){
  var assetName="";
  switch(assetCode){
    case "TRANS" 	: assetName="Transformers";break;
    case "OILCB" 	: assetName="Oil Circuit Breakers	";break;
    case "LTCB"  	: assetName="Live Tank Circuit Breakers";break;
    case "SWITCH" 	: assetName="Switch gears";break;
    case "TLINE" 	: assetName="Transmission Lines";break;
    case "PUMP" 	: assetName="Pumps";break;
    case "HPAIR" 	: assetName="High Pressure Air System";break;
    case "HVTRN" 	: assetName="High Voltage Instrument Transformers";break;
    case "CAPBK" 	: assetName="Capacitor Banks";break;
    case "FENCE" 	: assetName="Fences";break;
    case "FRSEC" 	: assetName="Fire and Security Systems";break;
    case "STSGE" 	: assetName="Station Surge Protections";break;
    case "ACDCS" 	: assetName="AC/DC Service Equipment";break;
    case "FIBOP" 	: assetName="Fibre Optics";break;
    case "PCSYS" 	: assetName="Protection and Control Systems";
  }
  return assetName;
}
function getTimeString(param){
  var timeString="";
  if(param!==null && param!==undefined){
    try{
      var dateObj=new Date(param);
      var hrs = dateObj.getHours();
      hrs=addZeroPrefix(hrs);//+"";

      var min = dateObj.getMinutes();
      min=addZeroPrefix(min);
      timeString=hrs+":"+min+" Hrs";
    }catch(excp){
      kony.print(excp.toString());
    }
  }
  return timeString;
}
function getDateString(param){
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
}
function _convertDateStringToEpochTime(str){
  //str = "2018-08-08 16:30:24";
  var dateTime = str.split(" ");
  var date = dateTime[0];
  var time = dateTime[1];
  var dateSplit = date.split("-");
  var year = parseInt(dateSplit[0]);
  var month = parseInt(dateSplit[1])-1;
  var day = parseInt(dateSplit[2]);
  var timeSplit = time.split(":");
  var hrs = parseInt(timeSplit[0]);
  var min = parseInt(timeSplit[1]);
  var sec = parseInt(timeSplit[2]);
  var dateObj = new Date(year,month,day,hrs,min,sec);
  var userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  dateObj = new Date(dateObj.getTime() + userTimezoneOffset);
  return dateObj;
}
/*function getUtcDateTimeString(){
  var dateObj = new Date();
  var userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
  dateObj = new Date(dateObj.getTime() - userTimezoneOffset);
  return dateObj;
}*/
function getUtcDateTimeString() {
  var date = new Date();
  var userTimezoneOffset = date.getTimezoneOffset() * 60000;
  date = new Date(date.getTime() + userTimezoneOffset);
  var currDay = addZeroPrefix(date.getDate());
  var currMonth =addZeroPrefix(date.getMonth() + 1);
  var currYear = addZeroPrefix(date.getFullYear());
  var hr = addZeroPrefix(date.getHours());
  var min =addZeroPrefix(date.getMinutes());
  var sec =addZeroPrefix(date.getSeconds());
  var dateinSQLFormat = currYear + "-" + currMonth + "-" + currDay + "T" + hr + ":" + min + ":" + sec;
  return dateinSQLFormat;
}
function addZeroPrefix(number) {
  var result;
  if (number >= 0 && number < 10) {
    result = "0" + number;
  } else {
    result = number;
  }
  return result;
}
