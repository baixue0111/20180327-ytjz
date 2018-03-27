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
    window.location.href="details.html";
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

var package = {
    "56": "套餐档位：套餐月费56元，国内分钟数100分钟，国内流量500MB",
    "76": "套餐档位：套餐月费76元，国内分钟数200分钟，国内流量800MB",
    "106": "套餐档位：套餐月费106元，国内分钟数300分钟，国内流量1G",
    "136": "套餐档位：套餐月费136元，国内分钟数500分钟，国内流量1G",
    "166": "套餐档位：套餐月费166元，国内分钟数500分钟，国内流量2G",
    "196": "套餐档位：套餐月费196元，国内分钟数500分钟，国内流量3G",
    "296": "套餐档位：套餐月费296元，国内分钟数1000分钟，国内流量4G",
    "396": "套餐档位：套餐月费396元，国内分钟数2000分钟，国内流量6G",
    "596": "套餐档位：套餐月费596元，国内分钟数3000分钟，国内流量11G"
};
//var num = "76";
//alert(package[num]);