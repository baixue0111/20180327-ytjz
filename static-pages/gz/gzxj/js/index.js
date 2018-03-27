/**
 * Created by hsgeng on 2016/10/17.
 */

var html = document.getElementsByTagName('html')[0];
    var W = document.documentElement.clientWidth;
        html.style.fontSize = W*0.15625+'px';
    window.onresize = function(){
        var html = document.getElementsByTagName('html')[0];
        var W = document.documentElement.clientWidth;
            html.style.fontSize = W*0.15625+'px';
    }

//点击我要领取出现弹窗
$("#content .con").click(function(){
	$("#login").show();
})


//url地址
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(function(){
	OpenId();
//	pageInit();
})

var openId;
//获取微信用户openId
var code=GetQueryString('code');
var img = $("#progressImgage"); 
var mask = $("#maskOfProgressImage");
var jinduzhe =$("#jinduzhe");
function OpenId(){
	var oi=$.cookie('openId'); 
    if(oi==null||oi==""||oi==undefined){  	//openid 为空时执行这个函数  
		var url="/weixin/auth/authInfo";
	    $.ajax({
	        type: 'get',
	        url: url,
	        //timeout : 30000,
	        data: {"code":code},
	        dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        beforeSend:function(xhr){ 
	        	jinduzhe.show();
				img.show().css({ 
				"position": "fixed", 
				"top": "53%", 
				"left": "57%", 
				"margin-top": function () { return -1 * img.height() / 2; }, 
				"margin-left": function () { return -1 * img.width() / 2; } 
				}); 
				mask.show().css("opacity", "0.1"); 
				},
	        success: function(data){
	            if(data.status==1&&data.code==1){
	                 openId=data.authInfo.openId; 
	                 $.cookie("openId",openId);
//	                 console.log(openId);
	                 pageInit(openId);
	            }else{
	                error(data.message);
	            }
	        },
	         complete:function(xhr){
				jinduzhe.hide();
				img.hide(); 
				mask.hide(); 
				if(xhr=='timeout'){
			 　　　　　 ajaxTimeOut.abort(); 
	            	$('.tit').html('<p class="peeeerw">服务器报错,请刷新页面</p>');
			　　　}
			
			},
	        error:function(){
	            $('.tit').html('<p class="peeeerw">服务器报错</p>');
	        }
	    });
	}else{
		openId=$.cookie('openId');
		pageInit(openId);
	}
}
function pageInit(e){
	var url='/weixin/staruser/order';
	openId=$.cookie('openId'); 
	var pram={};
	pram["openId"] = openId;
//	console.log(openId);
	$.ajax({
		url:url,
		type:'POST',
        data: JSON.stringify(pram),
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			if(data.code==0){
				$('.tit').html('<p class="peeeerw">服务器报错</p>');
			}
			else if(data.code==1&&data.status==1){
                $('.tit').html('<div class="success">尊敬的合约用户 ，恭喜您！成功领取'+data.flowValue+'免费流量，系统将在24小时内为您受理，受理结果将通过短信进行告知。感谢您的参与！</div>');
            }
			else if(data.status==2) { 	
				
                $('.tit').html('<div class="success">对不起！您的号码还未绑定不能领取流量，请绑定后再来领取流量。首次绑定另外还可获赠100M省内流量。</div style="text-align:center"><div><a class="bangding" href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/wxbd/index.html?abcd=1&response_type=code&scope=snsapi_base&state=123#wechat_redirect">点击进行绑定</a></div>');
            }
			else if(data.status==3) { 	
                $('.tit').html('<div class="success">对不起！您不是受邀请的合约老用户，不能领取流量。感谢您的关注。</div>');
            }
			else if(data.status==4) { 	
                $('.tit').html('<div class="success">对不起！您已经领取过了，不能重复领取。感谢您的关注。</div>');
            }
			else{
                $('.tit').html(data.message);
            }
		},
		error:function(){
            $('.tit').html('<p class="peeeerw">服务器报错</p>');
        }
	});	
}
//点击红叉关闭弹窗
$(".guan").click(function(){
	$("#login").hide();
})