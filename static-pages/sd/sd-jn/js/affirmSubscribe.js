
var phone = $.cookie("phoneno");
$("#lxPhone").html(phone);
var param = {};
var get_value;
param.arrColor = [];
param.arrFee = [];
param.productId = [];
$(function(){
	productList();	
})

//当用户选择机型时
$("#xzdw").change(function () {
	$(".color-btn").html("颜色：");
	get_value = $("#xzdw").find("option:selected").val();  //get_value是获取的下标值
	//console.log(typeof(param.arrColor[get_value]));  //string类型
	var splitColor = param.arrColor[get_value].split(",");
	$(".hyfree").html(param.arrFee[get_value]);
	for (var i = 0; i < splitColor.length; i++) {
		$(".color-btn").append('<span onclick="clictColorBtn(this)">'+splitColor[i]+'色'+'</span>');
		$(".color-btn span:first").addClass("selectBtn");
	}

})

//点击选择颜色
function clictColorBtn(btn) {
	$(btn).addClass("selectBtn").siblings().removeClass("selectBtn");
	if(window.localStorage){
    	localStorage.setItem("user_select_color",$(".selectBtn").html());
    } else {
    	$.cookie("user_select_color",$(".selectBtn").html());
    }
}

//获取产品列表
function productList () {
	var url = "/model/productList";
	$.post(url,function (data) {
		if (data.code == 1) {
			$.each(data.productList,function (i,item) {
				$(".select-type").append('<option value="'+i+'">'+item.manufacturer+" "+item.model_version+" "+item.network_type+'</option>');
				param.arrColor.push(item.color);
				param.arrFee.push(item.original_fee);
				param.productId.push(item.product_id);
			})
		}
		console.log(param);
	})

}


//点击确认预约
function affirmYy(){
	var yyName = $(".lxrRight").val();
	var str_name = /^[\u4E00-\u9FA5]{2,4}$/;
	var xzdw = $("#xzdw").find("option:selected").val();
    var	lxName = $(".yyName").val();
    var	phoneType = $("#xzdw").find("option:selected").html();
    var selectColor = $(".selectBtn").html();
    var description = phoneType + selectColor;

    console.log(phoneType);
    console.log(selectColor);
	
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
        $('.errorMsg').html("请选择机型！");
        return;
    }

	//var url="/sda/model/order";
	var url = "/model/order";

    $.post(url,{"phone":phone,
    	"productId" : param.productId[get_value],
    	"contactName" : lxName,
    	"contactPhone" : phone,
    	"description" : description
    	},function (data){
    		if (data.code==1) {
    			$(".mask").show();
    			$(".successMsg").show();
    		};
    })
     
}


//预约成功跳转到我的预约页面
function mySubcribe(){
	window.location.href="mySubscribe.html";
}

//清除错误提示
function focusError(){
	$('.errorMsg').hide();
}

