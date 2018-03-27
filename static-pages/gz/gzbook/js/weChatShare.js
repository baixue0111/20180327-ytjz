var code,productId,openID_value,phone,openId,id;
give = function(){
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
}
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//获取openId 
getOpenId = function(){
	var oi=$.cookie('openID_value');  
    if(oi==null||oi==""||oi==undefined){  	//先判断openid是否为空，为空时执行这个函数  
        var url='/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: {"code":code},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){          	
                $('#loginMask').hide();  //弹出层隐藏
				$("#loading").hide();		//loading隐藏
                if(data.status==1&&data.code==1){
                    openID_value=data.authInfo.openId;
					$.cookie("openID_value",openID_value);//把openid储存到cookie中
					getuserMsg();
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
		$("#loading").hide();
       	openID_value=$.cookie('openID_value');
       	getuserMsg();
    }
    
}

//获取用户信息
function getuserMsg(){
	var url="/weixin/auth/userInfo";
	openID_value=$.cookie('openID_value'); //获取openId值(cookie)
	$.post(url,{"openId":openID_value},function(data){
		if (data.status == 1 && data.code == 1) {
			 //弹出层隐藏
			$("#loading").hide();
			var focusOn=data.userInfo.subscribe;
			if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
				bing();
			}else if(focusOn == 0){
				$('#login').show();
				$('#loginMask').show();
				var suStr= '<img class="suimg" src="img/wg.jpg"/>'+
							'<p style="margin-top:0.3rem;">对不起！您未关注公众号,长按二维码进行关注</p>';
				$('.succes').html(suStr);
			}
		}
	})
}
//关闭模态框
closels = function(){
	$("#login").hide();
	$("#loginMask").hide();
	$(".succes").html(""); 
}

//查询微信用户是否绑定
function bing(){
    var url = "/weixin/auth/isBind";  
    $.post(url,{"openId":$.cookie('openID_value')},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){
				var getphone=data.phone;
            	$.cookie("getphone",getphone);
            	add();
            }else{
   				$("#loginMask").show();
                $("#denglu").show();
                denglu();
            }
        }
    } )
}
//获取验证码
function validate(btn){
    var url="/weixin/auth/send";
    var phone= $("#deng_phone").val();
    if(phone==""||phone==null){
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;

    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号!");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data:{"phone":phone,"openId":$.cookie('openID_value')},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn)
            }else{
                $('.login_success').html(data.message);
            }

        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });
}

//电信用户绑定
function binding(){
	var url='/weixin/auth/bind';
    var phone= $("#deng_phone").val();
    var validateCode=$('#deng_yzm').val();
    var invitorOpenId=GetQueryString('helpOpenId');
    if(phone==""||phone==null){
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.login_success').html("请输入正确手机号！");
        return;
    }
    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":$.cookie('openID_value'),"invitorOpenId":invitorOpenId,"validateCode":validateCode,"type":6},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功，获得100棒豆（1棒豆=1M省内流量）！</p>'+
						'<img class="login_queding" onclick="closeWin()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
                $('#deng_successMessage').html(sustr);
            }else{
                $('.login_success').html(data.message);
            }
        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });
}
closeWin = function(){
	$("#loginMask").hide();
    $("#denglu").hide();
}
//绑定弹框
function denglu(){
	var str1='<div>'+
				'<div class="login_title">贵州电信用户绑定</div>'+
			'</div>'+
			'<div id="deng_successMessage">'+
				'<div style="color:red;font-size:0.3rem;">贵州电信绑定即送100棒豆</div>'+
				'<input type="text" id="deng_phone" placeholder="请输入手机号" onfocus="clearError()">'+
		        '<input type="text" id="deng_yzm" placeholder="请输入验证码" onfocus="clearError()">'+
		        '<input type="button" id="deng_text" onclick="validate(this)" value="获取">'+
				'<div class="login_success"></div>'+
				'<div><img src="img/sub.png" class="login_img" onclick="binding()"/></div>'+
				'<div class="login_zan" onclick="closeWindow()">暂不绑定</div>'+			
			'</div>';
	$("#denglu").html(str1);
}

//清除提示内容
clearError = function(){
	 $(".login_success").html("");
	 
}

closeWindow = function(){
	$("#loginMask").hide();
    $("#denglu").hide();
}


//为好友点赞
add = function(){
	share();
	var helpOpenId=GetQueryString('helpOpenId');
	var openId =$.cookie('openID_value');
	var url='/weixin/e_book/add';
	var param={};
	param["helpOpenId"]=helpOpenId;	
	param["openId"]=openId;	
	$.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
        		$("#loading1").hide();
        		$("#login").show();
				$("#loginMask").show();
	        	if(data.code==0&&data.status==3){
	        		$(".succes").html('<p class="succesp">请勿重复点赞</p>');
	        	}else{
	        		$(".succes").html('<p class="succesp">'+data.message+'</p>');	
	        	}
	        }
	})     
}


//记录
share= function(){
	var url='/weixin/e_book/share'
	var openId=$.cookie('openID_value');
	var phone=$.cookie('getphone');
	var param={};
	param["phone"]=phone;	
	param["openId"]=openId;	
	$.ajax({
		type:"post",
		url:url,
		data: JSON.stringify(param),
		dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	
        }
	})     
}
//获取验证码倒计时
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

