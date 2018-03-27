var count,userPhone,openIdCookie,phone;
$(function(){
	$("#mask").show();
    $("#loading").show();
    Dyconfing();
	getOpenId(); 
	//isBind(); 
	//gameCount();
})






//1.获取openId
function getOpenId(){
	openIdCookie=$.cookie("openId");
	if (openIdCookie==""||openIdCookie==null||openIdCookie==undefined) {
		var code=GetQueryString("code");
			url="/weixin/auth/authInfo";
		$.post(url,{"code":code},function(data){
			if (data.status == 1 && data.code == 1) {
				$("#mask").hide();
	   			$("#loading").hide();
				var openId=data.authInfo.openId;
				openIdCookie=openId;
				$.cookie("openId",openIdCookie);  //设置openId(cookie)
				getuserMsg(); 
			}
		})
	}else{
		openIdCookie=$.cookie("openId");
		$("#mask").hide();
	   	$("#loading").hide();
	   	getuserMsg(); 
	}
	
}

//2.获取用户基本信息
function getuserMsg(){
	var url="/weixin/auth/userInfo";
	openIdCookie=$.cookie("openId");  //获取openId值(cookie)
	$.post(url,{"openId":openIdCookie},function(data){
		if (data.status == 1 && data.code == 1) {
			$("#mask").hide();
	   		$("#loading").hide();
			var focusOn=data.userInfo.subscribe;
			if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
				isBind();  
			}else if(focusOn == 0){
				//isBind(); 
				showAlert();
				$(".successText").html("您暂未关注“中国贵州电信加油站”此公众号");
				$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
			}
		}
	})
}

//3.判断是否绑定
function isBind(){
	var url="/weixin/auth/isBind";
	openIdCookie=$.cookie("openId"); //获取openId值(cookie)
	$.post(url,{"openId":openIdCookie},function(data){
		if (data.status == 1 && data.code == 1) {
			if (data.isBind) {
				userPhone=data.phone;
				$.cookie("phone",userPhone);
				gameCount();   // 关注并绑定之后获取用户的游戏次数
				rankList(openIdCookie);   // 关注并绑定之后获取用户的排行榜
			}else{
				showAlert();
				$(".successText").html("您暂未绑定“中国贵州电信加油站”此公众号");
				$(".btns").html('<img src="img/affirm.png" onclick="showLogin()">');

			}
		}else{
			showAlert();
			$(".successText").html(data.message);
			$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
		}
	})
}


//4.获取游戏次数
function gameCount(){
	var url="/weixin/poetry/gameTimes";
	phone=$.cookie("phone");
	if (phone==null||phone==""||phone==undefined) {
		showAlert();
		$(".successText").html("您暂未绑定“中国贵州电信加油站”此公众号");
		$(".btns").html('<img src="img/affirm.png" onclick="showLogin()">');
	}else{
		$.post(url,{"phone":phone},function(data){
			if (data.status == 1 && data.code == 1) {
				count=data.gameTimes;
				if (count == "" || count == null || count == undefined) {
					$("#text-count").html("0");
				}else{
					$("#text-count").html(count);
				}
			}
		})
	}
}

//6.进入游戏
function startGame(){
	//进入游戏  添加活动结束限制
	showAlert();  
	$(".successText").html("对不起活动已结束，感谢你的关注");
	$(".btns").html('<img src="img/affirm.png" onclick="closeWindow()">');
//	phone=$.cookie("phone");
//	if (phone==""||phone==null||phone==undefined) {
//		showLogin();
//	}else{
//		if (count==0) {
//			showAlert();
//			$(".successText").html("您的游戏次数已用完，您可以购买流量包获得游戏机会，或明天继续");
//			$(".btns").html('<img src="img/affirm.png" alt="" onclick="closeWindow()">');	
//		}else{
//			window.location.href="startGame.html";  //跳转页面后从cookie中获取参数
//		}
//	}
}

//5.排行榜
function rankList(phone){
	var url="/weixin/poetry/rankList";
	$.post(url,{"phone":phone},function(data){
		if (data.status == 1 && data.code == 1) {
			var rankList=data.rankList;
			var	ownRank=data.ownRank;
			if (rankList == "" || rankList == null || rankList == undefined) {
				$("#tableF").html('<p style="font-size:.24rem;text-align: center;">暂无排行榜，敬请期待 ...</p>');
			}else{
				$.each(rankList,function(i,item){
					if (i>=10) {
                        return;
                    }else{
                        var str='<tr><td>'+item.id+'</td>'+
                            '<td>'+item.phone.substring(0,3)+"****"+item.phone.substring(7)+'</td>'+
                            '<td class="answerColor">'+item.result_num+'</td></tr>';
                        $("#tableF table tbody").append(str);
                    }
				})
			}

			if (ownRank == "" || ownRank == null || ownRank == undefined) {
				$("#ownRank").html("无");
			}else{
				$("#ownRank").html(ownRank.id);
			}
		}
	})
}


function Closethis(){
	hideAlert();
}

//调用confing
function Dyconfing(){
	var localUrl=window.location.href;
		url="/weixin/model/wxConfigSignature";
	//console.log(localUrl)
	$.post(url,{"localUrl":localUrl}, function (data) {
		if (data.status == 1 && data.code == 1) {
			var weixin = data.wxConfigSignatureData;
				appId = weixin.appId;
				noncestr = weixin.noncestr;
				signature = weixin.signature;
				timestamp = weixin.timestamp;
			wx.config({
				debug:false,
				appId:appId,
				timestamp:timestamp,
				nonceStr:noncestr,
				signature:signature,
				jsApiList:['hideOptionMenu','checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'showMenuItems', 'hideMenuItems', 'showOptionMenu']
			});
		}
	})
}
//关闭当前页面
function closeWindow(){
	wx.ready(function(){
		console.log("进入ready");
		wx.checkJsApi({
			jsApiList:['closeWindow'],
			success: function (res) {
				console.log("关闭当前窗口："+JSON.stringify(res));
			}
		});
		wx.closeWindow();   //关闭当前窗口
	});
}


//关闭当前弹框
function Closethis(){
	hideAlert();
}


/******************************弹出绑定************************************/

//验证码
function validateInfo(btn){
    var url="/weixin/auth/send";
    var Bingphone= $("#phone").val();
    if(Bingphone==""||Bingphone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;
    if (!reg2.test($.trim(Bingphone))) {
        $('#errorMessage').html("请输入正确手机号!");
        return;
    }
    

    $.ajax({
        type: 'get',
        url: url,
        data:{"phone":Bingphone,"openId":openIdCookie},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else{
                $('#errorMessage').html(data.message);
            }

        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}


//电信用户绑定
function binding(){
    var url='/weixin/auth/bind';
    var Bingphone= $("#phone").val();
    var validateCode=$('#yzm').val();
    if(Bingphone==""||Bingphone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;

    if (!reg2.test($.trim(Bingphone))) {
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    

    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":Bingphone,"openId":openIdCookie,"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="successwb">恭喜您！绑定成功，获得100M省内免费流量，系统将在24小时为您送出流量，结果将通过短信进行告知；在2017年2月10日开始使用查询功能，可参加抽奖活动，敬请关注</p><p><img src="img/gqbtn.png" class="bdsuccess" onclick="bdsuccess()"></p>');
                $.cookie("phone",Bingphone);
                $(".startShow").hide();
                rankList(Bingphone);
            }else if(data.code==1&&data.status==2){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('#errorMessage').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('#errorMessage').html(data.message);
            }

        },
        error:function(){
            $('#errorMessage').html("服务器连接失败！");
        }
    });
}

//非贵州电信用户绑定
function Notdx(){
    var url='/weixin/auth/bind';
    var Bingphone= $("#phone2").val();
    if(Bingphone==""||Bingphone==null){
        $('#errorMessage2').html("请输入正确手机号！");
        return;
    }
    var reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
        //reg2 = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(Bingphone))) {
        $('#errorMessage2').html("请输入正确的手机号！");
        return;
    }

    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":Bingphone,"openId":openIdCookie,"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="successwb">恭喜您！您已成功绑定。感谢您的参与！</p><p><img src="img/gqbtn.png" class="bdsuccess" onclick="bdsuccess()"></p>');
            	$.cookie("phone",Bingphone);
                $(".startShow").hide();
                rankList(Bingphone);
            }else if(data.code==1&&data.status==2){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('#errorMessage2').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('#errorMessage2').html(data.message);
            }
        },
        error:function(){
            $('#errorMessage2').html("服务器连接失败！");
        }
    });
}

//登录弹窗
function Login(){
    var str='<div id="loginStr">'+
                '<div id="header">'+
                    '<h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                    '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
                '</div>'+
                '<div id="successMessage">'+
                    '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100M省内流量</h1></div>'+
                    '<div class="add">'+
                        '<ul id="tabcon">'+
                        '<li id="li1" class="show">'+
                            '<div id="Li-con1">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError()"></p>'+
                                '<p class="yzm_p"><input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError()"><input type="button" id="text" onclick="validateInfo(this)" value="获取"></p>'+
                                '<p id="errorMessage"></p>'+
                                '<p id="sub_btn"><img src="img/sub.png" alt="" onclick="binding()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '<li id="li2">'+
                            '<div id="Li-con2">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone2" placeholder="请输入手机号" onfocus="clearError2()"></p>'+
                                '<p id="errorMessage2"></p>'+
                                '<p id="sub_btn2"><img src="img/sub.png" onclick="Notdx()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>';

    $("#login").html(str);
}


//Tab切换
function Tab(param){
    var header=document.getElementById('header');
    var h1=document.getElementById('h11');
    var h2=document.getElementById('h12');
    var li1=document.getElementById('li1');
    var li2=document.getElementById('li2');


    var h1a=document.getElementById('h1'+param);
    var lia=document.getElementById('li'+param);

    h1.className='';
    h2.className='';
    li1.className='';
    li2.className='';

    h1a.className='select';
    lia.className='show';

    if (param==2) {
        $("#title").html("非贵州电信用户不能赠送100M流量！");
    }else if (param==1) {
        $("#title").html("绑定手机号即送100M省内流量！");
    }
    
}

//绑定成功点击“确定”
function bdsuccess(){
	$("#login").hide();
	$("#mask").hide();
	gameCount();
}

//显示
function showLogin(){
	$("#startShow").hide();
    Login();
    $("#mask").show();
    $("#login").show();
}

//错误消息提示
function error(message){
    $("#mask").show();
    $("#login").show();
    $('#header').hide();
    $('#successMessage .add').html('<p class="successwb">'+message+'</p>');
}

//隐藏
function closeLogin(){
    $("#mask").hide();
    $("#login").hide();
}



//清空错误提示框的内容
function clearError(){
    $('#errorMessage').html("");
}

function clearError2(){
    $('#errorMessage2').html("");
}

//获取验证码
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