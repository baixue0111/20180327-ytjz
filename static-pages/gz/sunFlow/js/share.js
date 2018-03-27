
var param,thisMon,myNum,myFlow;
$(function () {
	param=GetQueryString("param");
	thisMon=param.split(",")[0];  // 本月份
	myNum=param.split(",")[1];   //本月排名
	myFlow=param.split(",")[2];  //本月使用流量


	if (thisMon == "" || thisMon == "无" || thisMon == null || thisMon == undefined) {
		$("#myMon").html("无");
	}else{
		$("#myMon").html(thisMon);
	}

	if (myNum == "" || myNum == "无" || myNum == null || myNum == undefined) {
		$("#myNum").html("无");
	}else{
		$("#myNum").html(myNum);
	}
	if (myFlow == "" || myFlow == "无" || myFlow == null || myFlow == undefined) {
		$("#myflow").html("无");
	}else{
		$("#myflow").html(myFlow + 'M');
	}
	
	
})
