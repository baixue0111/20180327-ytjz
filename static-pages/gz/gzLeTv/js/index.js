/**
 * Created by baixue on 2016/8/8.
 */



$(function(){
    var url=window.location.search;
    var flag=url.split("=")[1];
    if(flag=="ada"){
        loginMessage();
    }
})
/*滚动信息*/
var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 20;
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


// 进入页面开始加载登录和显示获奖历史名单
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
    $("#as_submit").html('<button type="button" class="as_button" onclick="is()" ></button>');
    $("#as_error").html("");
    valueR=[];  // 清空答案
}

// 关闭登录框显示答题页面
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
    var url="/weixin/research/send";
    var phone= $("#phoneNum").val();
    var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
    if (!reg.test($.trim(phone))) {    // "$.trim()匹配首尾空白字符";
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
            }else if(data.code==1&&data.status==2) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号未实名认证，不能参与活动，请到营业厅进行实名认证，感谢您的关注！</p>');
            }else if(data.code==1&&data.status==3){
                $('#successMessage').html('<p class="success">您已参加此活动！</p>');
            }else if(data.code==1&&data.status==4) {
                $('#successMessage').html('<p class="success">对不起！您输入的手机号属于OCS计费类型，不能参与活动，感谢您的关注！</p>');
            }else if(data.code==1&&data.status==5){
                $('#successMessage').html('<p class="success">活动已过期！</p>');
            }else{
                $('#successMessage').html('<p class="success">服务器错误！</p>');
            }
        },
        error:function(){
            error("服务器连接失败！");
        }
    });
}


/*获取答题列表*/
var des=new Array();   // 定义数组，下面用来判断是否为单选或者多选
function loginInfo() {
    //next();
    //openClose();//调用后端的时候，把下面的注释掉的放开这两个函数去掉
    var url="/weixin/research/questionList";
    var phone= $("#phoneNum").val();
    var productcd="700015591";
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
                $.each(datajson, function(i,item){
                    des[i]=item.des;
                    arrTitle[i]=item.questionNum+"."+item.questionTitle;
                    arrselect[i]=new Array();
                    arrselect[i][0]=item.optionA;
                    arrselect[i][1]=item.optionB;
                    if(item.optionC!=undefined&&item.optionC!=""){
                        arrselect[i][2]=item.optionC;
                    }
                    if(item.optionD!=undefined&&item.optionD!=""){
                        arrselect[i][3]=item.optionD;
                    }
                    if(item.optionE!=undefined&&item.optionE!=""){
                        arrselect[i][4]=item.optionE;
                    }
                    if(item.optionF!=undefined&&item.optionF!=""){
                        arrselect[i][5]=item.optionF;
                    }
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

// 登录日志(统计用户访问)
    var url2="/weixin/research/login";
    $.ajax({
        type:"POST",
        url:url2,
        data:JSON.stringify(pram),
        dataType:'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.code==1&&data.status==1){

            }else{
                error(data.message);
            }
        }
    });
}

/*提交答了多少题*/
function answerNumber() {
    var url="/weixin/research/order";
    var phone= $("#phoneNum").val();
    var json={};
    var jsonObject={};
    var answerList={};
    jsonObject["phone"]=phone;
     json["one"]=valueR[0];
     json["two"]=valueR[1];
     json["three"]=valueR[2];
     json["four"]=valueR[3];
     json["five"]=valueR[4];
     json["six"]=valueR[5];
     json["seven"]=valueR[6];
     json["eight"]=valueR[7];
     json["nine"]=valueR[8];
     json["ten"]=valueR[9];
    jsonObject["answerList"]=json;
    loginclose();
    $("#as_submit").html('<button type="button" class="as_button" onclick="is()" ></button>');
    
     $.ajax({
         type: 'POST',
         url: url,
         data: JSON.stringify(jsonObject),
         dataType: 'json',
         contentType:'application/json;charset=UTF-8',
         success: function(data){
             if(data.code==1&&data.status==1){
                 valueR=[];  // 清空答案
                 error('恭喜您！在电信加油站问卷答题活动中获得50M省内免费流量，系统将在24小时内为您送出流量，结果将通过短信进行告知。感谢您的参与！');
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
    var url="/weixin/research/lotteryList";
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

// 获取验证码倒计时
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
    $('#successMessage').html('<p class="success"><span style="color:#df3421;" class="fanhui">'+message.substring(0,3)+'</span>'+message.substring(3)+'<p id="dwsz"><p class="ewm"><span class="wz">长按识别二维码，加入公众微信号“中国电信贵州加油站”点击尊享之家即可抽奖</span><img src="img/ewm.png" alt="" class="ewmimg"></p><a href="http://www.lemall.com/product/products-pid-GWGMS20023.html"><img src="img/sj.png" alt="" id="sj"><img src="img/lj.png" alt="" id="sjck"></a></p></p>');
    $("#load").show();
    $("#loginStr").show();
}
function errorClick(){
    $('#errorMessage').html("请别连续点击!");
    setTimeout(function(){
        $('#errorMessage').html("");
    },2000);
}var arrTitle=new Array();   // 调用后台时把此注释解掉，并把下面的数组注释掉
   /*var arrTitle=[
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
var arrselect=new Array();  // 调用后台时把此注释解掉，并把下面的数组注释掉
    /*var arrselect=[
    ["A.定向流量","B.免费专区","C.特惠地带"],
    ["A.爱奇艺定向流量","B.优酷定向流量","C.乐视定向流量","D.QQ定向流量","E.特惠地带","F.活动"],
    ["A. 女神节尊享优惠活动包","B. 周末优惠包"," C. 月末加餐包","D. 闲时畅聊包","E.特惠地带","F.活动"],
    ["A.宽带业务 ","B.移动业务","C.座机业务","D.快递业务","E.特惠地带","F.活动"],
    ["A.宽带包年","B.天翼高清","C.光纤入户","D.翼支付"],
    ["A.春节优惠包","B.端午节日优惠包","C.户外踏青包","D.五一劳动假日包","E.特惠地带","F.活动"],
    ["A.1GB","B.520MB","C.500MB","D.300MB","E.特惠地带","F.活动"],
    ["A.10天","B.20天","C.1个月","D.2个月 ","E.特惠地带","F.活动"],
    ["A.闲时包","B.加餐包","C.夜间包","D.4G 畅聊包","E.特惠地带"],
    ["A.小翼","B.小赞","C.小天","D.小新","E.特惠地带","F.活动"]
];*/
var valueR=new Array();

// 判断用户是否选择选项
var index=0;
function checkbox_click(obj){
    if(obj.checked =="") {     //判断radio是否被选中（未被选中）
        obj.parentNode.className="";
    }
    if(obj.checked == true) {   //判断radio是否被选中（已被选中）
        obj.parentNode.className="choose";
    }   
}
function radio_click(obj){
    var span=$("#div").find("span");
    for(var i=0;i<span.length;i++){
        span[i].className="";
    }
    obj.parentNode.className="choose";
}

// 单击时调用is()函数时，跳转下一题
//var flag=false;
function is() {
    var chestr="";
    var str=document.getElementsByName("radio");
    var objarray=str.length;
    var url="/weixin/research/questionNum";
    var phone=$("#phoneNum").val();
    var questionNum=index+1;
    var pram={};
    pram["phone"]=phone;
    pram["questionNum"]=questionNum;

    $.ajax({
        type:"POST",
        url:url,
        dataType:"json",
        data:JSON.stringify(pram),
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.code==1&&data.status==1){

            }else{
                error(data.message);
            }
        }
    });

    for (i=0;i<objarray;i++)
    {
        if(str[i].checked == true)
        {
            chestr+=str[i].value;
        }
    }
    if(chestr == "") {
        $("#as_error").html("请您答完此题进入下一题！");
        setTimeout(function(){
            $("#as_error").html("");
        },1000);
    }else {
        if(index>arrTitle.length-2){
            $("#as_submit").html('<button type="button" class="as_submit" onclick="answerNumber()"></button>');
            $("#as_error").html("你已答完所有试题，请提交答案");
            valueR.push(chestr);
        }else{
            valueR.push(chestr);
            index++;
            next();
        }
        chestr="";
    }
}

// 跳转到下一题
function next(){
    $("#answerQ").html("");
    $("#title").html(arrTitle[index]);
    var str="";
    if(des[index]==1){
        for(var i=0;i<arrselect[index].length;i++){
            var x=['A','B','C','D','E','F'];
            str+='<div><span><input type="radio" name="radio" value="'+x[i]+'" onclick="radio_click(this)" id="value'+i+'"><label for="value'+i+'" id="label'+i+'">'+arrselect[index][i]+' </label></span></div>';
        }
    }else{
        for(var i=0;i<arrselect[index].length;i++){
            var x=['A','B','C','D','E','F'];
            str+='<div><span><input type="checkbox" name="radio" value="'+x[i]+'" onclick="checkbox_click(this)" id="value'+i+'"><label for="value'+i+'" id="label'+i+'">'+arrselect[index][i]+' </label></span></div>';
        }
    }
    $("#answerQ").html(str);
}



