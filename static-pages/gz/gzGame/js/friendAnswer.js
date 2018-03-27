
var oldContent,id,t,resultFlow,historyId,newContent,phone;
var time2=null;
var param=GetQueryString("param");
var phone=param.split(",")[0];
var id=param.split(",")[1];
var historyId=param.split(",")[2];


$(function(){

	Dyconfing();  //调用confing
	closeShare();
	prompt();
	question();
})

//1.进入游戏之后获取题目
function question(){
	var url="/weixin/poetry/helpQuestion";
	$.post(url,{"id":id},function(data){
		if (data.status == 1 || data.code == 1) {
			var poetry=data.poetry;
				t=poetry.limit_time;

			Time();  // 倒计时  //做完记得解开注释

			
			oldContent=poetry.content;

			console.log("oldContent====="+oldContent);

			var quesLength=poetry.scrambled_content;
			for (var j = 0; j < quesLength.length; j++) {
				var str='<li onclick="inputClick(this);" wordId="'+j+'">'+quesLength.substr(j,1)+'</li>';
				$("#textList").append(str);	
			}
		}else if(data.status == 4 || data.code == 1){
			showAlert();
			$(".successText").html(data.message);
			$(".btns").html("");
		}
	})

}

//好友提交答案
function friendSub(){
	var newText="";
	var url="/weixin/poetry/helpSubmit";
	liLength=$(".startText li").length;
	for (var i = 0; i < liLength; i++) {
		var startText=$(".startText li").eq(i).html();
		var newText=newText+startText;
	}
	console.log("newText==="+newText);
	newContent=$.md5(newText);
	console.log("newContent==="+newContent);
	if (newContent == oldContent) {
		if (phone == undefined || phone == "" || phone==null) {
			showAlert();
			$(".successText").html("您未授权，暂不能提交...");
			$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
		}else{
			$.post(url,{"historyId":historyId,"poetryId":id,"phone":phone},function (data){
				if (data.status == 1 && data.code ==1) {
					clearInterval(time2);
					showAlert();
					$(".successText").html(data.message);
					$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
				}else{
					clearInterval(time2);
					showAlert();
					$(".successText").html(data.message);
					$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
				}
			})
		}
		
	}else{
		clearInterval(time2);
		prompt2();
		$(".success").css({"margin-top":"0px"});
		showAlert2();
		$(".successText").html("");
		$(".btns img:last").css("display","none");
		$(".btns img:first").attr("onclick","closeWindow()");
	}
}


//选取答案
function inputClick(btn){
	var ingputlength=$(btn).length;
		index=$(btn).index(this);
		text=$(btn).eq(index).html();
	$(btn).eq(index).addClass("startHidden").removeAttr('onclick');
	var wordId=$(btn).eq(index).attr("wordId");
	var str='<li wordId="'+wordId+'">'+text+'</li>';
	$(".startText").append(str);
}

//清除
function clearAnswer(){
	var lastVal=$(".startText li:last").html();
		lastId=$(".startText li:last").attr("wordId");
	if (lastVal=="null"||lastVal==null) {
		prompt();
		showAlert();
		$(".successText").html("请选择答案");
		$(".btns").html('<img src="img/affirm.png" alt="" onclick="Closethis()">');	
	}else{
		var liLength=$("#textList li").length;
		for (var i = 0; i < liLength; i++) {
			var oldId=$("#textList li").eq(i).attr("wordId");
			if (lastId==oldId) {
				$('#textList li[wordId='+lastId+']').removeClass("startHidden");
				$(".startText li:last").remove();
				$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');	
			}
		}
	}
}

//结算答题获得的流量
function settl(){
	showAlert3();
	var url="/weixin/poetry/accountFlow";
	$.post(url,{"historyId":historyId},function (data){
		if (data.status == 1 && data.code == 1) {
			resultFlow=data.resultFlow;
			$(".settl span").html(resultFlow);
		}
	});
}


//倒计时
function Time(){
	if (t==0) {
		t=100;
	}else{ 
		t--;
		$(".countdown").html(t+'S');
		if (t==0) {    // 倒计时结束没有回答正确  
			prompt2();
			$(".success").css({"margin-top":"0px"});
			showAlert2();
			$(".btns img:last").css("display","none");
			$(".successText").html("");
			$(".btns img:first").attr("onclick","Closethis()");
		}
		time2=setTimeout(function(){
			Time();
		},1000);
	}
}	


//调用confing
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

//关闭右上角分享
function closeShare(){
	wx.ready(function(){
		console.log("进入ready");
		wx.checkJsApi({
			jsApiList:['hideOptionMenu'],
			success: function (res) {
				console.log("隐藏右上角分享："+JSON.stringify(res));
			}
		});
		wx.hideOptionMenu();   //微信隐藏右上角菜单接口
	});
}


function over(){
	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/game.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
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

//关闭当前弹框
function Closethis(){
	hideAlert();
}
