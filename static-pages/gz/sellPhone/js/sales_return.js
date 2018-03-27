
var param;
$(function(){
    param=GetQueryString("param");

})

//跳转到我的订单
function myorder_qh(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading2.html?param="+param+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 返回上一页
function goback(){
    window.history.go(-1);
}

//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
