var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.15625+'px';
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.15625+'px';
}

var code,productId,openID_value,phone,openId;
$(function(){
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    productId = $("#productIdTianji").val();  // 获取productId
    getOpenId();//获取openid
    login();  //弹出框
})
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//获取openId 
function getOpenId(){
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
                    bing(openID_value);   //绑定手机号
                    console.log(openID_value);
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
		$("#loading").hide();
       	openID_value=$.cookie('openID_value');
        bing(openID_value);   //绑定手机号
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
            	shouji();
            }else{
            	LoginBing();
            	$("#LoginBing").show();
                $("#loginMask").show();
            }
        }
    } )
}

//验证码
function validateInfodd(btn){
    var url="/weixin/auth/send";
    var phone= $("#phone").val();
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
        data:{"phone":phone,"openId":$.cookie("openID_value")},
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
    var phone= $("#phone").val();
    var validateCode=$('#yzm').val();
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
        data: {"phone":phone,"openId":$.cookie("openID_value"),"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                 $(".gban").show();
                $('#zsuccessMessage .add').html('<p class="success">恭喜您，绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>');
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
    var phone= $("#phone2").val();
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
        data: {"phone":phone,"openId":$.cookie("openID_value"),"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#zheader').hide();
                $(".gban").show();
                $('#zsuccessMessage .add').html('<p class="success">恭喜您！您已成功绑定。感谢您的参与！</p>');
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
//绑定弹窗
function LoginBing(){
    var str='<div id="loginStr">'+
                '<div id="zheader">'+
                    '<h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                    '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
                '</div>'+
                '<div id="zsuccessMessage">'+
                	'<div><img class="gban" id="guanbile"onclick="gbl()" style="display:none;top: 0px; position: absolute;right: 9px;width:9%;" src="images/closedd.png"/></div>'+
                    '<div style="margin-bottom:-1.1rem;padding-top:0.45rem;color: #352f2f;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
                    '<div class="add">'+
                        '<ul id="tabcon">'+
                        '<li id="li1" class="show">'+
                            '<div id="Li-con1">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError3()"></p>'+
                                '<p class="yzm_p"><input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError3()"><input type="button" id="text1" onclick="validateInfodd(this)" value="获取"></p>'+
                                '<p id="errorMessage"></p>'+
                                '<p id="sub_btn"><img src="images/sub.png" alt="" onclick="binding()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '<li id="li2">'+
                            '<div id="Li-con2">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone2" placeholder="请输入手机号" onfocus="clearError2()"></p>'+
                                '<p id="errorMessage2"></p>'+
                                '<p id="sub_btn2"><img src="images/sub.png" onclick="Notdx()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>';

    $("#LoginBing").html(str);
}
//Tab切换
function Tab(param){
    var header=document.getElementById('zheader');
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
    $("#LoginBing").show();
    $('#zheader').hide();
    $('#zsuccessMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏
function closeLogin(){
    $("#loginMask").hide();
    $("#LoginBing").hide();
}


//清空错误提示框的内容
function clearError3(){
    $('#errorMessage').html("");
}

function clearError2(){
    $('#errorMessage2').html("");
}
function gbl(){
	$("#LoginBing").hide();
	$("#loginMask").hide();
//	window.location.href=window.location.href+"&id="+10000*Math.random();    //刷新页面
}
//默认手机号码
function shouji(){
	var getphone = $.cookie('getphone');
//	console.log(typeof(getphone))  // string  字符串
	if(getphone==""||getphone==null||getphone==undefined||getphone=="undefined"){
		$("#phoneNum").val('');    //么有绑定的清空
	}else{
		$("#phoneNum").val(getphone);// 如果已经绑定了     就默认手机号码
	}
}

function pageInit(){
	$("#login").show();
	$("#loginMask").show();
}
//订购弹出框
function login(){
	str = '<div class="header"><img class="close" onclick="clearClose()" src="images/close.png"/></div>'+
			'<div id="successMessage">'+
				'<div class="login_div">'+
					'<input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/>'+
				'</div>'+
				'<div class="login_div">'+
					'<input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
					'<input type="button" id="text" onclick="validateInfo(this)" value="获取">'+
				'</div>'+
				'<div id="errorMsg"></div>'+
			'</div>'+
			'<div id="loginButton"><button class="but" onclick="loginInfo()">确认订购</button></div>';
	$("#login").html(str);
}
//点击input框  清除内容
function clearError(){
    $('#errorMsg').html("");
}
//关闭登录框
function clearClose(){
	$("#login").hide();
	$("#loginMask").hide();
	if(wait!=60)wait=0;
}




//发送验证码
function validateInfo(btn) {
    var url="/activity/singleorder/send";
    var phone= $("#phoneNum").val();
    var type="sohu-dx";
    if(phone==""||phone==null){
        $('#errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMsg').html("您输入的非电信手机号！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    console.log(type);
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
        	if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else if(data.status==2) {
                $('#errorMsg').html('对不起！您输入的手机号未实名认证');
            }else if(data.status==3) {
                $('#errorMsg').html('对不起！您已经参加过活动，感谢您的关注！');
            }
            else if(data.status==4) {
                $('#errorMsg').html('对不起！您输入的手机号属于OCS计费类型，暂不能订购该产品。');
            }else{
                $('#errorMsg').html(data.message);
            }
        },
        error:function(data){
            $('#errorMsg').html("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/activity/singleorder/order";
    var phone= $("#phoneNum").val();
//  var productcd="700016143"; 
	var type="sohu-dx";
    var validate =$("#validate").val();
    if(phone==""||phone==null){
        $('#errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMsg').html("请输入贵州电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#errorMsg').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["type"]=type;
    pram["where"]="";
    $("#loginButton").html('<button class="but" onclick="errorClick();" >抢 购 中...</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMsg').html("服务器连接失败！");
                 $("#loginButton").html('<button class="but" onclick="loginInfo();" >确认订购</button></div>');
                return;
            }else if(data.status==0){
                $('#errorMsg').html(data.message);
                 $("#loginButton").html('<button class="but" onclick="loginInfo();" >确认订购</button></div>');
            }else{
                $("#loginButton").html('<button class="but" onclick="queding();" >确定</button></div>');
				$('#successMessage').html('<div class="succ"><span style="color: yellow;font-size: 0.3rem;">恭喜您!</span>成功抢购 "20元1G省内搜狐定向流量包"，系统将在24小时内为您受理，受理结果将通过短信进行告知。同时您还获得50棒豆（未绑定用户不能获得棒豆奖励），可在公众号菜单“我的棒豆”中兑换成流量！</div>');
            }
        },
        error:function(){
            $('#errorMsg').html("服务器连接失败！");
             $("#loginButton").html('<button class="but" onclick="loginInfo();" >立即订购</button></div>');
        }
    });
}
//验证码倒计时
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
function errorClick(){
    $('#errorMsg').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMsg').html("");
    },2000);
}
function queding(){
    $("#login").hide();
	$("#loginMask").hide();
	if(wait!=60)wait=0;
}
//function closedown(){
//  $('#loginMask').hide();
//  $('#login').hide();
//  if(wait!=60)wait=0;
//}