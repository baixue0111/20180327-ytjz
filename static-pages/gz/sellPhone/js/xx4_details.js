
var code,openID_value;
var p_id=$("#productIdXian4J").val();
$(function(){
    $(".details_mask").show();
    $("#loading").show();
    code=GetQueryString('code');
    getOpenId();
    //qiang_gou();
})



//获取openID
function getOpenId(){
    var xiao_openId=$("#xiao_openId").val();
    if(xiao_openId==null||xiao_openId==""||xiao_openId==undefined){
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
                    $("#xiao_openId").val(openID_value);
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
    var url="/weixin/model/recomm";
    $.post(url,{"productId":p_id},function(data){
        if (data.status==1&&data.code==1) {
            var img_url=data.model.logo_url;  // 手机图片
            var phone_name=data.model.model_version;  //机型
            var phone_manufacturer=data.model.manufacturer;
            var phone_fee=data.model.fee;  // 价钱

            $("#name_phone").html(phone_manufacturer+" "+phone_name);
            $("#fee_phone").html("￥"+phone_fee);
            $(".alertcon1_left img").attr('src',img_url);
            $("#song").html("【赠品】  充电宝或手机支架随机发出");
        }
    })

}


// 显示弹框
function show_mark(){
    $(".details_mask2").show();
    $(".buy_alert").show();

    // 用户点击“立即抢购”
    var url2="/weixin/model/addActionLog";
        openidVal=$("#xiao_openId").val();
    $.post(url2,{"openId":openidVal,"productId":p_id,"action":"产品详情-立即抢购"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
}

// 隐藏弹框
function hide_mark(){
    $(".details_mask2").hide();
    $(".buy_alert").hide();
}

//点击颜色
$(".color_btn p").click(function(){
    var index=$(".color_btn p").index(this);
    $(".color_btn p").eq(index).addClass("select_p").siblings().removeClass("select_p");
    if(index==0){
        p_id=$("#productIdXian4J").val();
    }else{
        p_id=$("#productIdXian4H").val();
    }
    qiang_gou();
})




// 跳转页面
function open_tjdetails(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/tj_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//先跳转loading参数(productId也就是p_id)
function tz_db(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/type_contrast.html?param="+p_id+","+$("#xiao_openId").val();
}
//跳转到我的订单
function myorder_qh(){

    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading2.html?param="+p_id+","+$("#xiao_openId").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//跳转到结算页面
function jsbtn(){

    //用户点击“结算”
    var url="/weixin/model/addActionLog";
        openidVal=$("#xiao_openId").val();
    $.post(url,{"openId":openidVal,"productId":p_id,"action":"产品详情-立即抢购-结算"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading3.html?param="+p_id+","+$("#xiao_openId").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 跳转到退货页面
function return_th(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/sales_return.html?param="+p_id+","+$("#xiao_openId").val();
}

// 返回上一页
function goback(){
    window.history.go(-1);
}

//过期窗口显示
function datedShow(){
    $(".details_mask2").show();
    $(".activeOver").show();
}
//过期窗口隐藏
function datedHide(){
    $(".details_mask2").hide();
    $(".activeOver").hide();
}

//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}