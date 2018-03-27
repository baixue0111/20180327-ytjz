/**
 * Created by hsgeng on 2016/9/25.
 */
//适配
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.03125+'px';
	window.onresize = function(){
		var html = document.getElementsByTagName('html')[0];
		var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.03125+'px';
	}


//产品详情
$(function(){
	pageInit5();
	login();
	shouji();
})

//用正则判断截取 地址栏   中的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}

function pageInit5(){
	var url="/weixin/flowmarket/productInfo";
	//获取上页传过来的type类型和商品的id
	var type = GetQueryString("type");
	var id = GetQueryString("id");
	var title = GetQueryString("title");
	var flowId=1;
	var param={};
	param["flowId"]=id;	
	$.ajax({
		url:url,
		type:'POST',
		data: JSON.stringify(param),
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			var datajson=data.productInfo;
			if(data.code==1&&data.status==1){
				
				    //添加活动详情
				var str5 =  '<div class="ding1"><div class="dingImg">'+
							'<img src="'+datajson.iconUrl+'" alt=""></div>'+
							'<div class="ding3"><p class="a_groupList3">'+datajson.title+'</p>'+
							'<p class="a_price">￥'+datajson.fee+'元</p>'+
							'</div></div>';
						$("#xiang").append(str5);

						//添加简介介绍
				var str6 = '<div class="c_jie1">'+datajson.des+'<div>';
						$("#c_qing").append(str6);
								
			}
		}
	})	
}


 function login(){
 	//添加手机验证码 订购
	var str7 = 	'<div id="login1">'+
				'<input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"/ onfocus="Clear()">'+
				'<input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"/ onfocus="Clear()">'+
				'<input class="input3" type="button" value="获取" id="yzm" onclick="pageInit6(this)">'+
				'<p id ="errorMessage"></p>'+
				'<div id="succed"><button id="login_button" class="button" onclick="loginInfo()">立即订购</button></div></div>';
			$("#login").append(str7);
 }

function shouji(){
	var number = GetQueryString("number");
//	console.log(typeof(getphone))  // string  字符串
	if(number==""||number==null||number==undefined||number=="undefined"){
		$("#phoneNum").val('');    //么有绑定的清空
	}else{
		$("#phoneNum").val(number);// 如果已经绑定了，兑换给自己       就默认手机号码
	}
}
 //验证码
var phone;
function pageInit6(btn) {
    var url="/weixin/flowmarket/send";
	phone= $("#phoneNum").val();
    var type = GetQueryString("type");
	var id = GetQueryString("id");
	var title = GetQueryString("title");
//	alert(type);
    //判断手机号是否为空
	var validateCode=$("#phoneNum").val();
	if(phone==""||phone==null){
        $('#errorMessage').html("请输入手机号！");
        return;
    }
	//判断输入的手机号是否符合电信手机号
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    pram["flowId"]=id;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else if(data.status==2) {
                $('#su').show();  	
                $('.su1').html('<div class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</div>');
            }else if(data.status==3) {
            	$('#su').show();  
                $('.su1').html('<p class="success">对不起！您输入的手机号属于OCS计费类型，暂不能订购该产品，感谢您的关注！</p>');
            }
            else if(data.status==4) {
            	$('#su').show();
                $('.su1').html('<p class="success">对不起！您本月已经订购过了，不能重复订购，感谢您的关注！</p>');
            }
            else{
                $('#errorMessage').html(data.message);
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}    
	
//订购
function loginInfo() {
    var url="/weixin/flowmarket/order";
	phone= $("#phoneNum").val();
    var validateCode=$("#validate").val();
	var id = GetQueryString("id");
	var title = GetQueryString("title");
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    if(validateCode==""||validateCode==null){
        $('#errorMessage').html("请输入验证码！");
        return;
    }
    var pram={};
	var paramstr =JSON.stringify(pram);
    pram["phone"]=phone;
    pram["validateCode"]=validateCode;
    pram["flowId"]=id;
    pram["type"]=1;
    $("#succed").html('<button id="login_button" class="button" onclick="errorClick()">订购中。。</button>');
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMessage').html("服务器报错！");
                $("#succed").html('<button id="login_button" class="button" onclick="loginInfo()">立即订购</button>');
            	return;
            }
            else if(data.status==0) {
                $("#succed").html('<button id="login_button" class="button" onclick="loginInfo()">立即订购</button>');
                $('#errorMessage').html("验证码输入错误");
            }
            else if(data.status==2){
                $("#succed").html('<button id="login_button" class="button" onclick="loginInfo()">立即订购</button>');
                $('#errorMessage').html("商品已下架");
            	
            }else{
                $('#su').show();
                $('.su1').html('<p class="success">恭喜您！成功订购'+title+'，系统将在24小时内为您受理，受理结果将通过短信进行告知。感谢您的参与！</p>');
            }
         
        },
        error:function(){
            $("#succed").html('<button id="login_button" class="button" onclick="loginInfo()">立即订购</button>');
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}    

function Clear(){
	$("#errorMessage").html("")
}

//验证码倒计时
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value =wait +"s";
        wait--;
        setTimeout(function () {
                buttonTime(btn);
            }, 1000)
    }
}

function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
}

//关闭弹窗
$(".su2").click(function(){
	$("#su").hide();
	//清空   input的vaule  手机号 /验证码重新输入
	$(".input1").val("");
	$(".input2").val("");
 	$("#succed").html('<button id="login_button" class="button" onclick="loginInfo()">立即订购</button>');
	
})