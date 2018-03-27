/**
 * Created by mysheng on 2016/1/27.
 */
var typeone;
$(function() {
    login2();
    $('#loginMask').show();
    $('#login2').show();
    $('#login1_succes2').html('<p class="asuccess">无限流量包产品升级中，敬请期待！</p>');
    $('#login1_but2').hide();
})

function order(gettype) {
    typeone = gettype;
    login2();
    $('#loginMask').show();
    $('#login2').show();
}

function login2() {
    var login2Str = '<div class="login1_close2" onclick="login1_close2()"></div>' +
        '<div id="login1_succes2">' +
        '<p class="login1_top2">' +
        '<input type="text" placeholder="请输入手机号" id="login1_phone2" onfocus="clearError2()">' +
        '</p>' +
        '<p class="login1_bottom2">' +
        '<input type="text" placeholder="请输入验证码" id="login1_validate2" onfocus="clearError2()">' +
        '<input type="button" value="获取" id="login1_yzm2" onclick="login_va(this)">' +
        '</p>' +
        '<div id="login1_errorMsg2"></div>' +
        '</div>' +
        '<div id="login1Button2">' +
        '<button id="login1_but2" onclick="login1_login()">立即抢购</button>' +
        '</div>';
    $("#login2").html(login2Str);
}

function login1_close2() {
    WeixinJSBridge.call('closeWindow');
    // $("#login2").hide();
    // $('#loginMask').hide();
    // if(wait!=60)wait=0;
}

function login_va(btn) {
    var url = "/activity/flowKing/kingSend";
    var phone = $("#login1_phone2").val();
    if (phone == "" || phone == null) {
        $('#login1_errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg2').html("请输入正确电信手机号！");
        return;
    }
    var type = typeone;
    var param = {};
    param["phone"] = phone;
    param["type"] = type;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                buttonTime(btn);
            } else {
                $('#login1_errorMsg2').html(data.message);
            }
        },
        error: function() {
            $('#login1_errorMsg2').html("服务器连接失败！");
        }
    });
}
/*订购*/
function login1_login() {
    var url = "/activity/flowKing/kingOrder";
    var phone = $("#login1_phone2").val();
    var validate = $("#login1_validate2").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg2').html("请输入正确电信手机号！");
        return;
    }
    if (validate == "" || validate == null) {
        $('#login1_errorMsg2').html("请输入验证码！");
        return;
    }
    var type = typeone;
    var param = {};
    param["phone"] = phone;
    param["validateCode"] = validate;
    param["type"] = type;
    param["where"] = "";
    $("#login1Button2").html('<button id="login1_but2" onclick="login1_errorClick2()">抢购中...</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            if (data.status == 1 && data.code == 1) {
                var strr = "";
                if (type == '50') {
                    strr = "流量王中王可选包50元(50元/月)";
                } else {
                    strr = "流量王中王可选包30元(30元/月)";
                }
                $('#login1_succes2').html('<p class="success"><span class="success3">恭喜您,</span>成功抢购' + strr + ',系统将在24小时内为您受理，受理结果将通过短信进行告知，若需退订请咨询10000号，感谢您的参与!</p>');
                // $("#login1Button").html('<button id="login1_but" onclick="login1_que()">确定</button>');
            } else {
                $('#login1_errorMsg2').html(data.message);
                $("#login1Button2").html('<button id="login1_but2" onclick="login1_login()">立即抢购</button>');
            }
        },
        error: function() {
            $('#login1_errorMsg2').html("服务器连接失败！");
            $("#login1Button2").html('<button id="login1_but2" onclick="login1_login()">立即抢购</button>');

        }
    });
}

function login1_que2() {
    // $("#login2").hide();
    // $('#loginMask').hide();
}

function login1_errorClick2() {
    $('#login1_errorMsg2').html("请别连续点击!");
    setTimeout(function() {
        $('#login1_errorMsg2').html("");
    }, 2000);
}


//清空错误提示框的内容
function clearError2() {
    $("#errorMsg2").html("");
    $("#login1_errorMsg2").html('');
}


//验证码倒计时
var wait = 60;

function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value = wait + "s";
        wait--;
        setTimeout(function() {
            buttonTime(btn);
        }, 1000)
    }
}