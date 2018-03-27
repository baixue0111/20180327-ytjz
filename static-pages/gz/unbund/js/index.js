var code,productId,openID_value,phone,openId,id;
$(function(){
	login();
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    getOpenId();//获取openid
})
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
//2.获取用户基本信息
function getuserMsg(){
	var url="/weixin/auth/userInfo";
	openID_value=$.cookie('openID_value'); //获取openId值(cookie)
	$.post(url,{"openId":openID_value},function(data){
		if (data.status == 1 && data.code == 1) {
			$("#loading").hide();
			var focusOn=data.userInfo.headimgurl;
            $("#headerImg").html('<img src="'+focusOn+'">');
			bing();
		}
	})
}

//查询微信用户是否绑定
function bing(){
    var url = "/weixin/auth/isBind";  
    $.post(url,{"openId":$.cookie('openID_value')},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){
				var getphone=data.phone;
            	$.cookie("getphone",getphone);
                 $("#bangding").html("已绑定");
                 $(".bingPhone").html(getphone);
            }else{
                $("#bangding").html("未绑定");
                $(".bingPhone").html("未绑定");
                var getphone=data.phone;
            	$.cookie("getphone",getphone);
            }
        }
    } )
}

function login(){
    var strLogin='<p><img src="images/guanbi.png" onclick="closeImg()"></p>'+
                '<div class="login_img">'+
                '</div>'+
                '<p class="tishi"></p>';
        $("#login").html(strLogin);
}

unbund = function(){
    $("#loading1").show();
    $(".login_p").html("解绑中...");
    var url='/weixin/unbound/unbound';
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
            $("#loading1").hide(); 
            if(data.code==0 && data.status==2){
                $("#login").show();
                $("#loginMask").show();
                $(".login_img").html('<img src="images/cheng.png">');
                $(".tishi").html(data.message);
                bing();
            }else{
                $("#login").show();
                $("#loginMask").show();
                $(".login_img").html('<img src="images/shibai.png">');
                $(".tishi").html(data.message);
            }
        },
        error:function(){
            $("#loading1").hide();
            $("#login").show();
            $("#loginMask").show();
            $(".login_img").html('<img src="images/shibai.png">');
            $(".tishi").html("链接服务器失败！");
        }
	})   
}


closeImg = function (){
    $("#login").hide();
    $("#loginMask").hide();
}