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
     var openId = GetQueryString('qrcodeOpenId');
     var pram={};
     pram["phone"]=phone;
     pram["type"]=type;
     param["openId"] = openId;
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
     var openId = GetQueryString('qrcodeOpenId'); 
     var pram={};
     pram["phone"]=phone;
     pram["validateCode"]=validate;
     pram["type"]=type;
     pram["where"]="";
     pram["share"] = "";
     pram["openId"]="";
    pram["openId"] = openId;
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
