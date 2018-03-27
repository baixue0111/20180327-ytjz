$(function(){	
	pointRecord();
})
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}



pointRecord = function(){
	var openId=GetQueryString('openId');
	var url='/weixin/e_book/help';
	var param={};
	param["openId"]=openId;	
	$.ajax({
		type:'post',
		url:url,
		data: JSON.stringify(param),
//			data:{"openId":openId},
		dataType: 'json',
        contentType:'application/json;charset=UTF-8',
        success:function(data){
        	var help=data.helpHistory;
        	if (help == "" || help == null || help == undefined) {
				$(".array").html('<p style="width:100%;text-align: center;margin-top: 36%;">暂无好友点赞，赶快邀请好友参与点赞 ...</p>');
   			}else{
        		$.each(help,function(i,item){
        			var a=[]; //定义一个空数组
					a[0]=item.OPENID;
					for(var i=0;i<a.length;i++){
						if(a[i]==null){
					      	a[i]="";
					    }
					}
        			var  str='<li><span>'+item.CREATE_TIME+'</span><span>'+a[0]+'</span><span>'+item.CHARM_VALUE+'</span></li>';
        			$(".array").append(str);

        		})
        		
        	}

        }
	})  
}
