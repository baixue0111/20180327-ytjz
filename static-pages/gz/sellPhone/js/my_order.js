var param,p_id,order_number,sz_param,ytopenId,gzopenId;
$(function(){
    $("#mask").show();
    $("#loading").show();
    param=GetQueryString("param");
    sz_param=param.split(",");
    ytopenId=sz_param[2];
    gzopenId=sz_param[1];
    orderList();
})

//获取推荐机型的详细信息
function orderList(){
    var url="/weixin/model/modelOrderList";
    $.post(url,{"openId":gzopenId},function(data){
        $("#mask").hide();
        $("#loading").hide();
        if (data.status==1&&data.code==1) {
            var dataJson=data.modelOrders;
            $.each(dataJson,function(i,item){
                var str='<li>'+
                    '<header><p class="order_name"><span>订单编号</span><span>'+item.id+'</span></p><h2 class="pay_status_'+item.id+'"></h2></header>'+
                    '<div class="order_phone">'+
                        '<input type="hidden" value="'+item.id+'">'+
                        '<div class="phone_img"><img src="'+item.logo_url+'" alt="" id="id_'+item.id+'"></div>'+
                        '<div class="phone_details">'+
                            '<p class="name_fontSize">'+item.manufacturer+" "+item.model_version+'</p>'+
                            '<p class="name_color_'+item.id+'"></p>'+
                            '<p class="money_count"><span class="name_money">￥'+item.fee+'</span><span class="name_count">X1</span></p>'+
                        '</div>'+
                    '</div>'+
                    '<p class="phone_gift"><span class="song_'+item.id+'"> </span><span>X1</span></p>'+
                    '<p class="phone_total"><span>合计：￥<em>'+item.fee+'</em></span><span>共<em>1</em>件商品</span></p>'+
                    '<div class="phone_btn_'+item.id+'" style="display:none;overflow:hidden;margin-top:5%;"><p class="btn" onclick="tz_order(this,'+item.id+')">付款</p></div>'+
                '</li>';

                $(".stay_payment_con").append(str);

                var url_img=item.logo_url;

                if(url_img==""||url_img==null||url_img==undefined){
                    $("#id_"+item.id).attr('src','image/db2.jpg')
                }else{
                    $("#id_"+item.id).attr('src',url_img)
                }

                var payMode=item.type;
                if (payMode==0) {
                    var getstatus=item.status;
                    if(getstatus==0){
                        
                        $(".pay_status_"+item.id).html("待支付");
                        $(".phone_btn_"+item.id).show();
                    }else if(getstatus==1){
                        $(".pay_status_"+item.id).html("支付成功");
                        $(".pay_status_"+item.id).css("color","#ccc");
                        $(".phone_btn_"+item.id).hide();

                    }else if(getstatus==2){
                        $(".pay_status_"+item.id).html("支付失败");
                        $(".pay_status_"+item.id).css("color","#ccc");
                        $(".phone_btn_"+item.id).hide();
                    }else if(getstatus==3){
                        $(".pay_status_"+item.id).html("取消支付");
                        $(".pay_status_"+item.id).css("color","#ccc");
                        $(".phone_btn_"+item.id).hide();
                    }
                }else if(payMode==1){
                    $(".pay_status_"+item.id).html("货到付款");
                    $(".pay_status_"+item.id).css("color","#ccc");
                    $(".phone_btn_"+item.id).hide();
                }

                

                var productId_value=item.product_id;

                if(productId_value==10000002){
                    $(".name_color_"+item.id).html("颜色：金色     版本：4G全网通（BV0701）/金色");
                    $(".song_"+item.id).html("【赠品】  充电宝或手机支架随机发出");
                }else if(productId_value==10000003){
                    $(".name_color_"+item.id).html("颜色：灰色     版本：4G全网通（BV0701）/灰色");
                    $(".song_"+item.id).html("【赠品】  充电宝或手机支架随机发出");
                }else if(productId_value==10000005){
                    $(".name_color_"+item.id).html("颜色：金色     版本：华尔金/全网通/4GB+64GB");
                    $(".song_"+item.id).html("【赠品】  自拍杆和蓝牙音箱");
                }else if(productId_value==10000004){
                    $(".name_color_"+item.id).html("颜色：金色     版本：中兴(ZTE)远航Blade A601 全网通4G智能手机"); 
                    $(".song_"+item.id).html("【赠品】  充电宝或手机支架随机发出");
                }
                
            })

            $(".stay_payment_con .order_phone").click(function(){
                xb_index=$(".stay_payment_con .order_phone").index(this);
                order_number=$(".stay_payment_con input").eq(xb_index).val();
                order_detail(order_number);
            })
        }
    })
}


//跳转到支付页面
function tz_order(btn,order){
    var url="/weixin/model/rePay";
        $("#mask").show();
        $("#loading").show();
     $.post(url, {"orderId":order,"ytOpenId":ytopenId,"ip":LocaltionIP}, function (data) {
        $("#mask").hide();
        $("#loading").hide();
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
                        count(order,"ok");
                        window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/my_order.html?param="+param;
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                        count(order,"cancel");
                    }else if(res.err_msg == "get_brand_wcpay_request:fail"){
                        count(order,"fail");
                    }     
               }
           ); 
        }
    })
}

//跳转到订单详情
function order_detail(order_number){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/order_detail.html?id="+order_number;
}


// 返回上一页
function goback(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/far_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


//更新订单微信返回信息
function count(id,msg){
    var url="/weixin/model/upOrderMsg";
    $.post(url,{"id":id,"msg":msg},function(data){
        if(data.status==1&&data.code==1){

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
