var param=GetQueryString('param').split(",");
    phone=param[1];
    productId=param[0];
$(function(){
	productList();
})
//获取产品列表
function productList(){
	var url="/sda/model/productList";
	$.post(url,function(data){
		if (data.code==1) {
			$.each(data.productList,function(i,item){
				var str='<li class="hot_li" onclick="details(this,'+item.product_id+')">'+
							'<div class="hot_list">'+
								'<div class="divImg"><img src="'+item.logo_url+'" alt="" class="hot_left_'+item.product_id+'"></div>'+
								'<div class="hot_right">'+
									'<h1>【'+item.manufacturer+" "+item.model_version+" "+item.phone_type+" "+item.network_type+'】</h1>'+
									'<p style="margin-top: .1rem;padding-left: .1rem;"><span>合约价：</span><span>￥'+item.fee_interval+'</span></p>'+
									'<div class="hot_btn"><p onclick="details(this,'+item.product_id+')">了解详情</p></div>'+
								'</div>'+
							'</div>'+
						'</li>';

				$(".hot_ul").append(str);

				var url_img=item.logo_url;

                if(url_img==""||url_img==null||url_img==undefined){
                    $(".hot_left_"+item.id).attr('src','image/db2.jpg');
                }else{
                    $(".hot_left_"+item.id).attr('src',url_img);
                }

			})
		}
	})
}


//点击列表跳转到详情页面
function details(obj,pId){
	window.location.href="details.html?param="+pId;
}
//点击下方菜单跳转到详情页面
function detailsFoot(){
	window.location.href="details.html";
}

//点击预约按钮
function affirmSubscribe(){
    window.location.href="affirmSubscribe.html?param="+productId+","+phone;		

}

//点击对比按钮
function typeContrast(){
	window.location.href="type_contrast.html?param="+productId+","+phone;
}

//预约成功跳转到我的预约页面
function mySubcribe(){
    window.location.href="mySubscribe.html?param="+phone;
}