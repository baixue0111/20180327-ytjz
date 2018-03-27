var jcselectPram={
	url:"",
	checkbox:false,
	key:"",
	value:"",
	data:{},
	initInfo:{},
	pram:{},
	idtemp:0,
	initval:"",
	callback:"",
	cols:1
};
$.fn.extend({
	jcselect:function(o){
		var datas="";
		if(o.url){
			$.ajax({type: "POST",url: o.url,data:jcselectPram.pram,async: false,
			  	success:function(data){
					var datas=(eval(data.selectData));
					jcselectPram.initInfo[idtemp]=datas;
			  	}
			 })
		}else{
			jcselectPram.initInfo[idtemp]=o.data;
		}
	}
})

$.fn.extend({
	jcselect1:function(o){
		jcselectPram.initval=$(this).val();
		if(!$(this).attr("id")){
			$(this).attr("id","temp"+jcselectPram.idtemp);
			jcselectPram.idtemp++;
		}
		if(o.pram){jcselectPram.pram=o.pram}
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
			 })
		}else{
			jcselectPram.initInfo[idtemp]=o.data;
		}
		var datemp=jcselectPram.initInfo[idtemp];
		if(datemp){
			for(var dt=0;dt<datemp.length;dt++){
				if(datemp[dt][o.key]==jcselectPram.initval){
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
				if(tempKey!=""){tempKey=tempKey.substring(0,tempKey.length-1)}
				if(tempValue!=""){tempValue=tempValue.substring(0,tempValue.length-1)}
				$(this).val(tempValue).attr("title",tempKey).addClass("jcs-input");
			}
		}
		$(this).unbind("focus");
		$(this).attr("readonly","true").addClass("jcselect-input").focus(function(){
			jcselectPram.initval=$(this).attr("title");
			$(".select-block").hide();
			var t=($(this).offset().top+$(this).height()+3);
			if(t+140>pageHeight()){t=$(this).offset().top-145;}
			var l=($(this).offset().left);
			var w=($(this).width());
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
				temp+="<tr class='jcs_clear'><td class='jsc_clear_td' colspan="+cos+" >清除选择</td></tr>"
				
				
				for(var i=0;i<datas.length;i++){
					temp+="<tr class=''  onclick='select_choose(this)'>";
					if(jcselectPram.checkbox){
						temp+="<td class='select-box'><input type=checkbox id='jcc"+datas[i][jcselectPram.key]+"'  name='jcselect_box' onclick='select_chooseTemp(this)' title="+datas[i][jcselectPram.key]+"></td>"
					}
					for(var j=0;j<jcselectPram.cols;j++){
						var index=i+j;
						temp+="<td class='select-cont select-tr "+id+"-str' title='"+datas[index][jcselectPram.key]+"'>"+datas[index][jcselectPram.value]+"</td>";
						i=i+j;
					}
					temp+="</tr>";
				}
				
				
				temp+="</table></div><div class='select-ctrl'>";
				if(jcselectPram.checkbox){
					temp+="<input type='button' class='jcs_okbtn' />";
				}
				temp+="<input type='button' class='jcs_closebtn' />";
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
				})
				$(".jcs_closebtn").click(function(){
					$(".select-block").hide();
				});
				$(".jcs_clear").hover( 
					function () {
				    	$(this).addClass("clear-over");
				  	},
				  	function () {
				  		$(this).removeClass("clear-over");
				}).click(function(){
					obj.val("");
					obj.attr("title","");
					$(".select-block").hide();
				})
				
				$("."+id+"-str").hover( 
					function () {$(this).addClass("select-over");},
				  	function () {$(this).removeClass("select-over");
				}).click(
					function (){
						if(!jcselectPram.checkbox){
							obj.val($(this).last().text());
							obj.attr("title",$(this).last().attr("title"));
							try{eval(jcselectPram.callback)}catch(e){};
							$(".select-block").hide();
						}
				});
				
				$(".jcs_okbtn").click(function(){
					var tempids="";
					var tempnames="";
					$("#"+id+"-select-block").find('input[name="jcselect_box"]:checked').each(function(){
						tempids+=$(this).attr("title")+",";
						tempnames+=$(this).parent().next().text()+",";
					})
					tempids=tempids.substring(0,tempids.length-1);
					tempnames=tempnames.substring(0,tempnames.length-1);
					obj.val(tempnames);
					obj.attr("title",tempids);
					try{eval(jcselectPram.callback)}catch(e){};
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
			}
			if(document.getElementById(id+"-select-block")){
				document.getElementById(id+"-select-block").style.display="block";
			}else{
				addData(jcselectPram.initInfo[id]);
			}
		})
		
	},
	jcselectInit:function(o){
		jcselectPram.initval=$(this).val();
		if(!$(this).attr("id")){
			$(this).attr("id","temp"+jcselectPram.idtemp);
			jcselectPram.idtemp++;
		}
		if(o.pram){jcselectPram.pram=o.pram}
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
			 })
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
