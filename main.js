var milkcocoa = new MilkCocoa("guitari9oy2byg.mlkcca.com");
var osDataStore = milkcocoa.dataStore("userData");

var userData = {
  data: [],
  init: function(){
    //ユーザー一覧を読み込むにUserListに突っ込む
    osDataStore.stream().size(999).next(function(err,data){
      console.log(data);
      var cuttentUserExist = true;
      for(var i=0; i<data.length; i++){
        userData.data.push(data[i].value);
      //userDataに今みてるユーザーが入ってないかチェックする
        if(data[i].value.ipAddress = ipAddress)cuttentUserExist = false;
      }
      if(cuttentUserExist)userData.addCurrentUser();
      else console.log("既にこのユーザー情報は送信してます");
    });
  },
  graphLoad: function(){

  },
  addCurrentUser: function(){
    //milkcocoaへデータ送信
    osDataStore.push({
      ua : window.navigator.userAgent,
      os : findOS(window.navigator.userAgent),
      ipAddress : ipAddress
    },
      function(data){
        console.log("milkcocoa送信完了!");
      }
    );
  }
}

$(function(){
  userData.init();
});

function findOS(ua){
//  console.log(ua);
  if ((ua.indexOf('iPad') != -1)||(ua.indexOf('iPod') != -1)||(ua.indexOf('iPhone') != -1)||(ua.indexOf('Mac OS') != -1))return "apple";
  if (ua.indexOf('Android') != -1)return "android";
  if (ua.indexOf('Windows') != -1)return "windows";
  return "others";
}