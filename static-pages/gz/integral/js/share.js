var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.13333333+'px';
	window.onresize = function(){
		var html = document.getElementsByTagName('html')[0];
		var W = document.documentElement.clientWidth;
			html.style.fontSize = W*0.13333333+'px';
	}


var code,productId,openID_value,openId,id;
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(function(){
	userInfo();
})
// 获取邀请人用户基本信息
function userInfo(){
	var url="/weixin/auth/userInfo";
	var invitorOpenId=GetQueryString('invitorOpenId');
	console.log(invitorOpenId)//获取openId值(cookie)
	$.post(url,{"openId":invitorOpenId},function(data){
		if (data.status == 1 && data.code == 1) {
		var strimg ='<div id="fen_yuan">'+
						'<img src="'+data.userInfo.headimgurl+'"/>'+
					'</div>'+
					'<div class="fen_ming">'+data.userInfo.nickname+'</div>';
		$(".fen_header").append(strimg);
		}
	})
}
//点击助力
function zhuli(){
	var invitorOpenId=GetQueryString('invitorOpenId');
	openID_value=GetQueryString('openId');
	$('#loginMask').show();  //弹出层显示
	$("#loading").show();		//loading
	code=GetQueryString('code');  //获取code
  	productId = $("#productIdTianji").val();  // 获取productId
	getOpenId();//获取openid
  	
}

//获取openId
function getOpenId(){
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
	                  console.log(openID_value);
	                  getuserMsg();
	              }
	          }
	      })
	}else{
	      $('#loginMask').hide();  //弹出层隐藏
			$("#loading").hide();
	     	openID_value=$.cookie('openID_value');
	     	console.log(openID_value);
	     	getuserMsg();
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
				aid();
			}else if(focusOn == 0){
				$('#loginMask').show();
				$("#guanzhu").show();
				wgz();//未关注显示
			}
		}
	})
}
// 绑定
function aid(){
    var url = "/weixin/point/aid";
    var invitorOpenId=GetQueryString('invitorOpenId');
    $.post(url,{"openId":$.cookie('openID_value'),"invitorOpenId":invitorOpenId},function (data){
            if(data.isBind!=null&&data.isBind==0){
                login();  //绑定手机号
                $("#loginMask").show();
                $("#login").show();
                $("#loading").hide();
            }else{
            	login(); 
                $("#login").show();
                $("#loginMask").show();
                $("#loading").hide();
                $(".login_title").html('中国电信贵州加油站');
                var sueestr='<p class="succ">'+data.message+'</p>'+
                    '<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left: 20%;"/>';
                $('#successMessage').html(sueestr);
            }
        }
     )
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
  var invitorOpenId=GetQueryString('invitorOpenId');
  var phone= $("#phone").val();
  console.log(phone);
  var validateCode=$('#yzm').val();
if(phone==""||phone==null){
      $('.login_success').html("请输入正确手机号！");
      return;
}
var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
//  var reg2 = /^1[34578]\d{9}$/;

if (!reg.test($.trim(phone))) {
      $('.login_success').html("请输入正确手机号！");
      return;
}
  $.ajax({
      type: 'get',
      url: url,
      data: {"phone":phone,"openId":$.cookie('openID_value'),"validateCode":validateCode,"type":3,"invitorOpenId":invitorOpenId},
      dataType: 'json',
      contentType:'application/json;charset=UTF-8',
      success: function(data){
          if(data.code==1&&data.status==1){
          	var sustr ='<p class="succ"><span style="color:red">恭喜您！</span>绑定成功，首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>'+
						'<img class="login_queding" onclick="guab()" src="images/gqbtn.png" style="width:60%;margin-left: 20%;margin-top:0.5rem;"/>';
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

function wgz(){
	var wgzstr='<div>'+
				'<div class="guandui_dui">对不起</div>'+
			'</div>'+
			'<div class="guan_scuu">您未关注公众号，请关注后继续！</div>'+
			'<div id="butqiang"><button class="guan_button" onclick="weg_guan()">确定</button></div>';
		$("#guanzhu").html(wgzstr);
}
function weg_guan(){
	$("#loginMask").hide();
  $("#guanzhu").hide();
}
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
//暂不绑定  关闭绑定
function login_no(){
	$("#loginMask").hide();
  $("#login").hide();
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

