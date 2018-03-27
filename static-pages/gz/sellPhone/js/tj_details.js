//获取openID
var code,productId;
$(function(){
    $(".details_mask").show();
    $("#loading").show();
    code=GetQueryString('code');
    productId = $("#productIdTianji").val();  // 获取productId
    getOpenId(); //获取openId
})


function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


//获取openId 
function getOpenId(){
    var oi = $("#openIdInput").val();

    if(oi==null||oi==""||oi==undefined){
        var url='/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: {"code":code},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){
                $(".details_mask").hide();
                $("#loading").hide();
                if(data.status==1&&data.code==1){
                    openID_value=data.authInfo.openId;
                    $("#openIdInput").val(openID_value);

                }
            }
        })
    }else{
        $(".details_mask").hide();
        $("#loading").hide();
    }
    
}



//抢购
function qiang_gou(){
    show_mark();
    var url="/weixin/model/recomm";
    //console.log(productId);

    $.post(url,{"productId":productId},function(data){
        if (data.status==1&&data.code==1) {
            var img_url=data.model.logo_url;  // 手机图片
            var phone_name=data.model.model_version;  //机型
            var phone_manufacturer=data.model.manufacturer;
            var phone_fee=data.model.fee;  // 价钱

            $("#name_phone").html(phone_manufacturer+" "+phone_name);
            $("#fee_phone").html("￥"+phone_fee);
            $("#song").html("【赠品】自拍杆和蓝牙音箱");
            if(img_url==""||img_url==null||img_url==undefined){

                $(".alertcon1_left img").attr('src',"image/db2.jpg");


            }else{

                $(".alertcon1_left img").attr('src',img_url);

            }
        }
    })

    // 用户点击“立即抢购”
    var url2="/weixin/model/addActionLog";
        openidVal=$("#openIdInput").val();
    $.post(url2,{"openId":openidVal,"productId":productId,"action":"产品详情-立即抢购"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
}


// 显示弹框
function show_mark(){
    $(".details_mask2").show();
    $(".buy_alert").show();
}

// 隐藏弹框
function hide_mark(){
    $(".details_mask2").hide();
    $(".buy_alert").hide();
}


// 页面切换
function open_xx4details(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/xx4_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//跳转到对比页(productId)
function tz_db(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/type_contrast.html?param="+productId+","+$("#openIdInput").val();
}

//跳转到我的订单
function myorder_qh(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading2.html?param="+productId+","+$("#openIdInput").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}
//跳转到结算页面
function jsbtn(){
    //用户点击“结算”
    var url="/weixin/model/addActionLog";
        openidVal=$("#openIdInput").val();
    $.post(url,{"openId":openidVal,"productId":productId,"action":"产品详情-立即抢购-结算"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading3.html?param="+productId+","+$("#openIdInput").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    //window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/affirm_order.html?param="+productId+","+$("#openIdInput").val();
}

// 跳转到退货页面
function return_th(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/sales_return.html?param="+productId+","+$("#openIdInput").val();
}

// 返回上一页
function goback(){
    window.history.go(-1);
}

//过期窗口显示
function datedShow(){
    $(".details_mask").show();
    $(".activeOver").show();
}
//过期窗口隐藏
function datedHide(){
    $(".details_mask").hide();
    $(".activeOver").hide();
}