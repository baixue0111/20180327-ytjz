/**
 * Created by hsgeng on 2016/12/15.
 */
//手风琴菜单
$(".menu_head").click(function(){
	var index=$(".menu_head").index(this);
	$(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
	$(this).siblings().removeClass("current");
	$(".efloat").eq(index).addClass("efloa").siblings().removeClass("efloa");
	
});
$(function(){
   	zuoce(); 	//进入页面就获取左侧的当前菜单
	$("#logdown").html(salesId); //登录成功 号码
	
})
//从地址栏获取 
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  decodeURI(r[2]); return null;
// }
// var token = GetQueryString("token");
// var salesId = GetQueryString("salesId");

//每次都要传给后台的     是从登录之后获取的token  os 


// 从sessionStorage 获取
var  token=sessionStorage.getItem("token");
var  salesId=sessionStorage.getItem("salesId");
var os = "web"; 
var taskId;
//左侧当前工单菜单导航栏
function zuoce(){
 	var url="/assist/task/taskTypeTree";
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
			if(data==""||data==undefined||data==null||data=="undefined"){
				location.href='login.html';
			}else{
				if(data.error.code==1){
					$.each(data.data.taskType,function(i,item){
						var  str= '<li class="aa title" name="'+item.netType+'" title="'+item.name+'('+item.doTaskNum+'/'+item.allTaskNum+')" id="'+item.taskId+'">'+item.name+'(<span>'+item.doTaskNum+'</span>/<span>'+item.allTaskNum+'</span>)</li>';
						$("#nav").append(str);
						$("#nav li:first-child").addClass("bb");	
						var taskId= item.taskId
					})
					$("#nav li:nth-child(1)").removeClass('bb')
					//切换二级菜单的内容
					$("#nav li").click(function(){	
						var indexx=$("#nav li").index(this);
						$(this).addClass('bb').siblings().removeClass('bb');//给二级菜单添加样式
						$(".undis").eq(indexx).addClass("dis").siblings().removeClass("dis");
						$("input").attr("value","");//每次获取时  都让input的值是空
						var hqtaskId=$(this).attr("id");   //获取当前工单的菜单   点击每个时候   每个工单的id
						var hqnetType = $(this).attr("name");;
						sessionStorage.setItem("hqtaskId",hqtaskId);
						// console.log(hqnetType);
						sessionStorage.setItem("hqnetType",hqnetType);
						
						// var netType = 
						// 	if("")
						if(hqnetType==1){
							document.getElementById("iframe").src='ma.html';	
						}else{
							document.getElementById("iframe").src='broadband.html';
						}
							
					})		
				}
			}
	    	
        }
	});  
}


function lishi(){
	// if(/\?(.+)/.test(location.search)){
	    document.getElementById("iframe").src='historical.html';
	// }
}
function tongji(){
	// if(/\?(.+)/.test(location.search)){
	    document.getElementById("iframe").src='statistical.html';
	// }
}


//转派工单
function zhuanpai(){
	var hqnetType=sessionStorage.getItem("hqnetType");
	$("#loadingMask1").show();
	$("#SelectAll").attr("checked",false);   //点击转派的时候先让   全选框初始化
   	var url="/assist/task/sendTask";
	if(hqnetType==1){
		var	person = JSON.parse(sessionStorage.getItem("person"));
		var status;
		if(person.status == "-1"){
			status="";
		}else{
			status=person.status;
		}
		var request={
				param:{
					"taskId":person.taskId,
					"accNbr":person.accNbr,
					"status":status,
					"belongStatus":person.belongStatus,
					"endArpu":person.endArpu,
					"startArpu":person.startArpu,
					"rhType":person.rhType,
					"ltType":person.ltType,
					"netType":person.netType,
					"tcName":"",
					"installedArea":"",
					"byGrid":""
				},
				common_param:{
					"token":token,
					"os":"web"
				}
		};
	}else{
		var	person = JSON.parse(sessionStorage.getItem("person"));
		var status;
		if(person.status == "-1"){
			status="";
		}else{
			status=person.status;
		}
		var request={
				param:{
					"taskId":person.taskId,
					"accNbr":"",
					"status":status,
					"belongStatus":person.belongStatus,
					"endArpu":"",
					"startArpu":"",
					"rhType":"",
					"ltType":"",
					"netType":"",
					"tcName":person.tcName,
					"installedArea":person.installedArea,
					"byGrid":person.byGrid
				},
				common_param:{
					"token":token,
					"os":"web"
				}
		};
	}
    $.ajax({
        type : 'post',
        url : url,
        data: {'request':JSON.stringify(request)},
        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data){
			$("#loadingMask1").hide();
        	$("#loginMask").show();
	    	if(data.error.code==1){
	    		$(".dispatch_biao").empty();
				$(".dispatch_lei").empty();
				if(data.data.jobs==""){  		//转派工单为null时，提示么有可以转派的工单
					$("#tanchuang1").show();
					$(".mess1").html("暂无可转派的工单");
					
				}else{
					if(hqnetType==1){
						var strs = '<li>终端类型</li>'+
								'<li>融合类型</li>'+
								'<li>ARPU</li>'+
								'<li>网络类型</li>'+
								'<li>手机号</li>'+
								'<li>全选<input type="checkbox" id="SelectAll"  value="全选" onclick="selectAll();"/></li>';
					$(".dispatch_lei").append(strs);
		    		$.each(data.data.jobs,function(i,item){
		    			$("#dispatch").show();
						var a=[];
						a[0]=item.lt_type;
						a[1]=item.rh_type;
						a[2]=item.cur_income;
						a[3]=item.use_net_type;
						for(var i=0;i<a.length;i++){
							if(a[i]==null || a[i] == undefined){
								a[i]="";
							}
						}
						var dispatchstr='<ul class="dispatch_bia">'+
							        		'<li>'+a[0]+'</li>'+
							        		'<li>'+a[1]+'</li>'+
							        		'<li>'+a[2]+'</li>'+
							        		'<li>'+a[3]+'</li>'+
							        		'<li>'+item.accNbr+'</li>'+
							        		'<li><input type="checkbox" name="xueli" onclick="select_me();" value="'+item.id+'"/></li></ul>';
						 $(".dispatch_biao").append(dispatchstr);
						 $(".dispatch_bia:even").css({'background':'#f3fbff'});
		    		})	
					}else{
						var strs = '<li>开户时间</li>'+
								'<li>产品名称</li>'+
								'<li>装机小区</li>'+
								'<li>对应网格</li>'+
								'<li>宽带/固话账号</li>'+
								'<li>全选<input type="checkbox" id="SelectAll"  value="全选" onclick="selectAll();"/></li>';
						$(".dispatch_lei").append(strs);
						$.each(data.data.jobs,function(i,item){
							$("#dispatch").show();
							var a=[];
							a[0]=item.innetDate;
							a[1]=item.tcName;
							a[2]=item.installedArea;
							a[3]=item.dy_grid;
							for(var i=0;i<a.length;i++){
								if(a[i]==null || a[i] == undefined){
									a[i]="";
								}
							}
							var dispatchstr='<ul class="dispatch_bia">'+
												'<li>'+a[0]+'</li>'+
												'<li>'+a[1]+'</li>'+
												'<li>'+a[2]+'</li>'+
												'<li>'+a[3]+'</li>'+
												'<li>'+item.accNbr+'</li>'+
												'<li><input type="checkbox" name="xueli" onclick="select_me();" value="'+item.id+'"/></li></ul>';
							$(".dispatch_biao").append(dispatchstr);
							$(".dispatch_bia:even").css({'background':'#f3fbff'});
						})	
					}
								
				}
	    	}
        }
	});  
}

//点击X关闭
$(".guanbi").click(function(){
	$("#box").hide();
	$("#dispatch").hide();
	$("#loginMask").hide();
})

//复选框 ,全选    工单
function selectAll(){
	if ($("#SelectAll").attr("checked")) {
		$(":checkbox").attr("checked", true);
	} else {
		$(":checkbox").attr("checked", false);
	}
}
//取消一个复选框  全选对勾取消
function select_me(){ 
	var xl_arr=$('input:[name="xueli"]');
	$.each(xl_arr,function(i){
		if(!$(xl_arr[i]).attr("checked")){
			$("#SelectAll").attr("checked",false);
			return;
		}
	});
}

//复选框选择
$(".xiayibu").click(function(){
	 var checkboxes = document.getElementsByName("xueli");   //找到name 是xueli 的复选框
	var jobsstr = [];  //定义一个空数组
	for(i=0;i<checkboxes.length;i++){   //遍历出 复选框的长度  有多少
    	if(checkboxes[i].checked){  //复选框选择获取value
        	jobsstr.push(checkboxes[i].value); 
    	}
	}
	if(jobsstr.length<=0){
		$("#tanchuang").show();
		$(".mess").html('必须选择一个转派工单才可以进行转派');
		return;
	}else{
		var jobsss=jobsstr.length //选择了几个复选框
	    $.cookie("jobsss",jobsss); 
		$.cookie("jobs",jobsstr);
		sjr();
	}

})

//获取收件人
function sjr(){
   	var url="/assist/task/sendManager";
    var status =0;
   	var queryStr =$("#jsrcha").val();
    $("#dispatch").hide();
    $("#box").show();
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
//返回上一步
$(".shangyibu").click(function(){
	$("#box").hide();
	$("#dispatch").show();
})

//选择转派经理 复选框
$(".sousuozhuan").click(function(){
	var jobsss=$.cookie("jobsss"); //获取转派工单的选择个数
	var selecteds = document.getElementsByName("selected");
	var managersstr= [];
	for(i=0;i<selecteds.length;i++){
    	if(selecteds[i].checked){
        	managersstr.push(selecteds[i].value);
    	}
	}
 	var managers=managersstr.toString();
	if(jobsss<managersstr.length){
		$("#tanchuang").show();
		$(".mess").html("选择转派工单人必须大于选择的转派工单才能进行一键转派，请返回上一步重新选择");
		return;
	}else if(managersstr.length<=0){
		$("#tanchuang").show();
		$(".mess").html("必须选择一个转派工单联系人才能进行下一步");
		return;
	}else{
		$.cookie("managers",managers);
		yjzp();
	}
	
})
//么有选择转派工单    关闭提示
function qdla(){
	$("#tanchuang").hide();
}
//一键转派 提交转派
function yjzp(){
   	var url="/assist/task/sendReport";
    var jobs=$.cookie('jobs'); 
    var managers=$.cookie("managers");
    var request={
	    	param:{
		    	"managers":managers,
		    	"jobs":jobs
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
				$("#box").hide();
	    		$("#tanchuang1").show();
				$(".mess1").html(data.error.message);
	    	}
        }
	});  
}


//撤销转派
var cheid;
function chexi(hqid){
	$("#tan").show();
	$("#loginMask").show();
	cheid=hqid;
}
//不进行转派  关闭弹窗
$(".butt").click(function(){
	$("#tan").hide();
	$("#loginMask").hide();
})

//点击撤回按钮,撤回转派
function cxzp(){
   	var url="/assist/task/callback";
	var id =cheid;
     var request={
	    	param:{
		    	"salesId":salesId,
		    	"id":cheid
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
	    		$("#tanchuang1").show();
	    		$("#tan").hide();
				$(".mess1").html(data.error.message);
	    	}
        }
	});
}
//完成转派关闭页面
$(".queding1").click(function(){
	$("#tanchuang1").hide();
	$("#loginMask").hide();
	right.location.reload(true); //刷新iframe页面
})