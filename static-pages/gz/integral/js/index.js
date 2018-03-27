var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.13333333+'px';
	window.onresize = function(){
		var html = document.getElementsByTagName('html')[0];
		var W = document.documentElement.clientWidth;
			html.style.fontSize = W*0.13333333+'px';
	}

var code,productId,openID_value,openId,id;
$(function(){
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
    productId = $("#productIdTianji").val();  // 获取productId
    getOpenId();//获取openid
    model();
   
})
////获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
//获取openId 
function getOpenId(){
	var oi=$.cookie('openID_value');  
    if(oi==null||oi==""||oi==undefined||oi=="undefined"){  	//先判断openid是否为空，为空时执行这个函数  
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
                    getuserMsg(); //用户基本信息
                }
            }
        })
    }else{
        $('#loginMask').hide();  //弹出层隐藏
		$("#loading").hide();
       	openID_value=$.cookie('openID_value');
		getuserMsg(); //用户基本信息
    }
    
}
//2.获取用户基本信息
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
				$('#loginMask').show(); 
				$("#guanzhu").show();
				wgz();//未关注显示
			}
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
            	mypoint(); //我的棒豆
				failureShow();  //分享
            }else{
                login();  //绑定手机号
                $("#loginMask").show();
                $("#login").show();
            }
        }
    } )
}


//获取验证码
function validateInfo(btn){
    var url="/weixin/auth/send";
    var phone= $("#phone").val();
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
    var phone= $("#phone").val();
    var validateCode=$('#yzm').val();
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
        data: {"phone":phone,"openId":$.cookie('openID_value'),"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功，首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>'+
						'<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%"/>';
                $('#successMessage').html(sustr);
            }else if(data.code==1&&data.status==2){
                $('.login_success').html(data.message);
            }else if(data.code==1&&data.status==3){
                $('.login_success').html(data.message);
            }else if(data.code==1&&data.status==4){
                $('.login_success').html(data.message);
            }else if(data.code==1&&data.status==5){
                $('.login_success').html(data.message);
            }else if(data.code==1&&data.status==6){
                $('.login_success').html(data.message);
            }else if(data.code==1&&data.status==7){
                $('.login_success').html(data.message);
            }

        },
        error:function(){
            $('.login_success').html("服务器连接失败！");
        }
    });
}

function guab(){
	$("#loginMask").hide();
    $("#login").hide();
	location.reload(); 
}
//登录弹窗
function login(){
	var str='<div>'+
			'<div class="login_title">贵州电信用户绑定</div>'+
		'</div>'+
		'<div id="successMessage">'+
			'<input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError()">'+
	        '<input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError()">'+
	        '<input type="button" id="text" onclick="validateInfo(this)" value="获取">'+
			'<div class="login_success"></div>'+
			'<div><img src="images/sub.png" class="login_img" onclick="binding()"/></div>'+
			'<div class="login_zan" onclick="login_no()">暂不绑定</div>'+
		'</div>';
	$("#login").html(str);
}
//清空错误提示框的内容
function clearError(){
    $('.login_success').html("");
}	
//暂不绑定  	
function login_no(){
	$("#loginMask").show();
	$("#guanzhu").show();
	$("#login").hide();
	wgz();
	$(".guan_scuu").html('对不起，您未关注公众号，只有绑定了用户才能参加活动！')
}
//未关注    绑定
function wgz(){
	var wgzstr='<div>'+
				'<div class="guandui_dui">对不起</div>'+
			'</div>'+
			'<div class="guan_scuu">您未关注公众号，请关注后继续！</div>'+
			'<div id="butqiang"><button class="guan_button" onclick="closeWindow()">确定</button></div>';
		$("#guanzhu").html(wgzstr);	
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

//我的棒豆
function mypoint(){
	var url='/weixin/point/my';
	openID_value=$.cookie('openID_value');
	$.ajax({
		type:"post",
		url:url,
		data :{'openId':openID_value},
		dataType: 'json',
        success:function(data){
        	$("#usedList").empty();
        	$("#obtainList").empty();
        	if(data.code==0){
        		$("#cash2").show();
        		$("#loginMask").show();
        		$('.cash_s').html(data.message);
        	}
    		var a=[];
				a[0]=data.rank;
				for(var i=0;i<a.length;i++){
				    if(a[i]==null){
				      	a[i]="";
				    }
				}
				switch (data.rank){ //对应的等级
					case 0:
						a[0]='普通用户';
						$("#picture1").show();
						break;
					case 1:
						a[0]='土豆用户';
						$("#picture2").show();
						break;
					case 2:
						a[0]='铁豆用户';
						$("#picture3").show();	
						break;
					case 3:
						a[0]='铜豆用户';
						$("#picture4").show();
						break;
					case 4:
						a[0]='银豆用户';
						$("#picture5").show();	
						break;
					case 5:
						a[0]='金豆用户';
						$("#picture6").show();
						break;
					default:
						break;
				}
			if(data.signIn==1){   // 显示已经签到
				$("#slid1").show();
				$("#slid").hide();
			}else{
				$("#slid").show();
				$("#slid1").hide();
			}
    		$('.slide_user').html('我的等级：'+a[0]+'');   //等级
    		$('#rest').html(data.restPoint); //当前棒豆
    		$.each(data.obtainList,function(i,item){
    			var createTime = item.createTime;
				var create = createTime.substring(0,10);
    			var obtainListstr='<div>'+create+'</div>'+
			           	'<div>'+item.way+'</div>'+
			           	'<div>'+item.point+'颗</div>';
			    $("#obtainList").append(obtainListstr);       	
    		})
    		$('#used').html(data.usedPoint); //使用的棒豆
    		$.each(data.usedList,function(i,item){
    			var createTime = item.createTime;
				var create = createTime.substring(0,10);
    			var usedListstr='<div>'+create+'</div>'+
			           	'<div>'+item.way+'</div>'+
			           	'<div>'+item.point+'颗</div>';
			    $("#usedList").append(usedListstr); 
    		})
        }
   });
}
//关闭
function sheng(){
	$("#cash2").hide();
    $("#loginMask").hide();
	
}

//签到
function signIn(){
    var url='/weixin/point/signIn';
	openID_value=$.cookie('openID_value');
    $.post(url,{"openId":openID_value},function(data){
        if(data.code==1){
    		$("#cash3").show();
    		$("#slid1").show();
    		$("#loginMask").show();
    		$('.cash_cash').html(data.message);
        }
    })
}
 
//关闭签到
function que(){
	$("#cash3").hide();
	$("#loginMask").hide();
	window.location.href=window.location.href+"&id="+10000*Math.random();    //刷新页面
}
//棒豆超市
function shopping(){
	var url='/weixin/point/shopping';
	$.ajax({
		type:"GET",
		url:url,
		dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	$("#shoppingList").empty();
        	if(data.code==1){
        		$.each(data.shoppingList,function(i,item){
        			var shoppingList='<div class="shop_img"><div class="shop_img1"><img src="'+item.iconUrl+'"/></div>'+
		            			'<div class="xuyao">需要<span style="color: #ff5f64">'+item.point+'</span>颗棒豆</div>'+
								'<span class="exchange"><img src="images/exchangeimg.png" id="'+item.id+'" onclick="duihuan(this)"/></span>'+
                // '<p class="desc_p">现在兑换享受9折优惠</p>'+
                '</div>';
				    $("#shoppingList").append(shoppingList);     //产品号    通过id传过去
        		})
        	}
        }
   });
}
//兑换流量
function duihuan(getid){
	$("#cash").show();
	$("#loginMask").show();
	id=getid.id //兑换产品的id 
	var getphone =$.cookie("getphone");  // 如果已经绑定了，兑换给自己       就默认手机号码
	if(getphone!=null||getphone!=""||getphone!=undefined||getphone!="undefined"){
			$("#cash_phoneNum").val(getphone);
	}else{
		$("#cash_phoneNum").val("");
	}
}
//关闭兑换流量
function gblcc(){
	$("#loginMask").hide();
	$("#cash").hide();
	$("#cash2").hide();
	$(".cash_suc").html("");
	
}
var phone;
function exchangele(){
	var url='/weixin/point/exchange';
	phone= $("#cash_phoneNum").val();
	var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('.cash_suc').html("请输入贵州电信手机号！");
        return;
    }
	openID_value=$.cookie('openID_value');
	$('#butqiang').html('<button class="cash_button" onclick="exch()">正在兑换。。</button>');
	$.ajax({
		type:"GET",
		url:url,
		data: {'openId':openID_value,'id':id,'phone':phone},
		dataType: 'json',
        success:function(data){
        	if(data.code==1){
        		$("#cash").hide();
        		$("#cash3").show();
				$('#sheng').html('<button class="cash_button1" onclick="quelede()">确定</button>');
				$('#butqiang').html('<button class="cash_button" onclick="exchangele()">兑换</button>'); //订购成功之后把 订购按钮状态还原
        		$('.cash_cash').html(data.message);
        		
        	}else{
        		$('.cash_suc').html(data.message);
				$('#butqiang').html('<button class="cash_button" onclick="exchangele()">兑换</button>');
        	
        	}
        },
        error:function(){
            $('.cash_suc').html("服务器连接失败！");
			$('#butqiang').html('<button class="cash_button" onclick="exchangele()">兑换</button>');
            
        }
   });
}
$('#cash_phoneNum').click(function(){
	$("#cash_phoneNum").val("");
	 $('.cash_suc').html("");
})
function quelede(){
	$("#cash3").hide();
	$("#loginMask").hide();

}
function exch(){
    $('.cash_suc').html("请别连续点击!");
    setTimeout(function(){
        $('.cash_suc').html("");
    },2000);
}
//赚棒豆
function invitationInfo(){
	var url='/weixin/point/invitationInfo';
	openID_value=$.cookie('openID_value');
	$.ajax({
		type:"post",
		url:url,
		data: {'openId':openID_value},
		dataType: 'json',
        success:function(data){
        	$("#inviteList").empty();
        	if(data.code==1){
        		$('#count').html(data.count); 
        		$('#sum').html(data.sum); 
        		$.each(data.inviteList,function(i,item){
        			var createTime = item.createTime;
					var create = createTime.substring(0,10);
        			var inviteListstr='<div>'+create+'</div>'+
				           	'<div>'+item.invitee.substring(0,3)+"****"+item.invitee.substring(7,11)+'</div>'+
				           	'<div>'+item.point+'颗</div>';
				    $("#inviteList").append(inviteListstr);      	
        		})
        	}
        }
   });
}
//分享
function model(){
	var url = '/weixin/model/wxConfigSignature'; 
	var localUrl = location.href.split('#')[0];  //获取当前页面的链接地址
	$.ajax({
		type: 'get',
        url: url,
        data:{"localUrl":localUrl},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
            	var dat =data.wxConfigSignatureData;
				wx.config({
//				    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: dat.appId, // 必填，公众号的唯一标识
				    timestamp:dat.timestamp , // 必填，生成签名的时间戳
				    nonceStr: dat.noncestr, // 必填，生成签名的随机串
				    signature: dat.signature,// 必填，签名，见附录1
					jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
            }  	
        }   
	})
	
}
function failureShow(){
	//分享给朋友圈
	openID_value=$.cookie('openID_value');
	wx.ready(function (){ 
		wx.onMenuShareTimeline({
		    title: '中国电信贵州加油站', // 分享标题
		    link: 'http://gz2.mobicloud.com.cn/active/integral/share.html?invitorOpenId='+openID_value+'', // 分享链接
		    imgUrl: 'http://gz2.mobicloud.com.cn/active/integral/images/liub.png', // 分享图标
		    success: function () {
		      	alert("分享成功");
		    },
		    cancel: function () { 
		        alert("分享失败");
		    },
		    fail: function (res) {  
	         	alert("分享失败，请重新尝试");  
			}
  
		});
	//分享给朋友
		wx.onMenuShareAppMessage({
		    desc: "万水千山总是情，帮个小忙行不行？为我助力成功你将获得100棒豆奖励（1棒豆=1M流量）",//摘要,如果分享到朋友圈的话，不显示摘要。
		    title: '中国电信贵州加油站', // 分享标题
			link: 'http://gz2.mobicloud.com.cn/active/integral/share.html?invitorOpenId='+openID_value+'', // 分享链接
		    //link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&response_type=code&scope=snsapi_base&state=123&from=singlemessage&isappinstalled=0&redirect_uri=http://gz2.mobicloud.com.cn/active/integral/share.html?invitorOpenId='+openID_value+'#wechat_redirect', // 分享链接
		    imgUrl: 'http://gz2.mobicloud.com.cn/active/integral/images/liub.png', // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: function () { 
		      alert("分享成功");
		    },
		    cancel: function () { 
		        alert("分享失败");
		    }
		});
	});
}
//关闭页面
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
////英雄榜
function ranking(){
	var url='/weixin/point/ranking';
//	var openId='oKH8cw6iaaBLpqt5YCXRR8dLZVCc';
	openID_value=$.cookie('openID_value'); 
	$.ajax({
		type:"post",
		url:url,
		data: {'openId':openID_value},
		dataType: 'json',
        success:function(data){
        	$(".hero").empty();
        	if(data.code==1){
        		if(data.personalRanking.rank>10){
        			var personalstr='<div class="hero_fint"><div class="hero_touxiang"><img src="'+data.personalRanking.headimgurl+'"/></div>'+
		             			'<div class="hero_pai">'+
		             				'<div class="hero_ming"  style="color: #f6bdb6;">No.'+data.personalRanking.rank+'</div>'+
		             				'<div class="hero_min" style="color: #f6bdb6;"></div>'+
		             			'</div>'+
		             			'<span class="herote"  style="color: #f6bdb6;">'+data.personalRanking.totalPoint+'棒豆</span></div>';
				    $(".hero").append(personalstr);       	
		            
        		}
        		var hqopenid=[];
        		$.each(data.rankingList,function(i,item){
        			var rankingListstr='<div class="hero_list" id="'+item.openid+'"><div class="hero_touxiang"><img src="'+item.headimgurl+'"/></div>'+
	             			'<div class="hero_pai">'+
	             				'<div class="hero_ming">No.'+item.rank+'</div>'+
	             				'<div class="hero_min"></div>'+
	             			'</div>'+
	             			'<span class="herote">'+item.totalPoint+'棒豆</span><div>';
	             	$(".hero").append(rankingListstr); 
						hqopenid[i]=item.openid;
						if(data.personalRanking.openid==hqopenid[i]){
							var ele_id='#'+data.personalRanking.openid;
				    			$(ele_id).css("backgroundColor","red"); 
				    			$(ele_id).css("color","#ccc"); 
						}
	        	})
        		
        	}
        }
   });
}


//查看积分规则
function chakan(){
	$("#loginMask").show();
	$("#integral_rule").show();
}
//关闭积分规则
function interg_guanbi(){
	$("#loginMask").hide();
	$("#integral_rule").hide();
	$("#integral_rule1").hide();
}
//好友助力规则
function slide_tt1(){
	$("#loginMask").show();
	$("#integral_rule1").show();
}

//分享弹出提示的页面
function invitation_y(){
	
	$("#loginMask").show();
	$("#invi_fenc").show();
}
//隐藏分享提示页面
function invi_fenc_guan(){
	$("#invi_fenc").hide();
	$("#loginMask").hide();
}
