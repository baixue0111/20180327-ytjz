
$.cookie("phoneno","18812345678");
var phone=$.cookie("phoneno");

$(function(){  
  
	var mySwiper = new Swiper (".swiper-container",{
		direction:'horizontal',    //横向
		loop:true,   //循环
		pagination:'.swiper-pagination',
		observer:true, //修改swiper自己或子元素时，自动初始化swiper
	})
	
	if (paramValue==-1) {
		userTj();
		$("#imgHide").hide();
	}else{
		productDetails(param);
		$("#imgHide").show();
	}
})


//获取用户推荐产品
function userTj(){
	//var url="/sda/model/userProductInfo";
	var url = "/model/userProductInfo";
	$.post(url,{"phone":phone},function(data){
		if (data.code==1) {
			productidValue=data.userProduct.product_id;
			var img_url=data.userProduct.cycle_img_url.split(";");
					$.each(img_url, function(i){
						//console.log(img_url[i])
						if(img_url[i]==""||img_url[i]==null||img_url[i]==undefined){
				            
				        }else{
				        	$(".swiper-wrapper").append('<div class="swiper-slide"><img src="'+img_url[i]+'" alt=""></div>');
				        }
	                    
	                });

					manufacturer=data.userProduct.manufacturer;
					hyfree=data.userProduct.fee_interval;  //合约价格
					brandName=data.userProduct.manufacturer+" "+data.userProduct.model_version;  //品牌名称
					screenSize=data.userProduct.screen_size;  //主屏尺寸
					screenProportion=data.userProduct.screen_resolution;  //主屏分辨率
					rom=data.userProduct.rom;
					ram=data.userProduct.ram;
					frontPix=data.userProduct.front_camera_pix;  //前置摄像头
					rearPix=data.userProduct.rear_camera_pix;  //后置摄像头
					cpu=data.userProduct.cpu;
					network=data.userProduct.network_type;  //网络类型
					packageImg=data.userProduct.package_des;  //套餐图片


				if(packageImg==""||packageImg==null||packageImg==undefined){
		            $(".cstable").attr('src',"image/db2.jpg");
		        }else{
		            $(".cstable").attr('src',packageImg);
		        }
				
				$(".phoneName").html(brandName);
				$(".hyfree").html("￥"+hyfree);
				$(".manufacturer").html(manufacturer);
				$(".screenSize").html(screenSize);
				$(".screenPro").html(screenProportion);
				$(".rom").html(rom);
				$(".ram").html(ram);
				$(".frontPix").html(frontPix);
				$(".rearPix").html(rearPix);
				$(".cpu").html(cpu);
				$(".networkType").html(network);
				$(".cstable").attr('src',packageImg);

		}
	})
}

//获取产品详情
function productDetails(productId){
	//var url="/sda/model/productInfo";
	var url = "/model/productInfo";
	$.post(url,{"productId":productId},function(data){
		if (data.code==1) {
			productidValue=productId;
			var img_url=data.product.cycle_img_url.split(";");
					$.each(img_url, function(i){
	                    if(img_url[i]==""||img_url[i]==null||img_url[i]==undefined){
				            
				        }else{
				        	$(".swiper-wrapper").append('<div class="swiper-slide"><img src="'+img_url[i]+'" alt=""></div>');
				        }
	                });

					manufacturer=data.product.manufacturer;
					hyfree=data.product.fee_interval;  //合约价格
					brandName=data.product.manufacturer+" "+data.product.model_version;  //品牌名称
					screenSize=data.product.screen_size;  //主屏尺寸
					screenProportion=data.product.screen_resolution;  //主屏分辨率
					rom=data.product.rom;
					ram=data.product.ram;
					frontPix=data.product.front_camera_pix;  //前置摄像头
					rearPix=data.product.rear_camera_pix;  //后置摄像头
					cpu=data.product.cpu;
					network=data.product.network_type;  //网络类型
					packageImg=data.product.package_des;  //套餐图片

				if(packageImg==""||packageImg==null||packageImg==undefined){
		            $(".cstable").attr('src',"image/db2.jpg");
		        }else{
		            $(".cstable").attr('src',packageImg);
		        }

				$(".phoneName").html(brandName);
				$(".hyfree").html("￥"+hyfree);
				$(".manufacturer").html(manufacturer);
				$(".screenSize").html(screenSize);
				$(".screenPro").html(screenProportion);
				$(".rom").html(rom);
				$(".ram").html(ram);
				$(".frontPix").html(frontPix);
				$(".rearPix").html(rearPix);
				$(".cpu").html(cpu);
				$(".networkType").html(network);
				$(".cstable").attr('src',packageImg);
		}
	})
}


//跳转到热门推荐页面
function hot(){
    window.location.href="hot.html?param="+productidValue+","+phone;
}

//点击预约按钮
function affirmSubscribe(){
    window.location.href="affirmSubscribe.html?param="+productidValue+","+phone;		
}

//点击对比按钮
function typeContrast(){
	window.location.href="type_contrast.html?param="+productidValue+","+phone;
}

//第一种
$('.spcsImg').click(function(){
	var _index=$(this).parent().index();
	if($('.showHide').eq(_index).css('display')=='block'){
		$('.showHide').eq(_index).slideUp();
		if ($(".triangle-up").eq(_index).hasClass("triangle-down")){ //下->上
		    $(".triangle-up").eq(_index).removeClass("triangle-down");
		} else {//上->下
		    $(".triangle-up").eq(_index).addClass("triangle-down");
		}	
	}else{
		$('.showHide').eq(_index).slideDown();
		if ($(".triangle-up").eq(_index).hasClass("triangle-down")){ //下->上
	    $(".triangle-up").eq(_index).removeClass("triangle-down");
	} else {//上->下
	    $(".triangle-up").eq(_index).addClass("triangle-down");
	}	
		}
})
 

//第二种
/*$('.spcsImg').click(function(){
	var _index=$(this).parent().index();
	$('.showHide').eq(_index).slideDown().parent().siblings().find('.showHide').slideUp();	
})*/


