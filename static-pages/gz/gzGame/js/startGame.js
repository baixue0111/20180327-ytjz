
var oldContent,list,historyId,id,t,resultFlow;
var intDiff = parseInt(300); //倒计时总秒数量
var timer1=null;
var time3=null;
var time5=null;
$(function(){
	Dyconfing();  //调用confing
	closeShare();
	prompt();
	question();
})

//1.进入游戏之后获取题目
var queIndex=0;
function question(){
	var url="/weixin/poetry/question";
		phone=$.cookie("phone");
	$.post(url,{"phone":phone},function(data){
		if (data.status == 1 && data.code == 1) {
			list=data.poetryList;

			historyId=data.historyId;
			id=data.poetryList[queIndex].id;
			t=data.poetryList[queIndex].limit_time;
			Time();  // 倒计时  //做完记得解开注释
			//console.log("poetryList==="+listLength);
			console.log("id==="+id);
			console.log("historyId==="+historyId);

			var poetry=data.poetryList[queIndex];
			oldContent=poetry.content;

			console.log("oldContent====="+oldContent);

				var quesLength=poetry.scrambled_content;
				for (var j = 0; j < quesLength.length; j++) {
					var str='<li onclick="inputClick(this);" wordId="'+j+'">'+quesLength.substr(j,1)+'</li>';
					$("#textList").append(str);	
				}
		}else {
			showAlert();
			$(".successText").html(data.message);
			$(".btns").html("");
		}
	})

}

//2.点击“下一题”
var newText="";
function submit(){
	//clearInterval(time3);//点击下一题的时候就清除 计时器
	console.log("queIndex===="+queIndex)
	liLength=$(".startText li").length;
	for (var i = 0; i < liLength; i++) {
		var startText=$(".startText li").eq(i).html();
		newText=newText+startText;
	}
		
	if (startText == "" ||startText==null) {
		showAlert();
		$(".successText").html("请您答完此题进入下一题！");
		$(".btns").html('<img src="img/affirm.png" alt="" onclick="Closethis()">');	
		$("#mask").click(function(){
			$("#mask").hide();
			$("#startShow").hide();
		})
	}else{
		clearInterval(time3);//点击下一题的时候就清除 计时器
		console.log(newText);
		var newContent=$.md5(newText);
		console.log(newContent);
		if (newContent==oldContent) {
			var url="/weixin/poetry/singleSubmit";
			$.post(url,{"historyId":historyId,"poetryId":id},function(data){
				if (data.status == 1 && data.code == 1) {
					queIndex++;
					console.log("queIndex===="+queIndex);
					console.log("list.length===="+list.length);

					if (queIndex<list.length) {
						$("#textList").html("");
						$(".startText").html("");
						newText="";
						
						id=list[queIndex].id;
						t=list[queIndex].limit_time;
						Time();  // 倒计时  
						console.log("id==="+id);
						console.log("historyId==="+historyId);

						var poetry=list[queIndex];
						oldContent=poetry.content;

						console.log("oldContent====="+oldContent);

						var quesLength=poetry.scrambled_content;
						for (var j = 0; j < quesLength.length; j++) {
							var str='<li onclick="inputClick(this);" wordId="'+j+'">'+quesLength.substr(j,1)+'</li>';
							$("#textList").append(str);	
						}
					}else{
						$(".startBtn img").eq(1).attr("src","img/submit.png");
						$(".startBtn img").eq(1).attr("onclick","settl();");
						newText="";
					}
				}
			})
		}else{
			clearInterval(time3); 
			showAlert2();
			//$(".closeAlert").css("display","none");   //做完记得解开注释
		}
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
				$('#textList li[wordId='+lastId+']').attr("onclick","inputClick(this)");	
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
			if (resultFlow==0) {
				$(".header").html("抱歉！");
				$(".settl").html("您未答对题目，暂无流量红包...");
				$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
			}else{
				$(".settl span").html(resultFlow);
				clearInterval(time3);
			}
		}else{
			showAlert();
			$(".successText").html(data.message);
			$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
		}
	});
}

//暂无流量结算时则返回首页
// function closeWindow(){
// 	window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/game.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
// }

//点击领取流量弹出确认领取
function receive(){
	showAlert();
	$(".successText").html("确认领取流量红包？");
	$(".btns-first").attr("src","img/affirm.png");   //确认按钮
	$(".btns-second").attr("src","img/no.png");   //暂不按钮

	$(".btns-first").attr("onclick","lqClick();");  //绑定领取方法
	$(".btns-second").attr("onclick","zblq();");  //绑定暂不领取方法
}

//点击“确认”按钮
function lqClick(){
	/*$("#mask").show();
    $("#loading").show();*/
    $(".btns-first").removeAttr('onclick');   //当用户点击确定领取时则移除点击事件
    
	var url="/weixin/poetry/flowGet";
		phone=$.cookie("phone");
	$.post(url,{"historyId":historyId,"flowGetPhone":phone},function (data){
		if (data.status == 1 && data.code ==1) {
			$("#loading").hide();
			showSuccess();
			$(".settl span").html(resultFlow);
		}else if(data.status == 2 && data.code ==1){           // 领取不成功
			$("#loading").hide();
			showError();
			$(".settl").html(data.message);
		}
	})
}

//点击“暂不”按钮弹出答题成功弹窗
function zblq(){
	showAlert3();
	$(".settl span").html(resultFlow);
}

//点击“送给好友”按钮
function shareApp(){
	$("#startShow").hide();
	$(".shareHelp").attr("src","img/red-shareApp.png");
	$(".shareHelp").show();
	showRight();  //给好友分享红包时显示右上角
}
//倒计时
function Time(){
	if (t==0) {
		t=100; //倒计时时间 从50s改成了100s
	}else{ 
		t--;
		$(".countdown").html(t+'S');
		if (t==0) {    // 倒计时结束没有回答正确 
			clearInterval(time3); 
			prompt2();
			$(".success").css({"margin-top":"0px"});
			showAlert2();
		}
		time3=setTimeout(function(){
			Time();
		},1000);
	}
}	

//点击结束游戏
function gameOver(){
	showAlert();
}

//求助好友
function helpFriend(){
	$("#startShow").hide();
	$("#mask").show();
	$(".shareHelp").show();
	failureShow();  // 分享好友答题时显示右上角
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
				jsApiList:['hideOptionMenu','checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'showMenuItems', 'hideMenuItems', 'showOptionMenu']
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

//显示微信右上角分享
function showRight(){
    wx.ready(function(){
	    console.log("显示右上角分享进入ready");
	    wx.checkJsApi({
	    	jsApiList:['showOptionMenu','onMenuShareAppMessage','onMenuShareTimeline'],
	    	success: function (res){
	    		console.log("显示右上角分享："+JSON.stringify(res));
	    	}
	    })
	    wx.showOptionMenu();   //微信显示右上角菜单接口
	    wx.onMenuShareTimeline({
	    	title: '“中国电信贵州加油站”春节流量红包',
	    	desc: ' 贵州电信用户关注“中国电信贵州加油站”后，即可领取好友转送的红包',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/redPackage.html?param='+historyId+','+resultFlow+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: 'http://gz.mobicloud.com.cn/active/gzGame/img/wxred.jpg',
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		$(".shareHelp").hide();
	    		$("#mask").show();
	    		$("#startShow").show();
	    		$(".header").html("分享成功！");
				$(".settl").html("");
				$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.onMenuShareAppMessage({
	    	title: '“中国电信贵州加油站”春节流量红包',
	    	desc:' 贵州电信用户关注“中国电信贵州加油站”后，即可领取好友转送的红包',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/redPackage.html?param='+historyId+','+resultFlow+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: 'http://gz.mobicloud.com.cn/active/gzGame/img/wxred.jpg',
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		$(".shareHelp").hide();
	    		$("#mask").show();
	    		$("#startShow").show();
	    		$(".header").html("分享成功！");
				$(".settl").html("");
				$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.hideMenuItems({
	    	menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:share:facebook']  //隐藏分享QQ，微博，QQ空间,FB
	    });
	    wx.showMenuItems({
	    	menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']  //显示分享到微信朋友和朋友圈
	    })
	    wx.error(function (res) {
			console.log(res);
		})
	})
}

//答题失败时求助好友
function failureShow(){
	wx.ready(function(){
	    console.log("显示右上角分享进入ready");
	    wx.checkJsApi({
	    	jsApiList:['showOptionMenu','onMenuShareAppMessage','onMenuShareTimeline'],
	    	success: function (res){
	    		console.log("显示右上角分享："+JSON.stringify(res));
	    	}
	    })
	    wx.showOptionMenu();   //微信显示右上角菜单接口
	    wx.onMenuShareTimeline({
	    	title: '“中国电信贵州加油站”玩游戏抢红包活动',
	    	desc: '您的好友请求帮助，关注“中国电信贵州加油站”即可参加，请在5分钟内完成',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/friendHelp.html?param='+historyId+','+id+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: encodeURI('http://gz.mobicloud.com.cn/active/gzGame/img/wxhelp.jpg'),
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		//alert("分享成功！");
	    		helpSuccess();
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.onMenuShareAppMessage({
	    	title: '“中国电信贵州加油站”玩游戏抢红包活动',
	    	desc:'您的好友请求帮助，关注“中国电信贵州加油站”即可参加，请在5分钟内完成',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/friendHelp.html?param='+historyId+','+id+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: encodeURI('http://gz.mobicloud.com.cn/active/gzGame/img/wxhelp.jpg'),
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		//alert("分享成功！");
	    		helpSuccess();
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.hideMenuItems({
	    	menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:share:facebook']  //隐藏分享QQ，微博，QQ空间,FB
	    });
	    wx.showMenuItems({
	    	menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']  //显示分享到微信朋友和朋友圈
	    })
	    wx.error(function (res) {
			console.log(res);
		})
	})
}



//求助好友分享成功时开始5分钟倒计时
function helpSuccess(){
	closeShare();  //关闭分享
	$(".shareHelp").hide();
	helpHistory();  //记录求助历史（答题本人求助成功后回调）
	showAlert2();
	$(".btns-second").hide();
	$(".header").html("好友作答中，请等待...");
	$(".successText p:first").html("");
	$(".successText p:first").css("text-align","center");
	$(".btns img:first").attr("onclick","overTime()");
	timerMinu(intDiff);
}

//结束倒计时
function overTime(){
	clearInterval(time3);
	clearInterval(time1);  //清除5分钟倒计时  
    clearInterval(time5);   // 清除5秒调用好友是否帮忙成功
    settl();
}

function over(){
	settl();
	//window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzGame/game.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}
//5分钟倒计时
function timerMinu(intDiff) {
  time1=setInterval(function () {
    var day = 0,
      	hour = 0,
      	minute = 0,
      	second = 0; //时间默认值
    if (intDiff > 0) {
      day = Math.floor(intDiff / (60 * 60 * 24));
      hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      // isHelpSuccess();  //检测好友是否回答正确
    }else{
    	clearInterval(time1);   //清除计时器(停止倒计时)
    	clearInterval(time5);   //清除计时器(停止倒计时)
    	$(".header").html("答题失败");
    	$(".successText p:first").html("好友未在规定时间范围内答对此题");
    	return;
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;

    $(".successText p:first").html(minute + ':' + second);
    intDiff--;
  }, 1000);

  time5=setInterval(function(){
  	isHelpSuccess();
  },5000);
}

//记录求助历史（答题本人求助成功后回调）
function helpHistory(){
	var url="/weixin/poetry/helpHistory";
	$.post(url,{"historyId":historyId,"poetryId":id},function (data){
		if (data.status == 1 && data.code == 1) {
			//alert(data.message);
		}
	})
}

//获取帮忙是否成功（答题方）
function isHelpSuccess(){
	var url="/weixin/poetry/isHelpSuccess";
	$.post(url,{"historyId":historyId,"poetryId":id},function (data){
		if (data.status == 1 && data.code == 1) {
			if (data.isHelpSuccess) {
				clearInterval(time1);
				clearInterval(time5);
				$(".header").html("好友答题成功");
				$(".successText").html("");
				$(".btns img:last").show();
				$(".btns img:last").attr("src","img/affirm.png");
				$(".btns img:last").attr("onclick","friendSuccess();");
			}else{
				//$(".header").html("好友帮助失败");
			}
		}
	})
}


//好友答题成功进入下一题
function friendSuccess(){
	$("#mask").hide();
	$("#startShow").hide();
	queIndex++;
	console.log("queIndex===="+queIndex);
	console.log("list.length===="+list.length);

	if (queIndex<list.length) {
		$("#textList").html("");
		$(".startText").html("");
		newText="";
		
		id=list[queIndex].id;
		t=list[queIndex].limit_time;
		Time();  // 倒计时  //做完记得解开注释
		console.log("id==="+id);
		console.log("historyId==="+historyId);

		var poetry=list[queIndex];
		oldContent=poetry.content;

		console.log("oldContent====="+oldContent);

		var quesLength=poetry.scrambled_content;
		for (var j = 0; j < quesLength.length; j++) {
			var str='<li onclick="inputClick(this);" wordId="'+j+'">'+quesLength.substr(j,1)+'</li>';
			$("#textList").append(str);	
		}
	}else{
		$(".startBtn img").eq(1).attr("src","img/submit.png");
		$(".startBtn img").eq(1).attr("onclick","settl();");
		newText="";
	}
}

//关闭当前弹框
function Closethis(){
	hideAlert();
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