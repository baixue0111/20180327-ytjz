/**
 * Created by hsgeng on 2017/5/15
 * 众筹活动
 */
$(function(){
	model(); //分享
	notice();   //公告信息
    winning();  //榜单
})
var code,openID_value,openId,id;
function participateIn(){
	code=GetQueryString('code');  //获取code
	getOpenId();//获取openid
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();   //loading
}
//获取页面url
function GetQueryString(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return  unescape(r[2]); return null;
}

     //获取openID
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
                  	if(data.status==1&&data.code==1){
                      	$('#loginMask').hide();  //弹出层隐藏
                      	$("#loading").hide();		//loading隐藏
                      	openID_value=data.authInfo.openId;
						$.cookie("openID_value",openID_value);//把获取到的openid储存到cookie中
						bing();  //查询是否绑定
                	}
              	}
          	})
      	}else{
          	$('#loginMask').hide();  //弹出层隐藏
			$("#loading").hide();
         	openID_value=$.cookie('openID_value');
         	bing();
      	}

}
//查询微信用户是否绑定
function bing(){
      var url = "/weixin/auth/isBind";
      $.post(url,{"openId":$.cookie('openID_value')},function (data){
          if (data.status == 1 && data.code == 1) {
              if(data.isBind){
				var getphone=data.phone;
              	$.cookie("getphone",getphone);
                  $("#loginMask").hide();
                  $("#loading").hide();
              		replay(); //参加活动
              }else{
                  loginBinding();  //弹出绑定页面  绑定微信号
                  $("#loginMask").show();
                  $("#login_binding").show();
                  $("#loading").hide();
              }
          }
      } )
}
/**********微信用户绑定*********************/
//验证码
function validateInfo(btn){
      var url="/weixin/auth/send";
      var phone= $("#login_phone").val();
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
          data:{"phone":phone,"openId":$.cookie('openID_value')},
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
      var phone= $("#login_phone").val();
      var validateCode=$('#verification').val();
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
          data: {"phone":phone,"openId":$.cookie('openID_value'),"validateCode":validateCode,"type":1},
          dataType: 'json',
          contentType:'application/json;charset=UTF-8',
          success: function(data){
              if(data.code==1&&data.status==1){
              	 $('#header').hide();
              	 $.cookie("getphone",phone);
                  var str ='<p class="succ"><span style="color:red">恭喜您！</span>获得100棒豆（1棒豆=1M省内流量），棒豆可在本公众号上随时兑换成流量，点击微信菜单“我的棒豆”即可进入兑换页面。</p>'+
						'<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                  $('#login_successMessage .add').html(str);
//              gameTimes();
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
      var phone= $("#login_phone2").val();
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
          data: {"phone":phone,"openId":$.cookie('openID_value'),"type":0},
          dataType: 'json',
          contentType:'application/json;charset=UTF-8',
          success: function(data){
              if(data.code==1&&data.status==1){
              	 $('#header').hide();
                  var str ='<p class="succ"><span style="color:red">恭喜您！绑定成功，感谢您的关注！</p>'+
						'<img class="login_queding" onclick="loginColse()" src="images/gqbtn.png" style="width:60%;margin-left:20%"/>';
                  $('#login_successMessage .add').html(str);
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
/***************** 微信绑定弹框********************/
function loginBinding(){
	var str='<div id="header">'+
                 ' <h1 id="h11" class="select" onclick="Tab(1)">贵州电信用户绑定</h1>'+
                  '<h1 id="h12" onclick="Tab(2)">非贵州电信用户绑定</h1>'+
              '</div>'+
              '<div id="login_successMessage">'+
                  '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
                  '<div class="add">'+
                      '<ul id="tabcon">'+
                      '<li id="li1" class="show">'+
                          '<div id="Li-con1">'+
                              '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone" placeholder="请输入手机号" onfocus="bindingClearError()"></p>'+
                              '<p class="yzm_p"><input type="text" id="verification" placeholder="请输入验证码" onfocus="bindingClearError()"><input type="button" id="login_text" onclick="validateInfo(this)" value="获取"></p>'+
                              '<p id="errorMessage"></p>'+
                              '<p id="sub_btn"><img src="images/sub.png" alt="" onclick="binding()"></p>'+
                              '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                          '</div>'+
                      '</li>'+
                      '<li id="li2">'+
                          '<div id="Li-con2">'+
                              '<p style="margin-top: 0.2rem;"><input type="text" id="login_phone2" placeholder="请输入手机号" onfocus="bindingClearError2()"></p>'+
                              '<p id="errorMessage2"></p>'+
                              '<p id="sub_btn2"><img src="images/sub.png" onclick="Notdx()"></p>'+
                              '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                          '</div>'+
                      '</li>'+
                      '</ul>'+
                  '</div>'+
              '</div>';
     	$("#login_binding").html(str);
}
//  绑定绑定tab切换
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
          $("#title").html("非贵州电信用户不能赠送100棒豆！");
      }else if (param==1) {
          $("#title").html("绑定手机号即送100棒豆！");
      }

}
//错误消息提示
function error(message){
      $("#loginMask").show();
      $("#login_binding").show();
      $('#header').hide();
      $('#login_successMessage .add').html('<p class="success">'+message+'</p>');
}

//隐藏 绑定模态框
function closeLogin(){
      $("#loginMask").hide();
      $("#login_binding").hide();
      $("#loading").hide();
      if(wait!=60)wait=0;
}
//清空错误提示框的内容
function bindingClearError(){
      $('#errorMessage').html("");
}
function bindingClearError2(){
      $('#errorMessage2').html("");
}
//关闭
function loginColse(){
	$("#login_binding").hide();
	$("#loginMask").hide();

}
function guab(){
	$("#login_binding").hide();
	$("#loginMask").hide();
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

//公告信息
var stage,round;
function notice(){
    var url="/weixin/crowdFunding/notice";
    $.post(url,function(data){
        if(data.code==1&&data.status==1){
            var jsondata =data.outline;
            var start=jsondata[0].START_DATE;
            var start_date=start.substring(0,10); //开始时间
            var stop=jsondata[0].STOP_DATE;
            var stop_date=stop.substring(0,10); //结束时间
            var point =jsondata[0].POINT;  //棒豆
            round =jsondata[0].ROUND;  //轮数
            var usernum =data.userNum;  //人数
            stage =jsondata[0].STAGE;
            if(round==101){    //到了这个固定的轮数      这一周的众筹结束
                round=round-1
                $("#round").html(round);
                $("#usernum").html("0");
            }else{
                $("#round").html(round);
                $("#usernum").html(usernum);
            }
            $("#start_date").html(start_date);
            $("#stop_date").html(stop_date);
            $("#point").html(point);
        }
    })
}

//榜单
function winning(){
    var url='/weixin/crowdFunding/winning';
    $.post(url,function (data){
        if(data.code==1&&data.status==1){
            var jsonWinning=data.winning;
            if(jsonWinning!=null){
                $.each(jsonWinning,function(i,item){
                	var a=[]; //定义一个空数组
					a[0]=item.PHONE;
					for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    }else if(a[i]!=null){
					    	var generate=item.GENERATE_DATE.substring(0,10); //时间
		                    var phoneSTR =a[0].substring(0,3)+"****"+a[0].substring(7,11);
		                    var histroyStr='<li class="com"><span>'+generate+'</span><span>'+item.ROUND+'</span><span>'+phoneSTR+'</span><span>'+item.PRIZE+'</span></li>';
		                    $("#history ul").append(histroyStr);
					    }
					}	
                   
                })
            }
        }
    })
}

//参加活动弹出模态框
function login(){
    var loginStr='<div class="login_close" onclick="cancel()"></div>'+
        '<div id="loginSuccess">'+
        '<div class="loginPrompt"></div>'+
        '<div class="loginQue">'+
        '<img class="login_determine" src="images/determine.png" onclick="cancel()" alt="确定">'+
        '</div>'+
        '</div>';
    $("#login").html(loginStr);
}

function replay(){
    login();
    $("#loginMask").show();
    $("#login").show();
    $("#loading").hide();
    $(".loginPrompt").html('<p>参加本次众筹活动<br/>您将消耗50棒豆</p>');
    var inStr='<img class="determin" src="images/determine.png" onclick="determin()" alt="确定">'+
        '<img class="cancel" onclick="cancel()" src="images/cancel.png" alt="取消">';
    $(".loginQue").html(inStr);
}

//众筹活动
function determin(){
    $(".determin").removeAttr("onclick");
    $("#loading").show();
    $("#loginMask").show();
    $("#login").hide();
    var url='/weixin/crowdFunding/play';
    round=round;
    stage=stage;
    var openId=$.cookie('openID_value')
    var phone=$.cookie('getphone');
    var param={};
	param["openId"]=openId;
	param["phone"]=phone;
	param["round"]=round;
	param["stage"]=stage;
    $.ajax({
        type:"POST",
        url:url,
		data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            login();
            if(data.code==1&&data.status==5){
            	reward();
//              notice();
                $("#loading").hide();
                $("#login").show();
                $(".loginPrompt").html('<p><span style="color: red">恭喜您,</span>您已成功参加本次活动，本轮众筹结果将于筹满1500棒豆后揭晓，您可以多次参加提高中奖率。</p>');
            }else{
                $("#login").show();
                $("#loading").hide();
                $(".loginPrompt").html(data.message);
            }
        }
    })
}

//查询一轮结束之后是否奖励用户
function reward(){
    var url='/weixin/crowdFunding/reward';
    round=round;
    stage=stage;
    var phone=$.cookie('getphone');
    var param={};
	param["round"]=round;
	param["stage"]=stage;
	param["phone"]=phone;
    $.ajax({
        type:"POST",
        url:url,
		data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	notice(); //再次查询公告栏
        }
    })
}

//取消 关闭 众筹活动模态框
function cancel(){
    $("#login").hide();
    $("#loginMask").hide();
}

//邀请好友分享页面提示
function share(){
    login();
    $("#login").show();
    $("#loginMask").show();
    $(".loginQue").hide();
    $(".loginPrompt").html('<p class="shareti">点击右上方。。。即可邀好友一起参加</p>');
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
                //分享给朋友圈
                wx.ready(function(){
                    wx.onMenuShareTimeline({
                        title: '中国电信贵州加油站', // 分享标题
                        link:'http://gz2.mobicloud.com.cn/active/crowdFunding/share.html',
                        imgUrl: 'http://gz2.mobicloud.com.cn/active/crowdFunding/images/sharttu.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            alert('分享成功');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            alert('分享失败');
                        }
                    });
                    //				分享给朋友
                    wx.onMenuShareAppMessage({
                        title: '中国电信贵州加油站', // 分享标题
                        link:'http://gz2.mobicloud.com.cn/active/crowdFunding/share.html',
                        imgUrl: 'http://gz2.mobicloud.com.cn/active/crowdFunding/images/sharttu.jpg', // 分享图标
                        desc: "参加众筹活动，即有机会赢1G流量，快来参加吧",//摘要,如果分享到朋友圈的话，不显示摘要。
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            alert('分享成功');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            alert('分享失败');
                        }
                    });
                });

            }
        }
    })

}




/*
 * 中奖名单滚动
 */
var wait = 60;
var hist = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 50;
hist.scrollTop = 0;
con2.innerHTML = con1.innerHTML;
function scrollUp(){
    if(hist.scrollTop >= con1.scrollHeight) {
        hist.scrollTop = 0;
    }else{
        hist.scrollTop ++;
    }
}
var myScroll = setInterval("scrollUp()",speed);
hist.onmouseover = function(){
    clearInterval(myScroll);
}
hist.onmouseout = function(){
    myScroll = setInterval("scrollUp()",speed);
}
