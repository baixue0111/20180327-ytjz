
var historyId,flow,param,openIdCookie;
$(function (){
	$("#mask").show();
    $("#loading").show();

	param=GetQueryString("param");
	historyId=param.split(",")[0];
	flow=param.split(",")[1];
	
	$("#flow").html(flow);
	Dyconfing();
	getOpenId(); 

})

//1.获取openId
function getOpenId(){
	openIdCookie=$.cookie("openId");
	if (openIdCookie==""||openIdCookie==null||openIdCookie==undefined) {
		var code=GetQueryString("code");
			url="/weixin/auth/authInfo";
		$.post(url,{"code":code},function(data){
			if (data.status == 1 && data.code == 1) {
				$("#mask").hide();
    			$("#loading").hide();
				var openId=data.authInfo.openId;
				openIdCookie=openId;
				$.cookie("openId",openId);  //设置openId(cookie)
				//getuserMsg(); 
			}
		})
	}else{
		$("#mask").hide();
	   	$("#loading").hide();
	   	//getuserMsg(); 
	}
	
}

//2.获取用户基本信息
function getuserMsg(){
	var url="/weixin/auth/userInfo";
	openIdCookie=$.cookie("openId");  //获取openId值(cookie)
	$.post(url,{"openId":openIdCookie},function(data){
		if (data.status == 1 && data.code == 1) {
			var focusOn=data.userInfo.subscribe;
			if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
				isBind();  
			}else if(focusOn == 0){
				showAlert();
				$(".successText").html("您暂未关注“中国贵州电信加油站”此公众号");
				$(".btns").html('<img src="img/affirm.png" onclick="hideAlert()">');
			}
		}
	})
}

//3.判断是否绑定
function isBind(){
	var url="/weixin/auth/isBind";
	openIdCookie=$.cookie("openId"); //获取openId值(cookie)
	$.post(url,{"openId":openIdCookie},function(data){
		if (data.status == 1 && data.code == 1) {
			if (data.isBind) {
				var userPhone=data.phone;
				$.cookie("phone",userPhone);
				showAffirm();
			}else{
				showAlert();
				$(".successText").html("您暂未绑定“中国贵州电信加油站”此公众号");
				$(".btns").html('<img src="img/affirm.png" onclick="hideAlert()">');
			}
		}
	})
}


//首页点击“领取红包”
function clickRed(){
	getuserMsg();
}


//确认是否领取红包
function affirm(){
    var str='<div class="success">'+
                '<div class="header"></div>'+
                '<div class="successText">确认领取流量红包？</div>'+
            '</div>'+
            '<div class="btns">'+
                '<img src="img/affirm.png" alt="" class="btns-first" onclick="Clickaffirm();">'+
                '<img src="img/no.png" alt="" class="btns-second" onclick="nolq();">'+
            '</div>';
            
    $("#startShow").html(str);
}
//暂不领取
function prompt3(){
    var str='<div class="success">'+
                '<div class="header">恭喜您！</div>'+
                '<div class="successText">'+
                    '<p class="settl">获得一个 <span></span> M省内流量红包</p>'+
                    '<p class="y-color">注：贵州电信用户才能领取流量。</p>'+
                '</div>'+
            '</div>'+
            '<div class="btns">'+
                '<img src="img/lq.png" alt="" class="btns-first" onclick="affirm();">'+
                '<img src="img/song.png" alt="" class="btns-second" onclick="shareApp();">'+
            '</div>';
            
    $("#startShow").html(str);
}
//显示确认领取红包弹框
function showAffirm(){
	affirm();
	$("#mask").show();
    $("#startShow").show();
}

//点击“确认”按钮
function Clickaffirm(){
	$(".successText").html("请稍等 ....");
	$(".btns").html("");
	var url="/weixin/poetry/flowGet";
	var phone=$.cookie("phone");
	//console.log(phone)
	$.post(url,{"historyId":historyId,"flowGetPhone":phone},function (data){
		if (data.status == 1 && data.code ==1) {
			$(".btns img:first").removeAttr('onclick');   //当用户点击确定领取时则移除点击事件
			showSuccess();
			$(".settl span").html(flow);
		}else{
			showError();
			$(".settl").html(data.message);
			$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
		}
	})
}


//配置confing
function Dyconfing(){
	var localUrl=window.location.href;
	var url="/weixin/model/wxConfigSignature";
	//console.log(localUrl)
	$.post(url,{"localUrl":localUrl}, function (data) {
		if (data.status == 1 && data.code == 1) {
			var weixin = data.wxConfigSignatureData;
				appId = weixin.appId;
				noncestr = weixin.noncestr;
				signature = weixin.signature;
				timestamp = weixin.timestamp;
			wx.config({
				debug:false,
				appId:appId,
				timestamp:timestamp,
				nonceStr:noncestr,
				signature:signature,
				jsApiList:['hideOptionMenu','checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'showMenuItems', 'hideMenuItems', 'showOptionMenu', 'closeWindow']
			});
		}
	})
}

//关闭当前页面
function closeWindow(){
	wx.ready(function(){
		console.log("进入ready");
		wx.checkJsApi({
			jsApiList:['closeWindow'],
			success: function (res) {
				console.log("关闭当前窗口："+JSON.stringify(res));
			}
		});
		wx.closeWindow();   //关闭当前窗口
	});
}


//点击“暂不”按钮
function nolq(){
	prompt3();
	$("#mask").show();
    $("#startShow").show();
    $(".settl span").html(flow);
}

function shareApp(){
	$("#startShow").hide();
	$(".shareHelp").attr("src","img/red-shareApp.png");
	$(".shareHelp").show();
}