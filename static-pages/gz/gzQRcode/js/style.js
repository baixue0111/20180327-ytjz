/**
 * Created by hsgeng on 2017/6/5.
 */
//出游七天包
function login1(){
    var login1Str='<div class="login1_close" onclick="login1_close()"></div>'+
        '<div id="login1_succes">'+
        '<p class="login1_top">'+
        '<input type="text" placeholder="请输入手机号" id="login1_phone" onfocus="clearError()">'+
        '</p>'+
        '<p class="login1_bottom">'+
        '<input type="text" placeholder="请输入验证码" id="login1_validate" onfocus="clearError()">'+
        '<input type="button" value="获取" id="login1_yzm" onclick="login_validateInfo(this)">'+
        '</p>'+
        '<div id="login1_errorMsg"></div>'+
        '</div>'+
        '<div id="login1Button">'+
        '<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>'+
        '</div>';
    $("#login2").html(login1Str);
}
var type;
function order(gettype){
	type=gettype;
    $("#login2").show();
    login1();
    if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
    $('#loginMask').show();
}
//关闭页面    
function login1_close(){
    $("#login2").hide();
    $('#loginMask').hide();
    clearInterval(timerset);
}
 //是否重复订购流量
function login_validateInfo(btn){
	$("#login1_yzm").removeAttr("onclick"); 
    var url="/activity/singleorder/reOrder";
    var phone= $("#login1_phone").val();
    if(phone==""||phone==null){
        $('#login1_errorMsg').html("请输入手机号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
        $("#login1_yzm").attr("onclick","login_validateInfo();");
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
			if(data.code==1&&data.status==2){
					$("#loginMask").show();
					$("#repeatOrder").show();
					$("#login2").hide();	
			}else if(data.code==1&&data.status==0){
				$('#login1_errorMsg').html(data.message);
				$("#login1_yzm").attr("onclick","login_validateInfo();");
			}else if(data.code==1&&data.status==1){
				she();
			}
        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
//  }
}
function repeatorder(){
	$("#repeatOrder").hide();
	$("#login2").show();
	she();
	if(seads!=0)timer=60;
    $("#login1_yzm").val("获取");
}
function releatcolse(){
	$("#repeatOrder").hide();
	$("#login2").hide();
	$("#loginMask").hide();
	clearInterval(timerset);
}
// 出游季获取验证码
function she() {
    var url="/activity/singleorder/send";
    var phone= $("#login1_phone").val();
    if(phone==""||phone==null){
        $('#login1_errorMsg').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
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
        	if (data.code == 1 && data.status ==1) {
				login_validat();		
            }else {
                $('#login1_errorMsg').html(data.message);
                $("#login1_yzm").attr("onclick","login_validateInfo();");
            }
        },
        error:function(){
            $('#login1_errorMsg').html("服务器连接失败！");
        }
    });
}


//获取倒计时
var timer;
var timerset=null;
var seads;
function login_validat(){
	timer = 60;
	seads=timer;
	$("#login1_yzm").val(timer+"s");
	timerset= setInterval(function() {
	    Countdown();
	}, 1000);
}
function Countdown() {
	console.log($("#login1_yzm").val())
    if (seads != 0) {
        seads --;
       $("#login1_yzm").val(seads+"s");
    }
    else if(seads == 0){ 
		$("#login1_yzm").attr("onclick","login_validateInfo();");
    	$("#login1_yzm").val("获取");
    	clearInterval(timerset);
    }else if($("#login1_yzm").val()=="获取"){
    	$("#login1_yzm").attr("onclick","login_validateInfo();");
    }
    else{
    	clearInterval(timerset);
    }
}
/*出游季订购*/
function login1_loginInfo() {
    var url="/activity/singleorder/order";
    var phone= $("#login1_phone").val();
    var validate =$("#login1_validate").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#login1_errorMsg').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["type"]=type;
    pram["where"]=2;  //添加标识，判断从哪订购的
    pram["share"]="";
    $("#login1Button").html('<button id="login1_but" onclick="login1_errorClick()">抢购中...</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.status==1&&data.code==1){
				var strr="";
	            if(type=='schoolOne'){
			    	strr="10元3天流量包";

			    }else{
			    	strr="20元7天流量包";
			    }
			    $("#login1_succes").css("margin-top","3.5rem")
				$('#login1_succes').html('<p class="success"><span class="success3">恭喜您,</span>成功抢购'+strr+',系统将在24小时内为您受理,受理结果将通过短信进行告知.感谢您的参与!</span><div class="success4">扫描下方二维码，关注并绑定“中国电信贵州加油站”，即可实时掌握电信流量特惠政策，现在成功绑定还赠送100M！<img style="width:32%;margin-left:33%" src="images/wg.jpg"/></div></p>');
				$("#login1Button").html('<button id="login1_but" onclick="login1_que()">确定</button>');
				$("#login1Button").hide();
           	}else{
             	$('#login1_errorMsg').html(data.message);
                $("#login1Button").html('<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>');
            }	
        },
        error:function(){
            $('#login1_errorMsg').html("服务器连接失败！");
            $("#login1Button").html('<button id="login1_but" onclick="login1_loginInfo()">立即抢购</button>');

        }
    });
}


//清空错误提示
function clearError(){
	$('#login1_errorMsg').html("");
}
//订购成功     点击确定关闭页面
function login1_que(){
    $("#login1").hide();
    $('#loginMask').hide();
    clearInterval(timerset);
//  flag=false;
}

//抢购中  不能再次点击进行订购
function login1_errorClick(){
    $('#login1_errorMsg').html("请别连续点击!");
    setTimeout(function(){
        $('#login1_errorMsg').html("");
    },2000);
}