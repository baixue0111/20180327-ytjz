/**
 * Created by hsgeng on 2017/5/23.
 */
var code,productId,openID_value,openId,id;
// tab切换
$("#w_tab li").click(function(){
        var index=$("#w_tab li").index(this);
        $('#w_tab li').eq(index).addClass("w_active").siblings().removeClass("w_active");
        $('#w_tabContent .w_content').eq(index).addClass('w_hidden').siblings().removeClass("w_hidden");
    })
//获取页面url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
$(function () {
  $('#loginMask').show();  //弹出层显示
  $("#loading").show();		//loading
  code = GetQueryString('code');  //获取code
  getOpenId();//获取openid
})
//获取url
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
//获取openId 
function getOpenId() {
  var oi = $.cookie('openID_value');
  if (oi == null || oi == "" || oi == undefined) {  	//先判断openid是否为空，为空时执行这个函数  
    var url = '/weixin/auth/authInfo';
    $.ajax({
      type: 'get',
      url: url,
      data: { "code": code },
      dataType: 'json',
      contentType: 'application/json;charset=UTF-8',
      success: function (data) {
        $('#loginMask').hide();  //弹出层隐藏
        $("#loading").hide();		//loading隐藏
        if (data.status == 1 && data.code == 1) {
          openID_value = data.authInfo.openId;
          $.cookie("openID_value", openID_value);//把openid储存到cookie中
          getuserMsg();   //绑定手机号
        }
      }
    })
  } else {
    $('#loginMask').hide();  //弹出层隐藏
    $("#loading").hide();
    openID_value = $.cookie('openID_value');
    getuserMsg();   //绑定手机号
  }

}
//获取用户信息
function getuserMsg() {
  var url = "/weixin/auth/userInfo";
  openID_value = $.cookie('openID_value'); //获取openId值(cookie)
  $.post(url, { "openId": openID_value }, function (data) {
    if (data.status == 1 && data.code == 1) {
      //弹出层隐藏
      $("#loading").hide();
      var focusOn = data.userInfo.subscribe;
      if (focusOn == 1) {   // 如果用户关注公众号则判断是否绑定
        bing();
      } else if (focusOn == 0) {
        bing();
      }
    }
  })
}

//查询微信用户是否绑定
function bing() {
  var url = "/weixin/auth/isBind";
  $.post(url, { "openId": $.cookie('openID_value') }, function (data) {
    if (data.status == 1 && data.code == 1) {
      if (data.isBind) {
        var getphone = data.phone;
        $.cookie("getphone", getphone);
        var qrcodeOpenId = GetQueryString('qrcodeOpenId');
        if(qrcodeOpenId!=null||qrcodeOpenId!=""||qrcodeOpenId!=undefined){
          fromQRCode();
        }
      } else {
        $("#loginMask").show();
        $("#denglu").show();
        denglu();
      }
    }
  })
}
//查询通过二维码活动进来       已经绑定的用户
function fromQRCode() {
  var url = "/weixin/flowmarket/fromQRCode";
  var openId = $.cookie('openID_value');
  var phone = $.cookie('getphone');
  var qrcodeOpenId = GetQueryString('qrcodeOpenId');
  param = {};
  param["openId"] = openId;
  param["phone"] = phone;
  param["invitorOpenId"] = qrcodeOpenId;
  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(param),
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
    }
  });
}
//获取验证码
function validate(btn) {
  var url = "/weixin/auth/send";
  var phone = $("#deng_phone").val();
  if (phone == "" || phone == null) {
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
    data: { "phone": phone, "openId": $.cookie('openID_value') },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
      if (data.code == 1 && data.status == 1) {
        buttonTime(btn)
      } else {
        $('.login_success').html(data.message);
      }

    },
    error: function () {
      $('.login_success').html("服务器连接失败！");
    }
  });
}

//电信用户绑定
function binding() {
  var qrcodeOpenId = GetQueryString('qrcodeOpenId'); //获取邀请人的openId
  var url = '/weixin/auth/bind';
  var phone = $("#deng_phone").val();
  var validateCode = $('#deng_yzm').val();
  if (phone == "" || phone == null) {
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
    data: { "phone": phone, "openId": $.cookie('openID_value'), "invitorOpenId": qrcodeOpenId, "validateCode": validateCode, "type": 4 },
    dataType: 'json',
    contentType: 'application/json;charset=UTF-8',
    success: function (data) {
      if (data.code == 1 && data.status == 1) {
        var sustr = '<p class="succ"><span style="color:red">恭喜您！</span>绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>' +
          '<img class="login_queding" onclick="guab()" src="img/gqbtn.png" style="width:60%;margin-left:20%;margin-bottom: 0.2rem;"/>';
        $('#deng_successMessage').html(sustr);
        bing();
      } else {
        $('.login_success').html(data.message);
      }
    },
    error: function () {
      $('.login_success').html("服务器连接失败！");
    }
  });
}
//绑定弹框
function denglu() {
  var str1 = '<div>' +
    '<div class="login_title">贵州电信用户绑定</div>' +
    '</div>' +
    '<div id="deng_successMessage">' +
    '<div style="color:red;font-size:0.3rem;">贵州电信绑定即送100棒豆</div>' +
    '<input type="text" id="deng_phone" placeholder="请输入手机号" onfocus="clearError()">' +
    '<input type="text" id="deng_yzm" placeholder="请输入验证码" onfocus="clearError()">' +
    '<input type="button" id="deng_text" onclick="validate(this)" value="获取">' +
    '<div class="login_success"></div>' +
    '<div><img src="img/sub.png" class="login_img" onclick="binding()"/></div>' +
    '<div class="login_zan" onclick="guab()">暂不绑定</div>' +
    '</div>';
  $("#denglu").html(str1);
}
// 清空提示信息
clearError = function () {
  $(".login_success").html("");
}
//关闭绑定成功页面
function guab() {
  $("#loginMask").hide();
  $("#denglu").hide();
}

/**
 * 无限流量包
 */ 
var typeone;
function ordera(gettyp){
  typeone = gettyp;
    login2();
    $('#loginMask').show();
    $('#login2').show();
    getphone =$.cookie("getphone");
    if(getphone==""||getphone==null||getphone==undefined||getphone=="undefined"){
        $("#login1_phone2").val('');    //么有绑定的清空
    }else{
        $("#login1_phone2").val(getphone);// 如果已经绑定了，兑换给自己       就默认手机号码
    }
}

function login2(){
	var login2Str='<div class="login1_close2" onclick="login1_close2()"></div>'+
        '<div id="login1_succes2">'+
        '<p class="login1_top2">'+
        '<input type="text" placeholder="请输入手机号" id="login1_phone2" onfocus="clearError2()">'+
        '</p>'+
        '<p class="login1_bottom">'+
        '<input type="text" placeholder="请输入验证码" id="login1_validate2" onfocus="clearError2()">'+
        '<input type="button" value="获取" id="login1_yzm2" onclick="login_validateIn(this)">'+
        '</p>'+
        '<div id="login1_errorMsg2"></div>'+
        '</div>'+
        '<div id="login1Button2">'+
        '<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>'+
        '</div>';
	$("#login2").html(login2Str);
}
function login1_close2(){
	$("#login2").hide();
	$('#loginMask').hide();
	if(wait!=60)wait=0;
}

function login_validateIn(btn) {
    var url="/activity/flowKing/kingSend";
    var phone= $("#login1_phone2").val();
    if(phone==""||phone==null){
        $('#login1_errorMsg2').html("请输入手机号！");
        return;
    }
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg2').html("请输入正确电信手机号！");
        return;
    }
    var type=typeone;
    var param={};
    param["phone"]=phone;
    param["type"]=type;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else{
                $('#login1_errorMsg2').html(data.message);
            }
        },
        error:function(){
            $('#login1_errorMsg2').html("服务器连接失败！");
        }
    });
}
/*订购*/
function login1_loginInf() {
    var url="/activity/flowKing/kingOrder";
    var phone= $("#login1_phone2").val();
    var validate =$("#login1_validate2").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#login1_errorMsg2').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#login1_errorMsg2').html("请输入验证码！");
        return;
    }
    var type=typeone;
    var openId = GetQueryString('qrcodeOpenId'); 
    var param={};
    param["phone"]=phone;
    param["validateCode"]=validate;
    param["type"]=type;
    param["where"] = "";
    param["openId"] = openId;
    $("#login1Button2").html('<button id="login1_but2" onclick="login1_errorClick2()">抢购中...</button>');
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(param),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){

        	if(data.status==1&&data.code==1){
        		var strr="";
	            if(type=='50'){
			    	strr="流量王中王可选包50元(50元/月)";
			    }else{
			    	strr="流量王中王可选包30元(30元/月)";
			    }
				$('#login1_succes2').html('<p class="asuccess"><span class="success3">恭喜您,</span>成功抢购'+strr+',系统将在24小时内为您受理，受理结果将通过短信进行告知，若需退订请咨询10000号，办理更多业务，请扫描二维码关注“中国电信贵州加油站”<img style="width:32%;margin-left:33%" src="images/wg.jpg"/></p>');
				$("#login1Button2").hide();
           	}else{
           		$('#login1_errorMsg2').html(data.message);
           		$("#login1Button2").html('<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>');
            }	
        },
        error:function(){
            $('#login1_errorMsg2').html("服务器连接失败！");
          	$("#login1Button2").html('<button id="login1_but2" onclick="login1_loginInf()">立即抢购</button>');

        }
    });
}
function login1_que2(){
	$("#login2").hide();
	$('#loginMask').hide();
}
function login1_errorClick2(){
    $('#login1_errorMsg2').html("请别连续点击!");
    setTimeout(function(){
        $('#login1_errorMsg2').html("");
    },2000);
}


//清空错误提示框的内容
function clearError2(){
    $("#errorMsg2").html("");
    $("#login1_errorMsg2").html('');
}
// 倒计时
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