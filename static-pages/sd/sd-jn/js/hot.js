
$.cookie("phoneno","18812345678");
var phone=$.cookie("phoneno");
$(function(){
	productList();
})
//获取产品列表
function productList(){
	//var url="/sda/model/productList";
	var url="/model/productList";
	$.post(url,function(data){
		if (data.code==1) {
			$.each(data.productList,function(i,item){
				var str = '<li class="demo-center-list" onclick="details(this,'+item.product_id+')">'+
							'<div class="demo-center-white">'+
								'<div class="demo-list-left">'+
									'<div>'+
										'<img src="'+item.logo_url+'" class="hot_left_'+item.product_id+'">'+
									'</div>'+
								'</div>'+
								'<div class="demo-list-right">'+
									'<h4>'+item.manufacturer+" "+item.model_version+" "+item.phone_type+" "+item.network_type+'</h4>'+
									'<div class="demo-list-free">'+
										'<span class="demo-list-free-line">京东价：<span>'+item.original_fee+'</span></span>'+
										'<span class="demo-list-free-tc">套餐档：<span>'+item.package_able+'</span></span>'+
									'</div>'+
									'<div class="demo-right-bottom">'+
										'<div>'+
											'<span>合约包/购机款：</span>'+
											'<p class="demo-sjx"></p>'+
											'<span class="demo-right-free">'+item.fee_interval+'元</span>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</li>';
				$(".demo-center-ul").append(str);

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
	//window.location.href="details.html?param="+pId;
	if (window.localStorage) {
		localStorage.setItem("productId",pId);
	} else {
		$.cookie("productId",pId);
	}
	window.location.href="details.html";
}

//点击预约按钮
function affirmSubscribe(){
    //window.location.href="affirmSubscribe.html?param="+productId+","+phone;		
    window.location.href="affirmSubscribe.html";
}

//点击对比按钮
function typeContrast(){
	//window.location.href="type_contrast.html?param="+productId+","+phone;
	window.location.href="type_contrast.html";
}

//预约成功跳转到我的预约页面
function mySubcribe(){
    //window.location.href="mySubscribe.html?param="+phone;
    window.location.href="mySubscribe.html";
}