var milkcocoa = new MilkCocoa("guitari9oy2byg.mlkcca.com");
var osDataStore = milkcocoa.dataStore("userData");

var userData = {
  data: [],
  totalcount:0,
  osResult: {apple:0,android:0,windows:0,others:0},
  init: function(){
    //ユーザー一覧を読み込みdataに突っ込む
    osDataStore.stream().size(999).next(function(err,data){
//      console.log(data);
      var cuttentUserExist = true;
      userData.totalcount = data.length;
      for(var i=0; i<data.length; i++){
        userData.addUser(data[i].value);
      //userDataに今みてるユーザーが入ってないかチェックする
        if(data[i].value.ipAddress == ipAddress)cuttentUserExist = false;
      }
      if(cuttentUserExist)userData.addCurrentUser();
      else graphLoad();
    });
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
  },
  addUser: function(addData){
    userData.data.push(addData);
    userData.osResult[addData.os]++;
  }
}

$(function(){
  userData.init();

  //データ受信監視
  osDataStore.on("push",function(data){
    userData.addUser(data.value);
    userData.totalcount++;
    setTimeout("graphLoad();",1000);
  });
});

function graphLoad(){
  var doughnutData = [
  　　{
    //apple
  　　　value: userData.osResult.apple,
  　　　color:"#999999"
  　　},
  　　{
    //android
  　　　value: userData.osResult.android,
  　　　color: "#a5c63b"
  　　},
  　　{
    //windows
  　　　value: userData.osResult.windows,
  　　　color: "#00adef"
  　　},
     {
    //others
  　　　value: userData.osResult.others,
  　　　color: "#fbaa6e"
  　　}
  ];

  var myDoughnut = new Chart($("#chart")[0].getContext("2d")).Doughnut(doughnutData);

//パーセンテージ表示
  var numAnim = [];
  $.each(userData.osResult,function(key,value){
    $("#counter").append(key+":<span id='count"+key+"'></span>%<br>");
    numAnim[key] = new CountUp("count"+key,0,parseInt(value/userData.totalcount*100),0,3).start();
  });
}

function findOS(ua){
//  console.log(ua);
  if ((ua.indexOf('iPad') != -1)||(ua.indexOf('iPod') != -1)||(ua.indexOf('iPhone') != -1)||(ua.indexOf('Mac OS') != -1))return "apple";
  if (ua.indexOf('Android') != -1)return "android";
  if (ua.indexOf('Windows') != -1)return "windows";
  return "others";
}