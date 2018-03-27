/**
 * Created by mysheng on 2016/7/14.
 */
/*$(function(){
    var phoneno= GetQueryString("phoneno");
    $.cookie("phoneno", phoneno, { expires: 7 });
    var url="/access?phone="+phoneno;
    $.post(url,{"type":type},function(data){

    });
})*/

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}