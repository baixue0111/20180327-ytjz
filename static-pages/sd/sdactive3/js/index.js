/**
 * Created by mysheng on 2016/06/04.
 */
$(function(){
    drawHistory();
})
/*滚动信息*/
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
    var rotateFn = function (awards, angles, txt) {
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle: 0,
            animateTo: angles +3600,
            duration: 3000,
            callback: function () {
                setTimeout(function(){
                    success(txt,status);
                },500);

                bRotate = !bRotate;
            }
        })
    };
    if(bRotate)return;
    var item =status;
    switch (status) {
        case 0:
            rotateFn(0, 330, msg);
            break;
        case 1:
            rotateFn(1, 30, msg);
            break;
        case 2:
            rotateFn(2, 90, msg);
            break;
        case 3:
            rotateFn(3, 150, msg);
            break;
        case 4:
            rotateFn(4, 210, msg);
            break;
        case 5:
            rotateFn(5, 270, msg);
            break;

    }
   console.log(item);
}


/*抽奖*/
function draw(){
    var phoneNo= GetQueryString("phoneno");
    var url="/lottery/lottery/draw?phoneNo="+phoneNo;
    $.post(url,{},function(data){
       var status=data.type;
        var msg=data.msg;
        if(status==null){
            error(data.msg);
        }else{
            rocate(status,msg);
        }
    }).error(function(){
       error("对不起，抽奖失败请稍后再试!")
    });
   //var status=1+Math.floor(Math.random()*6);
   //rocate(status);

}
/* 领取*/
function receice(){
    var phoneNo= GetQueryString("phoneno");
    var url="/lottery/lottery/get?phoneNo="+phoneNo+"&status=1";

    $.post(url,{},function(data){
        if(data.code==1){
            drawHistory();
        }
        loginclose();
    }).error(function(){
        error("对不起，领取失败请稍后再试!")
    })
}
/* 放弃*/
function abandon(){
    var phoneNo= GetQueryString("phoneno");
    var url="/lottery/lottery/get?phoneNo="+phoneNo+"&status=0";
    $.post(url,{},function(data){
        if(data.code==1){
            drawHistory();
        }
        loginclose();
    }).error(function(){
        error("对不起，领取失败请稍后再试!")
    })
}
/*获取地址栏参数的值*/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/*抽奖历史*/
function drawHistory(){
    var phoneNo= GetQueryString("phoneno");
    var url="/lottery/lottery/history?phoneNo="+phoneNo;
    $.post(url,{},function(data){
       if(data.history){
           $("#prizeName").html(data.history.prizeName);
           $("#prizeTime").html(data.hall.businessTime);
           $("#address").html(data.hall.name);
           $("#prizeAddress").html(data.hall.address);
           if(data.history.status=="0"){
               $("#aba").html("(已放弃)");
           }

       }
    }).error(function(){
        error("对不起，获取数据失败请稍后再试!")
    })
}

/*成功提示信息*/
function success(message,status){
    if(status==0){
        $('#success').html('<p class="success">'+message+'</p>');
        $("#receice").hide();
        $("#confirm").show();
    }else{
        $('#success').html('<p class="success">'+message+'</p>');
        $("#receice").show();
        $("#confirm").hide();
    }
    $("#load").show();
    $("#loginStr").show();

}
/*错误提示信息*/
function error(message){
    $('#success').html('<p class="success">'+message+'</p>');
    $("#receice").hide();
    $("#confirm").show();
    $("#load").show();
    $("#loginStr").show();
}
/*关闭登录框*/
function loginclose(){
    $("#load").hide();
    $("#loginStr").hide();
}

