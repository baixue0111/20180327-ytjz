/**
 * Created by hsgeng on 2016/12/14.
 */

function check(){
 	var url="/assist/user/login";
    var username =$("#userid").val();
    if (username=="" || username==null) {
        alert("请输入账号！");
        return;
    }
    var pwd = $('#pwd').val();
    if( pwd==""|| pwd ==null){
    	alert("请输入密码！");
        return;
    }
    var  password = $.md5(pwd); //对密码进行md5加密
    var token ="";
    var os = "web";
    var type=1;
    var request={
	    	param:{
		    	"username":username,
		    	"password":password,
		    	"type":type
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
        success: function(date){
        	if(date.error.code==1){
        		window.location.href='index.html'; 
                var token = date.error.token;
                var salesId = date.data.salesId;
                sessionStorage.setItem("token",token);
        		sessionStorage.setItem("salesId",salesId);   		
        	}else{
                alert(date.error.message);
        	}
        }
	});       
}


