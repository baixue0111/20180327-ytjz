//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(function(){
	// $('#loginMask').show();  //弹出层隐藏
	// $("#loading").show();
	getQRCode();
	model();
})
function getQRCode(){
	var url='/weixin/flowmarket/getQRCode';
	var openId=GetQueryString('openId');
	var phone=GetQueryString('phone');
	var source="0"
	param={};
	param["openId"]=openId;
	param["source"]=source;
	param["phone"]=phone;
	$.ajax({
        type: 'post',
        url: url,
		data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
			if(data.code==1&&data.status==3){
        		$("#orcode img").attr('src','data:image/png;base64,'+data.base64Img+'');
        		$('#loginMask').hide();  //弹出层隐藏
				$("#loading").hide();
        	}else{
        		$('#loginMask').hide();  //弹出层隐藏
				$("#loading").hide();
				$(".codediv").html(data.message);
			}
        }
   	});
}
//分享
function model(){
    var url = '/weixin/model/wxConfigSignature';
    var localUrl = location.href.split('#')[0];  //获取当前页面的链接地址
    var openId=GetQueryString('openId');
	var phone=GetQueryString('phone');
    $.ajax({
        type: 'get',
        url: url,
        data:{"localUrl":localUrl},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                var dat =data.wxConfigSignatureData;
                wx.config({
//				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: dat.appId, // 必填，公众号的唯一标识
                    timestamp:dat.timestamp , // 必填，生成签名的时间戳
                    nonceStr: dat.noncestr, // 必填，生成签名的随机串
                    signature: dat.signature,// 必填，签名，见附录1
                    jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function (){ 
					wx.onMenuShareTimeline({
						title: '省内流量安心包特惠购', // 分享标题
					    link: 'http://gz.mobicloud.com.cn/active/gzQRcode/code.html?openId='+openId+'&phone='+phone+'', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/gzQRcode/images/sharttu.jpg', // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					        shareSta();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
	//				分享给朋友
					wx.onMenuShareAppMessage({
					    imgUrl: "http://gz.mobicloud.com.cn/active/gzQRcode/images/sharttu.jpg",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
						desc: "扫描二维码即可进入订购",//摘要,如果分享到朋友圈的话，不显示摘要。
						title: '省内流量安心包特惠购',//分享卡片标题
//					    link:'http://gz.mobicloud.com.cn/active/gzQRcode/share.html',//分享出去后的链接，这里可以将链接设置为另一个页面。
//					    link: 'http://gz.mobicloud.com.cn/active/gzQRcode/share.html',
					    link: 'http://gz.mobicloud.com.cn/active/gzQRcode/code.html?openId='+openId+'&phone='+phone+'', // 分享链接
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        alert('分享成功');
					        shareSta();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					        alert('分享失败');
					    }
					});
				});
            }
        }
    })

}

//流量超市分享统计
function shareSta(){
	var url = "/weixin/flowmarket/shareSta";
	var shareUrl='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/gzQRcode/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
	var openId=GetQueryString('openId');
	var phone=GetQueryString('phone');
	var param={};
	param["openId"]=openId;
	param["phone"]=phone;
	param["url"]=shareUrl;
	$.ajax({
		url:url,
		type:'POST',
		data:JSON.stringify(param),
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			
		}
	});
}