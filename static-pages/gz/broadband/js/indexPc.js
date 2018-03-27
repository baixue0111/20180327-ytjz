/**
 * Created by mysheng on 2018/1/25.
 */
/***************** rem、兼容********************/
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W * 0.05211047 + 'px';
window.onresize = function() {
    var html = document.getElementsByTagName('html')[0];
    var W = document.documentElement.clientWidth;
    html.style.fontSize = W * 0.05211047 + 'px';
}

$("#details").click(function() {
    window.open('https://gzdx.me/dqxy');
})