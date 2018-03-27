

$(function () {

getCount();

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

    
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    //var reg2 = /^1[34578]\d{9}$/;
    if (!reg.test($.trim(phone))) {
        $('.errMsg').html("请输入正确电信手机号!");
        return;
    }

    var param = {};
    param["phone"] = phone;
    param["validateCode"] = code;
    param["type"] = "2/500";
    param["where"] = "0";

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

//统计访问量
function getCount (phone) {
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
//订购窗口
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


//显示模态框
showAlert = function () {
    login();
    $(".mask").show();
    $(".modal").show();
}
//隐藏模态框
hideAlert = function () {
    $(".mask").hide();
    $(".modal").hide();
}


//清空错误提示
focusClear = function () {
	$(".errMsg").html("");
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