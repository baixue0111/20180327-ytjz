
var param,sz_param,getopenId,get_id,getProductId,payIndex;
$(function(){
    param=GetQueryString("param");
    sz_param=param.split(",");
    getopenId=sz_param[1];
    ytopenId=sz_param[2];
    get_id=sz_param[3];
    getProductId=sz_param[0];
    payIndex=$.cookie('payMode');
    //console.log("payMode========"+payIndex);
    $(".pay_mode").eq(payIndex).addClass("default_pay");
    address_details();
    get_details();
})





//获取地址详细信息
function address_details(){
    var url="/weixin/model/addressInfo";
    $.post(url,{"id":get_id},function(data){
        if(data.status==1&&data.code==1){
            var get_address=data.addressInfo.receive_address;
            var get_name=data.addressInfo.receive_name;
            var get_phone=data.addressInfo.receive_phone.substring(0,3)+"***"+data.addressInfo.receive_phone.substring(7,11);

            $("#get_name").html(get_name);
            $(".sh_phone").html(get_phone);
            $(".break_all").html(get_address);
        }
    })
}

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
            $(".name_money").html("￥"+phone_fee);
            $(".yf_je").html("￥"+phone_fee);

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




// 获取IP
var LocaltionIP;
jQuery(function ($) {
    var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
    $.getJSON(url, function (data) {
        LocaltionIP=data.Ip;//弹出本地ip
    });
});


//选择支付方式
$(".pay_mode").click(function(){
    payIndex=$(".pay_mode").index(this);
    //console.log("payIndex====="+payIndex)
    $(".pay_mode").eq(payIndex).addClass("default_pay").siblings().removeClass("default_pay");
    //console.log(payIndex)
})

//结算
var appId,nonceStr,package,paySign,signType,timeStamp;
function settle() {
    var url="/weixin/model/pay";
    $("#mask").show();
    $("#loading").show();
    $.post(url, {"openId":getopenId,"ytOpenId":ytopenId,"ip":LocaltionIP,"productId":getProductId,"addressId":get_id,"type":payIndex}, function (data) {
         if(data.status==1&&data.code==1){
            userActive(getopenId,getProductId,payIndex);
            if (payIndex==0) {
                $("#mask").hide();
                $("#loading").hide();
                var orderid=data.orderId;
                var weixin=data.weixinJSBridgeData;
                appId=weixin.appId;
                nonceStr=weixin.nonceStr;
                package=weixin.package2;
                paySign=weixin.paySign;
                signType=weixin.signType;
                timeStamp=weixin.timeStamp;
                //alert("微信统一下单成功！") 
               onBridgeReady(appId,nonceStr,package, paySign, signType,timeStamp,orderid);
           }else if(payIndex==1){
                $("#mask").hide();
                $("#loading").hide();
                $(".successAlert").show();
           }    
       }
    })
}

function onBridgeReady(appId,nonceStr,package, paySign, signType,timeStamp,orderid) {
    WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                   "appId":appId,          
                   "timeStamp":timeStamp,         
                   "nonceStr":nonceStr,      
                   "package":package,  //使用接口返回的package2字段
                   "signType":signType,            
                   "paySign":paySign  
               },
               function(res){    
            // alert("-------"+JSON.stringify(res)) 
                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        //alert("OK!")
                        count(orderid,"ok");
                     window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/my_order.html?param="+param;
                     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                        count(orderid,"cancel");
                    }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                        count(orderid,"fail");
                    }

               }
           ); 
    
}

//再次结算
function settle2() {
    var url="/weixin/model/rePay";
     $.post(url, {"orderId":"1477534484863","ip":LocaltionIP}, function (data) {
         if(data.status==1&&data.code==1){
            var weixin=data.weixinJSBridgeData;
            appId=weixin.appId;
            nonceStr=weixin.nonceStr;
            package=weixin.package2;
            paySign=weixin.paySign;
            signType=weixin.signType;
            timeStamp=weixin.timeStamp;
            //alert("微信统一下单成功！")
            WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                   "appId":appId,          
                   "timeStamp":timeStamp,         
                   "nonceStr":nonceStr,      
                   "package":package,  //使用接口返回的package2字段
                   "signType":signType,            
                   "paySign":paySign  
               },
               function(res){     
                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        alert("OK!")
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
               }
           ); 
        }
	})
}

//更新订单微信返回信息
function count(id,msg){
    var url="/weixin/model/upOrderMsg";
    $.post(url,{"id":id,"msg":msg},function(data){
        if(data.status==1&&data.code==1){

        }
    })
}

//记录用户行为
function userActive(openId,productId,type){
    var url="/weixin/model/addActionLog";
        action="预约：openId:"+openId+"   productId:"+productId+"  type:"+type;
    $.post(url,{"openId":openId,"productId":productId,"action":action},function(data){
        if (data.status==1&&data.code==1) {

        }
    })
}

//返回历史
function return_history(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/far_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//跳转至管理地址
function manage_address(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/address_list.html?param="+param;
}

//点击确定跳转到我的订单
function affirm(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/my_order.html?param="+param;
    //alert(getopenId)
}

// 跳转到退货页面
function return_th(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/sales_return.html?param="+getProductId+","+getopenId;
}

//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}