
var param=GetQueryString('param').split(",");
    phone=param[1];
    productId=param[0];
var defaultCity;
var defaultQxian;
var defaultYyt;
$(function(){
	productDetails(productId);
	userBranch();  //用户推荐网点
	$("#lxPhone").html(phone);
	exchange();
})

function exchange(){
	cityList();  //地市
	$(".xzcity").change(function(){
		$(".xzcounty").html('<option selected="selected" value="">请选择区县</option>');
		$(".xzbusiness").html('<option selected="selected" value="">请选择营业厅</option>');
		$("#address").html("");
		$("#tel").html("");
        var qxian=$(".xzcity").find("option:selected").val();
        countyList(qxian);  //区县
    });

    $(".xzcounty").change(function(){
    	$(".xzbusiness").html('<option selected="selected" value="">请选择营业厅</option>');
    	$("#address").html("");
		$("#tel").html("");
        var city=$(".xzcity").find("option:selected").val();
        var qxian=$(".xzcounty").find("option:selected").val();
        networkList(city,qxian);  //营业厅
    });

    $(".xzbusiness").change(function(){
        var yyt=$(".xzbusiness").find("option:selected").val();
        branchMsg(yyt);
    });
}


//获取产品详情
function productDetails(productId){
	var url="/sda/model/productInfo";
	$.post(url,{"productId":productId},function (data){
		if (data.code==1) {
			var logoUrl=data.product.logo_url;
				phoneName=data.product.manufacturer+" "+data.product.model_version+" "+data.product.phone_type+" "+data.product.network_type;
				hyfree=data.product.fee_interval;
				tcdw=data.product.package_able.split(",");

			$(".phoneName").html("【"+phoneName+"】");
			$(".hyfree").html("￥"+hyfree);
            if(logoUrl==""||logoUrl==null||logoUrl==undefined){
                $(".yydetails img").attr('src','image/db2.jpg');
            }else{
                $(".yydetails img").attr('src',logoUrl);
            }

            $(".yydetails #xzdw").html('<option value="">请选择套餐档位</option>');
            $.each(tcdw, function(i){
                $(".yydetails #xzdw").append('<option value="'+tcdw[i]+'">'+tcdw[i]+' 元</option>');
            });
		}
	})
	
	$("#xzdw").change(function(){
		var tcdwVal=$("#xzdw").find("option:selected").val();
		$(".tcdescribe").html(package[tcdwVal]);	
	});
}

//获取用户推荐网点信息
function userBranch(){
	var url="/sda/model/userBranch";
	$.post(url,{"phone":phone},function (data){
		if (data.code==1) {
			 if (data.userBranch==null||data.userBranch==""||data.userBranch==undefined) {
			 	cityList();  //地市
			 }else{
			 	$("#address").html(data.userBranch.address);
			   	$("#tel").html('<a href="tel:'+data.userBranch.tel+'">'+data.userBranch.tel+'</a>');

				defaultCity=data.userBranch.region_name;
	     		defaultQxian=data.userBranch.qx_name;
	     		defaultYyt=data.userBranch.name;

				countyList(defaultCity);
				networkList(defaultCity,defaultQxian);
				branchMsg(defaultYyt);
			}
		}
	})
}

//点击确认预约
function affirmYy(){
	var yyName=$(".lxrRight").val();
		str_name=/^[\u4E00-\u9FA5]{2,4}$/;
		xzdw=$("#xzdw").find("option:selected").val(); 
		xzcity=$(".xzcity").find("option:selected").val(); 
		xzcounty=$(".xzcounty").find("option:selected").val(); 
		xzbusiness=$(".xzbusiness").find("option:selected").val(); 
		orderDate=$("#test1").html();
	if (yyName==""||yyName==null||yyName==undefined) {
		$('.errorMsg').show();
		$('.errorMsg').html("请完善个人信息！");
	}else{
		if(!str_name.test(yyName)){
	        $('.errorMsg').show();
	        $('.errorMsg').html("请输入正确姓名！");
	        return;
		}
	}

	if(xzdw==""||xzdw==null||xzdw==undefined){
    	$('.errorMsg').show();
        $('.errorMsg').html("请选择套餐档位！");
        return;
    }
    if(xzcity==""||xzcity==null||xzcity==undefined){
    	$('.errorMsg').show();
        $('.errorMsg').html("请选择城市！");
        return;
    }
    if(xzcounty==""||xzcounty==null||xzcounty==undefined){
    	$('.errorMsg').show();
        $('.errorMsg').html("请选择区县！");
        return;
    }
    if(orderDate=="请选择预约办理日期"){
    	$('.errorMsg').show();
        $('.errorMsg').html("请选择预约办理日期！");
        return;
    }
    if(xzbusiness==""||xzbusiness==null||xzbusiness==undefined){
    	$('.errorMsg').show();
        $('.errorMsg').html("请选择营业厅！");
        return;
    }

	var url="/sda/model/order";
    	dataTime=$(".xzdate").html();
    	lxName=$(".yyName").val();
    	tcdw=$("#xzdw").find("option:selected").val();
    $.post(url,{"phone":phone,
    	"productId":productId,
    	"dealDate":dataTime,
    	"contactName":lxName,
    	"contactPhone":phone,
    	"pickupBranchId":branchId,
    	"packageAble":tcdw},function (data){
    		if (data.code==1) {
    			$(".mask").show();
    			$(".successMsg").show();
    		};
    })
    
    
}

//获取地市列表
function cityList(){
	var url="/sda/model/regionList";
	$.post(url,function (data){
		if (data.code==1) {
			//$(".xzcity").html('<option value="">请选择城市</option>');
            $.each(data.regionList, function(i, item){
            	if (defaultCity==item) {
            		$(".xzcity").append('<option selected="selected" value="'+item+'">'+item+'</option>');
            	}else{
            		$(".xzcity").append('<option value="'+item+'">'+item+'</option>');
            	}
            });
		}
	})
}

//获取区县列表
function countyList(regionName){
	var url="/sda/model/qxList";
	$.post(url,{"regionName":regionName},function (data){
		if (data.code==1) {
			//$(".xzcounty").html('<option value="">请选择区县</option>');
            $.each(data.qxList, function(i, item){
            	if (defaultQxian==item) {
            		$(".xzcounty").append('<option selected="selected" value="'+item+'">'+item+'</option>');
            	} else {
                	$(".xzcounty").append('<option value="'+item+'">'+item+'</option>');
            	}
            });
		}
	})
}


//获取网点列表
function networkList(city,qx){
	var url="/sda/model/branchList";
	$.post(url,{"regionName":city,"qxName":qx},function (data){
		if (data.code==1) {
			//$(".xzbusiness").html('<option value="">请选择营业厅</option>');
            $.each(data.branchList, function(i, item){
            	if (item==defaultYyt) {
            		$(".xzbusiness").append('<option selected="selected" value="'+item+'">'+item+'</option>');
            	} else {
                	$(".xzbusiness").append('<option value="'+item+'">'+item+'</option>');
            	}
            });
		}
	})
}


//获取网点详细信息
function branchMsg(network){
	var url="/sda/model/branchInfo";
	$.post(url,{"branchName":network},function (data){
		if(data.code==1){
			branchId=data.branchInfo.id;
			var address=data.branchInfo.address;
				tel=data.branchInfo.tel;
			$("#address").html(address);
			$("#tel").html('<a href="tel:'+tel+'">'+tel+'</a>');
		}
	})
}


//预约成功跳转到我的预约页面
function mySubcribe(){
	window.location.href="mySubscribe.html?param="+phone;
}

//清除错误提示
function focusError(){
	$('.errorMsg').hide();
}

