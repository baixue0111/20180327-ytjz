
var monthNum,myNum,myUsedFlow,thisMon,thisFlow,thisNum;
$(function () {
	$(".mask").show();
    $(".loading").show();
	login();
	Login2();
	Dyconfing();
	getopenId();
	failureShow();


	 //1.获取openId
    function getopenId (){
        var openId,url;
        var code = GetQueryString('code');
        openId = $.cookie("openId");
        url = "/weixin/auth/authInfo";
        if (openId == "" || openId == null || openId == undefined || openId == "undefined") {
            $.ajax({
                type : 'get',
                url : url,
                data : {"code":code},
                dataType : "json",
                contenType : 'application/json;charset=UTF-8',
                success : function (data) {
                    if (data.status == 1 && data.code == 1) {
                    	$(".mask").hide();
                    	$(".loading").hide();

                        openId = data.authInfo.openId;
                        $.cookie("openId",openId);
                        getuserMsg();
                    }
                }
            })
        }else{
            $(".mask").hide();
            $(".loading").hide();
            openId = $.cookie("openId");
            getuserMsg();
        }
    }

    //2.获取用户基本信息
    function getuserMsg(){
        var url = "/weixin/auth/userInfo";
        var openId = $.cookie("openId");  //获取openId值(cookie)
        $.post(url,{"openId":openId},function(data){
            if (data.status == 1 && data.code == 1) {
                var focusOn=data.userInfo.subscribe;
                if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
                    isBind();  
                }else if(focusOn == 0){
                    showAlert();
                    $(".con h2").html("很遗憾！")
                    $(".con p").html('参加活动失败，您当前号码未关注“中国电信贵州加油站”此公众号。');
                    $(".hidesun").hide();
                }
            }
        })
    }

    //3.判断是否绑定
    function isBind(){
        var url = "/weixin/auth/isBind";
        var openId = $.cookie("openId"); //获取openId值(cookie)
        $.post(url,{"openId":openId} , function (data) {
            if (data.status == 1 && data.code == 1) {
                if (data.isBind) {
                	var userPhone = data.phone;
                    $.cookie("phone",userPhone);
                    isgz();   // 如果绑定成功则检测手机号是否是贵州电信用户
                }else{
                	Login2();
                    $("#loginMask").show();
				    $("#login").show();
                }
            }
        })
    }

	//判断用户是否是贵州电信用户
	isgz = function (){
		var phone = $.cookie('phone');
		//var phone = "13329609385";
		var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
		if (!reg.test($.trim(phone))) {
			showAlert();
			$(".con h2").html("很遗憾！")
            $(".con p").html('参加活动失败，您当前号码不是中国贵州电信用户。');
            $(".hidesun").hide(); 
		}else{
			flowList();  //上一个流量排行榜
			thisList();  //本月排行榜
			failureShow();
		}
	}

	
	// 点击参与
	btnclick = function () {
		var phone = $.cookie("phone");
		//var phone = "13329609385";

		var url = "/weixin/showFlow/join";
		var param = {};
		param["phone"] = phone;

		$.ajax({
			type : 'post',
			url : url,
			data : JSON.stringify(param),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
			success : function (data) {
				if (data.status == 1 && data.code == 1) {
					showAlert();
					$(".con h2").html("恭喜您！");
					$(".con p").html("成功参加活动，请点击下方晒一晒，结果将与次月6日前短信进行告知。感谢您的参与！");
					flowList();  //上一个流量排行榜
					thisList();  //本月排行榜
					failureShow();
				}else if (data.status == 2 && data.code == 1) {
					showAlert();
					$(".con h2").html("很遗憾！");
            		$(".con p").html('您已参加了本次活动，请勿重复点击！'); 
            		$(".hidesun").hide();
            		
				}else if (data.status == 3 && data.code == 1) {
					showAlert();
					$(".con h2").html("很遗憾！")
            		$(".con p").html('对不起，您当前手机号码未实名认证，不能参加本次活动！');
            		$(".hidesun").hide();	 	
				}else if (data.status == 4 && data.code == 1) {
					showAlert();
					$(".con h2").html("很遗憾！")
            		$(".con p").html('本次活动已结束，请关注其他活动！');
            		$(".hidesun").hide();	 	
				}else if (data.status == 5 && data.code == 1) {
					showAlert();
					$(".con h2").html("很遗憾！")
            		$(".con p").html('您当前的手机号码含员工优惠套餐，不能参加本次活动！');
            		$(".hidesun").hide();	 	
				}else{
					showAlert();
					$(".con h2").html("")
            		$(".con p").html(message);
            		$(".hidesun").hide();	
				}
			}
		})
	}

	//上一个月流量使用排行榜
	function flowList(){
		var phone = $.cookie("phone");
		//var phone = "13329609385";
		
		var url = "/weixin/showFlow/ranking";
		var param={};
		var type = "previous";
		param["phone"] = phone;
		param["type"] = type;

		$.ajax({
			type : 'post',
			url : url,
			data : JSON.stringify(param),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
			success : function (data) {
				if (data.status == 1 && data.code == 1) {
					monthNum = data.mon;   //上个月日期
					myNum = data.myNum;  //本人排名
					myUsedFlow = data.myUsedFlow;  //本人本月已使用流量

					if (myNum == "" || myNum == "无" || myNum == null || myNum == undefined) {
						$(".myNum").html(myNum);
					}else{
						$(".myNum").html(myNum + '名');
					}

					if (myUsedFlow == "" || myUsedFlow == "无" || myUsedFlow == null || myUsedFlow == undefined) {
						$(".myFlow").html(myUsedFlow);
					}else{
						$(".myFlow").html(myUsedFlow + 'M');
					}

					$(".thismouth").html(monthNum + '月');
					$(".tableParent table tr td:nth-child(3)").html(monthNum + "月使用流量(M)");
					$(".topMon").html(monthNum + '月流量使用TOP10');

					var dataJson = data.rankingList;
					if (dataJson == "" || dataJson == null || dataJson == undefined || dataJson == "undefined") {
						$(".tableParent table").html('');
					}else{
						$.each(dataJson,function (i,item) {
							if (i >= 10) {
		                        return;
		                    }else{
			                        var str = '<tr>'+
										'<td>'+item.num+'</td>'+
										'<td>'+item.phone.substring(0,3)+"****"+item.phone.substring(7)+'</td>'+
										'<td>'+item.usedFlow+'</td>'+
										'</tr>';
									$(".tableParent table").append(str);
		                    }
						})
					}
				}
			}
		})
	}

	//本月流量使用排行榜
	function thisList(){
		var phone = $.cookie("phone");
		//var phone = "13329609385";

		var url = "/weixin/showFlow/ranking";
		var param={};
		var type = "current";
		param["phone"] = phone;
		param["type"] = type;

		$.ajax({
			type : 'post',
			url : url,
			data : JSON.stringify(param),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
			success : function (data) {
				if (data.status == 1 && data.code == 1) {
					thisMon=data.mon;   //本月份
					thisNum=data.myNum;  // 本月排名
					thisFlow=data.myUsedFlow;   // 本月使用流量

					$(".thisMon").html(thisMon + "月流量使用TOP10");
					$(".tableParent2 table tr td:nth-child(3)").html(thisMon + "月使用流量(M)");
					var dataJson = data.rankingList;
					if (dataJson == "" || dataJson == null || dataJson == undefined || dataJson == "undefined") {
						$(".tableParent2 table").html('');
					}else{
						$.each(dataJson,function (i,item) {
							if (i >= 10) {
		                        return;
		                    }else{
			                        var str = '<tr>'+
										'<td>'+item.num+'</td>'+
										'<td>'+item.phone.substring(0,3)+"****"+item.phone.substring(7)+'</td>'+
										'<td>'+item.usedFlow+'</td>'+
										'</tr>';
									$(".tableParent2 table").append(str);
		                    }
						})
					}
				}
			}
		})
	}

	function login() {
		var str='<div class="alert-top"><img src="img/alert-top_03.png" alt=""></div>'+
				'<div class="con">'+
					'<h2></h2>'+
					'<p></p>'+
					'<div class="affirmbtn">'+
						'<img src="img/alert-affirm_07.png" onclick="hideAlert();">'+
					'</div>'+
					'<div class="sunbtn">'+
						'<img src="img/click-sun_07.png" class="hidesun" onclick="showShare();">'+
					'</div>'+
				'</div>';
		$(".modal").html(str);
	}

	//显示模态框
	showAlert = function () {
		login();
	    $(".mask").show();
	    $(".modal").show();
	}
	//隐藏模态框
	hideAlert = function () {
	    $(".mask").hide();
	    $(".modal").hide();
	}
	//	显示分享指向
	showShare = function () {
		$(".mask").show();
		$(".share").show();
	}
	//	隐藏分享指向
	hideShare = function () {
		$(".mask").hide();
		$(".share").hide();
		failureShow();
	}
//分享功能
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

function failureShow(){

	

	if (thisMon == "" || thisMon == "无" || thisMon == null || thisMon == undefined) {
		thisMon = "";
	}

	if (thisNum == "" || thisNum == "无" || thisNum == null || thisNum == undefined) {
		thisNum = "0";
	}
	if (thisFlow == "" || thisFlow == "无" || thisFlow == null || thisFlow == undefined) {
		thisFlow = "";
	}

	

	wx.ready(function(){
	    console.log("显示右上角分享进入ready");
	    wx.checkJsApi({
	    	jsApiList:['showOptionMenu','onMenuShareAppMessage','onMenuShareTimeline'],
	    	success: function (res){
	    		//console.log("显示右上角分享："+JSON.stringify(res));
	    	}
	    })
	    wx.onMenuShareTimeline({
	    	title: '“中国电信贵州加油站” 晒流量 送流量',
	    	desc: '晒出上月已使用流量就有机会获得1000M(省内)流量奖励',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sunFlow/share.html?param='+thisMon+','+encodeURI(encodeURI(thisNum))+','+encodeURI(encodeURI(thisFlow))+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: 'http://gz.mobicloud.com.cn/active/sunFlow/img/11.jpg',
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		//alert("分享成功");
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.onMenuShareAppMessage({
	    	title: '“中国电信贵州加油站” 晒流量 送流量',
	    	desc:'晒出上月已使用流量就有机会获得1000M(省内)流量奖励',
	    	link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sunFlow/share.html?param='+thisMon+','+encodeURI(encodeURI(thisNum))+','+encodeURI(encodeURI(thisFlow))+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
	    	imgUrl: 'http://gz.mobicloud.com.cn/active/sunFlow/img/11.jpg',
	    	type: 'link',
	    	dataUrl: '',
	    	success: function (){
	    		//alert("分享成功");
	    	},
	    	cancel: function (){
	    		alert("分享失败！");
	    	}
	    });
	    wx.hideMenuItems({
	    	menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:QZone', 'menuItem:share:facebook']  //隐藏分享QQ，微博，QQ空间,FB
	    });
	    wx.showMenuItems({
	    	menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']  //显示分享到微信朋友和朋友圈
	    })
	    wx.error(function (res) {
			console.log(res);
		})
	})
}

//验证码
validateInfo = function (btn){
    var url="/weixin/auth/send";
    var phone = $("#phone").val();
    var openId = $.cookie("openId");
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|181|173)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;
    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号!");
        return;
    }
    

    $.ajax({
        type: 'get',
        url: url,
        data:{"phone":phone,"openId":openId},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn)
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
binding = function (){
    var url='/weixin/auth/bind';
    var phone = $("#phone").val();
    var openId = $.cookie("openId");
    var validateCode=$('#yzm').val();
    if(phone==""||phone==null){
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    var reg2 = /^1[34578]\d{9}$/;

    if (!reg2.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确手机号！");
        return;
    }
    

    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":openId,"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="success">恭喜您！绑定成功，获得100棒豆，系统将在24小时为您送出流量，结果将通过短信进行告知；</p><p class="affirm" onclick="closeLogin();">确定</p>');
            	$.cookie("phone",phone);
            	setTimeout(function () { 
			        isgz();
			    }, 4000); 
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
Notdx = function (){
    var url='/weixin/auth/bind';
    var phone = $("#phone2").val();
    var openId = $.cookie("openId");
    if(phone==""||phone==null){
        $('#errorMessage2').html("请输入正确手机号！");
        return;
    }
    var reg = /^1[34578]\d{9}$/;
        reg2 = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage2').html("请输入正确的手机号！");
        return;
    }

    $.ajax({
        type: 'get',
        url: url,
        data: {"phone":phone,"openId":openId,"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $('#successMessage .add').html('<p class="success">恭喜您！您已成功绑定。感谢您的参与！</p><p class="affirm" onclick="closeLogin();">确定</p>');
                $.cookie("phone",phone);

                setTimeout(function () { 
			        isgz();
			    }, 4000);   

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
function Login2(){
    var str='<div id="loginStr">'+
                '<div id="header">'+
                    '<h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                    '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
                '</div>'+
                '<div id="successMessage">'+
                    '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
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
Tab = function (param) {
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
        $("#title").html("非贵州电信用户不能赠送100棒豆！");
    }else if (param==1) {
        $("#title").html("绑定手机号即送100棒豆！");
    }
    
}


//显示
showLogin2 = function (){
    Login2();
    $("#loginMask").show();
    $("#login").show();
}

//错误消息提示
error = function (message){
    $("#loginMask").show();
    $("#login").show();
    $('#header').hide();
    $('#successMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏
closeLogin = function (){
    $("#loginMask").hide();
    $("#login").hide();
}


//清空错误提示框的内容
clearError = function (){
    $('#errorMessage').html("");
}

clearError2 = function (){
    $('#errorMessage2').html("");
}

//获取验证码
var wait = 60;
buttonTime = function (btn) {
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

});