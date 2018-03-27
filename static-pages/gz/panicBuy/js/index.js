//window.onload=function(){
//	document.onkeydown=function(){
//		var e=window.event||arguments[0];
//		if(e.keyCode==123){
//			return false;
//		}else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
//			return false;
//		}
//	};
//	document.oncontextmenu=function(){
//		return false;
//	}
//}
$(function(){
	model();
})
var code,productId,openID_value,phone,openId,id;
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
snapUp =function(){
	confirmOrder();
//	$("#login").show();
//	$("#loginMask").show();
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
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
            	confirm();
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
            	var sustr ='<p class="succ"><span style="color:red">恭喜您，</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>'+
						'<img class="login_queding" onclick="closeWindow()" src="images/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
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
				'<div><img src="images/sub.png" class="login_img" onclick="binding()"/></div>'+
				'<div class="login_zan" onclick="closeWindow()">暂不绑定</div>'+			
			'</div>';
	$("#denglu").html(str1);
}

//清除提示内容
clearError = function(){
	 $(".login_success").html("");
}

//关闭绑定框
closeWindow = function (){
	$("#denglu").hide();
	$("#loginMask").hide();
}



// 秒杀倒计时
/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
var date = new Date();
var time =date.pattern("yyyy-MM-dd hh:mm:ss");
var day=time.substring(8,10); //日
var hours=time.substring(11,13);//小时
var tEnd;
if(day%2 == 0){ //判断偶数
    if(hours >10 && hours<14){
        $(".countDown").html('<p>正在抢购中！</p>');
    }else{
    	var dates,twoTime;
    	if(hours>13){   //当天14点之前不让他加添加两天            倒计时 结束时间是当天的11点
			if (day==30){   // 判断每个月是多少天  ，如果7月30号 需要添加3天才能到下个月8月2号 偶数天
			    dates=addDay(3); //添加三天
			}else {
			    dates=addDay(2); //添加两天
			}
			twoTime=dates.pattern("yyyy-MM-dd hh:mm:ss");			
    	}else{
    		var date1 = new Date();
    		twoTime=date1.pattern("yyyy-MM-dd hh:mm:ss");	
    	}
    		var twoDay = twoTime.substring(0,4);  // 截取年分
			var twoDay1 = twoTime.substring(5,7); //截取月份
			var twoDay1s =twoDay1-1;    // 获取的月数会自动多1个月  ，所以要减1
			var twoDay2 = twoTime.substring(8,10);
			tEnd = new Date(twoDay,twoDay1s,twoDay2,11,00,00);  //结束时间
			setInterval(move,1);
    }
}else if(day%2==1){
    var dates;
    if (day==31){
        dates=addDay(2); //添加两天
    }else {
        dates=addDay(1); //添加一天
    }
    var oneTime=dates.pattern("yyyy-MM-dd hh:mm:ss");
    var oneDay = oneTime.substring(0,4);
    var oneDay1 = oneTime.substring(5,7);
    var oneDay1s =oneDay1-1;
    var oneDay2 = oneTime.substring(8,10);
    tEnd = new Date(oneDay,oneDay1s,oneDay2,11,00,00);
    setInterval(move,1);

}

//添加天数方法
function addDay(dayNumber, dates) {
    dates = date ? date : new Date();
    var ms = dayNumber * (1000 * 60 * 60 * 24)
    var newDate = new Date(dates.getTime() + ms);
    return newDate;
}

function move(){
    var tStart = new Date(); // 当前时间
//  console.log(tStart);
    var Time = tEnd - tStart;  //结束时间 - 当前时间 = 相差时间（用次数进行倒计时）;
    var Days = parseInt(Time/(1000*60*60*24));//整数
    var _Days = Time%(1000*60*60*24);
    //小时
    var Hours = parseInt(_Days/(1000*60*60));//整数
    var _Hours = _Days%(1000*60*60);
    //分
    var Minutes = parseInt(_Hours/(1000*60));
    var _Minutes = _Hours%(1000*60);
    //秒
    var Seconds = parseInt(_Minutes/(1000));
    var _Seconds = _Minutes%1000;
    //alert(122);
    $(".countDown").html('<p>'+Days+'天'+Hours+'小时'+Minutes+'分钟'+Seconds+'秒</p>');
}
//setInterval(move,1);

// 二次确认参加活动
function confirmOrder(){
	var loginStr = '<div class="confirmOrder">抢购1G省内3天包您将消耗50棒豆，是否继续</div>'+
				   '<div class="login_con"><span class="login_yes" onclick="buy()">是</span><span class="login_no" onclick="loginclose()">否</span></div>';
	$(".login_succe").html(loginStr);
	
}
confirm =function(){
	confirmOrder();
	$("#login").show();
	$("#loginMask").show();
}
//确定参加活动
buy = function(){
	var url = "/weixin/flowFlashSale/buy";
	//var openId="1003";
    var openId = $.cookie('openID_value');
	var phone = $.cookie("getphone");
	var param={};
	param["openId"]=openId;
	param["phone"]=phone;
	$("#loading1").show();
	$("#login").hide();
	$.ajax({
		url:url,
		type:'POST',
		data: JSON.stringify(param),
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
	    success: function(data){
	        $("#login").show();
	    	$("#loginMask").show();
	    	$("#loading1").hide();
	    	$(".login_succe").html(data.message);	
	    },
	    error:function(){
	    	$("#login").show();
	    	$("#loginMask").show();
	    	$("#loading1").hide();
	    	$(".login_succe").html("链接服务器失败！");	
	    	
	    }
	})        
}

//隐藏模态框
loginclose = function(){
	$("#login").hide();
	$("#loginMask").hide();
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

//分享
function model(){
	var url = '/weixin/model/wxConfigSignature'; 
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
					jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				//分享给朋友圈
				wx.ready(function (){ 
					wx.onMenuShareTimeline({
					    title: '中国电信贵州加油站', // 分享标题
					    link: 'http://gz.mobicloud.com.cn/active/panicBuy/share.html', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/panicBuy/images/sharttu.jpg', // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
	//				分享给朋友
					wx.onMenuShareAppMessage({
					    desc: "1G流量限时抢购，快来参加吧",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站',//分享卡片标题
					    link: 'http://gz.mobicloud.com.cn/active/panicBuy/share.html', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/panicBuy/images/sharttu.jpg', // 分享图标
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
					wx.onMenuShareQQ({
					    desc: "1G流量限时抢购，快来参加吧",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站',//分享卡片标题
					    link: 'http://gz.mobicloud.com.cn/active/panicBuy/share.html', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/panicBuy/images/sharttu.jpg', // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					       alert('分享成功');
					    },
					    cancel: function () { 
					       // 用户取消分享后执行的回调函数
					       alert('分享失败');
					    }
					});
					wx.onMenuShareQZone({
					    desc: "1G流量限时抢购，快来参加吧",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站',//分享卡片标题
					    link: 'http://gz.mobicloud.com.cn/active/panicBuy/share.html', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/panicBuy/images/sharttu.jpg', // 分享图标
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					       alert('分享成功');
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
				});
            }  	
        }   
	});	
}