/**
 * Created by hsgeng on 2017/3/20.
 */
//获取地址栏
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}	
	var token = GetQueryString("token");
    var salesId = GetQueryString("salesId");
    var id = GetQueryString("id");  
 	var phone = GetQueryString("phone");
 	var cta=GetQueryString("cta");
 	console.log(cta)
$(function(){
	webTakeInfo();
})
var offerId,planId,prodNumList,contact1,accnbr,corelinkman,editSms;
var rejectDouble = false;
function webTakeInfo(){
	if (rejectDouble){
		return;
	}
	rejectDouble = true;
	var url="/assist/task/webTakeInfo";
    var os = "web";
    var img = $("#progressImgage"); 
	var mask = $("#maskOfProgressImage");
    var request={
	    	param:{
		    	"id":id,
	    	},
	    	common_param:{
	    		"token":token,
	    		"os":"web",
	    	}
  	 };
  	 $.ajax({
  	 	type : 'post',
        url : url,
        timeout: 5000,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        beforeSend:function(xhr){ 
   			$("#loadingMask").show();
		},
        success: function(data){
        	if(data.error.code==1){
        		$("#loadingMask").hide();
        		var task=data.data.taskjob;
        		if(task!=null){
        		var a=[];
        			a[4]=task.region;
        			a[5]=task.branch
        			a[6]=task.sales_name;
        			a[7]=task.charge_type;
        			a[8]=task.vid_rank;
        			a[11]=task.des;
        			a[12]=task.contract_name;
        		for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    }
					}
					
				switch (task.user_status){ //用户状态
					case 0:
						a[1]='正常';
						break;
					case 1:
						a[1]='单停';
						break;
					case 2:
						a[1]='双停';
						break;
					case 3:
						a[1]='已拆机';
						break;	
					default:
						break;
				}
				switch (task.acc_type){  //接入方式
					case 1:
						a[2]='非光纤';
						break;
					case 2:
						a[2]='非光纤';
						break;
					case 3:
						a[2]='非光纤';
						break;
					case 4:
						a[2]='非光纤';
						break;
					case 5:
						a[2]='光纤';
						break;
					default:
						break;
				}
				
				//用户基础信息
        		$('#cust_name').html(task.cust_name);
        		$('#acc_nbr').html(task.acc_nbr);
        		accnbr=task.acc_nbr;//工单用户手机号
        		$('#region').html(task.region);
        		$('#county').html(task.county);
        		$('#branch').html(task.branch);
        		$('#channel_name').html(task.channel_name);
        		$('#user_status').html(a[1]);
        		$('#vid_rank').html(task.vid_rank);
        		$('#charge_type').html(task.charge_type);
        		$('#user_balance').html(task.user_balance);
        		switch (task.is_4g_card){  //接入方式
					case 0:
						a[9]='否';
						break;
					case 1:
						a[9]='是';
						break;
					default:
						break;
				}
        		$('#is_4G_card').html(a[9]);
        		switch (task.is_4g_card){  //接入方式
					case 0:
						a[10]='否';
						break;
					case 1:
						a[10]='是';
						break;
					default:
						break;
				}
        		$('#is_4G_term').html(a[10]);
        		$('#acc_type').html(a[2]); //接入方式
        		$('#acc_rate').html(task.acc_rate);
        		$('#term_mode').html(task.term_mode);
        		$('#online_time').html(task.online_time);
        		$('#contact1').html(task.contact1);
        		$('#contact2').html(task.contact2);
        		$('#contact3').html(task.contact3);
//      		成员号码中间隔冒号替换成空格
        		var prod=task.prod_num_list;
				prod = prod.replace(/:/g,' ');
        		$('#prod_num_list').html(prod);//成员号码
//      		console.log()
				prodNumList=task.prod_num_list;
				contact1 = task.contact1;
        		//用户行为信息
        		$('#avg_bill').html(task.avg_bill);
        		$('#mon_Bill').html(task.mon_bill);
        		$('#avg_voice').html(task.avg_voice);
        		$('#mon_Voice').html(task.mon_voice);
        		$('#avg_flow').html(task.avg_flow);
        		$('#mon_Flow').html(task.mon_flow);
        		$('#last_sale_flow').html(task.last_sale_flow);
        		$('#cur_bill').html(task.cur_bill);
        		$('#last_band_flow').html(task.last_band_flow);
        		$('#cur_flow').html(task.cur_flow);
        		$('#last_stop_cnt').html(task.last_stop_cnt);
        		$('#cur_voice').html(task.cur_voice);
        		$('#last_owe_cnt').html(task.last_owe_cnt);
        		//销售品信息
        		$('#sales_name').html(task.sales_name);
        		$('#sales_create_time').html(task.sales_create_time);
        		$('#amount').html(task.amount);
        		$('#offer_channel').html(task.offer_channel);
        		$('#contract_name').html(task.contract_name);
        		$('#contract_create_time').html(task.contract_create_time);
        		$('#contract_invalid_time').html(task.contract_invalid_time);
        		$('#plan_channel').html(task.plan_channel);
        		$('#req_pkg_name').html(task.req_pkg_name);
        		$('#itv_pkg_name').html(task.itv_pkg_name);
        		$('#band_pkg_name').html(task.band_pkg_name);
        		$('#subsidy_type').html(task.subsidy_type);
        		//用户特征描述
				 var str='<span>&nbsp;'+task.cust_name+'</span>'+
				 		'<span>&nbsp;'+a[4]+'</span>'+
				 		'<span>&nbsp;'+a[5]+'</span>'+
				 		'<span>&nbsp;'+a[6]+'</span>'+
				 		'<span>&nbsp;'+a[12]+'</span>'+
				 		'<span>&nbsp;'+a[7]+'</span>'+
				 		'<span>&nbsp;'+a[8]+'</span>';
		 		$('.describe_name').html(str);
		 		var contentstr=task.content;
		 		var content= document.getElementById("content");
		 		if(contentstr!=null){
	    			var c=contentstr.split(/\s+/g);  //后台获取的数据分段显示
					content.innerHTML='';
					 for (var i = 0; i < c.length; i++) {
					 	content.innerHTML+= c[i]+'<br/>';
					 };
		 		}
//		 		$('#content').html(task.content);	//营销话术
		 		$('#sms_content').val(task.sms_content); //销售短信
		 		//备注及上报
		 		$('#des').html(a[11]); 
		 		console.log(task.assessment_des)
		 		$('#assessment_des').html(task.assessment_des);  //评估结果
		 		offerId=task.offer_id;
		 		planId=task.plan_id;
        		}
        		//用户特征描述
        		var	userCharacter=data.data.userCharacter;
        		if(userCharacter!=null){
        			$('#portrait').html(userCharacter.USER_DRAW);
	        		$('#product').html(userCharacter.PRO_INFO);
	        		$('#terminal').html(userCharacter.TERM_INFO);
	        		$('#behavi').html(userCharacter.USE_BEHAVIOR);
	        		$('#dpi').html(userCharacter.DPI_INFO);
        		}
        		
        		//推荐方案
        		var	userRecommend=data.data.userRecommend;
        		if(userRecommend!=null){
	        		$("#leftVule").html(userRecommend.RAISE_VALUE);
	        		$("#hedge").html(userRecommend.KEEP_VALUE);
	        		$("#dropVule").html(userRecommend.DEP_VALUE);
	        		$("#stream").html(userRecommend.MAIN_VALUE);
        		}
				corelinkman = task.core_linkman;  //修改主联系人
				editSms=task.is_edit_sms_content;  //是否能编辑短信
        	}
        },
        complete:function(xhr){
        	$("#loadingMask").hide();
			if(xhr=='timeout'){
		 　　　　　 ajaxTimeOut.abort(); 
		　　　　　  alert("超时");
		　　　　}
			rejectDouble = false;
		},
  	 })
}

//成员webProdList
function webProdList(){
	var url="/assist/task/webProdList";
    var os = "web";
    var request={
	    	param:{
		    	"prodNumList":prodNumList,
	    	},
	    	common_param:{
	    		"token":token,
	    		"os":"web",
	    	}
	 };
	 $.ajax({
	 	type : 'post',
        url : url,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data){
        	if(data.error.code==1){
        		$(".member").show();
        		$("#modify").show();
        		$("#contract").show();
				$("#informtion").hide();
	    		$("#con_img").html('<img src="img/yhtz.png"/>');
	    		$(".sheng").html('套餐成员信息');
		    	var	webProdListstr=	'<tr class="Lists memberInform">'+
									'<td style="width:4%;"><span>序列</span></td>'+
									'<td><span>用户号码</span></td>'+
									'<td><span>用户姓名</span></td>'+
									'<td><span>用户状态</span></td>'+
									'<td><span>产品类型</span></td>'+
									'<td><span>是否活跃</span></td>'+
									'<td><span>主副卡</span></td>'+
									'<td><span>话语权</span></td>'+
								'</tr>';
				$(".member").html(webProdListstr);
				$("#corlin").val(corelinkman);
				$.each(data.data.prodList,function(i,item){
					var b=[];
					b[3]=item.PROD_SPEC_NAME;
					b[4]=item.SPEAK_RIGHT;
					b[5]=item.ACC_NBR;
					b[6]=item.CUST_NAME;
					b[7]=item.IS_ACTIVE;
					b[8]=item.IS_MAIN_CARD;
	        		for(var i=0;i<b.length;i++){
						    if(b[i]==null){
						      	b[i]="";
						    }
						}
						
					switch (item.USER_STATUS){ //用户状态
						case 0:
							b[1]='正常';
							break;
						case 1:
							b[1]='单停';
							break;
						case 2:
							b[1]='双停';
							break;
						case 3:
							b[1]='已拆机';
							break;	
						default:
							break;
					}
					switch (item.IS_ACTIVE){ //是否活跃
						case 0:
							b[2]='低';
							break;
						case 1:
							b[2]='一般';
							break;
						case 2:
							b[2]='高';
							break;
						case 3:
							b[2]='较高';
							break;
						default:
							break;
					}
					switch(item.IS_MAIN_CARD){
						case 0:
							b[8]='副卡';
							break;
						case 1:
							b[8]='主卡';
							break;	
						default:
							break;
					}
					
					var	Liststr='<tr class="Lists">'+
									'<td style="width:4%;"><span></span></td>'+
									'<td><span class="title" title="'+b[5]+'">'+b[5]+'</span></td>'+
									'<td><span class="title" title="'+b[6]+'">'+b[6]+'</span></td>'+
									'<td><span class="title" title="'+b[1]+'">'+b[1]+'</span></td>'+
									'<td><span class="title" title="'+b[3]+'">'+b[3]+'</span></td>'+
									'<td><span class="title" title="'+b[2]+'">'+b[2]+'</span></td>'+
									'<td><span class="title" title="'+b[8]+'">'+b[8]+'</span></td>'+
									'<td><span class="title" title="'+b[4]+'">'+b[4]+'</span></td>'+
								'</tr>';
					$(".member").append(Liststr);
					var len = $('.member tr').length;
				        for(var i = 1;i<len;i++){
				            $('.member tr:eq('+i+') td:first').text(i);
				    }
					$(".member tr:odd").css({'background':'#f3fbff'});
				});
        	}
        }
    })
}

//套餐描述
function webOfferDesc(){
	var url="/assist/task/webOfferDesc";
    var os = "web";
    console.log(offerId);
    var request={
	    	param:{
		    	"offerId":offerId,
	    	},
	    	common_param:{
	    		"token":token,
	    		"os":"web",
	    	}
  	 };
  	 $.ajax({
  	 	type : 'post',
        url : url,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data){
        	if(data.error.code==1){
	        	$("#contract").show();
	        	$("#informtion").hide();
	    		var desca=data.data.desc;
	    		var contract_con= document.getElementById("contract_con");
	    		if(desca!=null){
		    		var a=desca.split(/\s+/g);  //后台获取的数据分段显示
					contract_con.innerHTML='';
					 for (var i = 0; i < a.length; i++) {
					 	contract_con.innerHTML+= a[i]+'<br/>';
					 };	
	    		}
	    		$(".sheng").html('套餐描述信息');
    		}
        }
    })
}
//合约描述
function webPlanDesc(){
	var url="/assist/task/webPlanDesc";
    var os = "web";
    console.log(planId);
    var request={
	    	param:{
		    	"planId":planId,
	    	},
	    	common_param:{
	    		"token":token,
	    		"os":"web",
	    	}
	 };
	 $.ajax({
	 	type : 'post',
        url : url,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data){
        	if(data.error.code==1){
        		$("#contract").show();
	        	$("#informtion").hide();
        		var descal=data.data.desc;
	    		var contract_con= document.getElementById("contract_con");
        		if(descal!=null){
		    		var b=descal.split(/\s+/g);  //后台获取的数据分段显示
					contract_con.innerHTML='';
					 for (var i = 0; i < b.length; i++) {
					 	contract_con.innerHTML+= b[i]+'<br/>';
					 };
        		}
        		$(".sheng").html('合约描述信息');
        	}
        	
        }
    })
}
//关闭合约描述
function contractClose(){
	$("#contract").hide();
    $("#informtion").show();
    $(".member").hide();
    $("#modify").hide();
}

if(cta==2){
	//修改主联系人手机号码
	function editCoreLinkMan(){
		var url="/assist/task/editCoreLinkMan";
		var os = "web";
		var coreLinkMan=$("#corlin").val();
		var accNbr=phone;
	    var request={
		    	param:{
			    	"coreLinkMan":coreLinkMan,
			    	"accNbr":accNbr,
		    	},
		    	common_param:{
		    		"token":token,
		    		"os":"web",
		    	}
		};
		$.ajax({
		 	type : 'post',
		    url : url,
		    data: {'request':JSON.stringify(request)},
		    contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		    success: function(data){
		    	if(data.error.code==1){
		        	$("#loginMask").show();
					$("#newspapers").show();
					$(".newsmeagess").html(data.error.message);
					corelinkman =coreLinkMan;  //修改联系人成功之后， 把手机号再次赋值给全局变量，   防止关闭页面之后再次打开主联系人手机号码么有变化
					$("#corlin").val(corelinkman);
				}
		    }
		})
	}
	//发送短信
	var phone;
	function singleSend(){
	    phone = GetQueryString("phone");
//	    console.log(phone)
	    dux();
	}
//	发送给自己短信
	function yourself(){
		phone=salesId;
		var reg = /^(180|189|133|153|177|173|181)\d{8}$/;
		if (!reg.test($.trim(phone))){
	    		$("#loginMask").show();
				$("#newspapers").show();
				$(".newsmeagess").html("对不起你不是贵州手机号,不能发送短信!");
	    }else{
	   			dux();
	    }
	}
	function dux(){
		var url="/assist/sms/singleSend";
	    var os = "web";
	 	var content=$("#sms_content").val();
	    var request={
		    	param:{
			    	"id":id,
			    	"content":content,
			    	"phone":phone,
		    	},
		    	common_param:{
		    		"token":token,
		    		"os":"web",
		    	}
		 };
		 $.ajax({
		 	type : 'post',
	        url : url,
	        data: {'request':JSON.stringify(request)},
	        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	        success: function(data){
	        	if(data.error.code==1){	
		        	$("#loginMask").show();
					$("#newspapers").show();
					$(".newsmeagess").html(data.error.message);
	        	}
	        }
	   })
	}
	//点击编辑短信，移除textarea 中的禁止输入的readonly属性
	function sing(){
		console.log(editSms);
		if(editSms==1){
			$("#sms_content").removeAttr("readonly","readonly");
		}else{
			$("#loginMask").show();
			$("#newspapers").show();
			$(".newsmeagess").html("对不起，您没有权限编辑短信！如有需要，请联系地市管理员到后台添加权限！");
		}
	}
	//上报
	//执行成功
	var status;
	function writele(){
		status=1;
	 	tongy(); 
	}
	//执行失败
	function fail(){
	 	status=2;
	 	tongy(); 
	}
	//延迟执行
	function delay(){
	 	status=3;
	 	tongy();
	}
//	上报通用
	function tongy(){
		var url="/assist/task/reportJob";
	    var os = "web";
	    var message=$("#des").val();
	    var request={
		    	param:{
			    	"id":id,
			    	"status":status,
			    	"message":message,
		    	},
		    	common_param:{
		    		"token":token,
		    		"os":"web",
		    	}
	  	 };
	    $.ajax({
	        type : 'post',
	        url : url,
	        data: {'request':JSON.stringify(request)},
	        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
	        success: function(data){
		    	if(data.error.code==1){
		    		$("#loginMask").show();
					$("#newspapers").show();
					$(".newsmeagess").html(data.error.message);
		    	}
		    	
	        }
		});
	}
	//关闭上报提示按钮
	function determine(){
		$("#loginMask").hide();
		$("#newspapers").hide();
	}
}else{
	$("#duanxin").hide();
	$("#shangbao").hide();
	$("#modifyshow").hide();
}
//返回上一页
function closole(){
	window.history.go(-1);
}
$("#ulheader .yhjc").click(function(){
		var indexy=$(".yhjc").index(this);
		$(".yhjc").eq(indexy).addClass("disas").siblings().removeClass("disas");
		$("#details .xinxi").eq(indexy).addClass("xiux").siblings().removeClass("xiux");
})
