/**
 * Created by hsgeng on 2016/9/20.
 */
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W * 0.15625 + 'px';
window.onresize = function() {
    var html = document.getElementsByTagName('html')[0];
    var W = document.documentElement.clientWidth;
    html.style.fontSize = W * 0.15625 + 'px';
}
$(function() {
        decrypt();
    })
    //获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//tab切换
$("#titList .tit").click(function() {
    var index = $("#titList .tit").index(this);
    $('#titList .tit').eq(index).addClass("spanFocus").siblings().removeClass("spanFocus");
    $('#content .zzz').eq(index).addClass('focus').siblings().removeClass("focus");
})

var number;
//获取手机号
function decrypt() {
    var url = "/weixin/flowmarket/decrypt";
    var cipherText = window.location.href;
    var param = {};
    param["cipherText"] = cipherText;
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            number = data.phone;
            localStorage.setItem("phone", number);
        }
    })
}
//产品获取
function pageInit() {
    var url = "/weixin/flowmarket/productList";
    var type = 0;
    var param = {};
    param["type"] = type;
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            $("#b_group1").empty();
            var datajson = data.productList;
            if (data.code == 1 && data.status == 1) {
                $.each(datajson, function(i, item) {
                    var str1 = '<li class="b_groupList"><div class="b_groupList1"><div class="b_groupImg">' +
                        '<img src="' + item.iconUrl + '" alt=""></div>' +
                        '<div class="b_groupList2"><p class="b_groupList3">' + item.title + '</p>' +
                        '<p><span class="b_price">￥' + item.fee + '元</span><span class="b_buy"><a href="dg.html?id=' + item.flowId + '&type=' + type + '&number=' + number + '&title=' + item.title + '">点击购买</a></span></p>' +
                        '</div></div></li>';
                    $("#b_group1").append(str1);
                    $(".b_groupList1").css("background", "#edf9fe");
                })
            }
        }
    })
}

function pageInit1() {
    var url = "/weixin/flowmarket/productList";
    var type = 1;
    var param = {};
    param["type"] = type;
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            $("#b_group2").empty();
            var datajson = data.productList;
            if (data.code == 1 && data.status == 1) {
                $.each(datajson, function(i, item) {
                    var str2 = '<li class="b_groupList"><div class="b_groupList1" style="background:#f6effe"><div class="b_groupImg">' +
                        '<img src="' + item.iconUrl + '" alt=""></div>' +
                        '<div class="b_groupList2"><p class="b_groupList3">' + item.title + '</p>' +
                        '<p><span class="b_price" style="color:#ad7bed">￥' + item.fee + '元</span><span class="b_buy"><a href="dg.html?id=' + item.flowId + '&number=' + number + '&type=' + type + '&title=' + item.title + '">点击购买</a></span></p>' +
                        '</div></div></li>';
                    $("#b_group2").append(str2);
                })
            }
        }
    })
}

// //验证码倒计时
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


//跳转页面
document.getElementById('daystiao').addEventListener('click', function() {
    window.location.href = 'days.html';
}, false);




// 无线流量包

var typeone;

function ordera(gettype) {
    typeone = gettype;
    login2();
    $('#loginMask').show();
    $('#login2').show();
    $('#login1_succes2').html('<p class="asuccess">无限流量包产品升级中，敬请期待！</p>');
    $('#login1_but2').hide();
    //	console.log(typeof(getphone))  // string  字符串
    // if(number==""||number==null||number==undefined||number=="undefined"){
    //     $("#login1_phone2").val('');    //么有绑定的清空
    // }else{
    //     $("#login1_phone2").val(number);// 如果已经绑定了，兑换给自己       就默认手机号码
    // }
}

function login2() {
    var login2Str = '<div class="login1_close2" onclick="login1_close2()"></div>' +
        '<div id="login1_succes2">' +
        '<p class="login1_top2">' +
        '<input type="text" placeholder="请输入手机号" id="login1_phone2" onfocus="clearError2()">' +
        '</p>' +
        '<p class="login1_bottom">' +
        '<input type="text" placeholder="请输入验证码" id="login1_validate2" onfocus="clearError2()">' +
        '<input type="button" value="获取" id="login1_yzm2" onclick="login_validateIn(this)">' +
        '</p>' +
        '<div id="login1_errorMsg2"></div>' +
        '</div>' +
        '<div id="login1Button2">' +
        '<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>' +
        '</div>';
    $("#login2").html(login2Str);
}

function login1_close2() {
    $("#login2").hide();
    $('#loginMask').hide();
    if (wait != 60) wait = 0;
}

function login_validateIn(btn) {
    var url = "/activity/flowKing/kingSend";
    var phone = $("#login1_phone2").val();
    if (phone == "" || phone == null) {
        $('#login1_errorMsg2').html("请输入手机号！");
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
function login1_loginInf() {
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
    param["where"] = 1;
    param["openId"] = "";
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
                $('#login1_succes2').html('<p class="asuccess"><span class="success3">恭喜您,</span>成功抢购' + strr + ',系统将在24小时内为您受理，受理结果将通过短信进行告知，若需退订请咨询10000号，感谢您的参与!</p>');
                // $("#login1Button").html('<button id="login1_but" onclick="login1_que()">确定</button>');
            } else {
                $('#login1_errorMsg2').html(data.message);
                $("#login1Button2").html('<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>');
            }
        },
        error: function() {
            $('#login1_errorMsg2').html("服务器连接失败！");
            $("#login1Button2").html('<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>');

        }
    });
}

function login1_que2() {
    $("#login2").hide();
    $('#loginMask').hide();
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