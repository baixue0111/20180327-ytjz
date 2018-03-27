showReminder();
$(".closeWindow").hide();
$(".loginMsg").html('<p style="text-align: center; font-size: .24rem; line-height: .34rem;">优化中，敬请期待！</p>');


decrypt();

function decrypt() {
    var url = "/weixin/flowmarket/decrypt";
    var argumentUrl = window.location.href;
    var param = {};

    param["cipherText"] = argumentUrl;

    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json;charset=UTD-8",
        success: function (data) {
            if (data.code == 0 && data.status == 0) {
               
            } else if(data.code == 0 && data.status == 1) {
                
            } else if(data.code == 0 && data.status == 2) {
                
            } else {
                localStorage.setItem("phone", data.phone);
            }
        }
    })
}


//点击十全十美套餐
function subBtn1() {
    $(".affirmBtn").removeAttr("onclick");
    var url, userName, userPhone, userNumber;
    url = "/weixin/replacePackage/save";
    userName = $(".userName").val();
    userPhone = $(".userPhone").val();
    userNumber = $(".userNumber").val();

    /*regName = /^[\u4E00-\u9FA5]{2,4}$/;   // 验证名字
    regPhone = /^(180|189|133|153|177|181|173)\d{8}$/;  //验证贵州电信号段
    
    //判断身份证号
    if(userNumber == "" || userNumber == null || userNumber == "null") {
        $(".errMsg").html("请输入手机号认证的身份证后4位");
        $(".affirmBtn").attr("onclick","subBtn1()");
    } else {
        idCard = $(".userNumber").val().length;
        if(idCard > 4 || idCard < 4) {
            $(".errMsg").html("请输入手机号认证的身份证后4位");
            $(".affirmBtn").attr("onclick","subBtn1()");
        }
    }

    //判断姓名
    if(userName == "" || userName == null || userName == "null") {
        $(".errMsg").html("请输入手机号认证的姓名");
        $(".affirmBtn").attr("onclick","subBtn1()");
    } else {
        if(!regName.test(userName)) {
            $(".errMsg").html("请输入手机号认证的姓名");
            $(".affirmBtn").attr("onclick","subBtn1()"); 
            return;
        }
    }
    
    //判断手机号
    if(userPhone == "" || userPhone == null || userPhone == "null") {
        $(".errMsg").html("请输入贵州电信手机号");
        $(".affirmBtn").attr("onclick","subBtn1()");
    } else {
        if(!regPhone.test(userPhone)) {
            $(".errMsg").html("请输入贵州电信手机号");
            $(".affirmBtn").attr("onclick","subBtn1()");
            return; 
        }
    }*/
    var param = {};
    param["name"] = userName;
    param["phone"] = userPhone;
    param["userId"] = userNumber;
    param["channel"] = "0";  
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

// 记录用户行为
function loginUser() {
    var url = "/weixin/replacePackage/req";
    var param = {};
    param['click'] = "click";

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(param),
        dataType: 'JSON',
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            console.log("请求weixin/replacePackage/req此接口");
        }
    })
}
//点击存折计划
function subBtn2() {
    $(".affirmBtn2").removeAttr("onclick");
    var url, userName, userPhone, userNumber;
    url = "/weixin/replacePackage/save";
    userName = $(".userName").val();
    userPhone = $(".userPhone").val();
    userNumber = $(".userNumber").val();

    // regName = /^[\u4E00-\u9FA5]{2,4}$/;   // 验证名字
    // regPhone = /^(180|189|133|153|177|181|173)\d{8}$/;  //验证贵州电信号段
    
    // //判断身份证号
    // if(userNumber == "" || userNumber == null || userNumber == "null") {
    //     $(".errMsg").html("请输入手机号认证的身份证后4位");
    //     $(".affirmBtn2").attr("onclick","subBtn2()");
    // } else {
    //     idCard = $(".userNumber").val().length;
    //     if(idCard > 4 || idCard < 4) {
    //         $(".errMsg").html("请输入手机号认证的身份证后4位");
    //         $(".affirmBtn2").attr("onclick","subBtn2()");
    //     }
    // }

    // //判断姓名
    // if(userName == "" || userName == null || userName == "null") {
    //     $(".errMsg").html("请输入手机号认证的姓名");
    //     $(".affirmBtn2").attr("onclick","subBtn2()");
    // } else {
    //     if(!regName.test(userName)) {
    //         $(".errMsg").html("请输入手机号认证的姓名"); 
    //         $(".affirmBtn2").attr("onclick","subBtn2()");
    //         return;
    //     }
    // }
    
    // //判断手机号
    // if(userPhone == "" || userPhone == null || userPhone == "null") {
    //     $(".errMsg").html("请输入贵州电信手机号");
    //     $(".affirmBtn2").attr("onclick","subBtn2()");
    // } else {
    //     if(!regPhone.test(userPhone)) {
    //         $(".errMsg").html("请输入贵州电信手机号");
    //         $(".affirmBtn2").attr("onclick","subBtn2()");
    //         return; 
    //     }
    // }
    var param = {};
    param["name"] = userName;
    param["phone"] = userPhone;
    param["userId"] = userNumber;
    param["channel"] = "0";
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
                $(".affirmBtn2").attr("onclick","subBtn2()");
            } else if(data.status == 2 && data.code == 0) {
                $(".loginMsg").addClass("loginSuccess");
                $(".loginMsg").html('<p>' + data.message + '</p>');
                $(".affirmBtn2").attr("onclick","subBtn2()");
            } else if(data.status == 1 && data.code == 0) {
                $(".errMsg").html(data.message);
                $(".affirmBtn2").attr("onclick","subBtn2()");
            } else {
                $(".errMsg").html(data.message);
                $(".affirmBtn2").attr("onclick","subBtn2()");
            } 
        }
    })
}
//显示登录框
function showLogin(btn) {
    loginUser();
    login();
    $(".mask").show();
    $(".login").show();
    if(btn == 1) {
        var getPhone = localStorage.getItem("phone");
        if (getPhone) {
            $(".userPhone").val(getPhone);
        } else {
            getPhone =  $(".userPhone").val();
        }
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
                '<input type="text" class="userNumber" onfocus="focusClear()" placeholder="请输入联系人身份证号后4位">'+
            '</div>'+
            '<div class="errMsg"></div>'+
            '<div class="button">'+
                '<p class="affirmBtn"></p>'+
            '</div>'+
        '</div>';

    $(".login").html(str);    
}


function showReminder() {
    login();
    $(".mask").show();
    $(".login").show();
}