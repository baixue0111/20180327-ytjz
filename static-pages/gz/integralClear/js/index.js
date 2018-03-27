
var openID_value;
$(function () {
    login();
    getOpenId();
    var openBtn = document.getElementById('openInteral'),
        showLogin = document.getElementById('showLogin');

    // 页面跳转
    openBtn.addEventListener('touchend', function () {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&response_type=code&scope=snsapi_base&state=123&from=singlemessage&isappinstalled=0&redirect_uri=http://gz2.mobicloud.com.cn/active/integral/index.html#wechat_redirect";
    }, false);

    //显示登录框
    showLogin.addEventListener('touchend', function () {
        var userPhone = localStorage.getItem('getphone');
        if(userPhone == "" || userPhone == null || userPhone == undefined) {
            login();
            $('.mask').show();
            $('.login_msg').show();
        } else {
            $('.mask').show();
            $('.login_msg').show();
            $("#phone").val(userPhone);
        }

    }, false);
})
    //获取openId
    function getOpenId(){
        var oi = localStorage.getItem('openID_value');
        var code = GetQueryString('code');
        if(oi == null || oi == "" || oi == undefined){  	//先判断openid是否为空，为空时执行这个函数
            var url='/weixin/auth/authInfo';
            $.ajax({
                type: 'get',
                url: url,
                data: {"code":code},
                dataType: 'json',
                contentType:'application/json;charset=UTF-8',
                success: function(data){
                    $('.mask').hide();
                    $("#loading").hide();
                    if(data.status == 1 && data.code == 1){
                        openID_value = data.authInfo.openId;
                        localStorage.setItem("openID_value",openID_value);
                        bing();
                    }
                }
            })
        }else{
            $('.mask').hide();
            $("#loading").hide();
            openID_value = localStorage.getItem('openID_value');
            bing();
        }

    }
    //判断是否绑定
    function bing(){
        var url = "/weixin/auth/isBind";
        $.post(url,{"openId":localStorage.getItem('openID_value')},function (data){
            if (data.status == 1 && data.code == 1) {
                if(data.isBind){
                    $("#Loading").hide();
                    var getphone=data.phone;
                    localStorage.setItem("getphone",getphone);
                }else{
                    denglu();
                    $("#Loading").hide();
                    $(".mask").show();
                    $("#denglu").show();
                }
            }
        } )
    }
    //绑定获取验证码
    function validate(btn){
        var url="/weixin/auth/send";
        var bdphone = $("#deng_phone").val();
        if(bdphone == "" || bdphone == null || bdphone == undefined) {
            $('.login_success').html("请输入手机号！");
            return;
        }
        var reg = /^(180|189|133|153|177|181|173)\d{8}$/;

        if (!reg.test($.trim(bdphone))) {
            $('.login_success').html("请输入正确手机号!");
            return;
        }
        $.ajax({
            type: 'get',
            url: url,
            data:{"phone":bdphone,"openId":localStorage.getItem('openID_value')},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){
                if(data.code==1&&data.status==1){
                    buttonTime(btn);
                }else{
                    $('.login_success').html(data.message);
                }

            },
            error:function(){
                $('.login_success').html("服务器连接失败！");
            }
        });
    }
    //电信用户绑定
    function binding(){
        var url='/weixin/auth/bind',
            bdphone= $("#deng_phone").val(),
            bdvalidateCode=$('#deng_yzm').val();

        if(bdphone==""||bdphone==null || bdphone == undefined){
            $('.login_success').html("请输入正确手机号！");
            return;
        }
        if(bdvalidateCode==""||bdvalidateCode==null || bdvalidateCode == undefined){
            $('.login_success').html("请输入正确手机号！");
            return;
        }

        var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
        if (!reg.test($.trim(bdphone))) {
            $('.login_success').html("请输入正确手机号！");
            return;
        }
        $.ajax({
            type: 'get',
            url: url,
            data: {"phone":bdphone,"openId":localStorage.getItem('openID_value'),"validateCode":bdvalidateCode, 'type': 1, 'invitorOpenId': ""},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){
                if(data.code==1&&data.status==1){
                    var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>'+
                        '<img class="login_queding" onclick="guab()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
                    $('#deng_successMessage').html(sustr);
                    localStorage.setItem('getphone', bdphone);
                } else {
                    $('.login_success').html(data.message);
                }
            },
            error:function(){
                $('.login_success').html("服务器连接失败！");
            }
        });
    }
    //绑定弹框
    function denglu(){
        var str1='<div>'+
            '<div class="login_title">贵州电信用户绑定</div>'+
            '</div>'+
            '<div id="deng_successMessage">'+
            '<div style="color:red;font-size:0.3rem;">贵州电信绑定即送100棒豆</div>'+
            '<input type="text" id="deng_phone" placeholder="请输入手机号" onfocus="clearError()">'+
            '<input type="text" id="deng_yzm" placeholder="请输入验证码" onfocus="clearError()">'+
            '<input type="button" id="deng_text" onclick="validate(this)" value="获取">'+
            '<div class="login_success"></div>'+
            '<div style="overflow: hidden;"><img src="img/sub.png" class="login_img" onclick="binding()"/></div>'+
            '<div class="login_zan" onclick="closeWindow()">暂不绑定</div>'+
            '</div>';
        $("#denglu").html(str1);
    }


    //验证码
    function validateInfo(btn) {
        var urlbd = "/weixin/auth/isBind";
        var url = "/weixin/conversion/send",
            phone = $("#phone").val(),
            param = {};
        if (phone == "" || phone == null || phone == undefined) {
            $('.error').html("请输入正确手机号！");
            return;
        }
        var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
        if (!reg.test($.trim(phone))) {
            $('.error').html("请输入贵州电信手机号码!");
            return;
        }
        $.post(urlbd,{"openId":localStorage.getItem('openID_value')},function (data){
            if (data.status == 1 && data.code == 1) {
                if(data.isBind){
                    $("#Loading").hide();
                    param["phone"] = phone;
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: JSON.stringify(param),
                        dataType: 'json',
                        contentType: 'application/json;charset=UTF-8',
                        success: function (data) {
                            if (data.code == 1 && data.status == 1) {
                                buttonTime(btn);
                            } else if (data.code == 0 && data.status == 1) {
                                $('.error').html(data.message);
                            } else if (data.code == 0 && data.status == 2) {
                                $('.error').html(data.message);
                            } else {
                                $('.con').html('<p>'+ data.message +'</p>');
                            }

                        },
                        error: function () {
                            $('.error').html("服务器连接失败！");
                        }
                    });
                } else {
                    $('.error').html("您还没有绑定，请先绑定再豆转星移!");
                }
            }
        } )
    }

    // 登记
    function apply() {
        var url = "/weixin/conversion/apply",
            phone = $("#phone").val(),
            code = $("#code").val();

        var param = {};

        if (phone == "" || phone == null || phone == undefined) {
            $('.error').html("请输入正确手机号！");
            return;
        }

        if (code == "" || code == null || code == undefined) {
            $('.error').html("请输入验证码！");
            return;
        }

        var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
        if (!reg.test($.trim(phone))) {
            $('.error').html("请输入贵州电信手机号码!");
            return;
        }

        param["phone"] = phone;
        param["openId"] = localStorage.getItem('openID_value');
        param["validateCode"] = code;

        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(param),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (data.code == 0 && data.status == 0) {
                    $('.error').html(data.message);
                } else if (data.code == 0 && data.status == 1) {
                    $('.error').html(data.message);
                } else if (data.code == 0 && data.status == 2) {
                    $('.error').html(data.message);
                } else if (data.code == 0 && data.status == 3) {
                    $('.error').html(data.message);
                } else if (data.code == 0 && data.status == 4) {
                    $('.error').html(data.message);
                } else {
                    $('.con').html('<p>'+ data.message +'</p>');
                }

            },
            error: function () {
                $('.error').html("服务器连接失败！");
            }
        });
    }
    // 登录框
    function login() {
        var str = '<div class="colsebtn">' +
            '<img src="img/close.png" id="closeBtn" onclick="closeLogin()">' +
            '</div>' +
            '<div class="login">' +
            '<div class="con">' +
            '<div class="phone"><input type="text" placeholder="请输入手机号" id="phone" onfocus="clearCon()"></div>' +
            '<div class="input_group">' +
            '<input type="text" placeholder="请输入验证码" id="code" onfocus="clearCon()">' +
            '<input type="button" value="获取验证码" class="code" onclick="validateInfo(this)">' +
            '</div>' +
            '<div class="error"></div>' +
            '<div class="config">' +
            '<img src="img/config.png" alt="" onclick="apply()">' +
            '</div>' +
            '</div>' +
            '</div>';

        $('.login_msg').html(str);
    }
    //关闭绑定框
    function closeWindow() {
        $(".mask").hide();
        $("#denglu").hide();
    }
    //清空绑定框错误提示
    function clearError() {
        $(".login_success").html("");
    }

    // 清空错误消息弹框
    function clearCon() {
        $(".error").html("");
    }

    // 关闭登录框
    function closeLogin() {
        $(".mask").hide();
        $(".login_msg").hide();
    }

    // 关闭绑定框
    function guab() {
        $(".mask").hide();
        $("#denglu").hide();
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
            btn.value = wait + "s";
            wait--;
            setTimeout(function () {
                buttonTime(btn);
            }, 1000)
        }
    }
