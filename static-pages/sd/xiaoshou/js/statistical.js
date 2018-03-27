$(function(){
	chaxuntong();
})
  
//从地址栏获取 
// function GetQueryString(name) {
//     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r!=null)return  decodeURI(r[2]); return null;
// }
//每次都要传给后台的     是从登录之后获取的token  os 
// var token = GetQueryString("token");
// var salesId = GetQueryString("salesId");
var  token=sessionStorage.getItem("token");
var  salesId=sessionStorage.getItem("salesId");
var os = "web"; 


//任务类型列表
function chaxuntong(){
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
        	var str111=
	    			'<option value="-1">全部查询</option>';
	    		$("#selec").append(str111);
	    	$.each(data.data.taskTypeList,function(i,item){					           	
	    		var str11=
	    			'<option value="'+item.ID+'">'+item.NAME+'</option>';
	    		$("#selec").append(str11);
	    		
	    	})	
	    	tongjile();
	    
        }
	});  
}

//数据统计
function tongjile(){
   	var url="/assist/form/show";
    var startDate = $('#datePicker3').val();
    var endDate = $('#datePicker4').val();
   	var options=$("#selec option:selected"); 
   	var	taskType =options.val();
   	var optionsS=$("#selecee option:selected"); 
   	var	belongType =optionsS.val();
   	 var request={
	    	param:{
		    	"startDate":startDate,
		    	"endDate":endDate,
		    	"taskType":taskType,
		    	"belongType":belongType
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
        	$(".zzz").empty();
        	var num=[];
			num[0]=0;
			num[1]=0;
			num[2]=0;
			num[3]=0;
			num[4]=0;
			num[5]=0;
	    	if(data.error.code==1){	
	    		var str15 ='<tr id="statisti">'+
								'<td style="width:3%;"><span>序列</span></td>'+
								'<td><span>任务类型</span></td>'+
								'<td><span>总工单</span></td>'+
								'<td><span>未执行工单</span></td>'+
								'<td><span>执行成功</span></td>'+
								'<td><span>执行失败</span></td>'+
								'<td><span>延迟工单</span></td>'+
								'<td><span>竣工工单</span></td>'+
								'<td><span>执行率<span style="color:red;">(%)</span></span></td>'+
								'<td><span>成功率<span style="color:red;">(%)</span></span></td>'+
								'<td><span>竣工率<span style="color:red;">(%)</span></span></td>'+
							'</tr>';
					$(".statisticalWork").html(str15);
	    		$.each(data.data.form,function(i,item){	
					$(".tong_xian1:even").css({'background':'#f3fbff'});
						//执行率
					var impl=item.total-item.unfinishedNum; // 执行工单=总共单-未执行工单
					var implemen=impl/item.total;
					var implementation;
					if(implemen==0){
						implementation=0;   //么有执行工单   默认执行率为0
					}else{
					 	implementation=(implemen * 100).toFixed(2);  //执行率  保留小数点后面两位小数
					}
					if(isNaN(implementation)==true){
						implementation=0;
					}
	//				成功率
					var Success =item.successfulNum/item.total;
					var successRate;
					if(Success==0){
						successRate=0;
					}else{
					 	successRate=(Success * 100).toFixed(2);
					}
					if(isNaN(successRate)==true){
						successRate=0;
					}
	//				竣工率
					var Completion  =item.compeleteNum/item.total;
					var completionRate;
					if(Completion ==0){
						completionRate=0;
					}else{
					 	completionRate=(Completion * 100).toFixed(2);
					}
					if(isNaN(completionRate)==true){
						completionRate=0;
					}
					var str16='<tr class="stad">'+
								'<td style="width:3%;"><span></span></td>'+
								'<td><span>'+item.taskName+'</span></td>'+
								'<td><span>'+item.total+'</span></td>'+
								'<td><span>'+item.unfinishedNum+'</span></td>'+
								'<td><span>'+item.successfulNum+'</span></td>'+
								'<td><span>'+item.failedNum+'</span></td>'+
								'<td><span>'+item.deferredNum+'</span></td>'+
								'<td><span>'+item.compeleteNum+'</span></td>'+
								'<td><span>'+implementation+'</span></td>'+
								'<td><span>'+successRate+'</span></td>'+
								'<td><span>'+completionRate+'</span></td>'+
							'</tr>'
					$(".statisticalWork").append(str16);
		    		num[0]+=parseInt(item.total); //总共单
					num[1]+=parseInt(item.unfinishedNum); 	
					num[2]+=parseInt(item.successfulNum); 	
					num[3]+=parseInt(item.failedNum); 	
					num[4]+=parseInt(item.deferredNum); 	
					num[5]+=parseInt(item.compeleteNum); 	
	    		})
	    		$(".stad:even").css({'background':'#f3fbff'});	
	    		var len = $('.statisticalWork tr').length;
			        for(var i = 1;i<len;i++){
			            $('.statisticalWork tr:eq('+i+') td:first').text(i);
			    }
//	    		总共单
	     			//总共单的执行率
	     			var zimpl=num[0]-num[1]; // 执行工单=总共单-未执行工单
					var zimplemen=zimpl/num[0];
					var zimplementation;
					if(zimplemen==0){
						zimplementation=0;   //么有执行工单   默认执行率为0
					}else{
					 	zimplementation=(zimplemen * 100).toFixed(2);  //执行率  保留小数点后面两位小数
					}
					if(isNaN(zimplementation)==true){
						zimplementation=0;
					}
					//总共单成功率
					var zSuccess =num[2]/num[0];
					var zsuccessRate;
					if(zSuccess==0){
						zsuccessRate=0;
					}else{
					 	zsuccessRate=(zSuccess * 100).toFixed(2);
					}
					if(isNaN(zsuccessRate)==true){
						zsuccessRate=0;
					}
					//	总共单竣工率
					var zCompletion  =num[5]/num[0];
					var zcompletionRate;
					if(zCompletion ==0){
						zcompletionRate=0;
					}else{
					 	zcompletionRate=(zCompletion * 100).toFixed(2);
					}
					if(isNaN(zcompletionRate)==true){
						zcompletionRate=0;
					}
					var str18='<tr>'+
								'<td style="width:3%;"><span></span></td>'+
								'<td><span>总计</span></td>'+
								'<td><span>'+num[0]+'</span></td>'+
								'<td><span>'+num[1]+'</span></td>'+
								'<td><span>'+num[2]+'</span></td>'+
								'<td><span>'+num[3]+'</span></td>'+
								'<td><span>'+num[4]+'</span></td>'+
								'<td><span>'+num[5]+'</span></td>'+
								'<td><span>'+zimplementation+'</span></td>'+
								'<td><span>'+zsuccessRate+'</span></td>'+
								'<td><span>'+zcompletionRate+'</span></td>'+
							'</tr>';
					$(".statisticalWork").append(str18);
	    	}
        }
	});  
}
