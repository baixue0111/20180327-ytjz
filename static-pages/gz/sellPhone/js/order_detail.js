var get_id,
    sz_id,
    id,
    orderNum;
$(function(){
    get_id=GetQueryString("id");
    sz_id=get_id.split(",");
    id=sz_id[0];
    get_oredrDetail();

})


//获取订单详情
function get_oredrDetail(){
    var url="/weixin/model/modelOrderInfo";
    $.post(url,{"id":id},function(data){
        if (data.status==1&&data.code==1) {
                var new_data=data.modelOrder;
                    sh_Phone=new_data.receive_phone;
                    sh_Name=new_data.receive_name;
                    sh_Address=new_data.receive_address;
                    get_pid=new_data.product_id;
                    img_url=new_data.logo_url;

                    orderTime=new_data.create_date;
                    orderId=new_data.id;
                    orderManufacturer=new_data.manufacturer;
                    version=new_data.model_version;                   
                    orderfee=new_data.fee;
                    orderNum=new_data.tracking_num;    //运单号
                    wuliuName=new_data.logistics_company;  // 物流公司

                $("#ydNum").html(orderNum);   

                $("#orderNumber").html(orderId);
                $("#orderTime").html(orderTime);
                $("#order_name").html(sh_Name);
                $("#order_phone").html(sh_Phone.substring(0,3)+"***"+sh_Phone.substring(7,11));
                $("#order_address").html(sh_Address);

                $("#name_fontSize").html(orderManufacturer+" "+version);
                $("#name_money").html("￥"+orderfee);

                console.log(wuliuName);
                if(wuliuName=="shunfeng"){
                    $("#kdCompany").html("顺丰快递");
                }else if(wuliuName=="ems"){
                    $("#kdCompany").html("EMS");
                }else if(wuliuName=="yuantong"){
                    $("#kdCompany").html("圆通速递");
                }else if(wuliuName=="yunda"){
                    $("#kdCompany").html("韵达快递");
                }else if(wuliuName=="shentong"){
                    $("#kdCompany").html("申通快递");
                }else if(wuliuName=="zhongtong"){
                    $("#kdCompany").html("中通快递");
                }else if(wuliuName=="zhaijisong"){
                    $("#kdCompany").html("宅急送");
                }else if(wuliuName=="tiantian"){
                    $("#kdCompany").html("天天快递");
                }else if(wuliuName=="youzhengguonei"){
                    $("#kdCompany").html("邮政小包");
                }
                 
                flowMsg(orderNum,wuliuName);

                if(img_url==""||img_url==null||img_url==undefined){
                    $(".phone_img img").attr('src',"image/db2.jpg");
                }else{
                    $(".phone_img img").attr('src',img_url);
                }

                var productId_value=new_data.product_id;
                if(productId_value==10000002){
                    $(".name_color").html("颜色：金色     版本：4G全网通（BV0701）/金色");
                    $(".song").html("【赠品】  充电宝或手机支架随机发出");
                }else if(productId_value==10000003){
                    $(".name_color").html("颜色：灰色     版本：4G全网通（BV0701）/灰色");
                    $(".song").html("【赠品】  充电宝或手机支架随机发出");
                }else if(productId_value==10000005){
                    $(".name_color").html("颜色：金色     版本：华尔金/全网通/4GB+64GB");
                    $(".song").html("【赠品】  自拍杆和蓝牙音箱");
                }else if(productId_value==10000004){
                    $(".name_color").html("颜色：金色     版本：中兴(ZTE)远航Blade A601 全网通4G智能手机"); 
                    $(".song").html("【赠品】  充电宝或手机支架随机发出");
                }

                
        }
    })
}


//获取推荐机型图片
function get_img(){
    var url="/weixin/model/recomm";
    $.post(url,{"productId":get_pid},function(data){
        if (data.status==1&&data.code==1) {
            var img_url=data.model.logo_url;

            if(img_url==""||img_url==null||img_url==undefined){
                $(".phone_img img").attr('src',"image/db2.jpg");
            }else{
                $(".phone_img img").attr('src',img_url);
            }
        }
    })
}

//物流信息查询
function flowMsg(num,logisticsCompany){
    console.log(logisticsCompany);
    if(num==""||num==null||num==undefined){
        $(".mh-list").html("暂无物流信息！");
        $(".mh-list").css({
            "text-align":"center",
            "font-size":"0.28rem"
        });
        $("#loading").hide();
        $("#wldh").hide();
    }else{
        $("#loading").show();
        $("#wldh").hide();
        var url="/weixin/model/logistics";
        $.post(url,{"trackingNum":num,"logisticsCompany":logisticsCompany},function (data) {
            $("#loading").hide();
            $("#wldh").show();
            if (data.status==1&&data.code==1) {
                var obj=data.logistics.data.info.context;
                //console.log(obj)
                if (obj==""||obj==null||obj==undefined) {
                    $(".mh-list").html("该单号暂无物流进展，请稍后再尝试查询吧！");
                    $(".mh-list").css({
                        "text-align":"center",
                        "font-size":"0.28rem"
                    });
                    $("#loading").hide();
                    $("#wldh").hide();
                }else{
                    $.each(obj,function(i,item){
                        var str='<li>'+
                                '<p>'+item.desc+'</p>'+
                                '<p>'+unixTime2Date(item.time, true)+'</p>'+
                                '<span class="before"></span><span class="after"></span>'+
                            '</li>';
                        $(".mh-list ul").append(str);
                    })
                }
            }
        })
    }
}




/**       
* 时间戳转换日期       
* @param <int> unixTime  待时间戳(秒)       
* @param <bool> isFull  返回完整时间(Y-m-d 或者 Y-m-d H:i:s)       
* @param <int> timeZone  时区       
*/
function unixTime2Date(unixTime, isFull, timeZone) {
    if (typeof (timeZone) == 'number')
    {
        unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getUTCFullYear() + "-";
    ymdhis += (time.getUTCMonth()+1) + "-";
    ymdhis += time.getUTCDate();
    if (isFull === true)
    {
        ymdhis += " " + time.getUTCHours() + ":";
        ymdhis += time.getUTCMinutes() + ":";
        ymdhis += time.getUTCSeconds();
    }
    return ymdhis;
}





// 返回上一页
function goback(){
    window.history.go(-1);
}


//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}