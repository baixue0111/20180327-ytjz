

$(function () {
    
});

//验证码
function validateInfo(btn){
    var url="/weixin/oldIron/send";
    var phone = $("#phone").val();
    let type = 1;
    let param = {};

    if(phone == "" || phone == null){
        $('.error').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.error').html("请输入贵州电信手机号码!");
        return;
    }
    
    param["phone"] = phone;
    param["type"] = type;

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code == 1 && data.status == 1) {
                buttonTime(btn);
            } else {
                $('.error').html(data.message);
            }

        },
        error:function(){
            $('.error').html("服务器连接失败！");
        }
    });
}

// 查看战绩
function lookRecord() {
    let url = '/weixin/oldIron/authorized';
    let phone = $("#phone").val();
    let code = $("#code").val();
    let param = {};

    if(phone == "" || phone == null){
        $('.error').html("请输入正确手机号！");
        return;
    }
    if(code == "" || code == null){
        $('.error').html("请输入验证码！");
        return;
    }
    param["phone"] = phone;
    param["validateCode"] = code;

    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            if(data.code == 0 && data.status == 1) {
                localStorage.setItem('phone', phone);
                window.location.href = 'myRecord.html';
            } else if(data.code == 0 && data.status == 2) {
                hideRrcord();
                errorCloseShow();
                $(".errorMsg").html(data.message);
            } else {
                $('.error').html(data.message);
            }
        }
    })

}

//

// 登录框
function login() {
    let str = '<div class="close-login" onclick="hideRrcord()">'+
               '<img src="img/close.png">'+
            '</div>'+
            '<div class="logi-msg">'+
                '<div class="phone"><input type="text" id="phone" placeholder="我的手机号" onfocus="clearCon()"></div>'+
                '<div class="code">'+
                    '<input type="text" id="code" placeholder="请输入手机验证码" onfocus="clearCon()">'+
                    '<input type="button" value="获取验证码" id="code-btn" onclick="validateInfo(this)">'+
                '</div>'+
                '<div class="error"></div>'+
                '<div class="myRecord-btn" onclick="lookRecord()">'+
                    '<img src="img/myRecord-affirm.png">'+
                '</div>'+
            '</div>';

    $('.login').html(str);
}

// 错误弹框
function errorLogin() {
    let str = '<p class="errorMsg"></p>'+
            '<div class="errorAffirm" onclick="goMyRecommend()">'+
                '<img src="img/myRecommend.png">'+
            '</div>';
    $(".errorLogin").html(str);        
}


// 错误弹框显示
function errorCloseShow() {
    errorLogin();
    $('.mask').show();
    $('.errorLogin').show();
}
// 错误弹框关闭
function errorCloseHide() {
    $('.mask').hide();
    $('.errorLogin').hide();
}

// 显示
function showRrcord() {
    let phone = localStorage.getItem('phone');
    if(phone == null || phone == "" || phone == undefined) {
        login();
        $('.mask').show();
        $('.login').show();
    } else {
        window.location.href = 'myRecord.html';
    }
}

//获取验证码
var wait = 60;
buttonTime = function (btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取验证码";
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

// 跳转到“我要推荐”页面
function goMyRecommend() {
    window.location.href = "myRecommend.html";
}