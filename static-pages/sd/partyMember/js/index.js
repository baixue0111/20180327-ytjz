

function apply() {
    var url = '/sda2/staff/apply';
    var staff = $("#y_phone").val();  // 员工号码
    var target = $("#m_phone").val();  // 目标号码
    var donation = $("#z_phone").val();  // 转赠号码
    var param = {};
    if(staff == "" || staff == null || staff == undefined) {
        showMsg();
        $('.message').html("请输入员工手机号！");
        return;
    }
    if(target == "" || target == null || target == undefined) {
        showMsg();
        $('.message').html("请输入目标用户号码！");
        return;
    }
    param['staff'] = staff;
    param['target'] = target;
    param['donation'] = donation;
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(param),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            if(data.code == 5) {
                showMsg();
                $('.message').html(data.message);
            } else {
                showMsg();
                $('.message').html(data.message);
            }
        }
    })
}

//显示消息弹框
function showMsg() {
    $(".message-login").show();
    $(".mask").show();
}

// 关闭消息弹框
function hideMsg() {
    $(".message-login").hide();
    $(".mask").hide();
}