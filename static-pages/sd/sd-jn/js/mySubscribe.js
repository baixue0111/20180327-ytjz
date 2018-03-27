var phone=$.cookie('phoneno');
$(function(){
	myOrder();
})


//我的预约
function myOrder(){
	//var url="/sda/model/orderList";
	var url = "/model/orderList";
	var getColor = "";
	if (window.localStorage) {
		getColor = localStorage.getItem("user_select_color");
	} else {
		getColor = $.cookie("user_select_color");
	}

	$.post(url,{"phone":phone},function (data){
		if (data.code==1) {
				$.each(data.orders,function (i,item){
					var logoImg=item.logo_url;
					//var phoneName=item.manufacturer+" "+item.model_version;
					var phoneName = item.description;
					var	phoneFree=item.fee_interval;
					var	tcdw=item.package_des;
					var str = '<li class="my_li">'+
									'<div class="hot_list">'+
										'<div class="hot_list_img">'+
											'<img src="'+item.logo_url+'" alt="" class="my_left_'+item.id+'">'+
										'</div>'+
										'<div class="my_right">'+
											'<h4>【'+phoneName+'】</h4>'+
											'<p><span>合约包/购机款：</span><span>￥'+phoneFree+'</span></p>'+
											'<p class="my_tc_'+item.id+'"></p>'+
										'</div>'+
									'</div>'+
								'</li>';
					$(".hot_ul").append(str);

					if(logoImg==""||logoImg==null||logoImg==undefined){
		                $(".my_left_"+item.id).attr('src','image/db2.jpg');
		            }else{
		                $(".my_left_"+item.id).attr('src',logoImg);
		            }
				})		
		}
	})
}


// 返回详情页
function goHistory(){
	window.location.href="hot.html";
}