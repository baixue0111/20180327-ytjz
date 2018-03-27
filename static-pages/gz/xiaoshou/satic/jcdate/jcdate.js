var jcdatePram={
	activeobj:null,
	time:false,
	second:false,
	nowdate:"",
	callBack:""
};
$.fn.extend({
	jcdate:function(o){
		$(this).attr("readonly",true);
		$(this).keydown(function(e){
			return false;
		});
		$(this).addClass("jcdate_input").click(function(){
			$("#jcdateplan").remove();
			jcdatePram.activeobj=this;
			if(o){
				jcdatePram.time=o.time?o.time:false;
				jcdatePram.second=o.second?o.second:false;
				jcselectPram.callBack=o.callBack;
			}
			var t=($(this).offset().top+$(this).height()+1);
			if(jcdatePram.time=="only"){
				if(t+30>pageHeight()){t=$(this).offset().top-35;}
			}else{
				if(t+170>pageHeight()){t=$(this).offset().top-175;}
			}
			var l=($(this).offset().left);

			$(createJcdateDiv()).appendTo(document.body).css({
				position:"absolute",
				top:t+"px",
				left:l+"px",
				width:"175px",
				background:"#fafafa",
				border:"1px solid #dddddd",
				display:"none",
				filter:"alpha(opacity=1)",
				opacity:"1"
			}).show();
			$(".jcdate_time").focus(function(){
				this.select();
			});
			var d=new Date();
			$("#jcdate_year").val(d.getFullYear());
			$("#jcdate_month").val(parseInt(d.getMonth())+1);
			getMonthDays();
		});
	},
	//只显示年月
	jcdateEx:function(o){
		$(this).attr("readonly",true);
		$(this).keydown(function(e){
			return false;
		});
		jcdatePram.time=true;
		$(this).addClass("jcdate_input").focus(function(){
			$("#jcdateplan").remove();
			jcdatePram.activeobj=this;
			if(o){
				jcdatePram.time=o.time?o.time:false;
				jcdatePram.second=o.second?o.second:false;
			}
			var t=($(this).offset().top+$(this).height()+1);
			// if(jcdatePram.time=="only"){
			// 	if(t+30>pageHeight()){t=$(this).offset().top-35;}
			// }else{
			// 	if(t+170>pageHeight()){t=$(this).offset().top-175;}
			// }
			var l=($(this).offset().left);

			$(createJcdateDivEx()).appendTo(document.body).css({
				position:"absolute",
				top:t+"px",
				left:l+"px",
				width:"175px",
				background:"#fafafa",
				border:"1px solid #dddddd",
				display:"none",
				filter:"alpha(opacity=1)",
				opacity:"1"
			}).show();
			$(".jcdate_time").attr("readonly",true).css({background:"#eeeeee"});
			var d=new Date();
			$("#jcdate_year").val(d.getFullYear());
			$("#jcdate_month").val(parseInt(d.getMonth())+1);
		});
	}
});
function createJcdateDivEx(){
	var da=new Date();
	var temp="<div class='jcdate_content_div' id='jcdateplan'>";
	if(jcdatePram.time!="only"){
		temp+="<div class='jcdate_ymd'>";
		temp+="<div class='jcdate_last'><input type='button' onclick='lastMonth()' class='jcdate_last_btn' value=''></div>";
		temp+="<div class='jcdate_ym'><input type='text' id='jcdate_year' size=4 maxlength=4 value="+da.getFullYear()+">年";
		temp+="<input type='text' id='jcdate_month' readonly size=2 maxlength=2 value="+(da.getMonth()+1)+">月";
		//temp+="<input type='text' id='jcdate_day' readonly size=2 maxlength=2 value=1 >日"
		temp+="</div>";
		temp+="<div class='jcdate_last'><input type='button' onclick='nextMonth()' class='jcdate_next_btn'  value=''></div>";
		temp+="</div>";
	}	
	temp+="<div class='jcdate_bottom'>";
//	if(jcdatePram.time){
		temp+="<div class='jcdate_time_block'><div class='jcdate_time_div'>";
		//temp+="<input type='text' id='jcdate_hour' onblur='jcdate_hour_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />:";
		//temp+="<input type='text' id='jcdate_mini' onblur='jcdate_mini_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />";
		if(!jcdatePram.second){
			//temp+=":<input type='text' id='jcdate_sec' onblur='jcdate_sec_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />";
		}
		temp+="</div><div class='jcdate_ok jcdate_btn' onclick='jcdatetimechooseEx()'>确定</div></div>";
//	}else{
//		temp+="<div class='jcdate_time_block'></div>";
//	}
	temp+="<div class='jcdate_clear jcdate_btn' onclick='jcdateClear()'>清空</div>";
	temp+="<div class='jcdate_close'><input type='button' onclick='jcdateClose()' class='jcdate_close_btn' value=''></div>";
	temp+="</div></div>";
	return temp;
}
function jcdatetimechooseEx(){
	var y=$("#jcdate_year").val();
	var m=$("#jcdate_month").val();
	//var d=$("#jcdate_day").val();
	if(isNaN(y)||y==""){
		alert("年份错误!");
		return;
	}
	$(jcdatePram.activeobj).val(y+"-"+m);
	jcdateClose();
}
function createJcdateDiv(){
	var da=new Date();
	var temp="<div class='jcdate_content_div' id='jcdateplan'>";
	if(jcdatePram.time!="only"){
		temp+="<div class='jcdate_ymd'>";
		temp+="<div class='jcdate_last'><input type='button' onclick='lastMonth()' class='jcdate_last_btn' value=''></div>";
		temp+="<div class='jcdate_ym'><input type='text' id='jcdate_year' size=4 maxlength=4 value="+da.getFullYear()+">年";
		temp+="<input type='text' id='jcdate_month' size=2 maxlength=2 value="+(da.getMonth()+1)+">月</div>";
		temp+="<div class='jcdate_last'><input type='button' onclick='nextMonth()' class='jcdate_next_btn'  value=''></div>";
		temp+="</div>";
		temp+="<div class='jcdate_main'><table class='jcdate_content_tab'>";
		temp+="<tr class='jcdate_th'><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>";
		for(var i=0;i<6;i++){
			temp+="<tr>";
			for(var j=0;j<7;j++){
				var num=i*7+j;
				temp+="<td id='jcdate"+num+"' class='jcdatetd'>&nbsp;</td>";
			}
			temp+="</tr>";
		}
		temp+="</table></div>";
	}	
	temp+="<div class='jcdate_bottom'>";
	if(jcdatePram.time){
		temp+="<div class='jcdate_time_block'><div class='jcdate_time_div'>";
		temp+="<input type='text' id='jcdate_hour' onblur='jcdate_hour_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />:";
		temp+="<input type='text' id='jcdate_mini' onblur='jcdate_mini_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />";
		if(!jcdatePram.second){
			temp+=":<input type='text' id='jcdate_sec' onblur='jcdate_sec_blur()' class='jcdate_time' size=2 maxlength=2 value='00' />";
		}
		temp+="</div><div class='jcdate_ok jcdate_btn' onclick='jcdatetimechoose()'>确定</div></div>";
	}else{
		temp+="<div class='jcdate_time_block'></div>";
	}
	temp+="<div class='jcdate_clear jcdate_btn' onclick='jcdateClear()'>清空</div>";
	temp+="<div class='jcdate_close'><input type='button' onclick='jcdateClose()' class='jcdate_close_btn' value=''></div>";
	temp+="</div></div>";
	return temp;
}
function jcdate_hour_blur(){
	if($("#jcdate_hour").val()>23){
		$("#jcdate_hour").focus().css({border:"1px solid #FFCC99"});
		return false;
	}else{
		$("#jcdate_hour").css({border:"1px solid #248ef4"});
		if($("#jcdate_hour").val().length==1){
			$("#jcdate_hour").val("0"+$("#jcdate_hour").val());
		}
		if($("#jcdate_hour").val()==""){
			$("#jcdate_hour").val("00");
		}
		return true;
	}
}
function jcdate_mini_blur(){
	if($("#jcdate_mini").val()>59){
		$("#jcdate_mini").focus().css({border:"1px solid #FFCC99"});
		return false;
	}else{
		$("#jcdate_mini").css({border:"1px solid #248ef4"});
		if($("#jcdate_mini").val().length==1){
			$("#jcdate_mini").val("0"+$("#jcdate_mini").val());
		}
		if($("#jcdate_mini").val()==""){
			$("#jcdate_mini").val("00");
		}
		return true;
	}
}
function jcdate_sec_blur(){
	if($("#jcdate_sec").val()>59){
		$("#jcdate_sec").focus().css({border:"1px solid #FFCC99"});
		return false;
	}else{
		$("#jcdate_sec").css({border:"1px solid #248ef4"});
		if($("#jcdate_sec").val().length==1){
			$("#jcdate_sec").val("0"+$("#jcdate_sec").val());
		}
		if($("#jcdate_sec").val()==""){
			$("#jcdate_sec").val("00");
		}
		return true;
	}
}
function jcdateClear(){
	$(jcdatePram.activeobj).val("");
	jcdateClose();
	try{eval(jcselectPram.callBack);}catch(e){};
}
function jcdatetimechoose(){
	if(!jcdatePram.second){
		if(jcdate_hour_blur()&&jcdate_mini_blur()&&jcdate_sec_blur()){
			
		}else{
			alert("时间格式错误!");
			return;
		}
		var nowtime=$("#jcdate_hour").val()+":"+$("#jcdate_mini").val()+":"+$("#jcdate_sec").val();
	}else{
		var nowtime=$("#jcdate_hour").val()+":"+$("#jcdate_mini").val();
	}
	
	if(jcdatePram.time=="only"){
		$(jcdatePram.activeobj).val(nowtime);
	}else{
		$(jcdatePram.activeobj).val(jcdatePram.nowdate+" "+nowtime);
	}
	jcdateClose();
	try{eval(jcselectPram.callBack);}catch(e){};
}
function getMonthDays(){
	$(".jcdatetd").html("&nbsp;");
	var y=$("#jcdate_year").val();
	var m=$("#jcdate_month").val();
	var n=parseInt(m,10)+1;
	if(m=="12"){
		n=1;
	}
	if (m < 10){
		m = "0"+m;
	}
    var days = new Date((new Date(y+"/"+(n)+"/1").getTime()-1000*60*60*24)).getDate();
	var ds= new Date(y+"/"+m+"/01").getDay();
	var da=new Date();
	var nowday1;
	$(".jcdatechoose").removeClass("jcdatechoose");
	if(da.getFullYear()==y&&(da.getMonth()+1)==m){
		var nowday=da.getDate();
		var m2=da.getMonth()+1;
		if (m2 < 10){
			m2 = "0"+m2;
		}
		if (nowday < 10){
            nowday1 = "0"+nowday;
		}
		jcdatePram.nowdate=da.getFullYear()+"-"+(m2)+"-"+nowday1;
		$("#jcdate"+(nowday+ds-1)).addClass("jcdatechoose");
	}
	for(var i=0;i<days;i++){
        var j;
        if (i < 9 ){
        	j = i+1;
            j = "0" + j;
        }else {
        	j = i+1;
		}
		$("#jcdate"+(i+ds)).text(i+1).hover(
			function () {
		    	$(this).addClass("jcdatetdover");
		  	},
		  	function () {
		  		$(this).removeClass("jcdatetdover");
		  	}
		).attr("title",y+"-"+m+"-"+(j)).click(function(){
			if(jcdatePram.time){
				$(".jcdatetd").removeClass("jcdatechoose");
				$(this).addClass("jcdatechoose");
				jcdatePram.nowdate=$(this).attr("title");
			}else{
				$(jcdatePram.activeobj).val($(this).attr("title"));
				jcdateClose();
			}
		});
	}
}

function lastMonth(){
	if(isNaN($("#jcdate_month").val())||$("#jcdate_month").val()==""){
		alert("月份错误!");
		return;
	}
	if(isNaN($("#jcdate_year").val())||$("#jcdate_year").val()==""){
		alert("年份错误!");
		return;
	}
	var m=parseInt($("#jcdate_month").val())-1;
	if(m<1){
		m=12;
		$("#jcdate_year").val(parseInt($("#jcdate_year").val())-1);
	}
	$("#jcdate_month").val(m);
	getMonthDays();
}
function nextMonth(){
	if(isNaN($("#jcdate_month").val())||$("#jcdate_month").val()==""){
		alert("月份错误!");
		return;
	}
	if(isNaN($("#jcdate_year").val())||$("#jcdate_year").val()==""){
		alert("年份错误!");
		return;
	}
	var m=parseInt($("#jcdate_month").val())+1;
	if(m>12){
		m=1;
		$("#jcdate_year").val(parseInt($("#jcdate_year").val())+1);
	}
	$("#jcdate_month").val(m);
	getMonthDays();
}
function jcdateClose(){
	$("#jcdateplan").hide();
}