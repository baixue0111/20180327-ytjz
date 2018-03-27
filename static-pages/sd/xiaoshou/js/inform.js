/**
 * Created by hsgeng on 2017/3/20.
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}
var  token=sessionStorage.getItem("token");
var  salesId=sessionStorage.getItem("salesId");
var  cta=sessionStorage.getItem("cta");
var  id=GetQueryString("hqid");
$(function(){
	webTakeInfo();
})
var offerId,planId,prodNumList,contact1,accnbr,corelinkman,editSms,qhbelongStatus;
function webTakeInfo(){
	var url="/assist/task/webTakeInfo";
    var os = "web";
    var request={
	    	param:{
		    	"id":id
	    	},
	    	common_param:{
	    		"token":token,
	    		"os":"web"
	    	}
  	 };
  	 $.ajax({
  	 	type : 'post',
        url : url,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        beforeSend:function(xhr){ 
   			$("#loadingMask").show();
		},
        success: function(data){
        	$("#loadingMask").hide();
        	if(data.error.code==1){
        		var task=data.data.taskjob;
        		if(task!=null){
					//    用户性别
					if(task.user_sex==0){
						$('#user_sex').html('女');
					}else if(task.user_sex==1){
						$('#user_sex').html('男');
					}else{
						$('#user_sex').html('');
					}
					$('#acc_nbr').html(task.acc_nbr);
					$("#user_date_birth").html(task.user_date_birth);
					accnbr=task.acc_nbr;//工单用户手机号
					$('#innet_date').html(task.innet_date);
					// $('#pay_mode').html(task.pay_mode);
					// console.log(task.pay_mode);
					$('#user_status_name').html(task.user_status_name);
					$('#net_type_code').html(task.net_type_code);
					$('#tc_name').html(task.tc_name);
					$('#tc_fee').html(task.tc_fee);
					$('#tc_flowall').html(task.tc_flowall);
					$('#tc_callall').html(task.tc_callall);
					$('#cur_income').html(task.cur_income);
					var duration = task.call_duration;
					var call_duration = duration.toFixed(2);
					$('#call_duration').html(call_duration); // 通话时长
					$('#call_times').html(task.call_times);
					var duration = task.fee_duration;
					var fee_duration = duration.toFixed(2);
					$('#fee_duration').html(fee_duration); //收费语音时长
					$('#total_flow').html(task.total_flow);
					$('#message_times').html(task.message_times);
					$('#is_3wu').html(task.is_3wu);
					$('#is_jd').html(task.is_jd);
					$('#use_net_type').html(task.use_net_type);
					$('#yj_type').html(task.yj_type);
					$('#lt_type').html(task.lt_type);
					$('#dz_type').html(task.dz_type);
					$('#phone_brand').html(task.phone_brand);
					$('#phone_type').html(task.phone_type);
					$('#dual_type').html(task.dual_type);
					$('#zd_jg').html(task.zd_jg);
					$('#zd_jg_new').html(task.zd_jg_new);
					$('#zd_bgrq').html(task.zd_bgrq);
					$('#zd_fisttime').html(task.zd_fisttime);
					$('#zd_user_sysc').html(task.zd_user_sysc);
					$('#user_zd_sysc').html(task.user_zd_sysc);
					$('#zd_is_2sj').html(task.zd_is_2sj);
					$('#is_master').html(task.is_master);
					$('#join_masterdate').html(task.join_masterdate);
					$('#rh_type').html(task.rh_type);
					$('#rh_mem_startdate').html(task.rh_mem_startdate);
					$('#rh_mem_enddate').html(task.rh_mem_enddate);
					if(task.is_group_member==0){
							$('#is_group_member').html('否');
						}else if(task.is_group_member==1){
							$('#is_group_member').html('是');
						}else{
							$('#is_group_member').html('');
						}
					$('#sale_mode_now').html(task.sale_mode_now);
					$('#hy_name').html(task.hy_name);
					$('#resale_start').html(task.resale_start);
					$('#resale_end').html(task.resale_end);
					$('#eparchy_name').html(task.eparchy_name);
					$('#village_name').html(task.village_name);
					$('#sms_content').val(task.sms_content); //销售短信
					$("#contents").html(task.content); //销售话术
					$('#des').html(task.des);//备注及上报
					$("#user_name").html(task.user_name); // 用户名
					$("#access_mode").html(task.access_mode); // 接入方式
					$("#broadband_speed").html(task.broadband_speed); // 宽带速率
					$("#user_dress").html(task.user_dress);//地址
					$("#net_time").html(task.net_time);//在网时长
					$("#installed_area").html(task.installed_area); //装机小区
					$("#development_people").html(task.development_people);// 发展人
					$("#user_phone").html(task.user_phone);// 联系电话
						// 是否包年
					if(task.is_pack_years==0){
						$('#is_pack_years').html('否');
					}else if(task.is_pack_years==1){
						$('#is_pack_years').html('是');
					}else{
						$('#is_pack_years').html('');
					}

					qhbelongStatus = task.belongStatus;

				}
        	}
        },
        error:function(xhr){
	      	$("#loadingMask").hide();
			$("#informtion").hide();
			wrapper();
		}
  	 })
}
if(cta==2){
	// 发送短信
	function singleSend(){
		var phone = accnbr;
		var url="/assist/sms/singleSend";
	    var os = "web";
	 	var content=$("#sms_content").val();
	    var request={
		    	param:{
			    	"id":id,
			    	"content":content,
			    	"phone":phone
		    	},
		    	common_param:{
		    		"token":token,
		    		"os":"web"
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
	        },
			 error:function(){
				 $("#loginMask").show();
				 $("#newspapers").show();
				 $(".newsmeagess").html("服务器连接失败 ，请稍后再试！");
			 }
	   })
	}
//	上报
	function tongy(hqstatus){
		var status=hqstatus;
		$('#sms_content').attr("readonly","readonly");
		var url="/assist/task/reportJob";
	    var os = "web";
	    var message=$("#des").val();
	    var request={
		    	param:{
			    	"id":id,
			    	"status":status,
			    	"message":message
		    	},
		    	common_param:{
		    		"token":token,
		    		"os":"web"
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
	//转派
	function sendManager(){
		//查看归属状态判断是否可以转派
		if(qhbelongStatus == 1){
			alert("已经转出，不能再次转派！")
			return;
		}else{
			var url="/assist/task/sendManager";
			var queryStr =$("#jsrcha").val();
			var request={
				param:{
					"salesId":salesId,
					"queryStr":queryStr
				},
				common_param:{
					"token":token,
					"os":"web"
				}
			};
			$.ajax({
				type : 'post',
				url : url,
				data: {'request':JSON.stringify(request)},
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success: function(data){
					$(".turnToSend").show();
					$("#loginMask").show();
					if(data.error.code==1){
						$(".mingdan").empty();
						$.each(data.data.managers,function(z,y){
							var c=[];
							c[0]=y.name;
							c[1]=y.salesId;
							c[2]=y.branch;
							c[3]=y.county;
							for(var i=0;i<c.length;i++){
								if(c[i]==null){
									c[i]="";
								}
							}
							var sendeestr='<ul class="souming">'+
								'<li>'+
								'<div class="jingliming">'+c[0]+'</div>'+
								'<div>'+c[1]+'</div>'+
								'</li>'+
								'<li class="shiju">'+c[2]+'</li>'+
								'<li class="xian" style="width: 75px;">'+c[3]+'</li>'+
								'<li class="xuanzekuang" style="width: 23px;">'+
								'<input type="checkbox" name="selected" value="'+y.salesId+'"/><br>'+
								'</li></ul>';
							$(".mingdan").append(sendeestr);
						})
					}
				}
			});
		}

	}

	$(".sousuozhuan").click(function(){
		var selecteds = document.getElementsByName("selected");
		var managersstr= [];
		for(i=0;i<selecteds.length;i++){
			if(selecteds[i].checked){
				managersstr.push(selecteds[i].value);
			}
		}
		var managers=managersstr.toString();
		if(managersstr.length<=0){
			alert("必须选择一个转派工单联系人才能进行下一步");
			return;
		}else if(managersstr.length>=2){
			alert("只能选择一个进行转派");
			return;
		}else{
			var url="/assist/task/sendReport";
			var request={
				param:{
					"managers":managers,
					"jobs":id
				},
				common_param:{
					"token":token,
					"os":"web"
				}
			};
			$.ajax({
				type : 'post',
				url : url,
				data: {'request':JSON.stringify(request)},
				contentType:'application/x-www-form-urlencoded;charset=UTF-8',
				success: function(data){
					$(".turnToSend").hide();
					if(data.error.code==1){
						$("#newspapers").show();
						$(".newsmeagess").html(data.error.message);
					}
				}
			});
		}

	})
	//关闭转派
	$(".guanbi").click(function(){
		$(".turnToSend").hide();
		$("#loginMask").hide();
	})

	//关闭上报提示按钮
	function determine(){
		$("#loginMask").hide();
		$("#newspapers").hide();
		location.reload();

	}
}else{
	$("#duanxin").hide();
	$("#shangbao").hide();
}