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
    });
}
function loginMessage(){
    var num=$.cookie("num")
    if(num==""||num==undefined||num==null||num=="null"){
        $("#load").show();
        $("#loginStr").show();
        $.cookie("num", "1", { expires: 7 });
    }else{
        draw();
    }

}
/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();

}

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
            $("#phone").attr("href","apple.html");
        }else  if(data=="三星"){
            $("#phoneType").attr("href","Samsung.html");
            $("#phone").attr("href","Samsung.html");
        }else  if(data=="小米"){
            $("#phoneType").attr("href","mi.html");
            $("#phone").attr("href","mi.html");
        }else  if(data=="华为"){
            $("#phoneType").attr("href","huawei.html");
            $("#phone").attr("href","huawei.html");
        }else  if(data=="乐视"){
            $("#phoneType").attr("href","leshi.html");
            $("#phone").attr("href","leshi.html");
        }else{
            $("#phoneType").attr("href","other.html");
            $("#phone").attr("href","other.html");
        }

    });
}

function openPage(){
    var phoneno=$.cookie("phoneno")
    window.location.href="dw2.html?phoneno="+phoneno;
}