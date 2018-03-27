subClick = function() {
    var url, phone, fphone;
    url = "/sda2/auxiliary/apply";
    phone = $(".phone").val();
    fphone = $(".friend-phone").val();
    if (phone == "" || phone == null || phone == "null" || phone == undefined || phone == "undefined") {
        $('.errMsg').html("请输入手机号！");
        return;
    }

    if (fphone == "" || fphone == null || phone == "null" || fphone == undefined || fphone == "undefined") {
        $('.errMsg').html("请输入被辅导人号码");
        return;
    }
    var param = {};
    param["inviter"] = phone;
    param["invitedPerson"] = fphone;

    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            if (data.code == 0) {
                $(".dec").hide();
                $(".title").html("提交失败！");
                $(".sucessMsg").addClass('errormsg');
                $(".sucessMsg").html(data.message);
                $(".phone").val("");
                $(".friend-phone").val("");
                $(".dec").hide();
                showLogin();
            } else if (data.code == 1) {
                $(".errMsg").html(data.message);
            } else if (data.code == 2) {
                $(".sucessMsg").html(data.message);
                $(".sucessMsg").addClass('errormsg');
                $(".title").html("提交失败！");
                $(".dec").hide();
                showLogin();
            } else if (data.code == 4) {
                showLogin();
                $(".msg").html('<p class="title">已提交！</p><p class="dec">快去辅导TA使用联通4G网络吧。</p><div class="sucessMsg"><p class="sucessMsg-title">使用联通4G网络小贴士：</p><ul class="sucessMsg-ul"><li><span>第一步：</span><span class="widthSpan">使用全网通4G手机；</span></li><li><span>第二步：</span><span class="widthSpan">点击设置-打开4G开关；</span></li><li><span>第三步：</span><span class="widthSpan">关闭wifi，打开数据流量。微博、网购、听歌、追剧，尽情享受联通4G！</span></li></ul></div>');
            } else if (data.code == 6) {
                $(".sucessMsg").html(data.message);
                $(".title").html("提交失败！");
                $(".sucessMsg").addClass('errormsg');
                $(".dec").hide();
                showLogin();
            } else {
                $(".sucessMsg").html(data.message);
                $(".title").html("提交失败！");
                $(".sucessMsg").addClass('errormsg');
                $(".dec").hide();
                showLogin();
            }
        }
    })
}


// 显示成功
//var str = '<p class="title">已提交！</p><p class="dec">快去辅导TA使用联通4G网络吧。</p><div class="sucessMsg"><p class="sucessMsg-title">使用联通4G网络小贴士：</p><ul class="sucessMsg-ul"><li><span>第一步：</span><span class="widthSpan">使用全网通4G手机；</span></li><li><span>第二步：</span><span class="widthSpan">点击设置-打开4G开关；</span></li><li><span>第三步：</span><span class="widthSpan">关闭wifi，打开数据流量。微博、网购、听歌、追剧，尽情享受联通4G！</span></li></ul></div>';

//显示错误提示框
showLogin = function() {
        $(".mask").show();
        $(".errorAlert").show();
    }
    //隐藏错误提示框
hideLogin = function() {
    $(".mask").hide();
    $(".errorAlert").hide();
}

//清空错误提示信息
function clearMsg() {
    $(".errMsg").html("");
}

//显示活动说明
showActivity = function() {
        $(".mask").show();
        $("#activity").show();
        $('.activity-list').on('scroll', function(event) {
            event.preventDefault();
        });
    }
    //隐藏活动说明
hideActivity = function() {
    $(".mask").hide();
    $("#activity").hide();
}