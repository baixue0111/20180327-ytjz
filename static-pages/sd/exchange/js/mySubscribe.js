var param=GetQueryString('param');
$(function(){
	myOrder();
})


//我的预约
function myOrder(){
	var url="/sda/model/orderList";
	$.post(url,{"phone":param},function (data){
		if (data.code==1) {
				$.each(data.orders,function (i,item){
					var logoImg=item.logo_url;
						phoneName=item.manufacturer+" "+item.model_version;
						phoneFree=item.fee_interval;
						tcdw=item.package_des;
					var str='<li class="my_li">'+
								'<div class="hot_list">'+
									'<div class="myorderImg"><img src="'+item.logo_url+'" alt="" class="my_left_'+item.id+'"></div>'+
									'<div class="my_right">'+
										'<h1>【'+phoneName+'】</h1>'+
										'<p><span>合约价：</span><span>￥'+phoneFree+'</span></p>'+
										'<p class="my_tc_'+item.id+'"></p>'+
									'</div>'+
								'</div>'+
								'<ul class="subscribeMsg">'+
									'<li>'+
										'<span>预约办理日期</span>'+
										'<span class="subscribeColor">'+item.deal_date+'</span>'+
									'</li>'+
									'<li>'+
										'<span>预约营业厅</span>'+
										'<span class="subscribeColor">'+item.branch_name+'</span>'+
									'</li>'+
									'<li>'+
										'<span>营业厅地址</span>'+
										'<span class="subscribeColor">'+item.branch_address+'</span>'+
									'</li>'+
									'<li>'+
										'<span>营业厅电话</span>'+
										'<span class="subscribeColor"><a href="tel:'+item.branch_tel+'">'+item.branch_tel+'</a></span>'+
									'</li>'+
								'</ul>'+
							'</li>';
					$(".hot_ul").append(str);

					if(logoImg==""||logoImg==null||logoImg==undefined){
		                $(".my_left_"+item.id).attr('src','image/db2.jpg');
		            }else{
		                $(".my_left_"+item.id).attr('src',logoImg);
		            }
		            
		            //$(".my_tc_"+item.id).html(package[tcdw]);
		            if(tcdw==56){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费56元，国内分钟数100分钟，国内流量500MB");
					}
					if(tcdw==76){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费76元，国内分钟数200分钟，国内流量800MB");
					}
					if(tcdw==106){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费106元，国内分钟数300分钟，国内流量1G");
					}
					if(tcdw==136){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费136元，国内分钟数500分钟，国内流量1G");
					}
					if(tcdw==166){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费166元，国内分钟数500分钟，国内流量2G");
					}
					if(tcdw==196){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费196元，国内分钟数500分钟，国内流量3G");
					}
					if(tcdw==296){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费296元，国内分钟数1000分钟，国内流量4G");
					}
					if(tcdw==396){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费396元，国内分钟数2000分钟，国内流量6G");
					}
					if(tcdw==596){
						$(".my_tc_"+item.id).html("套餐档位：套餐月费596元，国内分钟数3000分钟，国内流量11G");
					}
		            
				})		
		}
	})
}


// 返回详情页
function goHistory(){
	window.location.href="http://sd4g.cn/exchange?p=E96CBCF543DAB9202525DA7085014A18";
}