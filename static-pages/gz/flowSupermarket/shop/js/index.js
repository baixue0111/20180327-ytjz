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

var code, productId, openID_value, phone, openId, id;
$(function() {
        $('#loginMask').show(); //弹出层显示
        $("#loading").show(); //loading
        code = GetQueryString('code'); //获取code
        getOpenId(); //获取openid
        model();
    })
    //获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取openId 
function getOpenId() {
    var oi = $.cookie('openID_value');
    if (oi == null || oi == "" || oi == undefined) { //先判断openid是否为空，为空时执行这个函数  
        var url = '/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: { "code": code },
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                $('#loginMask').hide(); //弹出层隐藏
                $("#loading").hide(); //loading隐藏
                if (data.status == 1 && data.code == 1) {
                    openID_value = data.authInfo.openId;
                    $.cookie("openID_value", openID_value); //把openid储存到cookie中
                    getuserMsg(); //绑定手机号
                }
            }
        })
    } else {
        $('#loginMask').hide(); //弹出层隐藏
        $("#loading").hide();
        openID_value = $.cookie('openID_value');
        getuserMsg(); //绑定手机号
    }

}
//获取用户信息
function getuserMsg() {
    var url = "/weixin/auth/userInfo";
    openID_value = $.cookie('openID_value'); //获取openId值(cookie)
    $.post(url, { "openId": openID_value }, function(data) {
        if (data.status == 1 && data.code == 1) {
            //弹出层隐藏
            $("#loading").hide();
            var focusOn = data.userInfo.subscribe;
            if (focusOn == 1) { // 如果用户关注公众号则判断是否绑定
                bing();
            } else if (focusOn == 0) {
                bing();
            }
        }
    })
}

//查询微信用户是否绑定
function bing() {
    var url = "/weixin/auth/isBind";
    $.post(url, { "openId": $.cookie('openID_value') }, function(data) {
        if (data.status == 1 && data.code == 1) {
            if (data.isBind) {
                var getphone = data.phone;
                $.cookie("getphone", getphone);
                var qrcodeOpenId = GetQueryString('qrcodeOpenId');
                if (qrcodeOpenId == null || qrcodeOpenId == "" || qrcodeOpenId == undefined) {

                } else {
                    fromQRCode();
                }
            } else {
                $("#loginMask").show();
                $("#denglu").show();
                denglu();
            }
        }
    })
}
//查询通过二维码活动进来       已经绑定的用户
function fromQRCode() {
    var url = "/weixin/flowmarket/fromQRCode";
    var openId = $.cookie('openID_value');
    var phone = $.cookie('getphone');
    var qrcodeOpenId = GetQueryString('qrcodeOpenId');
    param = {};
    param["openId"] = openId;
    param["phone"] = phone;
    param["invitorOpenId"] = qrcodeOpenId;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {}
    });
}
//获取验证码
function validate(btn) {
    var url = "/weixin/auth/send";
    var phone = $("#deng_phone").val();
    if (phone == "" || phone == null) {
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;

    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号!");
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
                $('.login_success').html(data.message);
            }

        },
        error: function() {
            $('.login_success').html("服务器连接失败！");
        }
    });
}

//电信用户绑定
function binding() {
    var qrcodeOpenId = GetQueryString('qrcodeOpenId'); //获取邀请人的openId
    var url = '/weixin/auth/bind';
    var phone = $("#deng_phone").val();
    var validateCode = $('#deng_yzm').val();
    if (phone == "" || phone == null) {
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    if (qrcodeOpenId == null || qrcodeOpenId == "" || qrcodeOpenId == undefined) { //如果邀请人openId为null    绑定的type==1  否则else（邀请人openId不为null type==4）
        $.ajax({
            type: 'get',
            url: url,
            data: { "phone": phone, "openId": $.cookie('openID_value'), "validateCode": validateCode, "type": 1 },
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                if (data.code == 1 && data.status == 1) {
                    var sustr = '<p class="succ"><span style="color:red">恭喜您！</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>' +
                        '<img class="login_queding" onclick="guab()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
                    $('#deng_successMessage').html(sustr);
                    bing();
                } else if (data.code == 1 && data.status == 2) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 3) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 4) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 5) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 6) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 7) {
                    $('.login_success').html(data.message);
                }

            },
            error: function() {
                $('.login_success').html("服务器连接失败！");
            }
        });
    } else {
        $.ajax({
            type: 'get',
            url: url,
            data: { "phone": phone, "openId": $.cookie('openID_value'), "invitorOpenId": qrcodeOpenId, "validateCode": validateCode, "type": 4 },
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                if (data.code == 1 && data.status == 1) {
                    var sustr = '<p class="succ"><span style="color:red">恭喜您！</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>' +
                        '<img class="login_queding" onclick="guab()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
                    $('#deng_successMessage').html(sustr);
                } else if (data.code == 1 && data.status == 2) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 3) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 4) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 5) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 6) {
                    $('.login_success').html(data.message);
                } else if (data.code == 1 && data.status == 7) {
                    $('.login_success').html(data.message);
                }

            },
            error: function() {
                $('.login_success').html("服务器连接失败！");
            }
        });
    }

}
//绑定弹框
function denglu() {
    var str1 = '<div>' +
        '<div class="login_title">贵州电信用户绑定</div>' +
        '</div>' +
        '<div id="deng_successMessage">' +
        '<div style="color:red;font-size:0.3rem;">贵州电信绑定即送100棒豆</div>' +
        '<input type="text" id="deng_phone" placeholder="请输入手机号" onfocus="clearError()">' +
        '<input type="text" id="deng_yzm" placeholder="请输入验证码" onfocus="clearError()">' +
        '<input type="button" id="deng_text" onclick="validate(this)" value="获取">' +
        '<div class="login_success"></div>' +
        '<div><img src="img/sub.png" class="login_img" onclick="binding()"/></div>' +
        '<div class="login_zan" onclick="closeWindow()">暂不绑定</div>' +
        '</div>';
    $("#denglu").html(str1);
}

//分享
function model() {
    var url = '/weixin/model/wxConfigSignature';
    var domainUrl = window.location.protocol + "//" + window.location.host; // 取出http协议 和域名端口号进行拼接
    var localUrl = location.href.split('#')[0]; //获取当前页面的链接地址
    $.ajax({
        type: 'get',
        url: url,
        data: { "localUrl": localUrl },
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 1 && data.status == 1) {
                var dat = data.wxConfigSignatureData;
                wx.config({
                    //				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: dat.appId, // 必填，公众号的唯一标识
                    timestamp: dat.timestamp, // 必填，生成签名的时间戳
                    nonceStr: dat.noncestr, // 必填，生成签名的随机串
                    signature: dat.signature, // 必填，签名，见附录1
                    jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                //分享给朋友圈
                wx.ready(function() {
                    wx.onMenuShareTimeline({
                        title: '中国电信贵州加油站', // 分享标题
                        link: '' + domainUrl + '/active/shop/loading.html',
                        //		   				link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/shopp/weChatShare.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect', // 分享链接
                        imgUrl: '' + domainUrl + '/active/shop/img/sharttu.jpg', // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            alert('分享成功');
                            shareSta();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            alert('分享失败');
                        }
                    });
                    //				分享给朋友
                    wx.onMenuShareAppMessage({
                        title: '中国电信贵州加油站', // 分享标题
                        link: '' + domainUrl + '/active/shop/loading.html',
                        //		   				link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/shopp/weChatShare.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect', // 分享链接
                        imgUrl: '' + domainUrl + '/active/shop/img/sharttu.jpg', // 分享图标
                        desc: "10元1G流量特惠购", //摘要,如果分享到朋友圈的话，不显示摘要。
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
                            alert('分享成功');
                            shareSta();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                            alert('分享失败');
                        }
                    });
                });

            }
        }
    })

}

//流量超市分享统计
function shareSta() {
    var url = "/weixin/flowmarket/shareSta";
    var shareUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/shop/weChatShare.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
    var openId = $.cookie('openID_value');
    var phone = $.cookie('getphone');
    var param = {};
    param["openId"] = openId;
    param["phone"] = phone;
    param["url"] = shareUrl;
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

        }
    });
}
//如果不关注不能进入页面
function closeWindow() {
    wx.ready(function() {
        console.log("进入ready");
        wx.checkJsApi({
            jsApiList: ['closeWindow'],
            success: function(res) {
                console.log("关闭当前窗口：" + JSON.stringify(res));
            }
        });
        wx.closeWindow(); //关闭当前窗口
    });
}
//关闭绑定成功页面
function guab() {
    $("#loginMask").hide();
    $("#denglu").hide();
}

//tab切换
//var type=0;
$("#titList .tit").click(function() {
    var index = $("#titList .tit").index(this);
    //	type=index;
    $('#titList .tit').eq(index).addClass("spanFocus").siblings().removeClass("spanFocus");
    $('#content .zzz').eq(index).addClass('focus').siblings().removeClass("focus");
})

//产品获取  加餐包
function pageInit() {
    var url = "/weixin/flowmarket/productList";
    var type = 0;
    getphone = $.cookie("getphone");
    var openId = $.cookie('openID_value');
    var qrcodeOpenId = GetQueryString('qrcodeOpenId');
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
                        '<p><span class="b_price">￥' + item.fee + '元</span><span class="b_buy"><a href="dg.html?id=' + item.flowId + '&type=' + type + '&getphone=' + getphone + '&qrcodeOpenId=' + qrcodeOpenId + '&title=' + item.title + '">点击购买</a></span></p>' +
                        '<p class="b_groupList4">' + item.conditionalTips + '</p></div></div>' +
                        '<input type="hidden" id="flow' + item.id + '" value="' + item.flowId + '"/></li>';
                    $("#b_group1").append(str1);
                    $(".b_groupList1").css("background", "#edf9fe");
                    //						$(".b_groupImg1,.b_price,.b_buy").css("color","#0b8dca");
                    //						$(".b_buy").css("border-color","#0b8dca");
                })
            }
        }
    })
}
//包月包
function pageInit1() {
    var url = "/weixin/flowmarket/productList";
    var type = 1;
    getphone = $.cookie("getphone");
    var openId = $.cookie('openID_value');
    var qrcodeOpenId = GetQueryString('qrcodeOpenId');
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
                        '<p><span class="b_price" style="color:#ad7bed">￥' + item.fee + '元</span><span class="b_buy"><a href="dg.html?id=' + item.flowId + '&getphone=' + getphone + '&qrcodeOpenId=' + qrcodeOpenId + '&type=' + type + '&title=' + item.title + '">点击购买</a></span></p>' +
                        '<p class="b_groupList4">' + item.conditionalTips + '</p></div></div></li>';
                    $("#b_group2").append(str2);
                })
            }
        }
    })
}
//畅聊包
function pageInit2() {
    var url = "/weixin/flowmarket/productList";
    var type = 2;
    getphone = $.cookie("getphone");
    var openId = $.cookie('openID_value');
    var qrcodeOpenId = GetQueryString('qrcodeOpenId');
    var param = {};
    param["type"] = type;
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            $("#b_group3").empty();
            var datajson = data.productList;
            if (data.code == 1 && data.status == 1) {
                $.each(datajson, function(i, item) {
                    var str3 = '<li class="b_groupList"><div class="b_groupList1" style="background:#f7f7e1"><div class="b_groupImg">' +
                        '<img src="' + item.iconUrl + '" alt=""></div>' +
                        '<div class="b_groupList2"><p class="b_groupList3">' + item.title + '</p>' +
                        '<p><span class="b_price" style="color:#8b8b04">￥' + item.fee + '元<span class="b_buy"><a href="dg.html?id=' + item.flowId + '&getphone=' + getphone + '&qrcodeOpenId=' + qrcodeOpenId + '&type=' + type + '&title=' + item.title + '">点击购买</a></span></p>' +
                        '<p class="b_groupList4">' + item.conditionalTips + '</p></div></div></li>';
                    $("#b_group3").append(str3);
                })
            }
        }
    })
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

//抽奖跳转页面
function cho() {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/gzcj2/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
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
    getphone = $.cookie("getphone");
    $('#login1_succes2').html('<p class="asuccess">无限流量包产品升级中，敬请期待！</p>');
    $('#login1_but2').hide();
    //	console.log(typeof(getphone))  // string  字符串
    // if(getphone==""||getphone==null||getphone==undefined||getphone=="undefined"){
    //     $("#login1_phone2").val('');    //么有绑定的清空
    // }else{
    //     $("#login1_phone2").val(getphone);// 如果已经绑定了，兑换给自己       就默认手机号码
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
    param["where"] = "";
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