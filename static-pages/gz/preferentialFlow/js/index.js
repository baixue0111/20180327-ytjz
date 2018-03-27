/**
 * Created by hsgeng on 2018/02/07.
 */

/**
 * 适配 640px
 */
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 默认设计图为640的情况下1rem=100px；根据自己需求修改
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function login() {
    var loginStr = '<div class="close" onclick="loginClose()"></div>' +
        '<div class="loginImg">' +
        '<div class="loginContent">' +
        '<p><input type="text" class="phone" placeholder="请输入您的手机号" onfocus="clearMsg()"></p>' +
        '<p>' +
        '<input type="text" class="verification" placeholder="请输入验证码" onfocus="clearMsg()">' +
        '<input class="obtain" type="button" value="获取" onclick="obtain(this)">' +
        '</p>' +
        '<P class="loginP"></P>' +
        '<div class="loginsucce">' +
        '<div class="loginBtn" onclick="orderBtn()">立即抢购</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $("#login").html(loginStr);
}

// 获取验证码
obtain = function(btn) {
    var url = "/activity/daily/dailySend";
    var phone = $(".phone").val();
    if (phone == "" || phone == null) {
        $('.loginP').html("请输入正确手机号！");
    }

    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.loginP').html("请输入正确电信手机号!");
        return;
    }

    var param = {};
    param["phone"] = phone;
    param["type"] = "20G";

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                buttonTime(btn);
            } else if (data.code == 0 && data.status == 3) {
                $('.loginContent').html('<p>' + data.message + '</p>');
            } else {
                $(".loginP").html(data.message);
            }
        },
        error: function() {
            $('.loginP').html("服务器连接失败！");
        }
    });
}


// 订购
orderBtn = function() {
    var url, phone, code;
    url = "/activity/daily/dailyOrder";
    phone = $(".phone").val();
    code = $(".verification").val();

    if (phone == "" || phone == null) {
        $('.loginP').html("请输入正确手机号！");
        return;
    }
    if (code == "" || code == null) {
        $('.loginP').html("请输入正确手机号或验证码！");
        return;
    }

    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.loginP').html("请输入正确电信手机号!");
        return;
    }

    var param = {};
    param["phone"] = phone;
    param["validateCode"] = code;
    param["type"] = "20G";
    param["where"] = "1";
    $(".loginsucce").html('<div class="loginBtn" onclick="snapUp()">抢购中...</div>');
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(param),
        dataType: "json",
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                $('.loginContent').html('<p><span style="">恭喜您</span>成功抢购春节特惠流量包，系统将在24小时内为您受理，受理结果将通过短信进行告知。感谢您的参与！</p>');
            } else {
                $(".loginP").html(data.message);
                $(".loginsucce").html('<div class="loginBtn" onclick="orderBtn()">立即抢购</div>');
            }
        },
        error: function() {
            $('.loginP').html("服务器连接失败！");
        }
    })
}


/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


// 显示模态框
immediately = function() {
    var date = new Date();
    var time = date.pattern("yyyy-MM-dd hh:mm:ss");
    var day = time.substring(8, 10); //日
    var timeHous = time.substring(11, 13);
    login();    
    $("#loginMask").show();
    $("#login").show();
    $('.loginContent').html('<p>春节特惠包优惠活动已结束，请关注其他流量包订购活动！</p>');
    // if (day < 14) {
    //     $("#login").show();
    //     $('.loginContent').html('<p>春节特惠包2月14日0点正式上线，敬请期待!</p>');
    // } else if (day >= 21 && timeHous >= 23) {
    //     $("#login").show();
    //     $('.loginContent').html('<p>春节特惠包优惠活动已结束，请关注其他流量包订购活动！</p>');
    // } else {
    //     $("#login").show();
    // }

}

// 关闭模态框
loginClose = function() {
    $("#loginMask").hide();
    $("#login").hide();
}

// 清空提示信息
clearMsg = function() {
    $(".loginP").html("");
}

// 连续点击提示
function snapUp() {
    $('.loginP').html("请别连续点击!");
    setTimeout(function() {
        $('.loginP').html("");
    }, 2000);
}

//获取验证码
var wait = 60;
buttonTime = function(btn) {
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