/**
 * Created by mysheng on 2017/5/12.
 */
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
//            	$("notConcern").show();  //未关注提醒
				bing();			
			}
		}
	})
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
               rderPage(); 
            }
        }
    } )
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
            	 $("#login1_yzm").attr("onclick","login_validateInfo();");
            }else{
            	$('#messages').html(data.message);
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
    var share="share";
    var pram={};
    pram["orderPhone"]=orderPhone;
    pram["phone"]=phone;
    pram["share"]=share;
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
                $('#logink').html('<div id="successful" style="font-size:0.3rem"><span style="color: #fb2f8c;">恭喜您,</span>成功为'+phone2+'订购520M省内流量,系统将在24小时内为您受理,受理结果将通过短信进行告知.<span style="color:red">长按扫描下方二维码，关注“中国电信贵州加油站”即可获得520棒豆（1棒豆=1M）<img style="width:32%;margin-left:33%" src="images/ew.jpg"/></span>');            
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