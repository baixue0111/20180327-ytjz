/**
 * Created by mysheng on 2016/5/16.
 */
$(function(){
    phoneType();
});
function recount(){
    var phoneno= GetQueryString("phoneno");
    $.cookie("phoneno", phoneno, { expires: 7 });
    var url="/access?phone="+phoneno;
    $.post(url,{},function(data){

    });
}
function draw(){
   var phoneno= GetQueryString("phoneno");
   var url="/get?phone="+phoneno;
    $.post(url,{},function(data){
        $("#success").html(data)
        $("#load").show();
        $("#loginStr").show();
    }).error(function(){
        $("#success").html("对不起，领取失败请稍后再试!")
        $("#load").show();
        $("#loginStr").show();
    })

}
/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();

}
/*获取地址栏参数的值*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function phoneType() {
    var phoneno= GetQueryString("phoneno");
    var url="/type?phone="+phoneno;
    $.post(url,{},function(data){
        if(data=="苹果"){
            $("#phoneType").attr("href","apple.html");
        }else  if(data=="三星"){
            $("#phoneType").attr("href","Samsung.html");
        }else  if(data=="小米"){
            $("#phoneType").attr("href","mi.html");
        }else  if(data=="华为"){
            $("#phoneType").attr("href","huawei.html");
        }else  if(data=="乐视"){
            $("#phoneType").attr("href","leshi.html");
        }else{
            $("#phoneType").attr("href","other.html");
        }

    });
}
function openPage(){
    var phoneno=$.cookie("phoneno")
    window.location.href="hd.html?phoneno="+phoneno;
}