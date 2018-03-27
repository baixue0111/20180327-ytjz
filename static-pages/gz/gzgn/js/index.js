/**
 * Created by hsgeng on 2016/8/16.
 */

function loginMessage(){
    login();
   $("#load").show();
    $("#loginStr").show();
}
/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();
    if(wait!=60)wait=0;
}
/*验证登录函数*/
function login(){
    var str='<div class="load"></div>'+
        '<div id="login" >'+
        '<div class="header"><span class="span" onclick="loginclose();" title="关闭"><img style="width: 20px;margin-top:16px;" src="img/close.png"/></span></div>'+
        '<div id="successMessage"><div><input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/></div>'+
        '<div><input class="input1" name="phoneNum2" id="phoneNum2" placeholder="请输入要赠送人的手机号码"  onfocus="clearError()"/></div>'+
        '<div><input class="input1" name="phoneNum3" id="phoneNum3" placeholder="请再次确认要赠送人的手机号码"  onfocus="clearError()"/></div>'+
        '<div><input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
        '<input class="input3" type="button" style="margin-right: 20px;" value="获取验证码" onclick="validateInfo(this)">'+
        '<p id="errorMessage"></p>'+
        '</div>'+
        '<div id="loginButton" ><button id="login_button" class="button" onclick="loginInfo()" >确认订购</button></div>'+
        '</div><div style="margin: 10px;text-align: center;" id="Tips"><p >Tips:本活动只对贵州实名认证的电信用户开放！</p></div>' +
        '</div>';
    $("#loginStr").html(str);
}
function clearError(){
    $('#errorMessage').html(" ");
}
/*发送验证码*/
function validateInfo(btn) {
    var url="/activity/fiveTwoZeroorder/send";

    var orderPhone= $("#phoneNum").val();
    var phone= $("#phoneNum2").val();
    var phone2= $("#phoneNum3").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(orderPhone))) {
        $('#errorMessage').html("对不起你输入的非电信号！");
        return;
    }

    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("赠送人非电信号！");
        return;
    }

    if (phone!=phone2) {
        $('#errorMessage').html("两次输入的号码不一致！");
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
            if(data.code==0){
                $('#errorMessage').html("服务器连接失败！");
                return;
            }
            if(data.status==0){
                $('#errorMessage').html("验证码发送失败！");
            }else if(data.status==2){
                $('#successMessage').html('<p class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
            }else if(data.status==3){
                $('#successMessage').html('<p class="success">对不起！赠送人未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
            }
            else if(data.status==4){
                $('#successMessage').html('<p class="success">对不起！您输入的手机号属于OCS计费类型，暂不能订购该产品。感谢您的关注！</p>');
            }
            else if(data.status==5){
                $('#successMessage').html('<p class="success">对不起！活动已经过期，感谢您的关注，请下次提前订购</p>');
            } else{
                buttonTime(btn);
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/activity/fiveTwoZeroorder/order";
    var orderPhone= $("#phoneNum").val();
    var phone= $("#phoneNum2").val();
    var phone2= $("#phoneNum3").val();

    var validateCode =$("#validate").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(orderPhone))) {
        $('#errorMessage').html("对不起你输入的非电信号！");
        return;
    }
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("赠送人非电信号！");
        return;
    }
    if (phone!=phone2) {
        $('#errorMessage').html("两次输入的号码不一致！");
        return;
    }
    if(validateCode ==""||validateCode ==null){
        $('#errorMessage').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["orderPhone"]=orderPhone;
    pram["phone"]=phone;
    pram["validateCode"]=validateCode;
    $("#loginButton").html('<button id="login_button" class="button" onclick="errorClick();" >抢 购 中...</button></div>');

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMessage').html("订购失败！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
                return;
            }
            if(data.status==0){
                $('#errorMessage').html("操作错误！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
            }
            if(data.status==2){
                $('#errorMessage').html("验证码超时！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
            }
            if(data.status==3){
                $('#errorMessage').html("验证码错误！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
            }
            else{
                $('#successMessage').html('<p class="success">恭喜您！成功为'+phone2+'订购520M省内流量，系统将在24小时内为您进行受理，受理结果将通过短信进行告知。感谢您的参与！</p>');
                $("#Tips").html("");

            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
            $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()"> 立即订购</button>');

        }
    });
}
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "重新获取验证码";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value ="重新发送验证码(" +wait + ")s";
        wait--;
        setTimeout(function () {
                buttonTime(btn);
            }, 1000)
    }
}

function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
}