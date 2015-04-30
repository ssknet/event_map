/* ページ読み込み時に地図を初期化 */
$(function(){
    initialize();
});
/* 地図の初期化 */
function initialize() {
    /* 緯度・経度：日本 */
    var sw = new google.maps.LatLng(34.78686153539099,135.46176754659234);
    var ne = new google.maps.LatLng(34.78778011654687,135.46265803998529);
    var station = new google.maps.LatLng(34.78718975860977,135.46188288157998);
    var chaoparco = new google.maps.LatLng(34.78770732486034, 135.46262011727447);
    /* 地図のオプション設定 */
    var myOptions={
        /*初期のズーム レベル */
        zoom: 19,
        disableDefaultUI : 'disable',
        panControl: false,
        zoomControl: true,
        scaleControl: false,
        /* 地図タイプ */
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    /* 地図オブジェクト */
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    /* 指定された境界に合うように地図を設定 */
    var bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds,19);
    /* ★ポリライン */
    /*
        stepsの緯度経度はGoogle Directions APIで取得
        http://maps.google.es/maps/api/directions/json?origin=omotesando+station&destination=shibuya+station&sensor=false
    */
    var step1 = new google.maps.LatLng(34.7871280791785, 135.46194457238732);
    var step2 = new google.maps.LatLng(34.787293291837244, 135.46216183131753)
    var step3 = new google.maps.LatLng(34.78733073999403, 135.46227716630517);
    var step4 = new google.maps.LatLng(34.78740783908666, 135.46234422153054);
    var step5 = new google.maps.LatLng(34.787559834229256, 135.46243809884606);
    var step6 = new google.maps.LatLng(34.78758847096392, 135.4625507516247);
    var step7 = new google.maps.LatLng(34.78771403191383, 135.46251282891387);
    var flightPlanCoordinates=[
        /* Start */
        station,
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
        step7,
        /* Destination */
        chaoparco
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    flightPath.setMap(map);

     /* ★アイコン */
    var imgchaoparco = './images/office_kitashin_icon_map32.png';
    var mkPin = './images/pin_24.png';

    var marker0 = new google.maps.Marker({
        position: chaoparco,
        map: map,
        icon: imgchaoparco
    });
    var marker1 = new google.maps.Marker({
        position: step1,
        map: map,
        icon: mkPin
    });
    var marker2 = new google.maps.Marker({
        position: step5,
        map: map,
        icon: mkPin
    });
    var marker3 = new google.maps.Marker({
        position: step6,
        map: map,
        icon: mkPin
    });
    var marker4 = new google.maps.Marker({
        position: step7,
        map: map,
        icon: mkPin
    });

/* Information Box
  http://stackoverflow.com/questions/10908132/google-map-v3-allow-only-one-infobox-to-be-displayed-at-a-time
*/

/*  */
// Toyonaka Machidukuri Corporation
var textToyonaka = "豊中駅前まちづくり会社";
var myCorporation = {
     content: textToyonaka
    ,boxStyle: {
       border: "1px solid black"
      ,opacity: 0.70
      ,background: "#eff7e7"
      ,textAlign: "center"
      ,fontSize: "8pt"
      ,width: "13em"
     }
    ,disableAutoPan: true
    ,pixelOffset: new google.maps.Size(-25, 0)
    ,position: new google.maps.LatLng(34.788354114023704, 135.46298250429913)
    ,closeBoxURL: ""
    ,isHidden: false
    ,pane: "mapPane"
    ,enableEventPropagation: true
};
var labelCorporation = new InfoBox(myCorporation);
// ToyonakaSt concourse
var textToyonaka = "豊中駅前人口広場";
var concourse = {
     content: textToyonaka
    ,boxStyle: {
       border: "1px solid black"
      ,opacity: 0.70
      ,background: "#eff7e7"
      ,textAlign: "center"
      ,fontSize: "8pt"
      ,width: "10em"
     }
    ,disableAutoPan: true
    ,pixelOffset: new google.maps.Size(-25, 0)
    ,position: new google.maps.LatLng(34.78719268161576, 135.4622573038264)
    ,closeBoxURL: ""
    ,isHidden: false
    ,pane: "mapPane"
    ,enableEventPropagation: true
};
var labelConcourse = new InfoBox(concourse);
labelConcourse.open(map);
// Chaoparco
var textChaoparco = "チャオパルコ豊中";
var chaoparco = {
     content: textChaoparco
    ,boxStyle: {
       border: "1px solid black"
      ,opacity: 0.70
      ,background: "#edc9cf"
      ,textAlign: "center"
      ,fontSize: "8pt"
      ,fontWeight: "bold"
      ,width: "10em"
     }
    ,disableAutoPan: true
    ,pixelOffset: new google.maps.Size(15, -25)
    ,position: chaoparco
    ,closeBoxURL: ""
    ,isHidden: false
    ,pane: "mapPane"
    ,enableEventPropagation: true
};
var labelChaoparco = new InfoBox(chaoparco);
labelChaoparco.open(map);


/* Guide message */
var imageBackground = "url('./images/tipbox.gif') no-repeat";
var imageCloseBox = "http://www.google.com/intl/en_us/mapfiles/close.gif";
var cssInfoBox = "border: none; margin-top: 6px; background: black; color: #CCC; padding: 5px;";

/* Guide 1 */
var boxText1 = document.createElement("div");
boxText1.style.cssText = cssInfoBox;
boxText1.innerHTML = "<div style=''>改札口を出て左の人口広場方向へ<img src='./images/photos/cp01.jpg' width='185'></div>";

var myOptions1 = {
     content: boxText1
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: {
      background: imageBackground
      ,opacity: 0.95
      ,width: "200px"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: imageCloseBox
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
};

/* Guide 2 */
var boxText2 = document.createElement("div");
boxText2.style.cssText = cssInfoBox;
boxText2.innerHTML = "<div>斜め右へ（マストメゾン豊中方向）<img src='./images/photos/cp02.jpg' width='200'></div>";

var myOptions2 = {
     content: boxText2
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: {
      background: imageBackground
      ,opacity: 0.95
      ,width: "19em"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: imageCloseBox
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
};

/* Guide 3 */
var boxText3 = document.createElement("div");
boxText3.style.cssText = cssInfoBox;
boxText3.innerHTML = "<div>マンション入口手前の左側階段を降りる<img src='./images/photos/cp03.jpg' width='185'></div>";

var myOptions3 = {
     content: boxText3
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: {
      background: imageBackground
      ,opacity: 0.95
      ,width: "200px"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: imageCloseBox
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
};

/* Guide 4 */
var boxText4 = document.createElement("div");
boxText4.style.cssText = cssInfoBox;
boxText4.innerHTML = "<div>階段を降りきった右側<img src='./images/photos/cp04.jpg' width='145'></div>";

var myOptions4 = {
     content: boxText4
    ,disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-150, -20)
    ,zIndex: null
    ,boxStyle: {
      background: imageBackground
      ,opacity: 0.95
      ,width: "160px"
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: imageCloseBox
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,enableEventPropagation: false
};

/* Marker Click event */
var guide = new InfoBox();
google.maps.event.addListener(marker1, "click", function (e) {
    guide.close();
    guide.setOptions(myOptions1)
    guide.open(map, this);
});

google.maps.event.addListener(marker2, "click", function (e) {
    guide.close();
    guide.setOptions(myOptions2)
    guide.open(map, this);
});

google.maps.event.addListener(marker3, "click", function (e) {
    guide.close();
    guide.setOptions(myOptions3)
    guide.open(map, this);
});

google.maps.event.addListener(marker3, "click", function (e) {
    guide.close();
    guide.setOptions(myOptions3)
    guide.open(map, this);
});

google.maps.event.addListener(marker4, "click", function (e) {
    guide.close();
    guide.setOptions(myOptions4)
    guide.open(map, this);
});
/* 豊中駅前まちづくり会社を表示 */
    $(".tmco").click(
        function(){
            map.panTo(new google.maps.LatLng(34.788354114023704,135.46298250429913));
            labelCorporation.open(map);
            var latlngCo = new google.maps.LatLng(34.788354114023704,135.46298250429913);
            var marker = new google.maps.Marker({
              position: latlngCo,
              map: map
            });
        }
    );

}
