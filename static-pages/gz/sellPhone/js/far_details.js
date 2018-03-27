//获取openID
var code,productId;
$(function(){
    $(".details_mask").show();
    $("#loading").show();
    code=GetQueryString('code');
    productId = $("#productIdTianji").val();  // 获取productId
    getOpenId(); //获取openId
})


//查询微信用户是否绑定
function bing(ytopenId){
    var url = "/weixin/auth/isBind";  
    $.post(url,{"openId":ytopenId},function (data){
        if (data.status == 1 && data.code == 1) {
            if(data.isBind){

            }else{
                Login();  //绑定手机号
                $("#loginMask").show();
                $("#login").show();
            }
        }
    } )
}


//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


//获取openId 
function getOpenId(){
    var oi = $("#openIdInput").val();

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
                    $("#openIdInput").val(openID_value);
                    bing(openID_value);   //绑定手机号
                }
            }
        })
    }else{
        $(".details_mask").hide();
        $("#loading").hide();
    }
    
}



//抢购
function qiang_gou(){
    show_mark();
    var url="/weixin/model/recomm";
    $.post(url,{"productId":productId},function(data){
        if (data.status==1&&data.code==1) {
            var img_url=data.model.logo_url;  // 手机图片
            var phone_name=data.model.model_version;  //机型
            var phone_manufacturer=data.model.manufacturer;
            var phone_fee=data.model.fee;  // 价钱

            $("#name_phone").html(phone_manufacturer+" "+phone_name);
            $("#fee_phone").html("￥"+phone_fee);
            $("#song").html("【赠品】  充电宝或手机支架随机发出");
            if(img_url==""||img_url==null||img_url==undefined){

                $(".alertcon1_left img").attr('src',"image/db2.jpg");


            }else{

                $(".alertcon1_left img").attr('src',img_url);

            }
        }
    })

    // 用户点击“立即抢购”
    var url2="/weixin/model/addActionLog";
        openidVal=$("#openIdInput").val();
    $.post(url2,{"openId":openidVal,"productId":productId,"action":"产品详情-立即抢购"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
}


// 显示弹框
function show_mark(){
    $(".details_mask2").show();
    $(".buy_alert").show();
}

// 隐藏弹框
function hide_mark(){
    $(".details_mask2").hide();
    $(".buy_alert").hide();
}


//过期窗口显示
function datedShow(){
    $("#loginMask").show();
    $(".activeOver").show();
}
//过期窗口隐藏
function datedHide(){
    $("#loginMask").hide();
    $(".activeOver").hide();
}

// 页面切换-小鲜4
function open_xx4details(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/xx4_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 页面切换-天机
function open_tjdetails(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/tj_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

//跳转到对比页(productId)
function tz_db(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/type_contrast.html?param="+productId+","+$("#openIdInput").val();
}

//跳转到我的订单
function myorder_qh(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading2.html?param="+productId+","+$("#openIdInput").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}
//跳转到结算页面
function jsbtn(){
    //用户点击“结算”
    var url="/weixin/model/addActionLog";
        openidVal=$("#openIdInput").val();
    $.post(url,{"openId":openidVal,"productId":productId,"action":"产品详情-立即抢购-结算"},function(data){
        if(data.status==1&&data.code==1){

        }
    })
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading3.html?param="+productId+","+$("#openIdInput").val()+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 跳转到退货页面
function return_th(){
    window.location.href="http://gz.mobicloud.com.cn/active/sellPhone2/sales_return.html?param="+productId+","+$("#openIdInput").val();
}

// 返回上一页
function goback(){
    window.history.go(-1);
}


/*****************************************微信用户绑定********************************************/
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
                    '<div style="margin-bottom:-1rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100M省内流量</h1></div>'+
                    '<div class="add">'+
                        '<ul id="tabcon">'+
                        '<li id="li1" class="show">'+
                            '<div id="Li-con1">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError()"></p>'+
                                '<p class="yzm_p"><input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError()"><input type="button" id="text" onclick="validateInfo(this)" value="获取"></p>'+
                                '<p id="errorMessage"></p>'+
                                '<p id="sub_btn"><img src="image/sub.png" alt="" onclick="binding()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '<li id="li2">'+
                            '<div id="Li-con2">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone2" placeholder="请输入手机号" onfocus="clearError2()"></p>'+
                                '<p id="errorMessage2"></p>'+
                                '<p id="sub_btn2"><img src="image/sub.png" onclick="Notdx()"></p>'+
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

//获取验证码
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