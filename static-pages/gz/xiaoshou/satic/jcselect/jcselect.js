var jcselectPram={
	url:"",
	checkbox:false,
	key:"",
	value:"",
	data:{},
	initInfo:{},
	pram:{},
	idtemp:"",
	initval:"",
	callback:"",
	cols:1,
	type:""
};
$.fn.extend({
	jcselect:function(o){
		jcselectPram.initval=$(this).val();
		if(!$(this).attr("id")){
			$(this).attr("id","temp"+jcselectPram.idtemp);
			jcselectPram.idtemp++;
		}
		if(o.pram){jcselectPram.pram=o.pram;}
		if(o.type!="search"){
			$(this).attr("readonly",true);
			$(this).keydown(function(e){
				return false;
			});
		}
		var idtemp=$(this).attr("id");
		if(o.url){
			$.ajax({
				type: "POST",
			 	url: o.url,
			 	data:jcselectPram.pram,
			  	async: false,
			  	success:function(data){
					var datas=(eval(data.selectData));
					jcselectPram.initInfo[idtemp]=datas;
			  	}
			 });
		}else{
			jcselectPram.initInfo[idtemp]=o.data;
		}
		var datemp=jcselectPram.initInfo[idtemp];
		if(datemp){
			for(var dt=0;dt<datemp.length;dt++){
				if(datemp[dt]!= null && datemp[dt]!= undefined && datemp[dt][o.key]==jcselectPram.initval){
					$(this).val(datemp[dt][o.value]).attr("title",jcselectPram.initval);
				}
			}
			if(o.checkbox){
				var tempKey="";
				var tempValue="";
				var vals=jcselectPram.initval.split(",");
				for(var dt=0;dt<datemp.length;dt++){
					for(var i=0;i<vals.length;i++){
						if(datemp[dt][o.key]==vals[i]){
							$("#jcc"+vals[i]).attr("checked",true);
							tempKey+=vals[i]+",";
							tempValue+=datemp[dt][o.value]+",";
						}
					}
				}
				if(tempKey!=""){tempKey=tempKey.substring(0,tempKey.length-1);}
				if(tempValue!=""){tempValue=tempValue.substring(0,tempValue.length-1);}
				$(this).val(tempValue).attr("title",tempKey).addClass("jcs-input");
			}
		}
		$(this).unbind("focus");
		$(this).addClass("jcselect-input").focus(function(){
			jcselectPram.initval=$(this).attr("title");
			$(".select-block").hide();
			var t=($(this).offset().top+$(this).height()+1);
			if(t+142>pageHeight()){t=$(this).offset().top-142;}
			var l=($(this).offset().left);
			var w=($(this).width()>120)?$(this).width():120;
			var obj=$(this);
			var id=obj.attr("id");
			var name=obj.attr("name");
			jcselectPram.url=o.url;
			jcselectPram.checkbox=o.checkbox;
			jcselectPram.data=o.data;
			jcselectPram.callback=o.callback;
			jcselectPram.key=o.key;
			jcselectPram.value=o.value;
			jcselectPram.cols=o.cols?o.cols:1;
			var addData=function(datas){
				var temp="<div id='"+id+"-select-block' class='select-block'><div class='select-datadiv'><table class='select-tab'>";
				var cos=jcselectPram.checkbox?(jcselectPram.cols+1):jcselectPram.cols;
				temp+="<tr class='jcs_clear' id='"+id+"-clear'><td class='jsc_clear_td' colspan="+cos+" >清除选择</td></tr>";
				for(var i=0;i<datas.length;i++){
					temp+="<tr class=''  onclick='select_choose(this)'>";
					for(var j=0;j<jcselectPram.cols;j++){
						var index=i+j;
						if (datas[index] == null || datas[index] == undefined) {
							continue;
						}
                        var value = datas[index][jcselectPram.value];
                        if (value.length > 30) {
                            value = value.substring(0, 30) + "...";
                        }
						temp+="<td class='select-cont select-tr "+id+"-str' title='"+datas[index][jcselectPram.key]+"'>"+value+"</td>";
						i=i+j;
					}
					temp+="</tr>";
				}
				temp+="</table></div><div class='select-ctrl'>";
				if(o.type=="search"){
					temp+="<input type='button'  value='查找' title='"+idtemp+"' onclick='key_search(this)' />";
				}else{
					temp+="<input type='button' class='jcs_closebtn' />";
				}
				temp+="</div></div>";
				var tobj=$(temp);
				tobj.appendTo(document.body).css({
					position:"absolute",
					top:t+"px",
					left:l+"px",
					"border-left":"1px solid #cccccc",
			        "border-right":"1px solid #cccccc",
			        "border-bottom":"1px solid #cccccc",
					border:"1px solid #dddddd",
					background:"white",
					width:(w*jcselectPram.cols)+"px",
					display:"block"
				});
				$(".jcs_closebtn").click(function(){
					$(".select-block").hide();
				});
				$("#"+id+"-clear").hover( 
					function () {
				    	$(this).addClass("clear-over");
				  	},
				  	function () {
				  		$(this).removeClass("clear-over");
				}).click(function(){
					obj.val("");
					obj.attr("title","");
					$(".select-block").hide();
                    try{eval(jcselectPram.callback);}catch(e){};
                    $(".select-block").hide();
				});
				
				$("."+id+"-str").hover( 
					function () {$(this).addClass("select-over");},
				  	function () {$(this).removeClass("select-over");
				}).click(
					function (){
						if(!jcselectPram.checkbox){
							obj.val($(this).last().text());
							obj.attr("title",$(this).last().attr("title"));
							try{eval(jcselectPram.callback);}catch(e){};
							$(".select-block").hide();
						}
				});
				$(".jcs_okbtn").click(function(){
					var tempids="";
					var tempnames="";
					$("#"+id+"-select-block").find('input[name="jcselect_box"]:checked').each(function(){
						tempids+=$(this).attr("title")+",";
						tempnames+=$(this).parent().next().text()+",";
					});
					tempids=tempids.substring(0,tempids.length-1);
					tempnames=tempnames.substring(0,tempnames.length-1);
					obj.val(tempnames);
					obj.attr("title",tempids);
					try{eval(jcselectPram.callback);}catch(e){};
					$(".select-block").hide();
				});
				if(datemp){
					if(o.checkbox){
						var vals=jcselectPram.initval.split(",");
						for(var dt=0;dt<datemp.length;dt++){
							for(var i=0;i<vals.length;i++){
								if(datemp[dt][o.key]==vals[i]){
									$("#jcc"+vals[i]).attr("checked",true);
								}
							}
						}
					}
				}
			};
			if(document.getElementById(id+"-select-block")){
				document.getElementById(id+"-select-block").style.display="block";
			}else{
				addData(jcselectPram.initInfo[id]);
			}
			if(o.type=="search"){
				var search_temp=$(this).val();
				if(search_temp!=""){
					$(".select-cont").each(function(){
						if(($(this).text()).indexOf(search_temp)==-1){
							$(this).hide();
						}else{
							$(this).show();
						}
					});
				}else{
					$(".select-cont").show();
				}
				$(this).keyup(function (){
//					var t=$(this).val();
//					$(".select-cont").each(function(){
//						if(($(this).text()).indexOf(t)==-1){
//							$(this).hide();
//						}else{
//							$(this).show();
//						}
//					});
				});
			}
		});
		
	},
	jcselectInit:function(o){
		jcselectPram.initval=$(this).val();
		if(!$(this).attr("id")){
			$(this).attr("id","temp"+jcselectPram.idtemp);
			jcselectPram.idtemp++;
		}
		if(o.pram){jcselectPram.pram=o.pram;}
		var idtemp=$(this).attr("id");
		if(o.url){
			$.ajax({
				type: "POST",
			 	url: o.url,
			 	data:jcselectPram.pram,
			  	async: false,
			  	success:function(data){
					var datas=(eval(data.selectData));
					jcselectPram.initInfo[idtemp]=datas;
			  	}
			 });
		}else{
			jcselectPram.initInfo[idtemp]=o.data;
		}
		var datemp=jcselectPram.initInfo[idtemp];
		if(datemp){
			if(o.checkbox){
				var tempKey="";
				var tempValue="";
				for(var dt=0;dt<datemp.length;dt++){
					var vals=jcselectPram.initval.split(",");
					for(var i=0;i<vals.length;i++){
						if(datemp[dt][o.key]==vals[i]){
							tempKey+=vals[i]+",";
							tempValue+=datemp[dt][o.value]+",";
						}
					}
				}
				
				if(tempKey!=""){tempKey=tempKey.substring(0,tempKey.length-1)}
				if(tempValue!=""){tempValue=tempValue.substring(0,tempValue.length-1)}
				$(this).val(tempValue).attr("title",tempKey).addClass("jcs-input");
			}else{
				for(var dt=0;dt<datemp.length;dt++){
					if(datemp[dt][o.key]==jcselectPram.initval){
						$(this).val(datemp[dt][o.value]).attr("title",jcselectPram.initval).addClass("jcs-input");
					}
				}
			}
		}
	}
})

function select_choose(obj){
	var o=$(obj);
	var c_box=o.children().first().children().last();
	if(c_box.attr("checked")==true){
		c_box.attr("checked",false);
	}else{
		c_box.attr("checked",true);
	}
}
function key_search(o){
	var t=$("#"+o.title).val();
	$(".select-cont").each(function(){
		if(($(this).text()).indexOf(t)==-1){
			$(this).hide();
		}else{
			$(this).show();
		}
	});
}
