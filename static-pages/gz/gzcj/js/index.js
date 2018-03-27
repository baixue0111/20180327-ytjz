//兼容
var code,productId,openID_value,getphone;
var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W*0.1333333333333333+'px';
// alert(W)
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.1333333333333333+'px';
}
			
$(function(){
	 $(".details_mask").show();
    $("#loading").show();
    code=GetQueryString('code');
    productId = $("#productIdTianji").val();  // 获取productId
    getOpenId(); //获取openId
   	 fx();
	drawHistory();
})

//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var getphone;
   $(document).ready(function(e) {
	var getphone=$.cookie("phone");
	if(getphone!=""&&getphone!=null){
         getphone=getphone;	

	} 

}); 

//获取openId 
function getOpenId(){
//  var oi = $("#openIdInput").val();
var oi=$.cookie('openID_value');
    if(oi==null||oi==""||oi==undefined){
        var url='/weixin/auth/authInfo';
        $.ajax({
            type: 'get',
            url: url,
            data: {"code":code},
            dataType: 'json',
            contentType:'application/json;charset=UTF-8',
            success: function(data){
                $(".details_mask").hide();
                $("#loading").hide();
                if(data.status==1&&data.code==1){
                    openID_value=data.authInfo.openId;
                    console.log(openID_value);
                    $.cookie("openID_value",openID_value);
//                  $("#openIdInput").val(openID_value);
                    bing(openID_value);   //绑定手机号
//                  pageInit(openID_value);
                }
            }
        })
    }else{
        $(".details_mask").hide();
        $("#loading").hide();
    }
    
}


//查询微信用户是否绑定
function bing(ytopenId){
    var url = "/weixin/auth/isBind"; 
    var openId=$.cookie('openID_value');
    $.post(url,{"openId":ytopenId},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){
            	var getphone=data.phone;
            	$.cookie("phone",getphone);
            }else{
                Login();  //绑定手机号
                $("#loginMask").show();
                $("#login").show();
            }
        }
    } )
}

/**********微信用户绑定*********************/
//验证码
function validateInfo(btn){
    var url="/weixin/auth/send";
    var phone= $("#phone").val();
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
        data:{"phone":phone,"openId":$("#openIdInput").val()},
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
function binding(){
    var url='/weixin/auth/bind';
    var phone= $("#phone").val();
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
        data: {"phone":phone,"openId":$("#openIdInput").val(),"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                 $(".gban").show();
                $('#successMessage .add').html('<p class="success">恭喜您！绑定成功，获得100M省内免费流量，系统将在24小时内为您送出流量，结果将通过短信进行告知。请耐心等候，如您仍未收到免费流量，请联系小赞为您处理，感谢您的参与！</p>');
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
    var phone= $("#phone2").val();
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
        data: {"phone":phone,"openId":$("#openIdInput").val(),"type":0},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                $(".gban").show();
                $('#successMessage .add').html('<p class="success">恭喜您！您已成功绑定。感谢您的参与！</p>');
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
                	'<div><img class="gban" id="guanbile"onclick="gbl()" style="display:none;top: 0px; position: absolute;right: 9px;" src="img/close.png"/></div>'+
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


//错误消息提示
function error(message){
    $("#loginMask").show();
    $("#login").show();
    $('#header').hide();
    $('#successMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏
function closeLogin(){
    $("#loginMask").hide();
    $("#login").hide();
}


//清空错误提示框的内容
function clearError(){
    $('#errorMessage').html("");
}

function clearError2(){
    $('#errorMessage2').html("");
}
function gbl(){
	$("#login").hide();
	$("#loginMask").hide();
	window.location.reload();
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

////抽奖
function rocate(status,msg){
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
    var rotateFn = function (awards, angles, txt) { //awards:奖项，angle:奖项对应的角度
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles +3600,
            duration: 3000,
            callback: function () {
                setTimeout(function(){
                    $('#loginMask').show();
					$(".lo_mess").show();
					$('.lo_mes').html(msg);
                    drow_flag=true;   //抽奖旋转结束后  判断他是drow_flag=true 
                },500);

                bRotate = !bRotate;
            }
        })
    };
    if(bRotate)return;
    var item =status;
    switch (item) {
        case 1:
            rotateFn(1, 0, '一等奖 50M省内流量');
            break;
        case 2:
            rotateFn(2, 240, '二等奖 30M省内流量');
            break;
        case 3:
            rotateFn(3, 120, '三等奖 10M省内流量');
            break;
        case 4:
            rotateFn(4, 180, '再接再厉!');
            break;
        case 5:
            rotateFn(5, 300, '再接再厉!');
            break;
        case 6:
            rotateFn(6, 60, '再接再厉!');
            break;
    }
//添加条件判断一下 连续点击抽奖不行，只有点击一次抽奖结束之后才能再次点击进行抽奖    中间点击不调用接口
var drow_flag=true;
function draw(){
	if(!drow_flag)return;
	drow_flag=false;
	console.log(drow_flag);
	var  url='/weixin/lottery/lottery';
	var getphone=$.cookie("phone");
	var openID_value=$.cookie("openID_value");
	console.log(openID_value);
	var param={};
	param["phone"]=getphone;
	if(openID_value==null||openID_value==""||openID_value=="null"){
		$('#loginMask').show();
		$(".lo_mess").show();
		drow_flag=true;
		return;
	}else{
		
		$.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
	        	if(data.code==1&&data.status==1){
					var  prizeId=data.prizeId;
					if(prizeId==4){
						msg= '<span style="color: red;">很遗憾！您没有中奖，</span>感谢您的参与！请继续关注中国电信贵州加油站，更多优惠活动等着您！';
					}else{
						msg='<span style="color: red;">恭喜您！抽中</span>'+data.prizeName+'，系统将在24小时内为您派奖，结果将通过短信进行告知。感谢您的参与！';
						
					}
					if(prizeId>4){
						alert(111);
						var prizeId=data.prizeId+Math.floor(Math.random()*4);
					}
					rocate(prizeId,msg);
				}else if(data.code==0){
					$('#loginMask').show();
					$(".lo_mess").show();
					$('.lo_mes').html('服务器报错');
					drow_flag=true;
				}else if(data.code==1&&data.status==2){
					$('#loginMask').show();
					$(".lo_mess").show();
					$('.lo_mes').html('对不起！您已经参加过该活动，不能再次参加！');
					drow_flag=true;
				}
	        }
		});
	}
}
//关闭弹窗提示
function gubccl(){
	$('#loginMask').hide();
	$(".lo_mess").hide();
}
//滚动信息
//
//		var news = document.getElementById('wintt');
//  	var list = document.getElementById('win_zj');
//  	var lis = list.getElementsByTagName('li');
//  	var timer = null;
//  	window.onload = function(){
//  		timer = setInterval(move,80);
//  	}
//  	console.log(lis.length);
////  				console.log(listHeight);
//  		//通过一个li算出所有li.offsetHeight
//  		function move(){
//  			var speed = -3;
//	    		list.innerHTML += list.innerHTML;
//	    		var listHeight = lis[0].offsetHeight*lis.length;
//  			if(list.offsetTop<-listHeight/2){//我们只需要布局时的li,所以只需要一半
//  				list.style.top = "0px";
//  			}
//  				console.log(list.offsetTop);
////  				console.log(listHeight/2);
//  			list.style.top = list.offsetTop+speed+"px";
//  		}
//  		for(var i=0;i<lis.length;i++){
//  			lis[i].onmouseover = function(){
//  				clearInterval(timer);
//  			}
//  			lis[i].onmouseout = function(){
//  				timer = setInterval(move,80)
//  			}
//  		}
var wait = 60;
var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 50;
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
//中奖名单
function drawHistory(){
    var url="/weixin/lottery/lotteryList";
   $.post(url,function(data){
        if (data.code==1) {
            var jsondata=data.lotteryList;
            $.each(jsondata,function(i,item){
            	var a=[]; //定义一个空数组
					a[0]=item.PHONE;
					for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    
					    }else if(a[i]!=null){
					    	
						var listr ='<li>'+a[0].substring(0,3)+"****"+a[0].substring(7,11)+" "+item.PRIZE_NAME.substring(2,9)+" "+item.CREATE_DATE.substring(0,10)+'</li>';
						$("#history ul").append(listr);
                		
					    }
					
					}		
//					
            })
        }
    })
}


function fx(){
	var url = '/weixin/model/wxConfigSignature'; 
	var localUrl = location.href.split('#')[0];  //获取当前页面的链接地址
//	console.log(localUrl);
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
					jsApiList: ['checkJsApi','onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				//分享给朋友圈
				wx.ready(function (){ 
					wx.onMenuShareTimeline({
					    title: '中国电信贵州加油站抽奖活动', // 分享标题
					    link: 'http://gz.mobicloud.com.cn/active/gzcj/fx.html', // 分享链接
					    imgUrl: 'http://gz.mobicloud.com.cn/active/gzcj/img/heade_t.png', // 分享图标
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        fxcg();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
	//				分享给朋友
					wx.onMenuShareAppMessage({
					    imgUrl: "http://gz.mobicloud.com.cn/active/gzcj/img/heade_t.png",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
					    desc: "中国电信贵州加油站，查询手机流量，话费信息之后进行抽奖",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站抽奖活动',//分享卡片标题
					    link:'http://gz.mobicloud.com.cn/active/gzcj/fx.html',//分享出去后的链接，这里可以将链接设置为另一个页面。
					    type: '', // 分享类型,music、video或link，不填默认为link
					    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					    success: function () { 
					        // 用户确认分享后执行的回调函数
					        fxcg();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
					wx.onMenuShareQQ({
					   imgUrl: "http://gz.mobicloud.com.cn/active/gzcj/img/heade_t.png",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
					    desc: "中国电信贵州加油站，查询手机流量，话费信息之后进行抽奖",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站抽奖活动',//分享卡片标题
					    link:'http://gz.mobicloud.com.cn/active/gzcj/fx.html',
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					       fxcg();
					    },
					    cancel: function () { 
					       // 用户取消分享后执行的回调函数
					    }
					});
					wx.onMenuShareQZone({
					   imgUrl: "http://gz.mobicloud.com.cn/active/gzcj/img/heade_t.png",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
					    desc: "中国电信贵州加油站，查询手机流量，话费信息之后进行抽奖",//摘要,如果分享到朋友圈的话，不显示摘要。
					    title: '中国电信贵州加油站抽奖活动',//分享卡片标题
					    link:'http://gz.mobicloud.com.cn/active/gzcj/fx.html',
					    success: function () { 
					       // 用户确认分享后执行的回调函数
					       fxcg();
					    },
					    cancel: function () { 
					        // 用户取消分享后执行的回调函数
					    }
					});
				});
            }  	
        }   
	})
	
}

function fxcg(){
	var url='/weixin/lottery/share';
	var getphone=$.cookie("phone");
	var param={};
	param["phone"]=getphone;
	$.ajax({
		type:"post",
		url:url,
		data: JSON.stringify(param),
		dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	if(data.code==1&&data.status==1){
//      		alert('data.message');
				$('.lo_mess').show();
				$('#loginMask').show();
				$('.lo_mes').html('恭喜您，分享成功！');
        	}else if(data.code==1&&data.status==2){
        		$('.lo_mess').show();
				$('#loginMask').show();
				$('.lo_mes').html('对不起！您的抽奖次数已经不能再增加了！');
        	}
        }
   });
}
function hide_mark(){
	$('.log_fenxiang').hide();
	$('#loginMask').hide();
	$(".lo_mess").hide();
	
}
function fxl(){
	$('.log_fenxiang').show()
	$('#loginMask').show()
}
