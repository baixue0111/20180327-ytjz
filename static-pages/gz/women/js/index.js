/**
 * Created by mysheng on 2016/2/22.
 */
function scrollBodyUp(){

    $('body,html').animate({scrollTop:$("#head").height()}, 500);

}
/*获取验证码*/
function loginCode(btn) {
    var url="/activity/festivalorder/send";
    var date=new  Date();
    var endDate=new  Date('2016/3/8,23:59:59');
    var end=endDate.getTime()-date.getTime();
    if(end<0){
        error("活动已结束，敬请期待新活动");
        return true;
    }
    var phone= $("#phone").val();
    var type="women";
    if(phone==""||phone==null){
       error("请输入手机号！");
        return;
    }
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!reg.test($.trim(phone))) {
       error("请输入正确手机号！");
        return;
    }

    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    buttonTime(btn);
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
               error("服务器连接失败！");
                return;
            }
            if(data.status==0){
               error("验证码发送失败！");
            }else{
                error("验证码发送成功！")
            }
        },
        error:function(data){
           error("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/activity/festivalorder/order";
    var date=new  Date();
    var endDate=new  Date('2016/3/8,23:59:59');
    var end=endDate.getTime()-date.getTime();
    if(end<0){
        error("活动已结束，敬请期待新活动");
        return true;
    }
    var phone= $("#phone").val();
    var validate =$("#code").val();
    var productcd="700013217";
    if(phone==""||phone==null){
       error("请输入手机号！");
        return;
    }
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!reg.test($.trim(phone))) {
       error("请输入正确手机号！");
        return;
    }
    if(validate==""||validate==null){
        error("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["productcd"]=productcd;
    $("#loginButton").html('<p onclick="errorClick()"><img style="width: 60%" src="image/order.png"></p>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
               error("服务器连接失败！");
                $("#loginButton").html('<p onclick="loginInfo()"><img style="width: 60%" src="image/order.png"></p>');
                return;
            }
            if(data.status==0){
               error("验证码错误！");
                $("#loginButton").html('<p onclick="loginInfo()"><img style="width: 60%" src="image/order.png"></p>');
            }else{
                success();
                $("#loginButton").html('<p onclick="loginInfo()"><img style="width: 60%" src="image/order.png"></p>');
            }
        },
        error:function(){
           error("服务器连接失败！");
            $("#loginButton").html('<p onclick="loginInfo()"><img style="width: 60%" src="image/order.png"></p>');

        }
    });
}

/*成功提示提示信息*/
function success(){
    $('#successMessage').html('<p class="success">恭喜您成功抢购"女人节尊享3天包10元1G省内流量", 系统将在24小时内为您进行受理, 受理结果将通过短信进行告知。感谢您的参与！</p>');
    $("#load").show();
    $("#error").show();
}
/*提示信息*/
function error(message){
   $("#errorMessage").html(message);
   $("#load").show();
   $("#error").show();
}
function errorClick(){
    error("请你别连续点击")
}
/*关闭提示框*/
function closetap(){
    $('#successMessage').html('<p id="errorMessage"></p>')
    $("#load").hide();
    $("#error").hide();
}
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取验证码";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value =wait +"s后请重发";
        wait--;
        setTimeout(function () {
            buttonTime(btn);
        }, 1000)
    }
}
