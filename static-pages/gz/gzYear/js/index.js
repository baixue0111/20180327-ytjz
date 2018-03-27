//适配
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.15625+'px';
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.15625+'px';
}
var type;
function order(gettype){
	type=gettype;
    login();
  	$('.success').html('<p class="error" style="width: 100%; margin-top: 1rem;text-align: center;">活动已结束,敬请期待新活动</p>');
	$('.confirmation').html('<button class="conf" onclick="queding();">确定</button>')
    $('#loginMask').show();
    $('#login').show();
}

//倒计时
var tEnd = new Date(2017,1,3,24,00,00);
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

function login(){
	var str='<p class="login_top"><img src="images/down.png"/ onclick="closedown()"></p>'+
			'<div class="success">'+
				'<p class="success_top">'+
                    '<input type="text" placeholder="请输入手机号" id="phone" onfocus="clearError()">'+
                '</p>'+
                '<p class="success_bottom">'+
                    '<input type="text" placeholder="请输入验证码" id="validate" onfocus="clearError()">'+
                    '<input type="button" value="获取" id="yzm" onclick="validateInfo(this)">'+
                '</p>'+
               	'<div id="errorMsg"></div>'+
			'</div>'+
            '<div class="confirmation">'+
            	'<button class="conf" onclick="loginInfo()">确认订购</button>'+
            '</div>';
     	$("#login").html(str);
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
        $('#errorMsg').html("您输入的非贵州电信手机号！");
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
            }else if(data.status==0){
                $('#errorMsg').html("验证码发送失败！");
            }else if(data.code==1&&data.status==2){
            	 $('#errorMsg').html(data.message);
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
    var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMsg').html("您输入的非贵州电信手机号！");
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
    $(".confirmation").html('<button class="conf" onclick="errorClick()">抢购中</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==0){
                $('#errorMsg').html("服务器连接失败！");
   				$(".confirmation").html('<button class="conf" onclick="loginInfo()">确认订购</button>');
                return;
            }else if(data.status==0){
                $('#errorMsg').html("验证码错误！");
   				$(".confirmation").html('<button class="conf" onclick="loginInfo()">确认订购</button>');
            }else{
	        	var strr="";
			    if(type=='festivalOne'){
			    	strr="10元七天流量包"
			    }else if(type=='festivalTwo'){
			    	strr="20元七天流量包"	
			    }else{
			    	strr="30元七天流量包"	
			    }
			    console.log(strr);
				$('.success').html('<div class="qigou"><span style="color: yellow;font-size: 0.3rem;">恭喜您!</span>成功抢购'+strr+'，系统将在24小时内为您受理，受理结果将通过短信进行告知。本次订购您已获得2次抢流量红包机会，请在微信后台输入“红包”！</div>');
				$('.confirmation').html('<button class="conf" onclick="queding();">确定</button>')
       	}		
        },
        error:function(){
            $('#errorMsg').html("服务器连接失败！");
            $(".confirmation").html('<button class="conf" onclick="loginInfo()">确认订购</button>');
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


//关闭
function mask(){
    $('#login').hide();
    $('#loginMask').hide();
}
function closedown(){
    $('#loginMask').hide();
    $('#login').hide();
    if(wait!=60)wait=0;
}
function queding(){
	$('#loginMask').hide();
    $('#login').hide();
}
//清空错误提示框的内容
function clearError(){
    $("#errorMsg").html("");
}

function errorClick(){
    $('#errorMsg').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMsg').html("");
    },2000);
}

