(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth > 768 ? 768 : docEl.clientWidth;
            //console.log(docEl.clientWidth);
             //console.log(docEl.clientWidth >= 768);
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//跳转到详情页面
function details(){
    window.location.href="hot.html";
}

//跳转到我的预约页面
function mySubscribe(){
    window.location.href="mySubscribe.html?param="+phone;
}


//返回历史页
function returnHistory(){
    window.history.go(-1);
}
//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

