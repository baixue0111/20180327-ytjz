

$(function () {
	$(".mask").show();
    $(".loading").show();
	getopenId();

	 //1.获取openId
    function getopenId (){
        var openId,url;
        var code = GetQueryString('code');
        openId = $.cookie("openId");
        url = "/weixin/auth/authInfo";
        if (openId == "" || openId == null || openId == undefined || openId == "undefined") {
            $.ajax({
                type : 'get',
                url : url,
                data : {"code":code},
                dataType : "json",
                contenType : 'application/json;charset=UTF-8',
                success : function (data) {
                    if (data.status == 1 && data.code == 1) {
                    	$(".mask").hide();
                    	$(".loading").hide();
                        openId = data.authInfo.openId;
                        $.cookie("openId",openId);
                        isBind(openId);
                    }
                }
            })
        }else{
            $(".mask").hide();
            $(".loading").hide();
            openId = $.cookie("openId");
            isBind(openId);
        }
    }


    // 判断是否绑定
    function isBind(openId){
        var url = "/weixin/auth/isBind";
        $.post(url,{"openId":openId} , function (data) {
            if (data.status == 1 && data.code == 1) {
                if (data.isBind) {
                	var userPhone = data.phone;
                    $.cookie("phone",userPhone);
                    //isgz();   // 如果绑定成功则检测手机号是否是贵州电信用户
                    $("#user-phone").val(userPhone);
                    getCount(userPhone);
                }else{
                	Login2();
                    $("#loginMask").show();
				    $("#login").show();
                    getCount();
                }
            }
        })
    }

	//判断用户是否是贵州电信用户
	isgz = function (){
		var phone = $.cookie('phone');
		var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
		if (!reg.test($.trim(phone))) {
			showAlert();
			$(".con h2").html("很遗憾！")
            $(".con p").html('参加活动失败，您当前号码不是中国贵州电信用户。');
            $(".hidesun").hide(); 
		}else{
		}
	}

	
	


//订购验证码
codeOrder = function (btn) {
    var url="/activity/daily/dailySend";
    var phone = $("#user-phone").val();
    if(phone == "" || phone == null){
        $('.errMsg').html("请输入正确手机号！");
    }
    
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    //var reg2 = /^1[34578]\d{9}$/;
    if (!reg.test($.trim(phone))) {
        $('.errMsg').html("请输入正确电信手机号!");
        return;
    }

    var param = {};
    param["phone"] = phone;
    param["type"] = "2/500";

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data) {
            if(data.code == 1 && data.status ==1) {
                buttonTime(btn);
            } else if(data.code == 0 && data.status ==3) {
                $(".errMsg").html("请输入正确的电信手机号！");
            } else {
                $(".errMsg").html(data.message);
            }
        },
        error:function(){
            $('.errMsg').html("服务器连接失败！");
        }
    });
}
//订购(15338516191)
orderBtn = function () {
    var url, phone, code;
    url = "/activity/daily/dailyOrder";
    phone = $("#user-phone").val();
    code = $("#user-code").val();

    if(phone==""||phone==null){
        $('.errMsg').html("请输入正确手机号！");
        return;
    }
    if(code==""||code==null){
        $('.errMsg').html("请输入正确手机号或验证码！");
        return;
    }

    var param = {};
    param["phone"] = phone;
    param["validateCode"] = code;
    param["type"] = "2/500";
    param["where"] = "1";

    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            if(data.code == 1 && data.status == 1) {
                $(".successCon").html('<p>'+ data.message +'</p>');
            } else if(data.code == 0 && data.status == 1){
                $(".errMsg").html("验证码错误！");
            } else if(data.code == 0 && data.status == 5){
                $(".errMsg").html(data.message);
            } else if(data.code == 0 && data.status == 4) {
                $(".successCon").html('<p>抱歉，您的套餐不能订购此流量包！</p><p>详情咨询10000号。</p>');
            } else {
                $(".successCon").html('<p>'+ data.message +'</p>');
            }
        }
    })
}

//电信用户绑定
binding = function (){
    var url='/weixin/auth/bind';
    var phone = $("#phone").val();
    var openId = $.cookie("openId");
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
        data: {"phone":phone,"openId":openId,"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="success">恭喜您！绑定成功，获得100棒豆，系统将在24小时为您送出流量，结果将通过短信进行告知；</p><p class="affirm" onclick="closeLogin();">确定</p>');
            	$.cookie("phone",phone);
                $("#user-phone").val(phone);
            	setTimeout(function () { 
			        isgz();
			    }, 4000); 
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

// 绑定验证码
validateInfo = function (btn){
    var url="/weixin/auth/send";
    var phone = $("#phone").val();
    var openId = $.cookie("openId");
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
        data:{"phone":phone,"openId":openId},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else{
                $('#errorMessage').html(data.message);
            }

        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}

//非贵州电信用户绑定
Notdx = function (){
    var url='/weixin/auth/bind';
    var phone = $("#phone2").val();
    var openId = $.cookie("openId");
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
        data: {"phone":phone,"openId":openId,"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="success">恭喜您！您已成功绑定。感谢您的参与！</p><p class="affirm" onclick="closeLogin();">确定</p>');
                $.cookie("phone",phone);
                $("#user-phone").val(phone);
                setTimeout(function () { 
			        isgz();
			    }, 4000);   

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

//统计访问量
getCount = function (phone) {
    var url = "/activity/daily/statistics";
    var activityUrl = window.location.href;
    var param = {};
    param["phone"] = phone;
    param["activityUrl"] = activityUrl;
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {

        }
    })
}

function login() {
    var str = '<div class="closeBtn"><span onclick="hideAlert()">X</span></div>'+
    '<div class="successCon">'+
            '<div>'+
                '<input type="text" id="user-phone" placeholder="请输入手机号" onfocus="focusClear()">'+
            '</div>'+ 
            '<div>'+
                '<input type="text" id="user-code" placeholder="请填写验证码" onfocus="focusClear()">'+
                '<input type="button" id="codeBtn" value="获取验证码" onclick="codeOrder(this)">'+
            '</div>'+
            '<div class="errMsg"></div>'+
            '<div class="affirmBtn" onclick="orderBtn()"></div>'+
        '</div>';
    $(".modal").html(str);
}

    
//登录弹窗
function Login2(){
    var str='<div id="loginStr">'+
                '<div id="header">'+
                    '<h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                    '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
                '</div>'+
                '<div id="successMessage">'+
                    '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
                    '<div class="add">'+
                        '<ul id="tabcon">'+
                        '<li id="li1" class="show">'+
                            '<div id="Li-con1">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError()"></p>'+
                                '<p class="yzm_p"><input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError()"><input type="button" id="text" onclick="validateInfo(this)" value="获取"></p>'+
                                '<p id="errorMessage"></p>'+
                                '<p id="sub_btn"><img src="img/sub.png" alt="" onclick="binding()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '<li id="li2">'+
                            '<div id="Li-con2">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone2" placeholder="请输入手机号" onfocus="clearError2()"></p>'+
                                '<p id="errorMessage2"></p>'+
                                '<p id="sub_btn2"><img src="img/sub.png" onclick="Notdx()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>';

    $("#login").html(str);
}


//Tab切换
Tab = function (param) {
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

//显示模态框
showAlert = function () {
    var phone = $.cookie("phone");
    if(phone == "" || phone == null || phone =="null" || phone == undefined){
        login();
        $(".mask").show();
        $(".modal").show();
    } else{
        login();
        $(".mask").show();
        $(".modal").show();
        $("#user-phone").val(phone);
    }
    
}
//隐藏模态框
hideAlert = function () {
    $(".mask").hide();
    $(".modal").hide();
}

//显示
showLogin2 = function (){
    Login2();
    $("#loginMask").show();
    $("#login").show();
}

//错误消息提示
error = function (message){
    $("#loginMask").show();
    $("#login").show();
    $('#header').hide();
    $('#successMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏
closeLogin = function (){
    $("#loginMask").hide();
    $("#login").hide();
}

//清空错误提示
focusClear = function () {
	$(".errMsg").html("");
}

//清空错误提示框的内容
clearError = function (){
    $('#errorMessage').html("");
}

clearError2 = function (){
    $('#errorMessage2').html("");
}

//获取验证码
var wait = 60;
buttonTime = function (btn) {
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

});