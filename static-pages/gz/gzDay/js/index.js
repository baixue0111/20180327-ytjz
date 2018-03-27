/**
 * Created by hsgeng on 2016/12/19.
 */

function loginMessage(){
    login();
    //$('#successMessage').html('<p class="success">活动已结束,敬请期待新活动！</p>');
    $("#load").show();
    $("#loginStr").show();
}

//倒计时
var tEnd = new Date(2016,12,03,24,00,00);
function move(){
    var tStart = new Date();
    var Time = tEnd - tStart;
    var Days = parseInt(Time/(1000*60*60*24));//整数
    var _Days = Time%(1000*60*60*24);
    //小时
    var Hours = parseInt(_Days/(1000*60*60));//整数
    var _Hours = _Days%(1000*60*60);
    //分
    var Minutes = parseInt(_Hours/(1000*60));
    var _Minutes = _Hours%(1000*60);
    //秒
    var Seconds = parseInt(_Minutes/(1000));
    var _Seconds = _Minutes%1000;
    var spans = document.getElementsByTagName('span');
    spans[1].innerHTML = Days;
    spans[3].innerHTML = Hours;
    spans[5].innerHTML = Minutes;
    spans[7].innerHTML = Seconds;
}
setInterval(move,1)


/*验证登录函数*/
function login(){
    var str='<div class="load"></div>'+
        '<div id="login" >'+
        '<div class="header"><span class="span" onclick="loginclose();" title="关闭"><img style="width: 40px;" src="img/colse.png"/></span></div>'+
        '<div id="successMessage"><div><input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/></div>'+
        '<div><input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
        '<input class="input3" type="button" style="margin-right: 20px;background-color: rgba(255, 235, 59, 0.71)" value="获取验证码" onclick="validateInfo(this)">'+
        '<p id="errorMessage"></p>'+
        '</div>'+
        '<div id="loginButton" ><button id="login_button" class="button" onclick="loginInfo()" >立即订购</button></div>'+
        '</div><div style="height: 5px;"></div>'+
        '</div>';
    $("#loginStr").html(str);
}
function clearError(){
    $('#errorMessage').html("");
}

function validateInfo(btn) {
    var url="/activity/singleorder/send";

    var phone= $("#phoneNum").val();
    var type="christmasDay";
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else if(data.status==2) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
            }else if(data.status==3) {
                $('#successMessage').html('<p class="success">对不起！您已经参加过活动，感谢您的关注！</p>');
            }
            else if(data.status==4) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号属于OCS计费类型，暂不能订购该产品，感谢您的关注！</p>');
            }else if(data.status==5) {
                $('#successMessage').html('<p class="success">对不起！活动已经过期，感谢您的关注，请下次提前订购，感谢您的关注！</p>');
            }

            else{
                $('#errorMessage').html(data.message);
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/activity/singleorder/order";
    var phone= $("#phoneNum").val();
    //var productcd="700013949";
    var validate =$("#validate").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
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
    pram["type"]="christmasDay";
    $("#loginButton").html('<button id="login_button" class="button" onclick="errorClick();" >抢 购 中...</button></div>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMessage').html("服务器连接失败！");
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
                return;
            }
            if(data.status==0){
                $('#errorMessage').html(data.message);
                $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()" >立即订购</button>');
            }else{
                $('#successMessage').html('<p class="success"><span class="success2">恭喜您,</span>成功抢购“10元1G七天包”,系统将在24小时内为您受理,受理结果将通过短信进行告知.感谢您的参与!</p>');
            }
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
            $("#loginButton").html('<button id="login_button" class="button" onclick="loginInfo()"> 立即订购</button>');

        }
    });
}
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "免费获取验证码";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value ="重新发送验证码(" +wait + ")s";
        wait--;
        setTimeout(function () {
                buttonTime(btn);
            }, 1000)
    }
}

/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();
    if(wait!=60)wait=0;
}
function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
}



