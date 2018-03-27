var historyId,poetryId,param,phone;

$(function (){
	$("#mask").show();
    $("#loading").show();

	param=GetQueryString("param");
	historyId=param.split(",")[0];
	poetryId=param.split(",")[1];
	phone=$.cookie("phone");

	Dyconfing();
	getOpenId(); 
})

//1.获取openId
function getOpenId(){
	var openIdCookie=$.cookie("openId");
	if (openIdCookie==""||openIdCookie==null||openIdCookie==undefined) {
		var code=GetQueryString("code");
			url="/weixin/auth/authInfo";
		$.post(url,{"code":code},function(data){
			if (data.status == 1 && data.code == 1) {
				$("#mask").hide();
    			$("#loading").hide();
				var openId=data.authInfo.openId;
				$.cookie("openId",openId);  //设置openId(cookie)
				
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
		openId=$.cookie("openId");  //获取openId值(cookie)
	$.post(url,{"openId":openId},function(data){
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
		openId=$.cookie("openId"); //获取openId值(cookie)
	$.post(url,{"openId":openId},function(data){
		if (data.status == 1 && data.code == 1) {
			if (data.isBind) {
				var userPhone=data.phone;
				$.cookie("phone",userPhone);
				isHelp();
			}else{
				showAlert();
				$(".successText").html("您暂未绑定“中国贵州电信加油站”此公众号");
				$(".btns").html('<img src="img/affirm.png" onclick="hideAlert()">');
			}
		}
	})
}

//4.获取是否还能帮忙权限（好友方）
function isHelp(){
	var url="/weixin/poetry/isHelp";
	$.post(url,{"historyId":historyId,"poetryId":poetryId},function (data){
		if (data.status == 1 && data.code == 1) {
			if (data.isHelp) {
				window.location.href="http://gz.mobicloud.com.cn/active/gzGame/friendAnswer.html?param="+phone+','+poetryId+','+historyId;
			}else{
				showAlert();
				$(".successText").html("答题已结束或者别人已帮忙或者帮忙超时");
				$(".btns").html("");
				$(".successText").css("text-align","left");
				$(".btns").html('<img src="img/affirm.png" onclick="hideAlert()">');
			}
		}else{
			showAlert();
			$(".successText").html(data.message);
			$(".btns").html("");
		}
	})
}

//好友进入游戏
function friendGame(){
	getuserMsg(); 
}


//配置confing
function Dyconfing(){
	var localUrl=window.location.href;
		url="/weixin/model/wxConfigSignature";
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

/*function Closethis(){
	hideAlert();
}*/