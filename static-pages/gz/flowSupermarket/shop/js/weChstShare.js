/**
 * Created by hsgeng on 2017/5/2.
 */
var code,productId,openID_value,openId,id,getype;
function order(gettype){
    getype=gettype;
    console.log(getype)
    $('#loginMask').show();  //弹出层显示
    $("#loading").show();
    code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
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
                    getuserMsg();  //查询微信是否绑定
                }
            }
        })
    }else{
        openID_value=$.cookie('openID_value');
        $('#loginMask').hide();  //弹出层隐藏
        $("#loading").hide();
        getuserMsg();  //查询微信是否绑定
    }

}
//获取用户信息
function getuserMsg(){
	var url="/weixin/auth/userInfo";
	openID_value=$.cookie('openID_value'); //获取openId值(cookie)
	$.post(url,{"openId":openID_value},function(data){
		if (data.status == 1 && data.code == 1) {
			 //弹出层隐藏
			$("#loading").hide();
			var focusOn=data.userInfo.subscribe;
			if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
				bing();
			}else if(focusOn == 0){
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
                tyoa();
            }else{
            	tyoa();
            }
        }
    } )
}


//出游七天包
function login1(){
    var login1Str='<div class="login1_close" onclick="login1_close()"></div>'+
        '<div id="login1_succes">'+
        '<p class="login1_top">'+
        '<input type="text" placeholder="请输入手机号" id="login1_phone" onfocus="clearError()">'+
        '</p>'+
        '<p class="login1_bottom">'+
        '<input type="text" placeholder="请输入验证码" id="login1_validate" onfocus="clearError()">'+
        '<input type="button" value="获取" id="login1_yzm" onclick="login_validateInfo(this)">'+
        '</p>'+
        '<div id="login1_errorMsg"></div>'+
        '</div>'+
        '<div id="login1Button">'+
        '<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>'+
        '</div>';
    $("#login1").html(login1Str);
}
var type;
function tyoa(){
	type =getype;
	$("#login1").show();
    login1();
    if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
    $('#loginMask').show();
    getphone =$.cookie("getphone");
//	console.log(typeof(getphone))  // string  字符串
    if(getphone==""||getphone==null||getphone==undefined||getphone=="undefined"){
        $("#login1_phone").val('');    //么有绑定的清空
    }else{
        $("#login1_phone").val(getphone);// 如果已经绑定了，兑换给自己       就默认手机号码
    }
}
function login1_close(){
    $("#login1").hide();
    $('#loginMask').hide();
    clearInterval(timerset);
}
 //是否重复订购流量
function login_validateInfo(btn){
	$("#login1_yzm").removeAttr("onclick"); 
    var url="/activity/singleorder/reOrder";
    var phone= $("#login1_phone").val();
    if(phone==""||phone==null){
        $('#login1_errorMsg').html("请输入手机号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
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
				$("#login1").hide();	
			}else if(data.code==1&&data.status==0){
				$('#login1_errorMsg').html(data.message);
				$("#login1_yzm").attr("onclick","login_validateInfo();");
			}else if(data.code==1&&data.status==1){
				singleorder();
			}
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
//确定重复订购
function repeatorder(){
	$("#repeatOrder").hide();
	$("#login1").show();
	singleorder();
	if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
}
//不重复订购
function releatcolse(){
	$("#repeatOrder").hide();
	$("#login1").hide();
	$("#loginMask").hide();
	clearInterval(timerset);
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
//	console.log($("#login1_yzm").val())
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
    	clearInterval(timerset);  //清除计时器
    }
}
// 出游季获取验证码
function singleorder() {
    var url="/activity/singleorder/send";
    var phone= $("#login1_phone").val();
    if(phone==""||phone==null){
        $('#login1_errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
        	if (data.code == 1 && data.status ==1) {
				login_validat();		
            }else {
                $('#login1_errorMsg').html(data.message);
                $("#login1_yzm").attr("onclick","login_validateInfo();");
            }

        },
        error:function(){
            $('#login1_errorMsg').html("服务器连接失败！");
        }
    });
}

/*订购*/
function login1_loginInfo() {
    var url="/activity/singleorder/order";
    var phone= $("#login1_phone").val();
    var validate =$("#login1_validate").val();
    var openId=$.cookie('openID_value');
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#login1_errorMsg').html("请输入验证码！");
        return;
    }
    var share="share";
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["type"]=type;
    pram["where"]="";
    pram["openId"]=openId;
    pram["share"]=share; //区分是不是订购的时候同时绑定
    $("#login1Button").html('<button id="login1_but" onclick="login1_errorClick()">抢购中...</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
        	if(data.code==1&&data.status==1){
        		var strr="";
				var douStr="";
	            if(type=='schoolOne'){
			    	strr="10元3天流量包";
			    	douStr="20";
			    }else{
			    	strr="20元7天流量包";
			    	douStr="30";
			    }
                $('#login1_succes').html('<p class="success"><span class="success3">恭喜您,</span>成功抢购'+strr+',系统将在24小时内为您受理,受理结果将通过短信进行告知.感谢您的参与!<span class="success3">同时您还获得'+douStr+'棒豆，可在公众号菜单“我的棒豆”中兑换成流量。</span></p>');
                $("#login1Button").html('<button id="login1_but" onclick="login1_que()">确定</button>');
        	}else{
        		$('#login1_errorMsg').html(data.message);
        		$("#login1Button").html('<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>');	
        	}
        },
        error:function(){
            $('#login1_errorMsg').html("服务器连接失败！");
            $("#login1Button").html('<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>');

        }
    });
}
//清空错误提示
function clearError(){
	$('#login1_errorMsg').html("");
}
//订购成功     点击确定关闭页面
function login1_que(){
    $("#login1").hide();
    $('#loginMask').hide();
    clearInterval(timerset);
}

//抢购中  不能再次点击进行订购
function login1_errorClick(){
    $('#login1_errorMsg').html("请别连续点击!");
    setTimeout(function(){
        $('#login1_errorMsg').html("");
    },2000);
}