 (function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 默认设计图为640的情况下1rem=100px；根据自己需求修改
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
 
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//显示十全十美详情内容
function showGood() {
    $(".goodRules").show();
}

//显示存折计划详情内容
function oldDetail() {
    $(".oldDeatil").show();
}

// 关闭十全十美详情内容
function closeDetail() {
    $(".goodRules").hide();
    $(".oldDeatil").hide();
}

// 关闭弹框
function closeAlert() {
    $(".mask").hide();
    $(".login").hide();
}

//清空错误提示框的内容
function focusClear() {
    $(".errMsg").html("");
}