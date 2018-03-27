var param,sz_param,getProductId,payMode=0;
$(function(){
    param=GetQueryString("param");
    sz_param=param.split(",");
    getProductId=sz_param[0];
    openId=sz_param[1];
    $.cookie('payMode',payMode);
    get_details();
    $(".settle_btn").click(function(){
        $("#err_msg").show();
        clearInterval(time);
        var time=setInterval(function(){
            $("#err_msg").hide();
        },2000)
    })   

})



//获取推荐机型的详细信息
function get_details(){
    var url="/weixin/model/recomm";
    $.post(url,{"productId":getProductId},function(data){
        if (data.status==1&&data.code==1) {
            var img_url=data.model.logo_url;  // 手机图片
            var phone_name=data.model.model_version;  //机型
            var phone_manufacturer=data.model.manufacturer;
            var phone_fee=data.model.fee;  // 价钱

            $(".name_fontSize").html(phone_manufacturer+" "+phone_name);
            $(".name_money em").html("￥"+phone_fee);
            $(".yf_je em").html("￥"+phone_fee);
            if(img_url==""||img_url==null){
                $(".phone_img img").attr('src',"image/db2.jpg");
            }else{
                $(".phone_img img").attr('src',img_url);
            }

            if(getProductId==10000002){
                $(".name_color").html("颜色：金色     版本：4G全网通（BV0701）/金色");
                $(".song").html("【赠品】  充电宝或手机支架随机发出");
            }else if(getProductId==10000003){
                $(".name_color").html("颜色：灰色     版本：4G全网通（BV0701）/灰色");
                $(".song").html("【赠品】  充电宝或手机支架随机发出");
            }else if(getProductId==10000005){
                $(".name_color").html("颜色：金色     版本：华尔金/全网通/4GB+64GB");
                $(".song").html("【赠品】  自拍杆和蓝牙音箱");
            }else if(getProductId==10000004){
                $(".name_color").html("颜色：金色     版本：中兴(ZTE)远航Blade A601 全网通4G智能手机"); 
                $(".song").html("【赠品】  充电宝或手机支架随机发出");
            }
        }
    })
}


//选择支付方式
$(".pay_mode").click(function(){
    payMode=$(".pay_mode").index(this);
    $(".pay_mode").eq(payMode).addClass("default_pay").siblings().removeClass("default_pay");
    $.cookie('payMode',payMode);
    var new_payMode=$.cookie('payMode');
})

function add_address(){
    $("#err_msg").html("");
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/address_list.html?param="+param;
}



// 返回上一页
function goback(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/far_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 跳转到退货页面
function return_th(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/sales_return.html?param="+getProductId+","+openId;
}

//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

