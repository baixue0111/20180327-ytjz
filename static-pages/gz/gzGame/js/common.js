(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth > 768 ? 768 : docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
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


//弹框1(无标题)
function prompt(){
    var str='<div class="success">'+
                '<div class="header"></div>'+
                '<div class="successText">是否放弃游戏回到首页</div>'+
            '</div>'+
            '<div class="btns">'+
                '<img src="img/yes.png" alt="" class="btns-first" onclick="closeWindow();">'+
                '<img src="img/again.png" alt="" class="btns-second" onclick="hideAlert();">'+
            '</div>';
            
    $("#startShow").html(str);
}
//弹框2(有标题)
function prompt2(){
    var str='<div class="success">'+
                '<div class="header">答题失败</div>'+
                '<div class="successText">'+
                    '<p>您邀请好友帮忙后，才能进入下一题，邀请好友需先关注“中国电信贵州加油站</p>'+
                    '<p class="y-color">注：好友需在5分钟内完成，否则此题挑战失败，好友答题期间，请勿离开游戏界面。</p>'+
                '</div>'+
            '</div>'+
            '<div class="btns">'+
                '<img src="img/gameover.png" alt="" class="btns-first" onclick="over();">'+
                '<img src="img/help.png" alt="" class="btns-second" onclick="helpFriend();">'+
            '</div>';
            
    $("#startShow").html(str);
}

//答题成功
function prompt3(){
    var str='<div class="success">'+
                '<div class="header">恭喜您！</div>'+
                '<div class="successText">'+
                    '<p class="settl">获得一个 <span></span> M省内流量红包</p>'+
                    '<p class="y-color">注：贵州电信用户才能领取流量。</p>'+
                '</div>'+
            '</div>'+
            '<div class="btns">'+
                '<img src="img/lq.png" alt="" class="btns-first" onclick="receive();">'+
                '<img src="img/song.png" alt="" class="btns-second" onclick="shareApp();">'+
            '</div>';
            
    $("#startShow").html(str);
}

//领取流量成功
function LQsuccess(){
    var str='<div class="success">'+
                '<div class="header">恭喜您！</div>'+
                '<div class="successText">'+
                    '<p class="settl">获得一个 <span></span> M省内流量红包</p>'+
                    '<p class="y-color">注：贵州电信用户才能领取流量。</p>'+
                '</div>'+
            '</div>'+
            '<div class="btns">'+
               
            '</div>';
            
    $("#startShow").html(str);
}

//领取流量不成功
function LQerror(){
    var str=
            '<div class="success">'+
                '<div class="header">抱歉</div>'+
                '<div class="successText">'+
                    '<p class="settl"></p>'+
                    '<p class="y-color">注：请在72小时内领取，否则作废</p>'+
                '</div>'+
            '</div>'+
            '<div class="btns">'+
               '<img src="img/song.png" alt="" class="btns-first" onclick="shareApp();">'+
            '</div>';

    $("#startShow").html(str);
}

//隐藏提示框
function hideAlert(){
    $("#mask").hide();
    $("#startShow").hide();
}

//显示提示框
function showAlert(){
    prompt();
    $("#mask").show();
    $("#startShow").show();
}

function showAlert2(){
    prompt2();
    $("#mask").show();
    $("#startShow").show();
}

//显示答题成功弹窗
function showAlert3(){
    prompt3();
    $("#mask").show();
    $("#startShow").show();
}

//显示领取成功弹窗
function showSuccess(){
    LQsuccess();
    $("#mask").show();
    $("#startShow").show();
}

//显示领取成功弹窗
function showError(){
    LQerror();
    $("#mask").show();
    $("#startShow").show();
}


//点击结束游戏
function gameOver(){
    prompt2();
    showAlert();
}

//关闭当前页面
function closeWindow(){
    wx.ready(function(){
        console.log("进入ready");
        wx.checkJsApi({
            jsApiList:['closeWindow'],
            success: function (res) {
                console.log("关闭当前窗口："+JSON.stringify(res));
            }
        });
        wx.closeWindow();   //关闭当前窗口
    });
}

