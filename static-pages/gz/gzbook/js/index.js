/**
 * Created by hsgeng on 2017/7/18.
 */

//电子书样品展示
sample = function(){
	window.location.href='sample.html';
	share();
}

//领取优惠券
coupon = function(){
	window.location.href='https://ark.xinshu.me/pages/coupon/?coupon=eyJwcmljZSI6MTUsImV4cGlyZUF0IjoiMjAx%20Ny0wOC0zMVQyMzo1OSIsImluc3RydWN0aW9uIjoiJUU2J%20Tg5JUFCJUU3JUEwJTgxJUU1JTg1JUIzJU%20U2JUIzJUE4JUU1JTg1JUFDJUU0JUJDJTk3JUU1JThGJUI3JUVGJUJDJ%20ThDJUU1JTg1JThEJUU4JUI0%20JUI5JUU5JUEyJTg2JUU1JThGJTk2JUU1JUJFJUFFJUU0JUJGJUExJUU0JUI5JUE2J%20UU3JTk0JUI1JU%20U1JUFEJTkwJUU3JTg5JTg4JTBBJUU0JUI4JThCJUU1JThEJTk1JUU2JTk3JUI2JUU4JUJFJTkzJ%20UU1%20JTg1JUE1JUU0JUJDJTk4JUU2JTgzJUEwJUU3JUEwJTgxJUVGJUJDJThDJUU1JThEJUIzJUU1JThGJUF%20GJUU1J%20Tg3JThGJUU1JTg1JThEJUU3JTlCJUI4JUU1JUJBJTk0JUU5JTg3JTkxJUU5JUEyJTlEIiwic%203RhcnQiOiIyMDE3L%20TA3LTAxVDAwOjAwIiwibWF4RGlzY291bnQiOjAuODUsInFyY29kZSI6Imh0dHB%20zOi8vbXAud2VpeGluLnFxLmNvb%20S9jZ2ktYmluL3Nob3dxcmNvZGU/dGlja2V0PWdRSFQ4RHdBQUFBQ%20UFBQUFBUzVvZEhSd09pOHZkMlZwZUdsdUxuR%20nhMbU52YlM5eEx6QXljak5xWkVWb1lsZGllR1V4TUR%20Bd01IY3dOMW9BQWdTWnhsMVpBd1FBQUFBQSJ9';
	share();
}

//我的订单
myOrder = function(){
	window.location.href='http://url.cn/4ANuFPl';
	share();
}

//增加魅力值  分享提示
charm = function(){
	$("#login").show();
	$("#loginMask").show();
	$(".succes").html('<p class="succesp">点击右上角...按钮邀请好友点赞增加魅力值</p>');
	share();
}

//关闭模态框
close = function(){
	$("#login").hide();
	$("#loginMask").hide();
	$(".succes").html(""); 
}

var code,productId,openID_value,phone,openId,id;
$(function(){
	model();
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
    drawHistory();
    JudgeTime();   //活动时间
})
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//获取openId 
getOpenId = function(){
	var oi=$.cookie('openID_value');  
    if(oi==null||oi==""||oi==undefined){  	//先判断openid是否为空，为空时执行这个函数  
        var url='/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: {"code":code},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){          	
                $('#loginMask').hide();  //弹出层隐藏
				$("#loading").hide();		//loading隐藏
                if(data.status==1&&data.code==1){
                    openID_value=data.authInfo.openId;
					$.cookie("openID_value",openID_value);//把openid储存到cookie中
					bing();
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
		$("#loading").hide();
       	openID_value=$.cookie('openID_value');
       	bing();
    }
    
}
//查询微信用户是否绑定
function bing(){
    var url = "/weixin/auth/isBind";  
    $.post(url,{"openId":$.cookie('openID_value')},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){
				var getphone=data.phone;
            	$.cookie("getphone",getphone);
            }else{
   				$("#loginMask").show();
                $("#denglu").show();
                denglu();
            }
        }
    } )
}
//获取验证码
function validate(btn){
    var url="/weixin/auth/send";
    var phone= $("#deng_phone").val();
    if(phone==""||phone==null){
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;

    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号!");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data:{"phone":phone,"openId":$.cookie('openID_value')},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn)
            }else{
                $('.login_success').html(data.message);
            }

        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });
}


//电信用户绑定
function binding(){
	var url='/weixin/auth/bind';
    var phone= $("#deng_phone").val();
    var validateCode=$('#deng_yzm').val();
    if(phone==""||phone==null){
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":$.cookie('openID_value'),"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功，获得100棒豆（1棒豆=1M省内流量）！</p>'+
						'<img class="login_queding" onclick="closeWin()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
                $('#deng_successMessage').html(sustr);
            }else{
                $('.login_success').html(data.message);
            }
        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });
}
closeWin = function(){
	$("#loginMask").hide();
    $("#denglu").hide();
}

//绑定弹框
function denglu(){
	var str1='<div>'+
				'<div class="login_title">贵州电信用户绑定</div>'+
			'</div>'+
			'<div id="deng_successMessage">'+
				'<div style="color:red;font-size:0.3rem;">贵州电信绑定即送100棒豆</div>'+
				'<input type="text" id="deng_phone" placeholder="请输入手机号" onfocus="clearError()">'+
		        '<input type="text" id="deng_yzm" placeholder="请输入验证码" onfocus="clearError()">'+
		        '<input type="button" id="deng_text" onclick="validate(this)" value="获取">'+
				'<div class="login_success"></div>'+
				'<div><img src="img/sub.png" class="login_img" onclick="binding()"/></div>'+
				'<div class="login_zan" onclick="closeWindow()">暂不绑定</div>'+			
			'</div>';
	$("#denglu").html(str1);
}

//清除提示内容
clearError = function(){
	 $(".login_success").html("");
	 
}

//判断是否是  首次生成二电子书
generate = function(){
	var url='/weixin/e_book/isReg';
	var phone=$.cookie('getphone');
	var param={};
	param["phone"]=phone;	
	$.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
	        	if(data==false){
	        		generateis();
	        	}else{
	        		loginYes();
	        	}
	        }
	})        
}
//生成电子书消耗绑定     确认是否生成
generateis= function(){
	$("#login").show();
	$("#loginMask").show();
	var str1='<p class="succesp">生成个人朋友圈专属电子书您将消耗10棒豆，是否继续？</p>'+
			'<div class="judge"><img class="loginYes" onclick="loginYes()" src="img/yes.png"/><img class="loginNo" onclick="closelk()" src="img/no.png"/></div>';
	$(".succes").html(str1); 		
}

//确定生成电子书
loginYes = function(){
	$("#loading1").show();  //生成过程中添加  loading
	var url='/weixin/e_book/generate';
	var openId=$.cookie('openID_value');
	var phone=$.cookie('getphone');
	var param={};
	param["phone"]=phone;	
	param["openId"]=openId;	
	$.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
	        	if(data.code==1&&data.status==1){
	        		$("#loading1").hide();
	        		$("#login").hide();
					$("#loginMask").hide();
	        		window.location.href='https://ark.xinshu.me/pages/ad-landing-2';
	        	}else{
	        		$("#loading1").hide();
	        		$("#login").show();
					$("#loginMask").show();
					$(".succes").html('<p class="succesp">'+data.message+'</p>');
	        	}
	        }
	})        
}
closelk = function(){
	$("#loginMask").hide();
    $("#login").hide();
}
//榜单
drawHistory = function(){
	var url='/weixin/e_book/top';
	$.post(url,function(data){
        var jsonTop=data.top;
        if (jsonTop == "" || jsonTop == null || jsonTop == undefined) {
        		$("#history").html('<p style="font-size:0.24rem;text-align: center;margin-top:20%;">暂无排行榜，敬请期待 ...</p>');
        }else{		
			var str1='<li class="com" style="display: none;"><span></span><span></span><span></span></li>';
			$("#history ul").html(str1);
            $.each(jsonTop,function(i,item){
            	var a=[]; //定义一个空数组
					a[0]=item.PHONE;
					for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    }else if(a[i]!=null){
//					    	var times=item.DRAW_TIME;
//					    	var timess=times.substring(0,10);
					    	var phone =a[0].substring(0,3)+"****"+a[0].substring(7,11);
					    	var jide=item.CHARM_VALUE;
					    	var historystr='<li class="com"><span></span><span>'+phone+'</span><span>'+jide+'</span></li>';
							$("#history ul").append(historystr);
					    }
					}		
           })
            var len = $('#con1 li').length;
			        for(var i = 0;i<len;i++){
			            $('#con1 li:eq('+i+') span:first').text(i);
			}
	        var lens = $('#con2 li').length;
	        for(var i = 0;i<lens;i++){
	            $('#con2 li:eq('+i+') span:first').text(i);
			}
        }
    })
}
/*
 * 中奖名单滚动
 */
var wait = 60;
var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 50;
area.scrollTop = 0;
con2.innerHTML = con1.innerHTML;
function scrollUp(){
    if(area.scrollTop >= con1.scrollHeight) {
        area.scrollTop = 0;
    }else{
        area.scrollTop ++;
    }
}
var myScroll = setInterval("scrollUp()",speed);
area.onmouseover = function(){
    clearInterval(myScroll);
}
area.onmouseout = function(){
    myScroll = setInterval("scrollUp()",speed);
}
//我的点赞好友
friends=function(){
	var openId=$.cookie('openID_value');
	share();
//var	openId = "a";
	window.location.href='friends.html?openId='+openId+'';
}

//记录
share= function(){
	var url='/weixin/e_book/share'
	var openId=$.cookie('openID_value');
	var phone=$.cookie('getphone');
	var param={};
	param["phone"]=phone;	
	param["openId"]=openId;	
	$.ajax({
		type:"post",
		url:url,
		data: JSON.stringify(param),
		dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	
        }
	})     
}

//分享
function model(){
	var url = '/weixin/model/wxConfigSignature'; 
	var helpOpenId=$.cookie('openID_value');
	var localUrl = location.href.split('#')[0];  //获取当前页面的链接地址
	$.ajax({
		type: 'get',
        url: url,
        data:{"localUrl":localUrl},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	var dat =data.wxConfigSignatureData;
				wx.config({
//				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: dat.appId, // 必填，公众号的唯一标识
				    timestamp:dat.timestamp , // 必填，生成签名的时间戳
				    nonceStr: dat.noncestr, // 必填，生成签名的随机串
				    signature: dat.signature,// 必填，签名，见附录1
					jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				//分享给朋友圈
				wx.ready(function(){ 
					wx.onMenuShareTimeline({
					     title: '帮好友将微信朋友圈打印成书', // 分享标题
					     link:'http://gz2.mobicloud.com.cn/active/gzbook/loading.html?helpOpenId='+helpOpenId+'',
		    			imgUrl: 'http://gz2.mobicloud.com.cn/active/gzbook/img/dzh.jpg', // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					        share();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
	//				分享给朋友
					wx.onMenuShareAppMessage({
					  	title: '帮好友将微信朋友圈打印成书', // 分享标题
					  	link:'http://gz2.mobicloud.com.cn/active/gzbook/loading.html?helpOpenId='+helpOpenId+'',
		    			imgUrl: 'http://gz2.mobicloud.com.cn/active/gzbook/img/dzh.jpg',// 分享图标
					    desc: "匆匆那些年，你是否有很多故事留在了朋友圈？现在能将它们一键生成电子书了",//摘要,如果分享到朋友圈的话，不显示摘要。
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					        share();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
				});
				
            }  	
        }   
	})
	
}
//如果不关注不能进入页面
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


//获取验证码倒计时
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value =wait +"s";
        wait--;
        setTimeout(function () {
            buttonTime(btn);
        }, 1000)
    }
}

//活动时间 
function JudgeTime(){
	/****************第一期*************/
//将计划开始时间转成以秒为单位：
    var planStartTime = "2017-7-25";
    var startTime = new Array();
    startTime = planStartTime.split('-');
    planStartTime = Date.UTC(parseInt(startTime[0]), parseInt(startTime[1]), parseInt(startTime[2]));
//将计划结束时间转成以秒为单位：
    var planStopTime = "2017-8-10";
    var stopTime = new Array();
    stopTime = planStopTime .split('-');
    planStopTime = Date.UTC(parseInt(stopTime[0]), parseInt(stopTime[1]), parseInt(stopTime[2]));
    
    
    /****************第二期*************/
 //将计划开始时间转成以秒为单位：
    var plStarTime = "2017-8-11";
    var startTimes = new Array();
    startTimes = plStarTime.split('-');
    plStarTime = Date.UTC(parseInt(startTimes[0]), parseInt(startTimes[1]), parseInt(startTimes[2]));
//将计划结束时间转成以秒为单位：
    var plStopTime = "2017-8-25";
    var stopTimes = new Array();
    stopTimes = plStopTime .split('-');
    plStopTime = Date.UTC(parseInt(stopTimes[0]), parseInt(stopTimes[1]), parseInt(stopTimes[2]));
   
   
//将当前系统时间转化成以秒为单位：
    //获取当前时间
    var nowDate = new Date();
    //当前年
    var nowYear = nowDate.getFullYear();
    //当前月，记得要加1
    var nowMonth = (nowDate.getMonth() + 1);
    //当前日
    var nowDay = nowDate.getDate();
    nowTime = Date.UTC(nowYear,nowMonth,nowDay);
//判断：如果当前系统时间大于等于开始时间以及小于等于结束时间则登记成功
	if(nowTime<planStartTime){
		$(".times").html('活动尚未开始,敬请期待！');
	}else if (nowTime >= planStartTime && nowTime <= planStopTime) {
		$(".times").html('第一期2017.7.25-2017.8.10');
    } else if(nowTime>=plStarTime && nowTime <= plStopTime){
		$(".times").html('第二期2017.8.11-2017.8.25"');
    }else if(nowTime>plStopTime){
    	$(".times").html('活动已经结束，感谢关注！');
    }
}