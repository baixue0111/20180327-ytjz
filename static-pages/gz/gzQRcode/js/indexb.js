 var code,productId,openID_value,openId,id;
function generat(){
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
                    bing();  //查询微信是否绑定
                }
            }
        })
    }else{
       	openID_value=$.cookie('openID_value');
        $('#loginMask').hide();  //弹出层隐藏
        $("#loading").hide();
        bing();  //查询微信是否绑定
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
            	genera();
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
                var str ='<p class="succ"><span style="color:red">恭喜您，</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>'+
						'<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                $('#login_successMessage .add').html(str);
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
        $("#title").html("绑定手机号即送100M棒豆！");
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

//跳转生成 二维码    页面
function genera(){
	var openId=$.cookie('openID_value');
	var phone=$.cookie('getphone');
	window.location.href='http://gz.mobicloud.com.cn/active/gzQRcode/codeb.html?openId='+openId+'&phone='+phone+'';
}


