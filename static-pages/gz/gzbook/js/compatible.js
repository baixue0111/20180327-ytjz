/**
 * Created by hsgeng on 2017/7/18.
 */

/***************** rem、兼容********************/
var code,productId,openID_value,getphone;
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W*0.1333333333333333+'px';
// alert(W)
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.1333333333333333+'px';
}