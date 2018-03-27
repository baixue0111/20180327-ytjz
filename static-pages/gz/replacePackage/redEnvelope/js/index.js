//显示登录框
function showLogin() {
    login();
    $(".mask").show();
    $(".login").show();
    // $(".affirmBtn").attr("onclick", "subBtn1()");
    //  添加活动已过期提示 
  $(".loginMsg").html('<p class="lastp" style="text-align: center;margin-bottom: 0.5rem;">您好，用流量送红包活动的报名日期已截止，更多优惠活动请持续关注“中国电信贵州加油站”！</p>');
}
// 登录框
function login() {
    var str = '<div class="closeAlert" onclick="closeAlert()">'+
        '<span onclick="closeAlert()">'+
        '<img src="img/close_07.png" alt="">'+
        '</span>'+
        '</div>'+
        '<div class="loginMsg">'+
        '<p class="login_p">您输入的号码必须是参加单宽带转十全十美套餐的号码</p>'+
        '<div class="input-group">'+
        '<input type="text" class="userName" onfocus="focusClear()" placeholder="请输入联系人姓名">'+
        '<input type="text" class="userPhone" onfocus="focusClear()" placeholder="请输入联系人手机号或宽带账号">'+
        '<input type="text" class="userNumber" onfocus="focusClear()" placeholder="请输入联系人身份证号后4位">'+
        '</div>'+
        '<div class="errMsg"></div>'+
        '<div class="button">'+
        '<p class="affirmBtn"></p>'+
        '</div>'+
        '</div>';

    $(".login").html(str);
}
//点击领取红包
var userName, userPhone, userNumber,dataStatus,dataMessage;
function subBtn1() {
    $(".affirmBtn").removeAttr("onclick");
    var  url = "/weixin/replacePackage/receive";
    userName = $(".userName").val();
    userPhone = $(".userPhone").val();
    userNumber = $(".userNumber").val();
    var param = {};
        param["name"] = userName;
        param["phone"] = userPhone;
        param["userId"] = userNumber;
    $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(param),
        dataType: "JSON",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(data.status == 1 && data.code == 0) {
                $(".loginMsg").addClass("loginSuccess");
                $(".loginMsg").html('<p class="successMsg">登记成功</p><p class="lastp">您必须将目前套餐转为十全十美套餐且本月使用流量达到5G，下月方可获取红包。</p>');
                $(".affirmBtn").attr("onclick","subBtn1()");
            } else if(data.status == 2 && data.code == 0) {
                $(".loginMsg").addClass("loginSuccess");
                $(".loginMsg").html('<p class="successMsg">登记成功</p><p class="lastp">您本月使用流量必须达到5G，下月方可获取红包。</p>');
                $(".affirmBtn").attr("onclick","subBtn1()");
            } else {
                $(".errMsg").html(data.message);
                $(".affirmBtn").attr("onclick","subBtn1()");
            }
            dataStatus = data.status;
            dataMessage = data.message;
            history();
        },
        error:function(){
            $(".loginMsg").addClass("loginSuccess");
            $(".loginMsg").html('<p>无法链接服务器，请稍后再试！</p>');
            $(".affirmBtn").attr("onclick","subBtn1()");
        }
    })
}
function history(){
    var  url = "/weixin/replacePackage/history";
    var param = {};
        param["name"] = userName;
        param["phone"] = userPhone;
        param["userId"] = userNumber;
        param["success"] = dataStatus;
        param["msg"] = dataMessage;
    $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(param),
        dataType: "JSON",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
        }
    })
}

