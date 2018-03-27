var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
	html.style.fontSize = W*0.15625+'px';
window.onresize = function(){
	var html = document.getElementsByTagName('html')[0];
	var W = document.documentElement.clientWidth;
		html.style.fontSize = W*0.15625+'px';
}
//用正则判断截取 地址栏   中的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}

var code, productId, openID_value, phone, openId, id;
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
      } else {
        $("#loginMask").show();
        $("#denglu").show();
        denglu();
      }
    }
  })
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
    data: { "phone": phone, "openId": $.cookie('openID_value'), "validateCode": validateCode, "type": 1 },
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




function daysStr() {
    var daysStr = '<div class="days-close"><img onclick="daysClose()" src="images/days/daysClose.png" alt=""></div>' +
        '<div class="days-scucces">' +
    ' <div>' +
        '<input type="text" id="days-phone" placeholder="请输入手机号" onfocus="daysClear()">' +
    '</div>' +
    '<div>' +
        '<input type="text" id="days-code"  style="width: 60%;" placeholder="请填写验证码" onfocus="daysClear()">' +
        '<input type="button" id="days-button" style="width: 30%;" value="获取" onclick="daysValidateIn(this)">' +
    '</div>' +
    '<div class="days-errMsg"></div>' +
    '<div id="daysBtn"><div class="days-but" onclick="daysOrderBtn()">点击订购</div></div>' +
    '</div>';
    $(".daysLogin").html(daysStr);
};
// 打开模态框
var type;
function daysOrder(order){
	$("#days-button").val("获取");
	timer = 60;
	clearInterval(timerset);
    type = order;
    var daysPhone = $.cookie("getphone");
    if (daysPhone == "" || daysPhone == null || daysPhone == "null" || daysPhone == undefined || daysPhone == "undefined") {
    	daysStr();
        $("#loginMask").show();
        $(".daysLogin").show();
    } else {
        daysStr();
        $("#loginMask").show();
        $(".daysLogin").show();
        $("#days-phone").val(daysPhone);
    }
};
// 关闭模态框
daysClose = function () {
    $("#loginMask").hide();
    $(".daysLogin").hide();
}
// 清空提示信息
daysClear = function () {
    $(".days-errMsg").html("");
}

/*
 * 重复订购
 *parm phone
 *parm type
* */

 function daysValidateIn(btn){
     $("#days-button").removeAttr("onclick");
     $(".days-errMsg").html("");
     var url="/activity/singleorder/reOrder";
     var phone= $("#days-phone").val();
     if(phone=="" || phone==null || phone == "null" || phone == undefined) {
         $('.days-errMsg').html("请输入手机号！");
         $("#days-button").attr("onclick","daysValidateIn();");
         return;
     }
     var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
     if (!reg.test($.trim(phone))) {
         $('.days-errMsg').html("请输入正确电信手机号！");
         $("#days-button").attr("onclick","daysValidateIn();");
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
                $("#repeatOrder").show();
                $(".daysLogin").hide();;
 			}else if(data.code==1&&data.status==0){
 				$('.days-errMsg').html(data.message);
 				$("#days-button").attr("onclick","daysValidateIn();");
 			}else if(data.code==1&&data.status==1){
                determineOrde();
 			}
         },
         error:function(){
             $('#errorMessage').html("服务器连接失败！");
         }
     });
 }

// 重复订购页面
 function repeatorderh(){
 	$("#repeatOrder").hide();
 	$(".daysLogin").show();
     determineOrde();
 	if(seads!=0)timer=60;
     $("#days-button").val("获取");
 }
// 关闭重复订购页面
 function releatcolse(){
 	$("#repeatOrder").hide();
 	$("#daysLogin").hide();
 	$("#loginMask").hide();
 	clearInterval(timerset);
 }
/*
 * 获取验证码
 *parm phone
 *parm type
 * */
 function determineOrde() {
     var url="/activity/singleorder/send";
     var phone= $("#days-phone").val();
     if(phone==""||phone==null){
         $('.days-errMsg').html("请输入手机号！");
         return;
     }
     var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
     if (!reg.test($.trim(phone))) {
         $('.days-errMsg').html("请输入正确电信手机号！");
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
 				daysValidat();
             }else {
                 $('.days-errMsg').html(data.message);
                 $("#days-button").attr("onclick","daysValidateIn();");
             }
         },
         error:function(){
             $('.days-errMsg').html("服务器连接失败！");
         }
     });
 }


//获取倒计时
 var timer;
 var timerset=null;
 var seads;
 function daysValidat(){
 	timer = 60;
 	seads=timer;
 	$("#days-button").val(timer+"s");
 	timerset= setInterval(function() {
 	    Countdown();
 	}, 1000);
 }
 function Countdown() {
 	console.log($("#days-button").val())
     if (seads != 0) {
         seads --;
        $("#days-button").val(seads+"s");
     }
     else if(seads == 0){
 		$("#days-button").attr("onclick","daysValidateIn();");
     	$("#days-button").val("获取");
     	clearInterval(timerset);
     }else if($("#days-button").vul()=="获取"){
     	$("#days-button").attr("onclick","daysValidateIn();");
     }else{
     	clearInterval(timerset);
     }
 }

/*
 * 订购流量包
 *parm phone
 *parm validateCode 验证码
 * parm type   产品id
 * parm where  //判断是否 是中国电信贵州电信加油站
 * parm type
 * */
 function daysOrderBtn() {
     var url="/activity/singleorder/order";
     var phone= $("#days-phone").val();
     var validate =$("#days-code").val();
     var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
     if (!reg.test($.trim(phone))) {
         $('.days-errMsg').html("请输入正确电信手机号！");
         return;
     }
     if(validate==""||validate==null){
         $('.days-errMsg').html("请输入验证码！");
         return;
     }
     var pram={};
     pram["phone"]=phone;
     pram["validateCode"]=validate;
     pram["type"]=type;
     pram["where"]="";
     pram["share"] = "";
     pram["openId"]="";
    $("#daysBtn").html('<div class="days-but" onclick="daysErrorClick()">正在订购中</div>');
     $.ajax({
         type: 'POST',
         url: url,
         data: JSON.stringify(pram),
         dataType: 'json',
         contentType:'application/json;charset=UTF-8',
         success: function(data){
             if(data.status==1&&data.code==1){
 				var flowStr="";
 				var goodbeans="";
          if (type=='holiday310') {
                flowStr="10元3天流量包";
                goodbeans="20";
            } else if (type == 'holiday720'){
                flowStr="20元7天流量包";
                goodbeans="30";
            }else if (type == 'holiday315') {
                flowStr="15元3天流量包";
                goodbeans="30";
            }else if (type == 'holiday730') {
                flowStr="30元7天流量包";
                goodbeans="50";
            }
            $('.days-scucces').html('<p class="days-scu">恭喜您,成功抢购'+flowStr+',系统将在24小时内为您受理,受理结果将通过短信进行告知.感谢您的参与!关注“中国电信贵州加油站”公众号，同时您还获得'+goodbeans+'棒豆，可在公众号菜单“我的棒豆”中兑换成流量。</p>');
            }else{
              $('.days-errMsg').html(data.message);
              $("#daysBtn").html('<div class="days-but" onclick="daysOrderBtn()">点击订购</div>');
            }
        },
        error:function(){
            $('.days-errMsg').html("服务器连接失败！");
            $("#login1Button").html('<div class="days-but" onclick="daysOrderBtn()">点击订购</div>');
         }
     });
 }

// 抢购中不能重复点击
function daysErrorClick(){
     $('#login1_errorMsg').html("请别连续点击!");
     setTimeout(function(){
         $('#login1_errorMsg').html("");
     },2000);
 }
daysDetermine = function () {
    $("#loginMask").hide();
    $(".daysLogin").hide();
    clearInterval(timerset);
    timer = 60;
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

//跳转页面
document.getElementById('daystiao').addEventListener('click', function () {
  window.location.href = 'days.html';
}, false);
