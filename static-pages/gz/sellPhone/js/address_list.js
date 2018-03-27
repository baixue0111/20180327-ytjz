
var param,sz_param,getopenId;
$(function(){
    $(".details_mask").show();
    $("#loading").show();
    param=GetQueryString("param");
    sz_param=param.split(",");
    getopenId=sz_param[1];
    param=sz_param[0]+","+sz_param[1]+","+sz_param[2];
    get_details();
})


//获取用户地址列表
function get_details(){
    var url="/weixin/model/addressList";
    $.post(url,{"openId":getopenId},function(data){
        $(".details_mask").hide();
        $("#loading").hide();
        if (data.status==1&&data.code==1) {
            var dataJson=data.addressList;

            $.each(dataJson, function(i,item){
                var str='<li>'+
                        '<p>'+
                            '<span class="orderDetail_name_'+item.id+'">'+item.receive_name+'</span>'+
                            '<span style="margin-left: 3%;" class="orderDetail_phone_'+item.id+'">'+item.receive_phone.substring(0,3)+"***"+item.receive_phone.substring(7,11)+'</span>'+
                        '</p>'+
                        '<p><span>收货地址：</span><em class="address_'+item.id+'">'+item.receive_address+'</em></p>'+
                        '<div class="btn_list">'+
                            '<p><input type="radio" value="'+item.id+'" name="check" onclick="address_btn(this)"><label>选择地址</label></p>'+
                            '<p>'+
                                '<span onclick="edit_address(this'+','+item.id+')">编辑</span>'+
                                '<span onclick="firm(this,'+item.id+')">删除</span>'+
                            '</p>'+
                        '</div>'+
                    '</li>';
                $(".add_address").append(str);

            });
            
        }
    })
}


//点击添加地址
function address_btn(btn){
    var address_id=$(btn).val();
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/affirm_order2.html?param="+param+","+address_id;
}
       
//编辑地址
function edit_address(edit_btn,id){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/edit_address.html?param="+param+","+id;
}


function firm(del,id) {  
        //利用对话框返回的值 （true 或者 false）  
        if (confirm("你确定删除吗？")) {  
            var url="/weixin/model/delAddress";
            $.post(url,{"id":id},function(data){
                if (data.status==1&&data.code==1) {
                    window.location.reload();
                }
            })
        }  
    }

//删除地址
/*function del(del,id){
    var url="/weixin/model/delAddress";
    $.post(url,{"id":id},function(data){
        if (data.status==1&&data.code==1) {
            window.location.reload();
        }
    })
}*/

//添加地址
function add_dz(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/new_address.html?param="+param;
}

//返回历史
function return_history(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/affirm_order.html?param="+param;
}

//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}