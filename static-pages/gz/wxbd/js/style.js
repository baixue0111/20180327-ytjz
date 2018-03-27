/**
 * Created by hsgeng on 2017/5/25.
 */

/******************** rem适配 ******************/
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W*0.15625+'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
    var W = document.documentElement.clientWidth;
    html.style.fontSize = W*0.15625+'px';
}
var code,openID_value,phone,openId,id;
function showLogin(){
    $('#loginMask').show();  //弹出层显示
    $("#loading").show();		//loading
    code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
}
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
                    bing();   //绑定手机号
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
        $("#loading").hide();
        openID_value=$.cookie('openID_value');
        console.log(openID_value);
        bing();   //绑定手机号
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
                $("#loginMask").show();
                $("#login_w").show();
                login();
                var str ='<p class="bangdingle">您已绑定公众号，请勿重复绑定!</p>'+
                    '<img class="login_queding" onclick="guab()" src="image/gqbtn.png" style="width:60%;margin-bottom: 0.2rem;"/>';
                $('#login_w_successMessage').html(str);
            }else{
                $("#loginMask").show();
                $("#login_w").show();
                login();
            }
        }
    } )
}
//获取验证码
function loginValidate(btn){
    var url="/weixin/auth/send";
    var phone= $("#login_w_phone").val();
    if(phone==""||phone==null){
        $('.login_w_success').html("请输入正确手机号！");
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
                $('.login_w_success').html(data.message);
            }

        },
        error:function(){
            $('.login_w_success').html("服务器连接失败！");
        }
    });
}

//电信用户绑定
function loginBangDing(){
    var qrcodeOpenId=GetQueryString('qrcodeOpenId'); //获取邀请人的openId
    var url='/weixin/auth/bind';
    var phone= $("#login_w_phone").val();
    var validateCode=$('#login_w_yzm').val();
    if(phone==""||phone==null){
        $('.login_w_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.login_w_success').html("请输入正确手机号！");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":$.cookie('openID_value'),"invitorOpenId":qrcodeOpenId,"validateCode":validateCode,"type":5},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功，长按扫描下方二维码关注“中国电信贵州加油站”公众号，您将获得100棒豆（1棒豆=1M）。</p>'+
                            '<p><img style="width: 40%;" src="image/wg.jpg" alt=""></p>'+
                            '<img class="login_queding" onclick="guab()" src="image/gqbtn.png" style="width:60%;margin-bottom: 0.2rem;"/>';
                $('#login_w_successMessage').html(sustr);
            }else if(data.code==1&&data.status==2){
                $('.login_w_success').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('.login_w_success').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('.login_w_success').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('.login_w_success').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('.login_w_success').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('.login_w_success').html(data.message);
            }

        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });

}
//绑定模态框
function login(){
      var str = '<div>'+
                    '<div class="login_w_title">贵州电信用户绑定</div>'+
                '</div>'+
                '<div id="login_w_successMessage">'+
                    '<div style="color:red;font-size:0.2rem;">绑定并关注本公众号即送100棒豆</div>'+
                    '<p style="margin-top: 0.2rem">'+
                        '<input type="text" id="login_w_phone" placeholder="请输入手机号" onfocus="loginClearError()">'+
                    '</p>'+
                    '<p style="margin-top: 0.2rem">'+
                        '<input type="text" id="login_w_yzm" placeholder="请输入验证码" onfocus="loginClearError()">'+
                        '<input type="button" id="login_w_text" onclick="loginValidate(this)" value="获取">'+
                    '</p>'+
                    '<div class="login_w_success"></div>'+
                    '<div>'+
                        '<img src="image/sub.png" class="login_w_img" onclick="loginBangDing()"/>'+
                    '</div>'+
                    '<div class="login_w_close" onclick="loginWClose()">暂不绑定</div>'+
                '</div>';
      $("#login_w").html(str);
}

//清空错误提示框的内容
function clearError(){
    $('#loginClearError').html("");
}
//暂不绑定
function login_w_close(){
    $("#login_w").hide();
    $("#loginMask").hide();
}

//绑定成功关闭页面

function guab(){
    $("#login_w").hide();
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