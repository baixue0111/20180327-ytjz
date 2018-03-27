var code, productId, openID_value, openId, id;
$(function() {
        loginBinding();
        code = GetQueryString('code'); //获取code
        productId = $("#productIdTianji").val(); // 获取productId
        getOpenId(); //获取openid
        drawHistory(); //榜单
    })
    //获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//获取openID
function getOpenId() {
    var oi = $.cookie('openID_value');
    if (oi == null || oi == "" || oi == undefined || oi == "undefined") { //先判断openid是否为空，为空时执行这个函数  
        var url = '/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: { "code": code },
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                if (data.status == 1 && data.code == 1) {
                    openID_value = data.authInfo.openId;
                    $.cookie("openID_value", openID_value); //把openid储存到cookie中
                    bing(); //查询是否绑定
                }
            }
        })
    } else {
        openID_value = $.cookie('openID_value');
        bing();
    }

}
//查询微信用户是否绑定
function bing() {
    var url = "/weixin/auth/isBind";
    $.post(url, { "openId": $.cookie('openID_value') }, function(data) {
        if (data.status == 1 && data.code == 1) {
            if (data.isBind) {
                var getphone = data.phone;
                $.cookie("getphone", getphone);
            } else {
                loginBinding(); //弹出绑定页面  绑定微信号
                $("#loginMask").show();
                $("#login_binding").show();
            }
        }
    })
}
/**********微信用户绑定*********************/
//验证码
function validateInfo(btn) {
    var url = "/weixin/auth/send";
    var phone = $("#login_phone").val();
    if (phone == "" || phone == null) {
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;
    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号!");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data: { "phone": phone, "openId": $.cookie('openID_value') },
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                buttonTime(btn)
            } else {

                $('#errorMessage').html(data.message);
            }

        },
        error: function() {
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}


//电信用户绑定
function binding() {
    var url = '/weixin/auth/bind';
    var phone = $("#login_phone").val();
    var validateCode = $('#verification').val();
    if (phone == "" || phone == null) {
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;

    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data: { "phone": phone, "openId": $.cookie('openID_value'), "validateCode": validateCode, "type": 1 },
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                $('#header').hide();
                $.cookie("getphone", phone);
                var str = '<p class="succ"><span style="color:red">恭喜您，</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。。</p>' +
                    '<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                $('#login_successMessage .add').html(str);
            } else if (data.code == 1 && data.status == 2) {
                $('#errorMessage').html(data.message);
            } else if (data.code == 1 && data.status == 3) {
                $('#errorMessage').html(data.message);
            } else if (data.code == 1 && data.status == 4) {
                $('#errorMessage').html(data.message);
            } else if (data.code == 1 && data.status == 5) {
                $('#errorMessage').html(data.message);
            } else if (data.code == 1 && data.status == 6) {
                $('#errorMessage').html(data.message);
            } else if (data.code == 1 && data.status == 7) {
                $('#errorMessage').html(data.message);
            }

        },
        error: function() {
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
//非贵州电信用户绑定
function Notdx() {
    var url = '/weixin/auth/bind';
    var phone = $("#login_phone2").val();
    if (phone == "" || phone == null) {
        $('#errorMessage2').html("请输入正确手机号！");
        return;
    }
    var reg = /^1[34578]\d{9}$/;
    reg2 = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage2').html("请输入正确的手机号！");
        return;
    }

    $.ajax({
        type: 'get',
        url: url,
        data: { "phone": phone, "openId": $.cookie('openID_value'), "type": 0 },
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                $('#header').hide();
                var str = '<p class="succ"><span style="color:red">恭喜您！绑定成功，感谢您的关注！</p>' +
                    '<img class="login_queding" onclick="loginColse()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                $('#login_successMessage .add').html(str);
            } else if (data.code == 1 && data.status == 2) {
                $('#errorMessage2').html(data.message);
            } else if (data.code == 1 && data.status == 3) {
                $('#errorMessage2').html(data.message);
            } else if (data.code == 1 && data.status == 4) {
                $('#errorMessage2').html(data.message);
            } else if (data.code == 1 && data.status == 5) {
                $('#errorMessage2').html(data.message);
            } else if (data.code == 1 && data.status == 6) {
                $('#errorMessage2').html(data.message);
            } else if (data.code == 1 && data.status == 7) {
                $('#errorMessage2').html(data.message);
            }
        },
        error: function() {
            $('#errorMessage2').html("服务器连接失败！");
        }
    });
}
/***************** 微信绑定弹框********************/
function loginBinding() {
    var str = '<div id="header">' +
        ' <h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>' +
        '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>' +
        '</div>' +
        '<div id="login_successMessage">' +
        '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>' +
        '<div class="add">' +
        '<ul id="tabcon">' +
        '<li id="li1" class="show">' +
        '<div id="Li-con1">' +
        '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone" placeholder="请输入手机号" onfocus="bindingClearError()"></p>' +
        '<p class="yzm_p"><input type="text" id="verification" placeholder="请输入验证码" onfocus="bindingClearError()"><input type="button" id="login_text" onclick="validateInfo(this)" value="获取"></p>' +
        '<p id="errorMessage"></p>' +
        '<p id="sub_btn"><img src="images/sub.png" alt="" onclick="binding()"></p>' +
        '<p class="Tips" onclick="closeLogin()">暂不绑定</p>' +
        '</div>' +
        '</li>' +
        '<li id="li2">' +
        '<div id="Li-con2">' +
        '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone2" placeholder="请输入手机号" onfocus="bindingClearError2()"></p>' +
        '<p id="errorMessage2"></p>' +
        '<p id="sub_btn2"><img src="images/sub.png" onclick="Notdx()"></p>' +
        '<p class="Tips" onclick="closeLogin()">暂不绑定</p>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>';
    $("#login_binding").html(str);
}
//  绑定绑定tab切换
function Tab(param) {
    var header = document.getElementById('header');
    var h1 = document.getElementById('h11');
    var h2 = document.getElementById('h12');
    var li1 = document.getElementById('li1');
    var li2 = document.getElementById('li2');


    var h1a = document.getElementById('h1' + param);
    var lia = document.getElementById('li' + param);

    h1.className = '';
    h2.className = '';
    li1.className = '';
    li2.className = '';

    h1a.className = 'select';
    lia.className = 'show';

    if (param == 2) {
        $("#title").html("非贵州电信用户不能赠送100棒豆！");
    } else if (param == 1) {
        $("#title").html("绑定手机号即送100M棒豆！");
    }

}
//错误消息提示
function error(message) {
    $("#loginMask").show();
    $("#login_binding").show();
    $('#header').hide();
    $('#login_successMessage .add').html('<p class="success">' + message + '</p>');
}

//隐藏 绑定模态框
function closeLogin() {
    $("#loginMask").hide();
    $("#login_binding").hide();
    if (wait != 60) wait = 0;
}
//清空错误提示框的内容
function bindingClearError() {
    $('#errorMessage').html("");
}

function bindingClearError2() {
    $('#errorMessage2').html("");
}
//关闭
function loginColse() {
    $("#login_binding").hide();
    $("#loginMask").hide();

}

function guab() {
    $("#login_binding").hide();
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
        btn.value = wait + "s";
        wait--;
        setTimeout(function() {
            buttonTime(btn);
        }, 1000)
    }
}
/*
 * 抽奖 
 */
function rocate(status, msg) {
    var rotateTimeOut = function() {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function() {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;
    var rotateFn = function(awards, angles, txt) { //awards:奖项，angle:奖项对应的角度
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles + 3600,
            duration: 3000,
            callback: function() {
                setTimeout(function() {
                    $('#loginMask').show();
                    $("#login").show();
                    $('#successMessage').html(msg);
                    drow_flag = true; //抽奖旋转结束后  判断他是drow_flag=true 
                }, 500);

                bRotate = !bRotate;
            }
        })
    };
    if (bRotate) return;
    var item = status;
    switch (item) {
        case 0:
            rotateFn(0, 60, '谢谢参与！');
            break;
        case 1:
            rotateFn(1, 360, '优惠双宽带');
            break;
        case 2:
            rotateFn(2, 240, '谢谢参与');
            break;
        case 3:
            rotateFn(3, 300, '1G国内流量包');
            break;
        case 4:
            rotateFn(4, 120, '1G、7天后向流量包');
            break;
        case 5:
            rotateFn(5, 180, '1G、3天后向流量包');
            break;
    }
}
var drow_flag = true;

function draw() {
    if (!drow_flag) return;
    drow_flag = false;
    var url = '/weixin/billFlowLottery/billFlowLottery';
    var phone = $.cookie("getphone");
    var openId = $.cookie('openID_value');
    var param = {};
    param["phone"] = phone;
    param["openId"] = openId;
    //	如果openid为null时   弹出绑定页面
    if (phone == null || phone == "" || phone == "null") {
        $('#loginMask').show();
        $("#login_binding").show();
        drow_flag = true;
        return;
    } else {
        $.ajax({
            type: "post",
            url: url,
            data: JSON.stringify(param),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                if (data.code == 1 && data.status == 0) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">' + data.message + '</div>');
                    drow_flag = true;
                } else if (data.code == 0 && data.status == '-1') {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">' + data.message + '</div>');
                    drow_flag = true;
                } else if (data.code == 1 && data.status == 2) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">' + data.message + '</div>');
                } else if (data.code == 1 && data.status == 3) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">对不起！活动已经结束，不能进行抽奖，感谢您的关注！</div>');
                    drow_flag = true;
                } else if (data.code == 1 && data.status == 4) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">对不起！活动还未开始，不能进行抽奖，感谢您的关注！</div>');
                    drow_flag = true;
                } else if (data.code == 1 && data.status == 5) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">对不起！您的抽奖机会已用完，请下次再来，感谢您的关注！</div>');
                    drow_flag = true;
                } else if (data.code == 1 && data.status == 7) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">对不起！您操作过于频繁，请稍后再试，感谢您的关注！</div>');
                    drow_flag = true;
                } else if (data.code == 0 && data.status == 8) {
                    $('#loginMask').show();
                    $("#yjgq").show();
                    $("#yigq_success").html('<div class="yjgq_le">您已经是系统随机抽中的特惠双宽带的特邀用户，工作人员将在3个工作日内与您联系（节假日顺延），请耐心等待，谢谢！</div>');
                    drow_flag = true;
                } else {
                    var prizeId = data.prizeId;
                    if (prizeId == 0) {
                        msg = '<div class="lottery"> 很遗憾！您没有中奖</div><div class="inform">感谢您的参与！请继续关注中国电信贵州加油站，更多优惠活动等着您！</div>';
                    } else if (prizeId == 2) {
                        msg = '<div class="lottery"> 很遗憾！您没有中奖</div><div class="inform">感谢您的参与！请继续关注中国电信贵州加油站，更多优惠活动等着您！</div>';
                    } else {
                        msg = '<div class="lottery">恭喜您，获得<span>' + data.message + '</span>感谢您的参与！</div>';
                    }
                    rocate(prizeId, msg);
                    drow_flag = true;
                }
            },
            error: function() {
                $('#loginMask').show();
                $("#yjgq").show();
                $("#yigq_success").html('<div style="width:100%;text-align: center;margin-top: 17%;">服务器连接失败！</div>');
                drow_flag = true;
            }
        });

    }
}

function colse() {
    $('#loginMask').hide();
    $("#login").hide();
}

function yigq_colse() {
    $('#loginMask').hide();
    $("#yjgq").hide();
}


/*
 * 中奖名单 
 */
function drawHistory() {
    var url = "/weixin/billFlowLottery/luckyList";
    $.post(url, function(data) {
        if (data.code == 1) {
            var jsondata = data.lotteryList;
            $.each(jsondata, function(i, item) {
                var a = []; //定义一个空数组
                a[0] = item.PHONE;
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == null) {
                        a[i] = "";
                    } else if (a[i] != null) {
                        var times = item.DRAW_TIME;
                        var timess = times.substring(0, 10);
                        var phone = a[0].substring(0, 3) + "****" + a[0].substring(7, 11);
                        var jide = item.PRIZE;
                        var historystr = '<li class="com"><span style="width: 25%;">' + timess + '</span><span style="width: 30%;">' + phone + '</span><span style="width: 44%;">' + jide + '</span></li>';
                        $("#history ul").append(historystr);
                    }
                }
            })
        }
    })
}

/*
 * 中奖名单滚动
 */
$(function() {    //获得当前<ul>
    var $uList = $("#history ul");   
    var timer = null;    //触摸清空定时器
       
    $uList.hover(function() {    
        clearInterval(timer);   
    }, function() { //离开启动定时器
            
        timer = setInterval(function() {     
            scrollList($uList);    
        }, 1000);   
    }).trigger("mouseleave"); //自动触发触摸事件
        //滚动动画
       
    function scrollList(obj) {     //获得当前<li>的高度
            
        var scrollHeight = $("ul li:first").height();     //滚动出一个<li>的高度
            
        $uList.stop().animate({
            marginTop: -scrollHeight
        }, 600, function() {      //动画结束后，将当前<ul>marginTop置为初始值0状态，再将第一个<li>拼接到末尾。
                 
            $uList.css({
                marginTop: 0
            }).find("li:first").appendTo($uList);    
        });   
    }  
});


// var wait = 60;
// var area = document.getElementById('history');
// var con1 = document.getElementById('con1');
// var con2 = document.getElementById('con2');
// var speed = 50;
// area.scrollTop = 0;
// con2.innerHTML = con1.innerHTML;

// function scrollUp() {
//     if (area.scrollTop >= con1.scrollHeight) {
//         area.scrollTop = 0;
//     } else {
//         area.scrollTop++;
//     }
// }
// var myScroll = setInterval("scrollUp()", speed);
// area.onmouseover = function() {
//     clearInterval(myScroll);
// }
// area.onmouseout = function() {
//     myScroll = setInterval("scrollUp()", speed);
// }