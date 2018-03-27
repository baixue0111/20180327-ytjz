/**
 * Created by mysheng on 2016/5/18.
 */
/*滚动信息*/
var wait = 60;
var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 20;
area.scrollTop = 0;
con2.innerHTML = con1.innerHTML;
function scrollUp(){
    if(area.scrollTop >= con1.scrollHeight) {
        area.scrollTop = 0;
    }else{
        area.scrollTop ++;
    }
}
var myScroll = setInterval("scrollUp()",speed);
area.onmouseover = function(){
    clearInterval(myScroll);
}
area.onmouseout = function(){
    myScroll = setInterval("scrollUp()",speed);
}

$(document).ready(function(){
    login();
    drawHistory();
})

function rocate(status){
    var rotateTimeOut = function () {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;
    var rotateFn = function (awards, angles, txt) {
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles +3600,
            duration: 3000,
            callback: function () {
                setTimeout(function(){
                    success(txt);
                },500);

                bRotate = !bRotate;
            }
        })
    };
    if(bRotate)return;
    var item =status;
    switch (item) {
        case 1:
            rotateFn(3, 157.5, '一等奖 乐2超级手机');
            break;
        case 2:
            rotateFn(7, 337.5, '二等奖 100M省内免费流量');
            break;
        case 3:
            rotateFn(5, 247.5, '三等奖	50M省内免费流量');
            break;
        case 4:
            rotateFn(1, 67.5, '四等奖 30M省内免费流量');
            break;
        case 5:
            rotateFn(2, 112.5, '谢谢参与!');
            break;
        case 6:
            rotateFn(6, 292.5, '谢谢参与!');
            break;
        case 7:
            rotateFn(4, 202.5, '谢谢参与!');
            break;
        case 8:
            rotateFn(0, 22.5, '谢谢参与!');
            break;
    }
   // console.log(item);
}

function validateInfo(btn) {
    var url="/weixin/lottery/send";

    var phone= $("#phoneNum").val();

    if(phone==""||phone==null){
        $('#errorMessage').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }

    var pram={};
    pram["phone"]=phone;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else if(data.code==1&&data.status==2){
                error(data.message);

            } else{
                if(data.message.length>15){
                    error(data.message);
                }else{
                    $('#errorMessage').html(data.message);
                }

            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/weixin/lottery/lottery";
    var phone= $("#phoneNum").val();
    var validate =$("#validate").val();
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#errorMessage').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    $("#loginButton").html('<img src="image/button.png" alt="" id="login_button" class="button" onclick="loginInfo()"/>');
     $.ajax({
     type: 'POST',
     url: url,
     data: JSON.stringify(pram),
     dataType: 'json',
     contentType:'application/json;charset=UTF-8',
     success: function(data){
        $("#history ul").html("");
        if(data.status==1&&data.code==1){
            $("#load").hide();
            $("#loginStr").hide();
            var status=data.prizeId;
            if(status>4){
                status=data.prizeId+Math.floor(Math.random()*4);
            }
            rocate(status);
        }else if(data.status==2&&data.code==1){
            $('#errorMessage').html(data.message);
        }else if(data.status==3&&data.code==1){
            error(data.message);
        }else{
            if(data.message.length>15){
                error(data.message);
            }else{
                $('#errorMessage').html(data.message);
                $("#loginButton").html('<img src="image/button.png" alt="" id="login_button" class="button" onclick="loginInfo()"/>');
            }
        }
        drawHistory()
    },
    error:function(){
        $('#errorMessage').html("服务器连接失败！");
        $("#loginButton").html('<img src="image/button.png" alt="" id="login_button" class="button" onclick="loginInfo()"/>');

    }
    });
}

/*抽奖*/
function draw(){
    login();
    $("#Tips").html("");
    $("#load").show();
    $("#loginStr").show();
    /*var status=Math.floor(Math.random()*7);
   rocate(status);*/

}

/*抽奖历史*/
function drawHistory(){
    var url="/weixin/lottery/lotteryList";
    var pram={};
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            var jsondata=data.lotteryList;
            if(data.status==1&&data.code==1){
                $.each(jsondata, function(i, item){
                    $("#history ul" ).append('<div class="history_message"><li>'+item.CREATE_DATE+'</li><li>'+ item.PHONE.substring(0,3)+"****"+item.PHONE.substring(7,11) +'</li><li>'+item.PRIZE_NAME+'</li></div>');
                });
            }else{
                var  str1="<ul><li>未加载到数据</li><li></li><li></li></ul>";
                $('#history ul').html(str1)
            }
        },
        error:function(){

        }
    });
}

/*成功提示信息*/
function success(message){
    if(message.indexOf("谢谢参与")==-1){
        $('#successMessage').html('<p class="success"><span>恭喜您!</span>抽中'+message+'，系统将在48小时内为您派奖，结果将通过短信进行告知。感谢您的参与！</p>');
    }else{
        $('#successMessage').html('<p class="success"><span>很遗憾！您没有中奖!</span>感谢您的参与！请继续关注中国电信贵州加油站，更多优惠活动等着您！</p>');
    }
    $("#Tips").html("");
    $("#load").show();
    $("#loginStr").show();
}
/*错误提示信息*/
function error(message){
    $('#successMessage').html('<p class="success">'+message+'</p>');
    $("#load").show();
    $("#loginStr").show();
    $("#Tips").html('<p><a href="http://114.135.113.184/active/gzLeTv/index.html?flag=ada">Tips:点击此处参加答题活动！</a></p>');
}
/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();
    if(wait!=60)wait=0;

}
/*验证登录函数*/
function login(){
    var str='<div class="load"></div>'+
        '<div id="login">'+
        '<div class="header"><span class="span" onclick="loginclose();" title="关闭"><img style="width: 20px;" src="image/close.png"/></span></div>'+
        '<div id="successMessage"><div><input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/></div>'+
        '<div><input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
        '<input class="input3" type="button" style="margin-right: 20px;" value="获取验证码" onclick="validateInfo(this)">'+
        '<p id="errorMessage"></p>'+
        '</div>'+
        '<div id="loginButton" ><img src="image/button.png" alt="" id="login_button" class="button" onclick="loginInfo()"/></div>'+
        '</div><div style="margin: 10px;margin-top:0px;" id="Tips"><p><a href="http://114.135.113.184/active/gzLeTv/index.html?flag=ada">Tips:点击此处参加答题活动！</a></p></div>' +
        '</div>';
    $("#loginStr").html(str);
}
function clearError(){
    $('#errorMessage').html("");
}
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取验证码";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value =wait +"s后请重发";
        wait--;
        setTimeout(function () {
            buttonTime(btn);
        }, 1000)
    }
}