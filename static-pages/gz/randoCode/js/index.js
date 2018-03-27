

$(function () {
	$(".mask").show();
    $(".loading").show();
	Login2();
	getopenId();

	 //1.获取openId
    function getopenId (){
        var openId,url;
        var code = GetQueryString('code');
        openId = $.cookie("openId");
        //openId = "oKH8cw6iaaBLpqt5YCXRR8dLZVCc";
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
                        getuserMsg();
                    }
                }
            })
        }else{
            $(".mask").hide();
            $(".loading").hide();
            openId = $.cookie("openId");
            getuserMsg();
        }
    }

    //2.获取用户基本信息
    function getuserMsg(){
        var url = "/weixin/auth/userInfo";
        //openId = "oKH8cw6iaaBLpqt5YCXRR8dLZVCc";
        var openId = $.cookie("openId");  //获取openId值(cookie)
        $.post(url,{"openId":openId},function(data){
            if (data.status == 1 && data.code == 1) {
                var focusOn=data.userInfo.subscribe;
                if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
                    isBind();  
                }else if(focusOn == 0){
                    showAlert();
                    $(".successCon p").html("请先关注“中国电信贵州加油站”此公众号");
                }
            }
        })
    }

    //3.判断是否绑定
    function isBind(){
        var url = "/weixin/auth/isBind";
        //openId = "oKH8cw6iaaBLpqt5YCXRR8dLZVCc";
        var openId = $.cookie("openId"); //获取openId值(cookie)
        $.post(url,{"openId":openId} , function (data) {
            if (data.status == 1 && data.code == 1) {
                if (data.isBind) {
                	var userPhone = data.phone;
                    $.cookie("phone",userPhone);
                    $("#Bindphone").html(userPhone.substring(0,3)+"****"+userPhone.substring(7));
                }else{
                	Login2();
                    $("#loginMask").show();
				    $("#login").show();
                }
            }
        })
    }



	
	// 点击领取
	get = function () {
        $(".mask").show();
        $(".loading").show();

		$(".get img").removeAttr("onclick");
		setTimeout(function () {
			$(".get img").attr("onclick","get()");
		},3000);

		var $thisphone=$("#Bindphone").html();
		if ($thisphone == "" || $thisphone == null || $thisphone == undefined) {
            $(".mask").hide();
            $(".loading").hide();
			Login2();
            $("#loginMask").show();
		    $("#login").show();
		}else{
			var phone = $.cookie("phone");
			//var phone = "17112356666";
			var	usedPhone = $("#get-phone").val();
			var code = $("#code").val();

			if (code == "" || code == null || code == undefined) {
                $(".mask").hide();
                $(".loading").hide();
				$(".errorMsg").html("请填写随机码才可领取！");
				return;
			}
			if (usedPhone == "" || usedPhone == null || usedPhone == undefined) {
                $(".mask").hide();
                $(".loading").hide();
				$(".errorMsg").html("请填写手机号才可领取！");
				return;
			}
			var url = "/weixin/random/random2Flow";
			$.post(url,{"phone":phone,"usedPhone":usedPhone,"code":code}, function (data) {
				if (data.code == 1) {
                    $(".mask").hide();
                    $(".loading").hide();
					showAlert();
	                $(".successCon p").html(data.message);
				}else{
                    $(".mask").hide();
                    $(".loading").hide();
					$(".errorMsg").html(data.message);
				}
			})
		}
	}



//弹窗提示
function showAlert () {
	$(".mask").show();
	$(".successModal").show();
}

closeAlert = function (){
	$(".mask").hide();
	$(".successModal").hide();
	$("#code").val("");
	$("#get-phone").val("");
}

//输入框获得焦点时清空错误提示内容
clearCon = function () {
	$(".errorMsg").html("");
}

//验证码
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
                $('#successMessage .add').html('<p class="success">恭喜您，绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p><p class="affirm" onclick="closeLogin();">确定</p>');
            	$.cookie("phone",phone);
            	$("#Bindphone").html(phone.substring(0,3)+"****"+phone.substring(7));
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
                $("#Bindphone").html(phone.substring(0,3)+"****"+phone.substring(7));
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