
    login();
    $(".mask").show();
    $(".login").show();


    $(".closeAlert").hide();
    $(".loginMsg").html('<p style="text-align: center; font-size: .24rem; line-height: .34rem;">优化中，敬请期待！</p>');

    shareConfig();  // 分享config配置
    wxReady();
    
    //点击“提交”按钮
    function subBtn1() {
        $(".affirmBtn").removeAttr("onclick");
        var url, userName, userPhone, userNumber;
        url = "/weixin/replacePackage/save";
        userName = $(".userName").val();
        userPhone = $(".userPhone").val();
        userNumber = $(".userNumber").val();
        
        var param = {};
        param["name"] = userName;
        param["phone"] = userPhone;
        param["userId"] = userNumber;
        param["channel"] = "1";  
        param["applicationPackage"] = "天翼不限量套餐";
    
        $.ajax({
            type: "post",
            url: url,
            data: JSON.stringify(param),
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if(data.status == 1 && data.code == 1) {
                    $(".loginMsg").addClass("loginSuccess");
                    $(".loginMsg").html('<p class="successMsg">申请成功</p><p class="lastp">您已申请成功，您此次办理的业务是<span class="redshow">天翼不限量套餐</span>，工作人员将在3个工作日内联系您！</p>');
                    $(".affirmBtn").attr("onclick","subBtn1()");
                } else if(data.status == 2 && data.code == 0) {
                    $(".loginMsg").addClass("loginSuccess");
                    $(".loginMsg").html('<p>' + data.message + '</p>');
                    $(".affirmBtn").attr("onclick","subBtn1()");
                } else if(data.status == 1 && data.code == 0) {
                    $(".errMsg").html(data.message);
                    $(".affirmBtn").attr("onclick","subBtn1()");
                } else {
                    $(".errMsg").html(data.message);
                    $(".affirmBtn").attr("onclick","subBtn1()");
                } 
            }
        })
    }
    
    //存折计划
    function subBtn2() {
        $(".affirmBtn").removeAttr("onclick");
        var url, userName, userPhone, userNumber;
        url = "/weixin/replacePackage/save";
        userName = $(".userName").val();
        userPhone = $(".userPhone").val();
        userNumber = $(".userNumber").val();

        var param = {};
        param["name"] = userName;
        param["phone"] = userPhone;
        param["userId"] = userNumber;
        param["channel"] = "1";   
        param["applicationPackage"] = "存折计划300元老用户6折-12月"; 
    
        $.ajax({
            type: "post",
            url: url,
            data: JSON.stringify(param),
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if(data.status == 1 && data.code == 1) {
                    $(".loginMsg").addClass("loginSuccess");
                    $(".loginMsg").html('<p class="successMsg">申请成功</p><p class="lastp">您已申请成功，你此次申请办理的业务是<span class="redshow">老用户预存300，套餐打6折优惠</span>，工作人员将在2个工作日内联系您。</p>');
                    $(".affirmBtn").attr("onclick","subBtn2()");
                } else if(data.status == 2 && data.code == 0) {
                    $(".loginMsg").addClass("loginSuccess");
                    $(".loginMsg").html('<p>' + data.message + '</p>');
                    $(".affirmBtn").attr("onclick","subBtn2()");
                } else if(data.status == 1 && data.code == 0) {
                    $(".errMsg").html(data.message);
                    $(".affirmBtn").attr("onclick","subBtn2()");
                } else {
                    $(".errMsg").html(data.message);
                    $(".affirmBtn").attr("onclick","subBtn2()");
                } 
            }
        })
    }
    //微信分享
    function shareConfig() {
        var localUrl, url, weixin, appId, timestamp, nonceStr, signature;
        localUrl = window.location.href;
        url = "/weixin/model/wxConfigSignature";
        $.ajax({
            url: url,
            type: "post",
            data: {"localUrl": localUrl},
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                if(data.code && data.status == 1) {
                    weixin = data.wxConfigSignatureData;
                    appId = weixin.appId;
                    timestamp = weixin.timestamp;
                    nonceStr = weixin.noncestr;
                    signature = weixin.signature;
                    wx.config({
                        debug: false,
                        appId: appId,
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                    })
                }
            }
        })
    }
    //分享ready函数
    function wxReady() {
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                success: function (res) {}
            })
            //分享朋友圈
            wx.onMenuShareTimeline({
                title: "中国贵州电信加油站",
                link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/WX-replacePackage/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect",
                imgUrl: "",
                success: function () {
    
                },
                cancel: function () {
                    alert("分享失败！");
                }
            })
            //分享微信好友
            wx.onMenuShareAppMessage({
                title: "中国贵州电信加油站",
                link: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/WX-replacePackage/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect",
                imgUrl: "",
                success: function () {
    
                },
                cancel: function () {
                    alert("分享失败！");
                }
            })
        })
    }
    
    
    //显示登录框
    function showLogin(btn) {
        login();
        $(".mask").show();
        $(".login").show();
        if(btn == 1) {
            $(".affirmBtn").attr("onclick", "subBtn1()");
        } else {
            $(".affirmBtn").attr("onclick", "subBtn2()");
        }
    }
    // 登录框
    function login() {
        var str = '<div class="closeAlert closeWindow" onclick="closeAlert()">'+
                '<span onclick="closeAlert()">'+
                    '<img src="img/close_07.png" alt="">'+
                '</span>'+
            '</div>'+
            '<div class="loginMsg">'+
                '<div class="input-group">'+
                    '<input type="text" class="userName" onfocus="focusClear()" placeholder="请输入联系人姓名">'+
                    '<input type="text" class="userPhone" onfocus="focusClear()" placeholder="请输入联系人手机号">'+
                    '<input type="text" class="userNumber" onfocus="focusClear()" placeholder="请输入联系人身份证号后四位">'+
                '</div>'+
                '<div class="errMsg"></div>'+
                '<div class="button">'+
                    '<p class="affirmBtn"></p>'+
                '</div>'+
            '</div>';
    
        $(".login").html(str);    
    }

