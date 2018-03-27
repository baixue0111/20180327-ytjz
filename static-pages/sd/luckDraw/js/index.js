/*
 * 山东抽奖 
 */

function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var phone=GetQueryString('numer');
$(function(){
    selMyDraw();
    luckyList();

})
// 我的奖品
 function selMyDraw(){
    var  url='/sda2/luckDraw/selMyDraw';
	var phone=GetQueryString('numer');
    var param={};
	param["phone"]=phone;	
    $.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
                if(data.code==1){
                    if(data.lucky[0].LUCKY_CONTENT=='未中奖'){
                        $(".myPrize").html('<P>很遗憾：您'+data.lucky[0].LUCKY_CONTENT+'</P>');
                    }else{
                        $(".myPrize").html('<P>恭喜您获得：'+data.lucky[0].LUCKY_CONTENT+'</P>');
                    }
                }else{
                    $(".myPrize").html(data.message);
                }
        	}
    })
}
// 中奖名单 
 function luckyList(){
    var  url='/sda2/luckDraw/luckyList';
	var phone=GetQueryString('numer');
    var param={};
	param["phone"]=phone;	
    $.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
               if(data.lucky==null||data.lucky==""||data.lucky==undefined||data.lucky=="undefined"){
                   $(".list").html('暂无中奖信息');
               }else{
                    $.each(data.lucky,function(i,item){
                        var phone =item.LUCKY_PHONE;
                        var cont=item.LUCKY_CONTENT;
                        var historystr='<li class="com"><span>'+phone+'</span><span>'+cont+'</span></li>';
                        $("#history ul").append(historystr);
	
                    })
               }
        	}
    })
}



/*
 * 中奖名单滚动
 */
var wait = 60;
var area = document.getElementById('history');
var con1 = document.getElementById('con1');
var con2 = document.getElementById('con2');
var speed = 50;
area.scrollTop = 0;
con2.innerHTML = con1.innerHTML;
function scrollUp(){
    if(area.scrollTop >= con1.scrollHeight) {
        area.scrollTop = 0;
    }else{
        area.scrollTop ++;
    }
}
var myScroll = setInterval("scrollUp()",speed);
area.onmouseover = function(){
    clearInterval(myScroll);
}
area.onmouseout = function(){
    myScroll = setInterval("scrollUp()",speed);
}



// 抽奖
function rocate(status,msg){
    var rotateTimeOut = function () {
        $('#rotate').rotate({
            angle: 0,
            animateTo: 2160,
            duration: 8000,
            callback: function () {
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;
    var rotateFn = function (awards, angles, txt) { //awards:奖项，angle:奖项对应的角度
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles +3600,
            duration: 3000,
            callback: function () {
                setTimeout(function(){
                	$('#loginMask').show();
					$("#login").show();
					$('.succes').html(msg);
                    drow_flag=true;   //抽奖旋转结束后  判断他是drow_flag=true 
                    selMyDraw();
                    luckyList();
                },500);

                bRotate = !bRotate;
            }
        })
    };
    if(bRotate)return;
    var item =status;
    // alert(111);
    switch (item) {
        
         case 0:
            rotateFn(0, 70, '1GB省内流量');
            break;
        case 1:
            rotateFn(1, 144, '5000棒豆');
            break;
        case 2:
            rotateFn(2, 216, '1000棒豆');
            break;
        case 3:
            rotateFn(3, 288, '500棒豆');
            break;
        case 5:
            rotateFn(5, 50, '200棒豆');
            break;
    }
}
var drow_flag=true;
function draw(){
	if(!drow_flag)return;
	drow_flag=false;
    var  url='/sda2/luckDraw/lucky';
	var phone=GetQueryString('numer');
    var param={};
	param["phone"]=phone;	
    $.ajax({
			type:"post",
			url:url,
			data: JSON.stringify(param),
			dataType: 'json',
	        contentType:'application/json;charset=UTF-8',
	        success:function(data){
                if(data.code ==0 || data.code ==1 || data.code == 2){
                    $('#loginMask').show();
					$("#login").show();
					$('.succes').html('<p class="text-align: center;">'+data.message+'</p>');
                    drow_flag=true;
                     console.log(drow_flag);
                }else{
                    var prizeId=data.prizeId;
                    if(prizeId==5){
                        msg= '<div class="lottery"><span style="color:red;">恭喜您，</span>获得'+data.prize+'<br/>获赠流量预计三个工作日充值到账，请耐心等待。</div>';
                    }
			        rocate(prizeId,msg);	
                    drow_flag=true;
                     console.log(drow_flag);
                }
            },
            error:function(){
	        	$('#loginMask').show();
                $("#login").show();
                $('.succes').html('<p class="text-align: center;">链接服务器失败！</p>');
                drow_flag=true;
        	}
    })
}

loginClose = function(){
	$('#loginMask').hide();
	$("#login").hide();
}
