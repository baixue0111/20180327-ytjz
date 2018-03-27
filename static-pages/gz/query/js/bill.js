/**
   * Created by hsgeng on 2016/11/26.
   */

//tab切换
$("#footer .re").click(function(){
	var index=$("#footer .re").index(this);
	$('#footer .re').eq(index).addClass("ren").siblings().removeClass("ren");
	$('#tab_q .tab1').eq(index).addClass('focus').siblings().removeClass("focus");
})
// $(document).ready(function(e) {
////  $("div.cont").load("cont.html");//div.cont是页面中的一个元素，cont.html是计数器的页面
////	var session= $.session.get('key');
////	if(session!=""&&session!=null){
////      $('.login2').html("已登录") ;	
////	}    	
//var getphone=$.cookie("openID");
////if(session!=""&&session!=null){
////      $('.login2').html("已登录") ;	
////	}  
//}); 
//获取openID
//history.replaceState();
var code,productId,openID_value;
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
//  var oi = $("#openIdInput").val();   
var oi=$.cookie('openID_value'); 
    if(oi==null||oi==""||oi==undefined){  	//openid 为空时执行这个函数  
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
//                  $("#openIdInput").val(openID_value);
					$.cookie("openID_value",openID_value);
                    bing(openID_value);   //绑定手机号
                    pageInit(openID_value);
                }
            }
        })
    }else{
        $(".details_mask").hide();
        $("#loading").hide();
       	openID_value=$.cookie('openID_value');
        bing(openID_value);   //绑定手机号
        pageInit(openID_value);
    }
    
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
        data:{"phone":phone,"openId":$.cookie("openID_value")},
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
        data: {"phone":phone,"openId":$.cookie("openID_value"),"validateCode":validateCode,"type":1},
        dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success: function(data){
            if(data.code==1&&data.status==1){
                $('#header').hide();
                 $(".gban").show();
                $('#successMessage .add').html('<p class="success">恭喜您，绑定成功！首次绑定成功可获得100棒豆（1棒豆=1M流量），可在公众号菜单“我的棒豆”中兑换成流量。</p>');
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
        data: {"phone":phone,"openId":$.cookie("openID_value"),"type":0},
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
                	'<div><img class="gban" id="guanbile"onclick="gbl()" style="display:none;top: 0px; position: absolute;right: 9px;" src="images/close.png"/></div>'+
                    '<div style="margin-bottom:-1.5rem;padding-top:0.45rem;"><h1 style="font-size:0.3rem;" id="title">绑定手机即送100棒豆</h1></div>'+
                    '<div class="add">'+
                        '<ul id="tabcon">'+
                        '<li id="li1" class="show">'+
                            '<div id="Li-con1">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone" placeholder="请输入手机号" onfocus="clearError()"></p>'+
                                '<p class="yzm_p"><input type="text" id="yzm" placeholder="请输入验证码" onfocus="clearError()"><input type="button" id="text" onclick="validateInfo(this)" value="获取"></p>'+
                                '<p id="errorMessage"></p>'+
                                '<p id="sub_btn"><img src="images/sub.png" alt="" onclick="binding()"></p>'+
                                '<p class="Tips" onclick="closeLogin()">暂不绑定</p>'+
                            '</div>'+
                        '</li>'+
                        '<li id="li2">'+
                            '<div id="Li-con2">'+
                                '<p style="margin-top: 0.2rem;"><input type="text" id="phone2" placeholder="请输入手机号" onfocus="clearError2()"></p>'+
                                '<p id="errorMessage2"></p>'+
                                '<p id="sub_btn2"><img src="images/sub.png" onclick="Notdx()"></p>'+
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
        $("#title").html("非贵州电信用户不能赠送100棒豆！");
    }else if (param==1) {
        $("#title").html("绑定手机号即送100棒豆！");
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
	window.location.href=window.location.href+"&id="+10000*Math.random();    //刷新页面
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
function pageInit(openID_value){
var url="/weixin/charging/chargingInfo";
var openId=$.cookie('openID_value'); 
console.log(openId);

	var pram={};
//	pram["openId"] = openId;
	pram["openId"]= openId;
	$.ajax({
		url:url,
		type:'POST',
        data:JSON.stringify(pram),
		dataType:'json',
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			
			var datajson=data.OfferAccu;
			if(data.code==1){ 
				if(data.operationStatus==null||data.operationStatus!=0){
					$('.lian').show();
					$('#lianjie').show();
		            $('#lianjie .cuo2').html("当前无法查询到您的信息，请确认您绑定的是贵州电信手机号或请稍后重试！");
		            return;
				}
//				手机号获取
				var str4='<div id="ipooo">'+
						'<img class="ipone" src="images/电话号码@2x.png"/>'+
						'<div class="ipone1">'+data.phone+'</div>'+
						'<img class="vip" src="images/图层-7@2x.png"/>'+
					'</div>'+
					'<div class="qian">'+data.Balance+'元</div>'+
					'<div style="font-size: 13px;color:red; position: absolute;top: 39%;left: 10%;width: 80%;">注：此功能目前为测试版，如与10000号查询结果不一致，请以10000号为准，同时您还可以将遇到的问题反馈在微信后台</div>';
				$(".shoujihao").append(str4);
				var str5 ='<div class="huefei3">'+data.realOweAmount+'元</div>';
				$("#hua").append(str5);
				var str6='<div class="huefei3">'+data.HisOweAmount+'元</div>';
				$("#hua1").append(str6);
				var str7= '<span class="ming2">'+data.OfferName+'</span>';
				$("#mingz").append(str7);		
//				手机号获取第二个页面
				var str11='<div>'+
						'<img class="ipone" src="images/电话号码@2x.png"/>'+
						'<div class="ipone1">'+data.phone+'</div>'+
						'<img class="vip" src="images/图层-7@2x.png"/></div>'+
						'<div class="qian">'+data.flowLast+'</div>'+
					'<div style="font-size: 13px;color:red; position: absolute;top: 43%;left: 10%;width: 80%;">注：此功能目前为测试版，如与10000号查询结果不一致，请以10000号为准，同时您还可以将遇到的问题反馈在微信后台</div>';
				$(".shenghuo").append(str11);
				var str29= '<span class="cheng2">'+data.OfferName+'</span>';
				$("#chengz").append(str29);
				//	本月流量			
				var str21 ='<div class="liang3">'+data.flowTotal+'</div>';
				$("#benyue").append(str21);
				//已使用流量
				var str23='<div class="liang3">'+data.flowUse+'</div>';
				$("#shengyu").append(str23);
    			// 上个月结转流量
               	var oeeqw= data.TransferTotalDetail;
    			if(oeeqw!=null){
//             	console.log(oeeqw);
               	var str22='<div class="liang3">'+oeeqw.TransferTotalDetailValue+'</div>';
				$("#jiezhuan").append(str22);
				var str24='<div class="con1">'+
										'<img class="con2" src="images/sheng.png" alt="" />'+
										'<span class="con3">上月结转流量</span></div>'+
										'<div class="con41">已用:<span class="con42">'+oeeqw.TransferTotalDetailUse+'</span></div>'+
										'<div class="con41">剩余:<span class="con42">'+oeeqw.TransferTotalDetailLeft+'</span></div>'+
										'<div class="con41">总计:<span class="con42">'+oeeqw.TransferTotalDetailValue+'</span></div></div>'+
										'<div class="con5">'+
											'<div class="container">'+
											  '<div class="bar" id="shan" style="width:0%;"></div>'+
											'</div>'+ 
											'<div id="total"class="taba"></div></div>';
							$("#tao4").append(str24);
							var sst10= oeeqw.TransferTotalDetailUse; 
							var sst11 = sst10.substr(0,sst10.length - 1);//截取字符串去掉最后一个
							var sst21= Number(sst11);//字符串转化成number类型
							var sst31= oeeqw.TransferTotalDetailValue
							var sst41= sst31.substr(0,sst31.length - 1);//截取字符串去掉最后一个
							var sst51= Number(sst41);//字符串转化成number类型
							var b11=(sst21/sst51 * 100).toFixed(4);//换算百分比
						    var bar = document.getElementById("shan"); //获取下面div的id
						    var total = document.getElementById("total");
						    bar.style.width=parseInt(b11) + "%";  
						    total.innerHTML = bar.style.width; 
				}
    			else{
    				var str41='<div class="liang3">0.00M</div>';
					$("#jiezhuan").append(str41);
					var str42='<div class="con1">'+
										'<img class="con2" src="images/sheng.png" alt="" />'+
										'<span class="con3">上月结转流量</span></div>'+
										'<div class="con41">已用:<span class="con42">0.00</span>M</div>'+
										'<div class="con41">剩余:<span class="con42">0.00</span>M</div>'+
										'<div class="con41">总计:<span class="con42">0.00</span>M</div></div>'+
										'<div class="con5">'+
											'<div class="container">'+
											  '<div class="bar" id="shan" style="width:0%;"></div>'+
											'</div>'+ 
											'<div id="total"class="taba"></div></div>';
							$("#tao4").append(str42);
						    var bar = document.getElementById("shan"); //获取下面div的id
						    var total = document.getElementById("total");
						    bar.style.width=parseInt(0) + "%";  
						    total.innerHTML = bar.style.width; 
    			}
//				流量获取
				if(data.OfferAccu!=null){
					$.each(data.OfferAccu,function(i,item){
	//					运用字符串包含的方法判断属于那种
						var shi= item.AccuName; 
						var shi1 = "时长";
						if(shi.indexOf(shi1) > -1){
							var str3='<div class="con1">'+
										'<img class="con2" src="images/g.png" alt="" />'+
										'<span class="con3">'+item.AccuName+'</span></div>'+
										'<div class="con41">已用:<span class="con42">'+item.CumulationAlready+'</span></div>'+
										'<div class="con41">剩余:<span class="con42">'+item.CumulationLeft+'</span></div>'+
										'<div class="con41">总计:<span class="con42">'+item.CumulationTotal+'</span></div></div>'+
										'<div class="con5">'+
											'<div class="container">'+
											  '<div class="bar" id="shan'+i+'" style="width:0%;"></div>'+
											'</div>'+ 
											'<div id="total'+i+'"class="taba"></div></div>';
							$("#tao1").append(str3);
							//用正则    小时分钟转化成分钟字符串
							var reg = /\d+/g;
						    var fe = item.CumulationAlready;
						    var ms = fe.match(reg);
						    var minute= parseInt(ms[0]*60)+parseInt(ms[1]);
						    var fe1= Number(minute);
						    //总时长
						    var ho =item.CumulationTotal;
						    var ho1 =ho.match(reg);
						    var minute1= parseInt(ho1[0]*60)+parseInt(ho1[1]);
						    var ho2= Number(minute1);
						    var d=(fe1/ho2 * 100).toFixed(2);//换算百分比
						    var bar = document.getElementById("shan"+i); //获取下面div的id
						    var total = document.getElementById("total"+i);
						    bar.style.width=parseInt(d) + "%";  
						    total.innerHTML = bar.style.width;    
						}
						var liu1 = "信";
						if(shi.indexOf(liu1) > -1){
							var str12='<div class="con1">'+
											'<img class="con2" src="images/b.png" alt="" />'+
											'<span class="con3">'+item.AccuName+'</span>'+
										'</div>'+
										'<div class="con4">'+
											'<div class="con41">已用:<span class="con42">'+item.CumulationAlready+'</span></div>'+
											'<div class="con41">剩余:<span class="con42">'+item.CumulationLeft+'</span></div>'+
											'<div class="con41">总计:<span class="con42">'+item.CumulationTotal+'</span></div></div>'+
										'<div class="con5">'+
											'<div class="container">'+
											  '<div class="bar" id="shan'+i+'" style="width:0%;"></div>'+
											'</div>'+ 
											'<div id="total'+i+'"class="taba"></div></div>';
							$("#tao2").append(str12);
							var st= item.CumulationAlready; 
							var st1 = st.substr(0,st.length - 1);//截取字符串去掉最后一个
							var st2= Number(st1);//字符串转化成number类型
							var st3= item.CumulationTotal
							var st4= st3.substr(0,st3.length - 1);//截取字符串去掉最后一个
							var st5= Number(st4);//字符串转化成number类型
							var b=(st2/st5 * 100).toFixed(4);//换算百分比
						    var bar = document.getElementById("shan"+i); //获取下面div的id
						    var total = document.getElementById("total"+i);
						    bar.style.width=parseInt(b) + "%";  
						    total.innerHTML = bar.style.width; 
							
						}
						var liu2 = "流量"
						if(shi.indexOf(liu2) > -1){
							var str13='<div class="con1">'+
											'<img class="con2" src="images/sheng.png" alt="" />'+
											'<span class="con3">'+item.AccuName+'</span>'+
										'</div>'+
										'<div class="con4">'+
											'<div class="con41">已用:<span class="con42">'+item.CumulationAlready+'</span>M</div>'+
											'<div class="con41">剩余:<span class="con42">'+item.CumulationLeft+'</span>M</div>'+
											'<div class="con41">总计:<span class="con42">'+item.CumulationTotal+'</span>M</div></div>'+
										'<div class="con5">'+
											'<div class="container">'+
											  '<div class="bar" id="shan'+i+'" style="width:0%;"></div>'+
											'</div>'+ 
											'<div id="total'+i+'"class="taba"></div></div>';
							$("#tao3").append(str13);
							var sst= item.CumulationAlready; 
							var sst2= Number(sst);//字符串转化成number类型
//							console.log(sst2);
							var sst3= item.CumulationTotal
							var sst4= Number(sst3);//字符串转化成number类型
//							console.log(sst4);
							var b=(sst2/sst4 * 100).toFixed(4);//换算百分比
//							console.log(b);
						    var bar = document.getElementById("shan"+i); //获取下面div的id
						    var total = document.getElementById("total"+i);
						    bar.style.width=parseInt(b) + "%";  
						    total.innerHTML = bar.style.width; 
						}
					})
				}
			}
		},
		error:function(){
			$('.lian').show();
			$('#lianjie').show();
            $('#lianjie .cuo2').html("服务器连接失败！");
       }
	});
}
$("#cuowu").click(function(){
	$(".lian").hide();
	$('#lianjie').hide();
})


//晒流量活动下架  去掉跳转按钮
//function tzcj(){
//	//window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz.mobicloud.com.cn/active/gzcj/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';  //抽奖活动入口
//    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9f4355fc38716ace&redirect_uri=http://gz2.mobicloud.com.cn/active/sunFlow/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
//}