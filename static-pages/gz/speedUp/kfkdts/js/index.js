

// 点击"提交"按钮
function subEvent() {
    var name = $("#name").val(),
        kdzh = $("#kdzh").val(),
        selectAddr = $("#selectId").val(),
        // selectId = $("#selectId").find("option:selected").val();
        phone = $("#phone").val();

    // 定义正则
    var reg_name = /^[\u4E00-\u9FA5]{2,4}$/,
        phone_num = /^1[3|4|5|8][0-9]\d{4,8}$/,
        tel_num = /^0\d{2,3}-?\d{7,8}$/;


    // 验证姓名
    if(!reg_name.test(name)) {
        $(".errorMsg").html("请输入宽带账号对应正确姓名！");
        return;
    } else if(kdzh == "" || kdzh == "null" || kdzh == null || kdzh == undefined) {
        $(".errorMsg").html("请输入正确宽带账号!");
        return;
    } else if(selectAddr == "请选择所在的地区") {
        $(".errorMsg").html("请选择宽带账号对应地址");
        return;
    } else if(phone.length < 11) {
        if(!tel_num.test(phone)) {
            $(".errorMsg").html("请输入正确的联系方式！");
        } else {
            subFun(name, kdzh, selectAddr, phone);
        }
    } else {
        if(!phone_num.test(phone)) {
            $(".errorMsg").html("请输入正确的联系方式！");
        } else {
            subFun(name, kdzh, selectAddr, phone);
        }
    }
}

// “提交”接口
function subFun(name, kdzh, selectAddr, phone) {
    var url = "/weixin/wideBand/accelerates",
        param = {};
    param["name"] = name;
    param["wideBand"] = kdzh;
    param["region"] = selectAddr;
    param["phone"] = phone;
    param["from"] = 0;   // 1-> 贵州微信公众号, 0-> 贵州客服

    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(param),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function(data) {
            if(data.code == 1 && data.status == 1) {
                showAlert();
                $(".loginAlert").html('<p>您已成功提交宽带提速办理请求，请保持联系号码通讯畅通，我们将在3个工作日内联系您，谢谢参与！</p>');
            } else if(data.code == 0 && data.status == 1) {
                showAlert();
                $(".loginAlert").html('<p>'+ data.message +'</p>');
            } else {
                $(".errorMsg").html(data.message);
            }
        }
    })
}
// 弹框
function login() {
    var str = '<p class="closeBtn" onclick="closeAlert()"></p>'+
                '<div class="loginAlert">'+
                    '<div class="login-col">'+
                        '<span class="text">姓名</span>'+
                        '<input type="text" placeholder="请输入姓名" id="name" class="iptSize" onfocus="clearErrorMsg()">'+
                    '</div>'+
                    '<div class="login-col">'+
                        '<span class="text">宽带账号</span>'+
                        '<input type="text" placeholder="请输入电信宽带账号" id="kdzh" class="iptSize" onfocus="clearErrorMsg()">'+
                    '</div>'+
                    '<div class="login-col">'+
                        '<span class="text">所在地区</span>'+
                        '<select id="selectId" class="iptSize" style="width: 3.45rem;height: .45rem;">'+
                            '<option value="请选择所在的地区">请选择所在的地区</option>'+
                            '<option value="贵阳市">贵阳市</option>'+
                            '<option value="六盘水市">六盘水市</option>'+
                            '<option value="遵义市">遵义市</option>'+
                            '<option value="安顺市">安顺市</option>'+
                            '<option value="铜仁市">铜仁市</option>'+
                            '<option value="都匀市">都匀市</option>'+
                            '<option value="兴义市">兴义市</option>'+
                            '<option value="凯里市">凯里市</option>'+
                            '<option value="毕节市">毕节市</option>'+
                        '</select>'+
                    '</div>'+
                    '<div class="login-col">'+
                        '<span class="text">联系方式</span>'+
                        '<input type="text" placeholder="请输入联系方式" id="phone" class="iptSize" onfocus="clearErrorMsg()">'+
                    '</div>'+
                    '<div class="errorMsg"></div>'+
                    '<div class="login-col" style="margin-top: 0;">'+
                        '<span class="text"></span>'+
                        '<p class="subBtn" onclick="subEvent()"></p>'+
                    '</div>'+
                '</div>';
    $(".login").html(str);
}

// 显示弹框
function showAlert() {
    login();
    $(".mask").show();
    $(".login").show();
}

// 关闭弹框
function closeAlert() {
    $(".mask").hide();
    $(".login").hide();
}

// 清除错误提示
function clearErrorMsg() {
    $(".errorMsg").html("");
}