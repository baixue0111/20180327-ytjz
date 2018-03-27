/**
 * Created by mysheng on 2016/1/27.
 */

function loginMessage(){
    login();
    var beginTime=new Date('2016-06-03,00:00:00');
    var endTime=new Date('2016-06-12,23:59:59');
    var newDate=new Date();
    var dateTime1=beginTime.getTime()-newDate.getTime();
    var dateTime2=endTime.getTime()-newDate.getTime();
    if(dateTime1>0){
        $('#successMessage').html('<p class="error">您来早了,此活动还未开始</p>');
        $('#Tips').html("");
    }else if(dateTime2<0){
        $('#successMessage').html('<p class="error">活动已结束,敬请期待新活动</p>');
        $('#Tips').html("");
    }
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
        '<div class="header"><span class="span" onclick="loginclose();" title="关闭"><img style="width: 20px;" src="img/close.png"/></span></div>'+
        '<div id="successMessage"><div><input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/></div>'+
        '<div><input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
        '<input class="input3" type="button" style="margin-right: 20px;" value="获取验证码" onclick="validateInfo(this)">'+
        '<p id="errorMessage"></p>'+
        '</div>'+
        '<div id="loginButton" ><button id="login_button" class="button" onclick="loginInfo()" >确认订购</button></div>'+
        '</div><div style="color: red;margin: 10px;text-align: center;" id="Tips"><p >Tips:本活动只对贵州实名认证的电信用户开放！</p></div>'+
        '</div>';
    $("#loginStr").html(str);
}
function clearError(){
    $('#errorMessage').html(" ");
}

function validateInfo(btn) {
    var url="/activity/activeorder/send";

    var phone= $("#phoneNum").val();
    var type="duanwu";
    var reg = /^(180|189|133|153|177|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
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
            if(data.code==0){
                $('#errorMessage').html("服务器连接失败！");
                return;
            }
            if(data.status==0){
                $('#errorMessage').html("验证码发送失败！");
            }else if(data.status==2) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
                $('#Tips').html("");
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
    var url="/activity/activeorder/order";
    var phone= $("#phoneNum").val();
    var productcd="700013949";
    var validate =$("#validate").val();
    var reg = /^(180|189|133|153|177|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#errorMessage').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["productcd"]=productcd;
    $("#loginButton").html('<button id="login_button" class="button" onclick="errorClick();" >抢 购 中...</button></div>');

    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMessage').html("服务器连接失败！");

                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
                return;
            }
            if(data.status==0){
                $('#errorMessage').html("验证码错误！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
            }else{
                $('#successMessage').html('<p class="success">恭喜您:成功抢购"4G 10元 1G"省内7天包,系统将在24小时内为您受理,受理结果将通过短信进行告知,感谢您的参与！</p>');
                $('#Tips').html("");
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
            $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" 立即订购</button>');

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