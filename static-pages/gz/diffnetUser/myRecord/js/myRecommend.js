
$(function() {


});

//短信推荐好友-验证码
function validateInfo(btn) {
    var url="/weixin/oldIron/send";
    var phone = $("#phone").val();
    console.log(phone)
    let type = 0;
    let param = {};

    if(phone == "" || phone == null){
        $('.error').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.error').html("请输入正确手机号!");
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

// 短信推荐好友-确定
function affirmBtn() {
    let url = '/weixin/oldIron/apply';
    let phone = $("#phone").val();
    let code = $("#code").val();
    let param = {};

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
                $('.error').html(data.message);
            } else if(data.code == 0 && data.status == 2) {
                $('.error').html(data.message);
            }else if(data.code == 0 && data.status == 3) {
                show_dxlogin();
                $(".dx-error").hide();
                $(".desc").html(data.message);
                $(".desc").css("margin-top", "2rem");
                $(".dx-msg").css({"left": "50%", "margin-left": "-2.165rem"});
                $(".dx-msg").html('<img src="img/myRecord-affirm.png" onclick="hide_dxlogin()">');
            }else if(data.code == 0 && data.status == 4) {
                show_dxlogin();
                $(".dx-error").hide();
                $(".desc").html(data.message);
                $(".desc").css("margin-top", "2rem");
                $(".dx-msg").css({"left": "50%", "margin-left": "-2.165rem"});
                $(".dx-msg").html('<img src="img/myRecord-affirm.png" onclick="hide_dxlogin()">');
            } else {
                $('.error').html(data.message);
            }
        }
    })

}

//页面转发-验证码
function validateInfo2(btn){
    var url="/weixin/oldIron/send";
    var phone = $("#phone2").val();
    let type = 1;
    let param = {};

    if(phone == "" || phone == null){
        $('.error').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.error').html("请输入正确手机号!");
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
// 页面转发好友-确定
function pageAffirm() {
    let url = '/weixin/oldIron/share';
    let phone = $("#phone2").val();
    let code = $("#code2").val();
    let param = {};

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
                $('.error').html(data.message);
            } else if(data.code == 0 && data.status == 2) {
                $('.error').html(data.message);
            } else {
                localStorage.setItem('code', data.code);
                window.location.href = 'share.html';
            }
        }
    })
}

// 短信推荐好友-弹框
function dxLogin() {
	var str = '<div class="dx-error" onclick="hide_dxlogin()">'+
				'<img src="img/errorClose.png">'+
			'</div>'+
            '<p class="desc">输入您的号码，获取验证码并输入确认之后，系统将给您下发一条短信，该短信包含活动专项优惠码。请将该短信转发给您推荐的好友，办理时凭该专属优惠码才能参加活动！</p>'+
            '<div class="logi-msg dx-msg">'+
                '<div class="phone"><input type="text" id="phone" placeholder="我的手机号" onfocus="clearCon()"></div>'+
                '<div class="code">'+
                    '<input type="text" id="code" placeholder="请输入手机验证码" onfocus="clearCon()">'+
                    '<input type="button" value="获取验证码" id="code-btn" onclick="validateInfo(this)">'+
                '</div>'+
                '<div class="error"></div>'+
                '<div class="myRecord-btn">'+
                    '<img src="img/myRecord-affirm.png" onclick="affirmBtn()">'+
                '</div>'+
            '</div>';

    $(".dxLogin").html(str);
}


// 页面转发好友-弹框
function pageLogin() {
    var str = '<div class="dx-error" onclick="hide_dxlogin()">'+
                '<img src="img/errorClose.png">'+
            '</div>'+
            '<p class="desc">输入您的号码，获取验证码并输入确认后，系统将给您生成分享页面，分享页面包含活动专属优惠码。请将分享页面转发给您的好友，您的好友办理时凭专属优惠码才能参加活动！用您的优惠码参加活动的好友越多，你获得的奖励越多。</p>'+
            '<div class="logi-msg dx-msg">'+
                '<div class="phone"><input type="text" id="phone2" placeholder="我的手机号" onfocus="clearCon()"></div>'+
                '<div class="code">'+
                    '<input type="text" id="code2" placeholder="请输入手机验证码" onfocus="clearCon()">'+
                    '<input type="button" value="获取验证码" id="code-btn" onclick="validateInfo2(this)">'+
                '</div>'+
                '<div class="error"></div>'+
                '<div class="myRecord-btn">'+
                    '<img src="img/myRecord-affirm.png" onclick="pageAffirm()">'+
                '</div>'+
            '</div>';

    $(".dxLogin").html(str);
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
        clearTimeout(time1);
        var time1 = setTimeout(function () {
            buttonTime(btn);
        }, 1000)
    }
}

// 显示短信框
function show_dxlogin() {
	dxLogin();
	$(".mask").show();
	$(".dxLogin").show();
}

// 隐藏短信框
function hide_dxlogin() {
	$(".mask").hide();
	$(".dxLogin").hide();
}

// 页面转发提示框
function show_pageShare() {
	pageLogin();
    $(".mask").show();
    $(".dxLogin").show();
}