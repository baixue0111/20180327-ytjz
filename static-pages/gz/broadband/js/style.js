/**
 * Created by mysheng on 2018/1/25.
 */
/***************** rem、兼容********************/
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W * 0.15625 + 'px';
window.onresize = function () {
  var html = document.getElementsByTagName('html')[0];
  var W = document.documentElement.clientWidth;
  html.style.fontSize = W * 0.15625 + 'px';
}

$("#details").click(function () {
  $("#login").show();
  $("#loginMask").show();
})
$("#loginclose").click(function () {
  $("#login").hide();
  $("#loginMask").hide();
})
$("#loginMask").click(function () {
  $("#login").hide();
  $("#loginMask").hide();
})