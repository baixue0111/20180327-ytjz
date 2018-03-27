/**
 * Created by mysheng on 2017/5/12.
 */

$(function(){
	model();
})
var code,openID_value,openId,id;
function orderImmediately(){
	code=GetQueryString('code');  //获取code
	getOpenId();//获取openid
	
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();   //loading
}
//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

   //获取openID
function getOpenId(){
	var oi=$.cookie('openID_value');  
    if(oi==null||oi==""||oi==undefined||oi=="undefined"){  	//先判断openid是否为空，为空时执行这个函数  
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
					getuserInformation();  //查询是否绑定
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
		$("#loading").hide();
       	openID_value=$.cookie('openID_value');
       	getuserInformation();
    }
    
}
//获取用户信息
function getuserInformation(){
	var url="/weixin/auth/userInfo";
	openID_value=$.cookie('openID_value'); //获取openId值(cookie)
	$.post(url,{"openId":openID_value},function(data){
		if (data.status == 1 && data.code == 1) {
			 //弹出层隐藏
            $("#loginMask").show();
            $("#loading").hide();
			var focusOn=data.userInfo.subscribe;
			if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
               bing();
			}else if(focusOn == 0){
              	$("#notConcern").show();  //未关注提醒
			}
		}
	})
}

//关闭未关注
function follow_close(){
	$("#notConcern").hide();
    $('#loginMask').hide(); 
}
//查询微信用户是否绑定
function bing(){
    var url = "/weixin/auth/isBind";  
    $.post(url,{"openId":$.cookie('openID_value')},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){
				var getphone=data.phone;
            	$.cookie("getphone",getphone);
            	rderPage();  //弹出订购页面
            }else{
                loginBinding();  //弹出绑定页面  绑定微信号
                $("#loginMask").show();
                $("#login_binding").show();
            }
        }
    } )
}
/**********微信用户绑定*********************/
//验证码
function validateInfo(btn){
    var url="/weixin/auth/send";
    var phone= $("#login_phone").val();
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;
    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号!");
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

                $('#errorMessage').html(data.message);
            }

        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}


//电信用户绑定
function binding(){
    var url='/weixin/auth/bind';
    var phone= $("#login_phone").val();
    var validateCode=$('#verification').val();
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;

    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号！");
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
            	 $('#header').hide();
            	 $.cookie("getphone",phone);
                var str ='<p class="succ"><span style="color:red">恭喜您！</span>获得100棒豆（1棒豆=1M省内流量），棒豆可在本公众号上随时兑换成流量，点击微信菜单“我的棒豆”即可进入兑换页面。</p>'+
						'<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                $('#login_successMessage .add').html(str);
//              gameTimes();
            }else if(data.code==1&&data.status==2){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('#errorMessage').html(data.message);
            }

        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
//非贵州电信用户绑定
function Notdx(){
    var url='/weixin/auth/bind';
    var phone= $("#login_phone2").val();
    if(phone==""||phone==null){
        $('#errorMessage2').html("请输入正确手机号！");
        return;
    }
    var reg = /^1[34578]\d{9}$/;
        reg2 = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage2').html("请输入正确的手机号！");
        return;
    }

    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":$.cookie('openID_value'),"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	 $('#header').hide();
                var str ='<p class="succ"><span style="color:red">恭喜您！绑定成功，感谢您的关注！</p>'+
						'<img class="login_queding" onclick="loginColse()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                $('#login_successMessage .add').html(str);
            }else if(data.code==1&&data.status==2){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('#errorMessage2').html(data.message);
            }
        },
        error:function(){
            $('#errorMessage2').html("服务器连接失败！");
        }
    });
}
/***************** 微信绑定弹框********************/
function loginBinding(){
	var str='<div id="header">'+
               ' <h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
            '</div>'+
            '<div id="login_successMessage">'+
                '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
                '<div class="add">'+
                    '<ul id="tabcon">'+
                    '<li id="li1" class="show">'+
                        '<div id="Li-con1">'+
                            '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone" placeholder="请输入手机号" onfocus="bindingClearError()"></p>'+
                            '<p class="yzm_p"><input type="text" id="verification" placeholder="请输入验证码" onfocus="bindingClearError()"><input type="button" id="login_text" onclick="validateInfo(this)" value="获取"></p>'+
                            '<p id="errorMessage"></p>'+
                            '<p id="sub_btn"><img src="images/sub.png" alt="" onclick="binding()"></p>'+
                            '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                        '</div>'+
                    '</li>'+
                    '<li id="li2">'+
                        '<div id="Li-con2">'+
                            '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone2" placeholder="请输入手机号" onfocus="bindingClearError2()"></p>'+
                            '<p id="errorMessage2"></p>'+
                            '<p id="sub_btn2"><img src="images/sub.png" onclick="Notdx()"></p>'+
                            '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                        '</div>'+
                    '</li>'+
                    '</ul>'+
                '</div>'+
            '</div>';
   	$("#login_binding").html(str);
}
//  绑定绑定tab切换
function Tab(param){
    var header=document.getElementById('header');
    var h1=document.getElementById('h11');
    var h2=document.getElementById('h12');
    var li1=document.getElementById('li1');
    var li2=document.getElementById('li2');


    var h1a=document.getElementById('h1'+param);
    var lia=document.getElementById('li'+param);

    h1.className='';
    h2.className='';
    li1.className='';
    li2.className='';

    h1a.className='select';
    lia.className='show';

    if (param==2) {
        $("#title").html("非贵州电信用户不能赠送100棒豆！");
    }else if (param==1) {
        $("#title").html("绑定手机号即送100棒豆！");
    }
    
}
//错误消息提示
function error(message){
    $("#loginMask").show();
    $("#login_binding").show();
    $('#header').hide();
    $('#login_successMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏 绑定模态框
function closeLogin(){
    $("#loginMask").hide();
    $("#login_binding").hide();
    if(wait!=60)wait=0;
}
//清空错误提示框的内容
function bindingClearError(){
    $('#errorMessage').html("");
}
function bindingClearError2(){
    $('#errorMessage2').html("");
}
//关闭
function loginColse(){
	$("#login_binding").hide();
	$("#loginMask").hide();
	
}
function guab(){
	$("#login_binding").hide();
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



//订购页面提示
function rderPage(){
    login();
    $("#loginMask").show();
    $("#login").show();
    if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
    getphone =$.cookie("getphone");
//	console.log(typeof(getphone))  // string  字符串
    if(getphone==""||getphone==null||getphone==undefined||getphone=="undefined"){
        $("#phoneNum1").val('');    //么有绑定的清空
    }else{
        $("#phoneNum1").val(getphone);// 如果已经绑定了，兑换给自己       就默认手机号码
    }
}
/*关闭登录框*/
function login_gn(){
    $("#loginMask").hide();
    $("#login").hide();
    clearInterval(timerset);
}

//订购模态框
function login(){
	var loginStr='<div id="logink">'+
		    			'<p><input class="input1" name="phoneNum2" id="phoneNum1" placeholder="请输入您的手机号"  onfocus="clearError()"/></p>'+
		    			'<p><input class="input1" name="phoneNum2" id="phoneNum2" placeholder="请输入要赠送的手机号"  onfocus="clearError()"/></p>'+
		    			'<p><input class="input1" name="phoneNum2" id="phoneNum3" placeholder="再次输入赠送的手机号"  onfocus="clearError()"/></p>'+
		    			'<p>'+
		    				'<input class="input2"name="validate" id="validate" placeholder="请输入验证码"  onfocus="clearError()"/>'+
		    				'<input class="input3" type="button" value="获取" id="login1_yzm" onclick="login_validateInfo()">'+
		    			'</p>'+
		    			'<div id="messages"></div>'+
		    		'</div>'+
		    		'<div id="queding"><button class="qued" onclick="loginInfo()">立即订购</button></div>'+
		    	'</div>'+
		    	'<div id="login_gn" onclick="login_gn()"></div>';
	$("#login").html(loginStr);
}
function clearError(){
    $('#messages').html("");
}
 //是否重复订购流量
function login_validateInfo(){
	$("#login1_yzm").removeAttr("onclick"); 
    var url="/activity/fiveTwoZeroorder/reOrder";
    var orderPhone= $("#phoneNum1").val();
    var phone= $("#phoneNum2").val();
    var phone2= $("#phoneNum3").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(orderPhone))) {
        $('#messages').html("对不起你输入的非电信号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    if (!reg.test($.trim(phone))) {
        $('#messages').html("赠送人非电信号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    if (phone!=phone2) {
        $('#messages').html("两次输入的号码不一致！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    var pram={};
    pram["orderPhone"]=orderPhone;
    pram["phone"]=phone;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
			if(data.code==1&&data.status==2){
					$("#loginMask").show();
					$("#repeatOrder").show();
					$("#login").hide();	
			}else if(data.code==1&&data.status==0){
				$('#messages').html(data.message);
				$("#login1_yzm").attr("onclick","login_validateInfo();");
			}else if(data.code==1&&data.status==1){
				validaof();
			}
        },
        error:function(){
            $('#messages').html("服务器连接失败！");
			$("#login1_yzm").attr("onclick","login_validateInfo();");
            
        }
   });
}
//确定重复订购
function repeatorderh(){
	$("#repeatOrder").hide();
	$("#login").show();
	validaof();
	if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
}
//不可重复订购
function releatcolse(){
	$("#repeatOrder").hide();
	$("#login").hide();
	$("#loginMask").hide();
	clearInterval(timerset);
}
/*发送验证码*/
function validaof(btn) {
    var url="/activity/fiveTwoZeroorder/send";
    var orderPhone= $("#phoneNum1").val();
    var phone= $("#phoneNum2").val();
    var phone2= $("#phoneNum3").val();
   	var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(orderPhone))) {
        $('#messages').html("对不起你输入的非电信号！");
        return;
    }
    if (!reg.test($.trim(phone))) {
        $('#messages').html("赠送人非电信号！");
        return;
    }
    if (phone!=phone2) {
        $('#messages').html("两次输入的号码不一致！");
        return;
    }
    var pram={};
    pram["orderPhone"]=orderPhone;
    pram["phone"]=phone;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	 login_validat();
            }else{
            	$('#messages').html(data.message);
            	$("#login1_yzm").attr("onclick","login_validateInfo();");
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
//获取倒计时
var timer;
var timerset=null;
var seads;
function login_validat(){
	timer = 60;
	seads=timer;
	$("#login1_yzm").val(timer+"s");
	timerset= setInterval(function() {
	    Countdown();
	}, 1000);
}
function Countdown() {
	console.log($("#login1_yzm").val())
    if (seads != 0) {
        seads --;
       $("#login1_yzm").val(seads+"s");
    }
    else if(seads == 0){ 
		$("#login1_yzm").attr("onclick","login_validateInfo();");
    	$("#login1_yzm").val("获取");
    	clearInterval(timerset);
    }else if($("#login1_yzm").val()=="获取"){
    	$("#login1_yzm").attr("onclick","login_validateInfo();");
    }
    else{
    	clearInterval(timerset);
    }
}
/*订购*/
function loginInfo() {
    var url="/activity/fiveTwoZeroorder/order";
    var orderPhone= $("#phoneNum1").val();
    var phone= $("#phoneNum2").val();
    var phone2= $("#phoneNum3").val();
    var validateCode =$("#validate").val();
    var orderOpenId=$.cookie('openID_value');
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(orderPhone))) {
        $('#messages').html("对不起你输入的非电信号！");
        return;
    }
    if (!reg.test($.trim(phone))) {
        $('#messages').html("赠送人非电信号！");
        return;
    }
    if (phone!=phone2) {
        $('#messages').html("两次输入的号码不一致！");
        return;
    }
    if(validateCode ==""||validateCode ==null){
        $('#messages').html("请输入验证码！");
        return;
    }
   
    var pram={};
    pram["orderPhone"]=orderPhone;
    pram["phone"]=phone;
    pram["share"]="";
    pram["orderOpenId"]=orderOpenId;
    pram["validateCode"]=validateCode;
    $("#queding").html('<button class="qued"  onclick="errorClick();" >抢 购 中...</button></div>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	 $("#queding").html("");
                $('#logink').html('<div id="successful"><span style="color: #fb2f8c;">恭喜您,</span>成功为'+phone2+'订购520M省内流量,系统将在24小时内为您受理,受理结果将通过短信进行告知.感谢您的参与!<div>');            
            }else{
            	$('#messages').html(data.message);
                $("#queding").html('<button class="qued"  onclick="loginInfo()" >立即订购</button>');
            }
        },
        error:function(){
            $('#messages').html("服务器连接失败！");
            $("#queding").html('<button class="qued"  onclick="loginInfo()"> 立即订购</button>');

        }
    });
}
function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
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
					jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				//分享给朋友圈
				wx.ready(function(){ 
					wx.onMenuShareTimeline({
                        title: '中国电信贵州加油站', // 分享标题
                        link:'http://gz2.mobicloud.com.cn/active/gz520/loading.html',
		    			imgUrl: 'http://gz2.mobicloud.com.cn/active/gz520/images/fx.jpg', // 分享图标
					    success: function () { 
					    	console.log(1111)
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
					  	title: '中国电信贵州加油站', // 分享标题
					  	link:'http://gz2.mobicloud.com.cn/active/gz520/loading.html',
		    			imgUrl: 'http://gz2.mobicloud.com.cn/active/gz520/images/fx.jpg', // 分享图标
					    desc: "爱从告白开始，送Ta520M流量",//摘要,如果分享到朋友圈的话，不显示摘要。
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
				});
				
            }  	
        }   
	})
	
}