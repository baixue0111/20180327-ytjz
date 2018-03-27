//适配
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.15625+'px';
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.15625+'px';
}

//倒计时
var tEnd = new Date(2017,1,12,24,00,00);
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
var type;
$(function(){
	fully();
})
//10元包type是lanternOne  15元包type是lanternTwo
function order(gettype){
	type=gettype;
    login();
    $('#loginMask').show();
//  $('#login').show();
    $('#successfully').show();             //活动已过期限制
   	$('#successfu').html('<div>对不起！活动已经过期，感谢您的关注，请下次提前订购，感谢您的关注！</div>');
}


function login(){
	var str='<p class="headline">'+
				'<span class="headli">元宵节流量三天包</span>'+
				'<span class="closedown"><img src="images/close.png" onclick="closedown()"/></span>'+
			'</p>'+
			'<div class="success">'+
				'<p class="success_top">'+
	                '<input type="text" placeholder="请输入手机号" id="phone" onfocus="clearError()">'+
	            '</p>'+
	            '<p class="success_bottom">'+
	                '<input type="text" placeholder="请输入验证码" id="validate" onfocus="clearError()">'+
	                '<input type="button" value="获取" id="yzm" onclick="validateInfo(this)">'+
	            '</p>'+
	           	'<div id="errorMsg"></div>'+
	           	'<p class="purch" onclick="loginInfo()"><img src="images/purch.png"/></p>'+
           	'</div>';
        $("#login").html(str);   	
}

function fully(){
	var fullystr ='<p class="successfully_top">'+
				'<span class="successfully_t"><img src="images/package.png"/></span>'+
				'<span class="closedown"><img src="images/close.png" onclick="closeoff()"/></span>'+
			'</p>'+
			'<div id="successfu"></div>'+
			'<div class="purch_tt" onclick="queding()"><img src="images/confirm.png"/></div>';
		$("#successfully").html(fullystr); 
}
//发送验证码
function validateInfo(btn) {
    var url="/activity/singleorder/send";
    var phone= $("#phone").val();
    if(phone==""||phone==null){
        $('#errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMsg').html("您输入的非电信手机号！");
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
            if(data.code==0){
                $('#errorMsg').html("服务器连接失败！");
                return;
            }
            if(data.status==0){
                $('#errorMsg').html("验证码发送失败！");
            }else if(data.code==1&&data.status==2){
            	$('#errorMsg').html("您输入的号码未实名认证");
            }else if(data.status==5){
            	$('#login').hide();
			    $('#successfully').show();
				$('#successfu').html('<div>对不起！活动已经过期，感谢您的关注，请下次提前订购，感谢您的关注！</div>');
            }else{
                buttonTime(btn);
            }
        },
        error:function(data){
            $('#errorMsg').html("服务器连接失败！");
        }
    });
}
/*订购*/
function loginInfo() {
    var url="/activity/singleorder/order";
    var phone= $("#phone").val();
    var validate =$("#validate").val();
    if(phone==""||phone==null){
        $('#errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMsg').html("请输入贵州电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#errorMsg').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["type"]=type;
    pram["validateCode"]=validate;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMsg').html("服务器连接失败！");
                return;
            }else if(data.status==0){
                $('#errorMsg').html("验证码错误！");
            }else{
	        	var strr="";
			    if(type=='lanternOne'){
			    	strr="10元3天流量包"
			    }else{
			    	strr="15元3天流量包"	
			    }
			    $('#login').hide();
			    $('#successfully').show();
				$('#successfu').html('<div><span style="color: yellow;font-size: 0.3rem;">恭喜您!</span>成功抢购'+strr+'，系统将在24小时内为您受理，受理结果将通过短信进行告知。您还获得额外2次抢红包机会，在微信后台回复“红包”即可参与！</div>');
            }
        },
        error:function(){
            $('#errorMsg').html("服务器连接失败！");
        }
    });
}
//验证码倒计时
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "获取";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value =wait +"s";
        wait--;
        setTimeout(function () {
                buttonTime(btn);
            }, 1000)
    }
}

function mask(){
    $('#login').hide();
    $('#loginMask').hide();
}
function closedown(){
    $('#loginMask').hide();
    $('#login').hide();
    if(wait!=60)wait=0;
}
function closeoff(){
    $('#loginMask').hide();
    $('#successfully').hide();
}
function queding(){
	$('#loginMask').hide();
    $('#successfully').hide();
}
//清空错误提示框的内容
function clearError(){
    $("#errorMsg").html("");
}