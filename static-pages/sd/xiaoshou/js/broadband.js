/*
* hsgeng 2017.9.5
*销售助手当前工单
*/
// 从sessionStorage 取  每次都要传给后台的   token/ os
var hqtaskId;
var  token=sessionStorage.getItem("token");
var  salesId=sessionStorage.getItem("salesId");
 hqtaskId=sessionStorage.getItem("hqtaskId");
var os = "web"; 
//右侧当前所有工单
$(function(){
	var hqnetType=sessionStorage.getItem("hqnetType");
   	youce(); 	//进入页面就获取左侧的当前菜单
})
var pageNumber,nextPag,totalPage;
function youce(){
	//每次点击二次按钮时 让下拉框选择第一个
 	$("#selectAge option:first").prop("selected", 'selected');  
	$("#selectAge1 option:first").prop("selected", 'selected'); 
	pageNumber=1;
	youcel();
}
function youcel(){
	$("#loadingMask").show();
 	var url="/assist/task/webNowTakeList";
 	// var custName = $('#name').val();
	var accNbr = $('#m_phone').val();
	nextTaskId=hqtaskId;	
	var taskId=nextTaskId;
	var options=$("#selectAge option:selected"); 
	var	status =options.val();
	var options1=$("#selectAge1 option:selected");  
	var	belongStatus =options1.val();   //获取下拉框的val值
	var pageSize =10;   //每页显示的条数
	var endArpu,startArpu;
	endArpu= $("#m_endArpu").val();
	if(endArpu==null||endArpu==""){
		endArpu=endArpu.toString();
	}
	startArpu= $("#m_startArpu").val();
	if(startArpu==null||startArpu==""){
		startArpu=startArpu.toString();;
	}
	var	rhType = $("#m_rhType").val();
	var ltTypes=$("#m_ltType option:selected"); 
	var ltType = ltTypes.val();
	var netTypes = $("#m_netType option:selected");
	var netType = netTypes.val();
	var request={
	    	param:{
		    	"taskId":nextTaskId,
		    	"accNbr":accNbr,
		    	"custName":"",
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
        	$("#loadingMask").hide();
        	$(".workDetails").empty(); //清除上一次查询
	    	if(data.error.code==1){
	    		var workorderStr='<li id="workorder">'+
								'<div style="width: 83px;"><span>操作</span></div>'+
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
				$(".workDetails").html(workorderStr);
	    		$.each(data.data.taskList,function(z,y){
					var a=[]; //定义一个空数组
					a[0]=y.county;     //返回时null时 让页面什么也不显示
					// a[1]=y.branch;
					// a[5]=y.region;
					a[6]=y.lt_type;
					a[7]=y.rh_type;
					a[8]=y.cur_income;
					a[9]=y.use_net_type;
					
					for(var i=0;i<a.length;i++){
					    if(a[i]==null){
					      	a[i]="";
					    }
					}
					switch (y.status){  //当 任务状态（0：未执行，1：执行成功，2：执行失败，3：延时执行）页面显示相应的文字
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
					switch (y.belongStatus){//当 归属状态（转派：0:自有，1:转出，2:转入） 页面显示相应的文字
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
					var hqId=y.id;
					var  hqId=sessionStorage.setItem("hqId",hqId);
					var operatorStr = '<a href="information.html?cta='+2+'" target="_blank"><div class="xaing1" style="width: 34px;">详情</div></a><div class="che1" style="width: 34px;">撤销</div>';
					 if(a[3]=='转出'&&a[2]=='未执行'){ //如果是未执行&&是转出的  添加撤销转派的按钮
					 	operatorStr='<a  class="xql" href="information.html?cta='+2+'" target="_blank"><div class="xaing1" style="width: 34px;">详情</div></a><div class="cxl che2" id="'+y.id+'" onclick="chexiao(this)" style="width: 34px;">撤销</div>';
					 }
					var str1='<li class="shensdas">'+
							'<div style="width: 83px;"><span>'+operatorStr+'</span></div>'+ 	//操作
							'<div id="staus_'+y.id+'" style="width:84px"><span class="title" title="'+y.accNbr+'">'+y.accNbr+'</span></div>'+ 	//客户号码
							'<div><span class="title" title="'+tc_fee+'">'+tc_fee+'</span></div>'+ //套餐费元
							'<div><span class="title" title="'+a[8]+'">'+a[8]+'</span></div>'+ //arpu
							'<div><span class="title" title="'+ y.total_flow+'">'+y.total_flow+'</span></div>'+		//总流量
							'<div><span class="title" title="'+a[7]+'">'+a[7]+'</span></div>'+ //融合类型
							'<div><span class="title" title="'+ y.dz_type+'">'+y.dz_type+'</span></div>'+ //定制类型
							'<div><span class="title" title="'+a[6]+'">'+a[6]+'</span></div>'+ 	//联通终端类型
							'<div><span class="title" title="'+a[9]+'">'+a[9]+'</span></div>'+ // 网络类型 
							'<div><span class="title" title="'+ y.phone_type+'">'+y.phone_type+'</span></div>'+   //终端型号
							'<div><span class="title" title="'+ y.zd_jg_new+'">'+ y.zd_jg_new+'</span></div>'+ //终端最新价格
							'<div><span class="title" title="'+y.name+'">'+y.name+'</span></div>'+// 执行人
							'<div><span class="title" title="'+a[2]+'">'+a[2]+'</span></div>'+ //执行状态太
							'<div id="zi_'+y.id+'"><span class="title" title="'+a[3]+'">'+a[3]+'</span></div>'+  	// 归属状态
							'<div id="jun_'+y.id+'"><span class="title" title="'+a[4]+'">'+a[4]+'</span></div>'+	//竣工
						'</li>';
					 $(".workDetails").append(str1);  
//					 通过“客户号码” 列字体颜色区分用户状态：
					if(y.userStatus==0){
						$('.shensdas  #staus_'+y.id).css("color","#63ce93");
					}else if(y.userStatus==1){
						$('.shensdas  #staus_'+y.id).css("color","#e4e413");
					}else if(y.userStatus==2){
						$('.shensdas  #staus_'+y.id).css("color","#ffcf3e");
					}else if(y.userStatus==3){
						$('.shensdas  #staus_'+y.id).css("color","#ff5959");
					}
//					通过“客户名称” 列字体颜色区分账户余额：
//					if(y.userBalance<5){
//						$('.shensdas #name_'+y.id).css("color","#ff5959");
//					}else if(y.userBalance>5&&y.userBalance<10){
//						$('.shensdas #name_'+y.id).css("color","#2f8acb");
//					}else{
//						$('.shensdas #name_'+y.id).css("color","");
//					}
					
//					 通过“归属状态” 列字体颜色区分归属状态
					if(y.belongStatus=='0'){
						$('.shensdas #zi_'+y.id).css("color","#63ce93");
					}else if(y.belongStatus=='1'){
						$('.shensdas #zi_'+y.id).css("color","#ccc");
					}else if(y.belongStatus=='2'){
						$('.shensdas  #zi_'+y.id).css("color","#2f8acb");
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
				$(".shensdas:even").css({'background':'#f3fbff'});	
				var total =data.data.total;
				totalPage=Math.ceil(total/pageSize);
				$("#dqyema").val(pageNumber);
				//console.log(pageNumber)
				if(pageNumber>1 && pageNumber<totalPage){    //页数大于1小于总页数时都添加上点击事件
				 	$(".dqshou").attr("onclick","dqshou();");
				 	$(".dqshang").attr("onclick","dqshang();");
				 	$(".dqbutto").attr("onclick","dqtiao();");
				 	$(".dqxia").attr("onclick","dqxia();")
				 	$(".dweiye").attr("onclick","dweiye();");
				}else{
					if(pageNumber<=1){ //小于1时  删除上一页和首页的点击事件
					 	pageNumber=1; 
					 	$(".dqyema").val(pageNumber); 
					 	$(".dqshou").removeAttr("onclick");
					 	$(".dqshang").removeAttr("onclick");
					 	$(".dqxia").attr("onclick","dqxia();")
					 	$(".dweiye").attr("onclick","dweiye();");
					}
					if(pageNumber>=totalPage){ //等于总页数时  删除下一页和跳转的点击事件
						pageNumber=totalPage;   
						$("#dqyema").val(pageNumber); 
					 	$(".dqxia").removeAttr("onclick");
					 	$(".dweiye").removeAttr("onclick");
					}
					if(pageNumber>=totalPage){ //等于总页数时  删除下一页和跳转的点击事件
						pageNumber=totalPage;   
						$("#dqyema").val(pageNumber); 
						$(".dqshou").attr("onclick","dqshou();");
				 		$(".dqshang").attr("onclick","dqshang();");
					 	$(".dqxia").removeAttr("onclick");
					 	$(".dweiye").removeAttr("onclick");
					}
				} 
				 var str66 ='<div class="dqpagez">共<span class="dqpagezz">'+pageNumber+'/'+totalPage+'</span>页</div>';
    				$(".dqpagez").html(str66);
	    	}
        }
	}); 

}
//下一页  当前
function dqxia(){
	nextPag=$("#dqyema").val();
	pageNumber=Number(nextPag)+1;
 	youcel();
}
						
//当前上一页
function dqshang(){
	nextPag=$("#dqyema").val();
	pageNumber=Number(nextPag)-1;
 	youcel();
}
//当前工单首页
function dqshou(){
	pageNumber =1;
 	youcel();
}
//当前工单尾页
function dweiye(){
	pageNumber=totalPage;
	youcel();
}
//当前工单跳转
function dqtiao(){
 	pageNd =$("#dqyema").val();
	pageNumber=pageNd.replace(/\D/g,'');
	//在删除绑定事件之前判断小于1时，跳转输入框还是显示1     大于总页数 输入框自动变成总页数  不能跳转
	if(pageNumber<1){  
		$("#dqyema").val("1");
		return false;
	}else if(pageNumber>totalPage){
		$("#dqyema").val(totalPage);
		return false;
	}
	youcel();
}

   //点击转派弹出客户经理进行转派       
$(".buttonn").click(function(){
	var accNbr = $('#m_phone').val();
	nextTaskId=hqtaskId;	
	var taskId=nextTaskId;
	var options=$("#selectAge option:selected"); 
	var	status =options.val();
	var options1=$("#selectAge1 option:selected");  
	var	belongStatus =options1.val();   //获取下拉框的val值
	var endArpu,startArpu;
	endArpu= $("#m_endArpu").val();
	if(endArpu==null||endArpu==""){
		endArpu=endArpu.toString();
	}
	startArpu= $("#m_startArpu").val();
	if(startArpu==null||startArpu==""){
		startArpu=startArpu.toString();;
	}
	var	rhType = $("#m_rhType").val();
	var ltTypes=$("#m_ltType option:selected"); 
	var ltType = ltTypes.val();
	var netTypes = $("#m_netType option:selected");
	var netType = netTypes.val();
    var person = {	
    			"taskId":nextTaskId,
		    	"accNbr":accNbr,
		    	"status":status,
		    	"belongStatus":belongStatus,
				"endArpu":endArpu,
				"startArpu":startArpu,
				"rhType":rhType,
				"ltType":ltType,
				"netType":netType
    };
    sessionStorage.setItem("person",JSON.stringify(person)); 
 	parent.zhuanpai();        //iframe中子页面 访问父页面
})

//撤回转派			
function chexiao(obj){
	var objid=obj.id; //点击那个获取那个id
	parent.chexi(objid);
}

//点击确认按钮 关闭确认弹窗
$(".c").click(function(){
	$("#tanchuang").hide();
})
