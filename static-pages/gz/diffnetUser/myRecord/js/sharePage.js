var code;
$(function () {
    code = localStorage.getItem("code");
    $("#code").html(code);
    Dyconfing();
    failureShow();
})

//分享功能
//调用confing
function Dyconfing(){
    var localUrl=window.location.href;
    var url="/weixin/model/wxConfigSignature";
    $.post(url,{"localUrl":localUrl}, function (data) {
        if (data.status == 1 && data.code == 1) {
            var weixin = data.wxConfigSignatureData;
            appId = weixin.appId;
            noncestr = weixin.noncestr;
            signature = weixin.signature;
            timestamp = weixin.timestamp;
            wx.config({
                debug:false,
                appId:appId,
                timestamp:timestamp,
                nonceStr:noncestr,
                signature:signature,
                jsApiList:['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline']
            });
        }
    })
}

function failureShow () {
    wx.ready(function() {
        //console.log("显示右上角分享进入ready");
        wx.checkJsApi({
            jsApiList:['onMenuShareAppMessage','onMenuShareTimeline'],
            success: function (res){
                //console.log("显示右上角分享："+JSON.stringify(res));
            }
        })
        wx.onMenuShareTimeline({
            title: '老铁卡优惠办理，仅需29元',
            link: 'https://gz2.mobicloud.com.cn/active/diffnetUser/myRecord/share-friend.html?param='+ code,
            imgUrl: '',
            success: function (){
                alert("分享成功");
            },
            cancel: function (){
                alert("分享失败！");
            }
        });
        wx.onMenuShareAppMessage({
            title: '老铁卡优惠办理，仅需29元',
            desc: '非电信用户，凭分享优惠码到指定营业厅即可办理29元老铁卡，首月0元体验，200分钟语音及2G流量任您使用。',
            link: 'https://gz2.mobicloud.com.cn/active/diffnetUser/myRecord/share-friend.html?param='+ code,
            imgUrl: '',
            success: function (){
                alert("分享成功");
            },
            cancel: function (){
                alert("分享失败！");
            }
        });
        wx.hideMenuItems({
            menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:share:facebook']  //隐藏分享QQ，微博，QQ空间,FB
        });
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']  //显示分享到微信朋友和朋友圈
        })
        wx.error(function (res) {
            console.log(res);
        })
    })
}

// 隐藏分享提示
function hideMask() {
    $(".maskShare").hide();
    $(".shareImg").hide();
}