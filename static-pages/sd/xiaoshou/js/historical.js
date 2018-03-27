$(function(){
	leixing();
})
  
//从地址栏获取 
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  decodeURI(r[2]); return null;
// }
// //每次都要传给后台的     是从登录之后获取的token  os 
// var token = GetQueryString("token");
// var salesId = GetQueryString("salesId");
var  token=sessionStorage.getItem("token");
var  salesId=sessionStorage.getItem("salesId");
var os = "web"; 
// 历史工单任务类型列表
function leixing(){
   	var url="/assist/task/taskTypeList";
     var request={
	    	param:{
		    	"salesId":salesId
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
        	var str981=
	    			'<option value="">全部查询</option>';
	    			$("#selectAgeee").append(str981);
	    	$.each(data.data.taskTypeList,function(i,item){					           	
	    		var str98=
	    			'<option value="'+item.ID+'">'+item.NAME+'</option>';
	    		$("#selectAgeee").append(str98);
	    	})
	    	lishil();
        }
	});  
}
//历史工单
var pageNumber,nextPag,totalPage;
function lishil(){
	
	pageNumber=1;
	liasdaas();
}

function liasdaas(){
   	var url="/assist/task/webHisTakeList";
// 	$("input").attr("value","");
    var custName = $('#h_phone').val();
    //var accNbr = $('#phone1').val();
    //var startDate = $('#datePicker').val();
    //var endDate = $('#datePicker2').val();
   	var options=$("#selectAge2 option:selected"); 
   	var	status =options.val();
   	var options2=$("#selectAgeee option:selected"); 
   	var	taskId =options2.val();
   	var options1=$("#selectAge3 option:selected"); 
   	var	belongStatus =options1.val();
   	var pageSize =10;
	var endArpu,startArpu;
	endArpu= $("#h_endArpu").val();
	if(endArpu==null||endArpu==""){
		endArpu=endArpu.toString();
	}
	startArpu= $("#h_startArpu").val();
	if(startArpu==null||startArpu==""){
		startArpu=startArpu.toString();
	}
	var ltTypes=$("#h_ltType option:selected");
	var ltType = ltTypes.val();
	var netTypes=$("#h_netType option:selected");
	var netType = netTypes.val();
	var	rhType = $("#h_rhType").val();
   	$("#loadingMask").show();
   	var request={
	    	param:{
		    	"taskId":taskId,
		    	"startDate":"",
		    	"endDate":"",
		    	"accNbr":"",
		    	"custName":custName,
		    	"status":status,
		    	"belongStatus":belongStatus,
		    	"pageNumber":pageNumber,
		    	"pageSize":10,
				"endArpu":endArpu,
				"startArpu":startArpu,
				"rhType":rhType,
				"ltType":ltType,
				"netType":netType
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
			$(".historyWork").empty();
	    	if(data.error.code==1){
	    		$("#loadingMask").hide();
	    		var historStr='<li id="history">'+
//								'<div style="width:3%;"><span>序列</span></div>'+
//								'<div><span>原始工单</span></div>'+
//								'<div><span>任务名称</span></div>'+
//								'<div><span>联通终端类型</span></div>'+
//								'<div><span>融合类型</span></div>'+
//								'<div><span>ARPU</span></div>'+
//								'<div><span>网络类型</span></div>'+
//								'<div style="display:none"><span>客户名称</span></div>'+
//								'<div><span>客户号码</span></div>'+
//								'<div><span>执行状态</span></div>'+
//								'<div><span>归属状态</span></div>'+
//								'<div><span>竣工情况</span></div>'+
//								'<div><span>操作</span></div>'+
								
								'<div><span>操作</span></div>'+
								'<div style="width:84px"><span>客户号码</span></div>'+
								'<div><span>套餐费元</span></div>'+
								'<div><span>ARPU</span></div>'+
								'<div><span>总流量</span></div>'+
								'<div><span>融合类型</span></div>'+
								'<div><span>定制类型</span></div>'+
								'<div><span>联通终端类型</span></div>'+
								'<div><span>网络类型</span></div>'+
								'<div><span>终端型号</span></div>'+
								'<div><span>终端最新价格</span></div>'+
								'<div><span>执行人</span></div>'+
								'<div><span>执行状态</span></div>'+
								'<div><span>归属状态</span></div>'+
								'<div><span>竣工情况</span></div>'+
							'</li>';
				$(".historyWork").html(historStr);
	    		$.each(data.data.taskList,function(z,y){
	    			var a=[];
//	    			var b=null;
					a[0]=y.lt_type;
					a[1]=y.rh_type;
					a[5]=y.cur_income;
					a[6]=y.use_net_type;
					for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    }
					}
					switch (y.status){
						case 0:
							a[2]='未执行';
							break;
						case 1:
							a[2]='执行成功';
							break;
						case 2:
							a[2]='执行失败';
							break;
						case 3:
							a[2]='延迟执行';
							break;	
						default:
							break;
					}
					switch (y.belongStatus){
						case '0':
							a[3]='自有';
							break;
						case '1':
							a[3]='转出';
							break;
						case '2':
							a[3]='转入';
							break;
						default:
							break;
					}
					switch (y.completeFlag){//竣工
						case 0:
							a[4]='未竣工';
							break;
						case 1:
							a[4]='竣工';
							break;
						default:
							break;
					}
					var tc_fee;
					if(y.tc_fee==0){
						tc_fee=""
					}else{
						tc_fee=y.tc_fee
					}
					// var start = y.startDate;
					// var startDate= start.substr(0,10); //取到开始时间 日期 去掉分秒  字符串截取
					// var endd = y.endDate;
					// var endDate= endd.substr(0,10);	
					var cta= "1";
					sessionStorage.setItem("cta",cta);
					$(".shensdas:even").css({'background':'#f3fbff'});		//给是偶数的哪行添加背景色
					var str4='<li class="shensdas">'+
								'<div><span><a href="information.html?hqid='+ y.id+'" target="_blank"><div class="xiang2" style="width:42px;">详情</div></a></span></div>'+
//								'<div style="display:none" id="name_'+y.id+'"><span class="title" title="'+y.custName+'">'+y.custName+'</span></div>'+
								'<div id="staus_'+y.id+'" style="width:84px"><span class="title" title="'+y.accNbr+'">'+y.accNbr+'</span></div>'+
//								'<div><span class="title" title="'+y.initialName+'">'+y.initialName+'</span></div>'+
//								'<div><span class="title" title="'+y.taskName+'">'+y.taskName+'</span></div>'+
								'<div><span class="title" title="'+tc_fee+'">'+tc_fee+'</span></div>'+ //套餐费元
								'<div><span class="title" title="'+ y.total_flow+'">'+y.total_flow+'</span></div>'+		//总流量
								'<div><span class="title" title="'+a[5]+'">'+a[5]+'</span></div>'+
								'<div><span class="title" title="'+a[6]+'">'+a[6]+'</span></div>'+
								'<div><span class="title" title="'+ y.dz_type+'">'+y.dz_type+'</span></div>'+
								// '<div><span class="title" title="'+a[1]+'">'+a[1]+'</span></div>'+
								'<div><span class="title" title="'+a[0]+'">'+a[0]+'</span></div>'+
								'<div><span class="title" title="'+a[1]+'">'+a[1]+'</span></div>'+
								'<div><span class="title" title="'+ y.phone_type+'">'+y.phone_type+'</span></div>'+   //终端型号
								'<div><span class="title" title="'+ y.zd_jg_new+'">'+ y.zd_jg_new+'</span></div>'+ //终端最新价格
								'<div><span class="title" title="'+y.name+'">'+y.name+'</span></div>'+// 执行人
								'<div><span class="title" title="'+a[2]+'">'+a[2]+'</span></div>'+
								'<div id="zi_'+y.id+'"><span class="title" title="'+a[3]+'">'+a[3]+'</span></div>'+
								'<div id="jun_'+y.id+'"><span class="title" title="'+a[4]+'">'+a[4]+'</span></div>'+
								
							'</li>';
					 $(".historyWork").append(str4);  
//					 通过“客户号码” 列字体颜色区分用户状态：
					if(y.userStatus==0){
						$('.shensdas #staus_'+y.id).css("color","#63ce93");
					}else if(y.userStatus==1){
						$('.shensdas #staus_'+y.id).css("color","#e4e413");
					}else if(y.userStatus==2){
						$('.shensdas #staus_'+y.id).css("color","#ffcf3e");
					}else if(y.userStatus==3){
						$('.shensdas #staus_'+y.id).css("color","#ff5959");
					}
//					通过“客户名称” 列字体颜色区分账户余额：
//					if(y.userBalance<5){
//						$('.shensdas #name_'+y.id).css("color","#ff5959");
//					}else if(y.userBalance>5&&y.userBalance<10){
//						$('.shensdas #name_'+y.id).css("color","#2f8acb");
//					}else{
//						$('.shensdas #name_'+y.id).css("color","");
//					}
//					
//					 通过“归属状态” 列字体颜色区分归属状态
					if(y.belongStatus=='0'){
						$('.shensdas #zi_'+y.id).css("color","#63ce93");
					}else if(y.belongStatus=='1'){
						$('.shensdas #zi_'+y.id).css("color","#ccc");
					}else if(y.belongStatus=='2'){
						$('.shensdas #zi_'+y.id).css("color","#2f8acb");
					}
					if(y.assessment==0){
						$('.shensdas #jun_'+y.id).css("color","#ccc");
					}else if(y.assessment==1){
						$('.shensdas #jun_'+y.id).css("color","#2f8acb");
					}else if(y.assessment==2){
						$('.shensdas #jun_'+y.id).css("color","");
					}else if(y.assessment==3){
						$('.shensdas #jun_'+y.id).css("color","#ff5959");
					}
	    		})
//	    		var len = $('.historyWork li').length;
//			        for(var i = 1;i<len;i++){
//			            $('.historyWork li:eq('+i+') div:first').text(i);
//			    }
				var total =data.data.total;    //取出输入框的总条数
				totalPage=Math.ceil(total/pageSize); //算出总页数 
				$("#yema").val(pageNumber); //把pageNumber给了跳转输入框 
				if(pageNumber>1 && pageNumber<totalPage){    //页数大于1小于总页数时都添加上点击事件
				 	$("#shou").attr("onclick","shouye();");
				 	$("#shang").attr("onclick","shang();");
				 	$(".butto").attr("onclick","tiao();");
				 	$("#xia").attr("onclick","xia();")
				 	$("#weiye").attr("onclick","weiye();");
				}else{
					if(pageNumber<=1){ //小于1时  删除上一页和首页的点击事件
					 	pageNumber=1; 
					 	$("#yema").val(pageNumber); 
					 	$("#shou").removeAttr("onclick");
					 	$("#shang").removeAttr("onclick");
					 	$("#xia").attr("onclick","xia();")
					 	$("#weiye").attr("onclick","weiye();");
					}
					if(pageNumber>=totalPage){ //大于总页数时  删除下一页和跳转的点击事件
						pageNumber=totalPage;   
						$("#yema").val(pageNumber); 
						$("#shou").attr("onclick","shouye();");
				 		$("#shang").attr("onclick","shang();");
					 	$("#xia").removeAttr("onclick");
					 	$("#weiye").removeAttr("onclick");
					}		 
				}
				var str33 ='<div class="pagez">共<span>'+pageNumber+'</span>/<span class="pagezz">'+totalPage+'</span>页</div>';
    			$(".pagez").html(str33);
	    	}
        }
	});  
}
//跳转
function tiao(){
	pageN =$("#yema").val();
	pageNumber=pageN.replace(/\D/g,'');
	//在删除绑定事件之前判断小于1时，跳转输入框还是显示1     大于总页数 输入框自动变成总页数  不能跳转
	if(pageNumber<1){  
		$("#yema").val("1");
		return false;
	}else if(pageNumber>totalPage){
		$("#yema").val(totalPage);
		return false;
	}
//	var 
//	if
   	liasdaas();
}
//下一页
function xia(){
	nextPag=$("#yema").val();
	pageNumber=Number(nextPag)+1;
   liasdaas();
}
//上一页
function shang(){
   nextPag=$("#yema").val();
	pageNumber=Number(nextPag)-1;
   liasdaas();
}
//首页
function shouye(){
   pageNumber =1;
   liasdaas();
}
//尾页
function weiye(){
	pageNumber=totalPage;
	liasdaas();
}

