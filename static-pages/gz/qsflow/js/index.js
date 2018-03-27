/**
 * Created by mysheng on 2016/1/27.
 */
/*滚动信息*/

var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 20;
area.scrollTop = 0;
con2.innerHTML = con1.innerHTML;
function scrollUp(){
    if(con2.offsetTop-area.scrollTop<=0)//当滚动至demo1与demo2交界时
        area.scrollTop-=con1.offsetHeight //demo跳到最顶端
    else{
        area.scrollTop++
    }
}
var myScroll = setInterval("scrollUp()",speed);
area.onmouseover = function(){
    clearInterval(myScroll);
}
area.onmouseout = function(){
    myScroll = setInterval("scrollUp()",speed);
}




$(function(){
    login();
  drawHistory();

})
function loginMessage(){
     login();
    $("#load").show();
    $("#loginStr").show();
}
/*关闭弹窗*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();
    $("#answerQuestion").hide();
   if(wait!=60)wait=0;
    anwer=0;
    index=0;

}
function openClose(){
    $("#loginStr").hide();
    $("#answerQuestion").show();

}
/*验证登录函数*/
function login(){
    var str= '<div id="login" >'+
        '<div class="header"><span class="span" onclick="loginclose();" title="关闭"><img style="width: 20px;" src="img/close.png"/></span></div>'+
        '<div id="successMessage" ><div><input class="input1" name="phoneNum" id="phoneNum" placeholder="请输入您手机号"  onfocus="clearError()"/></div>'+
        '<div><input class="input2"name="validate" id="validate" placeholder="请输入短信验证码"  onfocus="clearError()"/>'+
        '<input class="input3" type="button" style="margin-right: 20px;" value="获取验证码" onclick="validateInfo(this)">'+
        '<p id="errorMessage"></p>'+
        '</div>'+
        '<div id="loginButton" ><button id="login_button" class="button" onclick="loginInfo()" ></button></div>'+
        '</div></div>'+
        '</div>';
    $("#loginStr").html(str);
}
function clearError(){
    $('#errorMessage').html("");
}

function validateInfo(btn) {
    var url="/weixin/answer/send";

    var phone= $("#phoneNum").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                buttonTime(btn);
            }else if(data.status==2) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
            } else{
                $('#errorMessage').html(data.message);
            }
        },
        error:function(){
            error("服务器连接失败！");
        }
    });
}
/*获取答题列表*/

function loginInfo() {

    var url="/weixin/answer/questionList";
    var phone= $("#phoneNum").val();
    var productcd="700012700";
    var validate =$("#validate").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {
        $('#errorMessage').html("请输入正确电信手机号！");
        return;
    }
    if(validate==""||validate==null){
        $('#errorMessage').html("请输入验证码！");
        return;
    }
    var pram={};
    pram["phone"]=phone;
    pram["validateCode"]=validate;
    pram["productcd"]=productcd;
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                var datajson=data.lotteryList;
                $.each(datajson, function(i, item){
                    arrTitle[i]=item.questionNum+"."+item.questionTitle;
                    arrselect[i]=new Array();
                    arrselect[i][0]=item.optionA;
                    arrselect[i][1]=item.optionB;
                    arrselect[i][2]=item.optionC;
                    arrselect[i][3]=item.optionD;
                    var valueAnswer=item.answer;
                    if(valueAnswer=="A"){
                        valueAnswer="1"
                    }else if(valueAnswer=="B"){
                        valueAnswer="2"
                    }else if(valueAnswer=="C"){
                        valueAnswer="3"
                    }else{
                        valueAnswer="4"
                    }
                    valueR[i]=valueAnswer;
                });
                next();
                openClose();
            }else{
                $('#errorMessage').html(data.message);
            }
        },
        error:function(){
            error("服务器连接失败！");
        }
    });
}
/*提交答对了多少题*/
function answerNumber() {

    var url="/weixin/answer/result";
     var phone= $("#phoneNum").val();
     var number=anwer;
     var pram={};
     pram["phone"]=phone;
     pram["number"]=number;
    $("#as_submit").html('<button type="button" class="as_button" onclick="is()" ></button>');
    loginclose();
     $.ajax({
         type: 'POST',
         url: url,
         data: JSON.stringify(pram),
         dataType: 'json',
         contentType:'application/json;charset=UTF-8',
         success: function(data){
             if(data.code==1&&data.status==1){
                 error(data.message);
                 anwer=0;
                 $("#as_error").html("");
             }else{
                 error(data.message);
              }
         },
         error:function(){
             error("服务器连接失败！");
         }
     });
    drawHistory();
}
/*获奖历史*/

function drawHistory(){
    var url="/weixin/answer/lotteryList";
    var pram={};
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(pram),
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            $("#con1").html("");
            var jsondata=data.lotteryList;
            if(data.status==1&&data.code==1){

                $.each(jsondata, function(i, item){
                    $("#con1" ).append('<div class="history_message"><li>'+item.prizeTime+'</li><li>'+ item.phone.substring(0,3)+"****"+item.phone.substring(7,11) +'</li><li>'+item.prizeName+'</li></div>');
                });
            }else{
                var  str1="<ul><li>未加载到数据</li><li></li><li></li></ul>";
                $('#con1').html(str1)
            }
        },
        error:function(){
            error("服务器连接失败！");
        }
    });
}
var wait = 60;
function buttonTime(btn) {
    if (wait == 0) {
        btn.removeAttribute("disabled");
        btn.value = "重新获取验证码";
        wait = 60;
    } else {
        btn.setAttribute("disabled", true);
        btn.value ="重新发送验证码(" +wait + ")s";
        wait--;
        setTimeout(function () {
                buttonTime(btn);
            }, 1000)
    }
}
function error(message){
    $('#successMessage').html('<p class="success">'+message+'</p>');
    $("#load").show();
    $("#loginStr").show();
}
function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
}
var arrTitle=new Array();/* [
    '1、下列哪个不项不属于"天翼加油站"的菜单选项？',
    '2、"天翼加油站"近期推出的定向流量是什么',
    '3、以下哪个活动是“天翼加油站”在3月推出的活动？',
    '4、下列哪个产品不属于中国电信的业务范围？',
    '5、下列哪项是电信推出的高清电视业务？',
    '6、“天翼加油站”6月推出的包活动是？',
    '7、“天翼加油站”5月推出的[520分享包]活动，包内流量是多少？',
    '8、“天翼加油站”5月推出的[520分享包]活动，包内赠送流量的有效期限是？',
    '9、以下那项是“天翼加油站”菜单栏【特惠地带】下的子菜单？',
    '10、“天翼加油站”后台客服的昵称是？'
];*/
var arrselect=new Array();
    /*[
    ["A.定向流量","B.免费专区","C.特惠地带","D.活动"],
    ["A.爱奇艺定向流量","B.优酷定向流量","C.乐视定向流量","D.QQ定向流量"],
    ["A. 女神节尊享优惠活动包","B. 周末优惠包"," C. 月末加餐包","D. 闲时畅聊包"],
    ["A.宽带业务 ","B.移动业务","C.座机业务","D.快递业务"],
    ["A.宽带包年","B.天翼高清","C.光纤入户","D.翼支付"],
    ["A.春节优惠包","B.端午节日优惠包","C.户外踏青包","D.五一劳动假日包"],
    ["A.1GB","B.520MB","C.500MB","D.300MB"],
    ["A.10天","B.20天","C.1个月","D.2个月 "],
    ["A.闲时包","B.加餐包","C.夜间包","D.4G 畅聊包"],
    ["A.小翼","B.小赞","C.小天","D.小新"]
];*/
var valueR=new Array();
    /*[4,2,1,4,2,2,2,3,4,2];*/
var index=0;
var anwer=0;
function radio_click(obj){
    $('#ddd').val(obj.value);
    var span=$("#div").find("span");
    for(var i=0;i<span.length;i++){
        span[i].className="";
    }
    obj.parentNode.className="choose";
}
var flag=false;
function is() {
    if(flag)return false;
    if($('#ddd').val()=="0"){
        $("#as_error").html("请您选择答案");
        setTimeout(function(){
            $("#as_error").html("");
        },1000);
        return;
    }
    flag=true;
    if($('#ddd').val() ==valueR[index]){
        anwer++;
        if(index>arrTitle.length-2){
            $("#as_submit").html('<button type="button" class="as_submit" onclick="answerNumber()" ></button>');
            $("#as_error").html("你已答完所有试题，请提交答案");
             flag=false;
        }else{
            index++;
            next();
            flag=false;
        }
    } else{
        var arr=["A","B","C","D"];
        $('#as_error').html("回答错误，正确答案选:"+arr[valueR[index]-1]);
        setTimeout(function(){
            $('#as_error').html("");

            if(index>arrTitle.length-2){
                $("#as_submit").html('<button type="button" class="as_submit" onclick="answerNumber()" ></button>');
                $("#as_error").html("你已答完所有试题，请提交答案");
                flag=false;
            }else{
                index++;
                next();
                flag=false;
            }
        },2000);
    }
}

function next(){
    clearAll();
    $("#title").html(arrTitle[index]);
    $("#label1").html(arrselect[index][0]);
    $("#label2").html(arrselect[index][1]);
    $("#label3").html(arrselect[index][2]);
    $("#label4").html(arrselect[index][3]);
}
function clearAll() {
    $('#as_error').html("");
    var el = document.getElementsByTagName('input');
    var span=$("#div").find("span");
    for(var i=0;i<span.length;i++){
        span[i].className="";
    }
    for(var i=0; i< el.length; i++){
        if((el[i].type=="radio") && (el[i].name=="radio")){
            el[i].checked = false;
        }
    }
    $("#ddd").val(0);
}

