
//推荐机型详细信息
var param;
var sz_param;
var getProductId;
//var getopenId;
var openId_value;
var phoneName;

$(function(){
    param=GetQueryString("param");
    sz_param=param.split(",");
    getProductId=sz_param[0];
    //openId_value=sz_param[2];
    openId_value=sz_param[1];

    tj_message(); //推荐机型信息
    ownModel();   // 用户机型信息
    manufacturerList(); // 获取厂商列表

    $("#facturer").change(function(){
        var change_cs=$("#facturer").find("option:selected").val();
            $("#err_message").html("");
        modelVersionList(change_cs);  //获取机型列表

    }); 

    $("#VersionList").change(function(){   
        $("#err_message").html("");

    }); 
})
//获取url
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


//推荐机型
function tj_message(){
    var url="/weixin/model/recomm";
    $.post(url,{"productId":getProductId},function(data){
        if (data.status==1&&data.code==1) {
            var phone_type=data.model.manufacturer;  // 手机类型
            var screen_size=data.model.screen_size;  //屏幕尺寸
            var screen_p=data.model.screen_proportion;  // 屏幕占比
            var screen_r=data.model.screen_resolution;  //屏幕分辨率
            var phone_cpu=data.model.cpu;   // CPU
            var phone_ram=data.model.ram;  // 内存
            var phone_rom=data.model.rom;  //存储
            var front=data.model.front_camera_pix;   //前置摄像头
            var rear=data.model.rear_camera_pix;   //后置摄像头
            var battery=data.model.battery_capacity;   // 电池容量
            var network=data.model.network_type;   // 网络类型
            var fin=data.model.fingerprint;  //指纹识别
            var service=data.model.service_feature;  // 服务特色
            var img_url=data.model.logo_url;  // 手机图片
            var phone_name=data.model.model_version;  //机型
            var phone_fee=data.model.fee;  // 价钱
            var original_fee=data.model.original_fee;  //原价

            $("#original_fee").html("￥"+original_fee);
            $(".con1_left img").attr('src',img_url);
            $(".phone_fee").html("￥"+phone_fee);
            $(".phone_versionl").html(phone_type+" "+phone_name);
            $(".phone_type_left").html(phone_type);
            $(".screen_left").html(screen_size);
            $(".screen_proL").html(screen_p);
            $(".resolution_left").html(screen_r);
            $(".cpu_left").html(phone_cpu);
            $(".ram_left").html(phone_ram);
            $(".rom_left").html(phone_rom);
            $(".front_left").html(front);
            $(".rear_left").html(rear);
            $(".battery_left").html(battery);
            $(".network_left").html(network);
            $(".fingerprint_left").html(fin);
            $(".service_left").html(service);
        }
    })
}


//获取用户机型详细信息
function ownModel(){
    var url="/weixin/model/ownModel";
    $.post(url,{"openId":openId_value,"recommProductId":getProductId},function(data){
        if (data.status==1&&data.code==1) {

            var phone_type=data.model.phone_type;  // 手机类型
                screen_size=data.model.screen_size;  //屏幕尺寸
                screen_p=data.model.screen_proportion;  // 屏幕占比
                screen_r=data.model.screen_resolution;  //屏幕分辨率
                phone_cpu=data.model.cpu;   // CPU
                phone_ram=data.model.ram;  // 内存
                phone_rom=data.model.rom;  //存储
                front=data.model.front_camera_pix;   //前置摄像头
                rear=data.model.rear_camera_pix;   //后置摄像头
                battery=data.model.battery_capacity;   // 电池容量
                network=data.model.network_type;   // 网络类型
                fin=data.model.fingerprint;  //指纹识别
                service=data.model.service_feature;  // 服务特色
                img_url=data.model.logo_url;  // 手机图片
                phone_name=data.model.model_version;  //机型
                phone_manufacturer=data.model.manufacturer
                phone_fee=data.model.fee;  // 价钱
                phoneName=phone_manufacturer+" "+phone_name;

            if(img_url==""||img_url==null||img_url==undefined){
                $(".con1_right img").attr('src',"image/db2.jpg");
            }else{
                $(".con1_right img").attr('src',img_url);
            }

            $(".phone_versionr").html(phoneName);
            $(".phone_type_right").html(phone_type);
            $(".screen_right").html(screen_size);
            $(".screen_proR").html(screen_p);
            $(".resolution_right").html(screen_r);
            $(".cpu_right").html(phone_cpu);
            $(".ram_right").html(phone_ram);
            $(".rom_right").html(phone_rom);
            $(".front_right").html(front);
            $(".rear_right").html(rear);
            $(".battery_right").html(battery);
            $(".network_right").html(network);
            $(".fingerprint_right").html(fin);
            $(".service_right").html(service);
            
            yhBehavior(phoneName);   //记录用户行为
        }

    })
    
    
}


//获取厂商列表
var manufacturerList;
function manufacturerList(){
    var url1="/weixin/model/manufacturerList";
    $.ajax({
        url:url1,
        type:"post",
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.status==1&&data.code==1){

                $.each(data.manufacturerList, function(i, item){
                    $("#select_list #facturerList select").append('<option value="'+item+'">'+item+'</option>');
                });


            }
        }
    })
}


//获取机型列表
function modelVersionList(change_cs){
    var url2="/weixin/model/modelVersionList";
    //console.log(change_cs);

    $.post(url2,{"manufacturer":change_cs},function(data){
        if(data.status==1&&data.code==1){

            $("#select_list #VersionList select").html('<option value="" id="xh">型号</option>');
            $.each(data.modelVersionList, function(i, item){
                $("#select_list #VersionList select").append('<option value="'+item+'">'+item+'</option>');
            });

        }
    })
}


//获取选定机型详细信息
function modelInfoByMV(){
    var change_cs=$("#facturer").find("option:selected").val();
    var change_xh=$("#Version").find("option:selected").val();

    if(change_cs==""||change_cs==null||change_cs=="null"||change_cs==undefined){
        $("#err_message").html("请选择您的厂商");
        return;
    }else if (change_xh==""||change_xh==null||change_xh=="null"||change_xh==undefined){
        $("#err_message").html("请选择您的机型");
        return;
    }else{
        close_phone();
    }

    var url="/weixin/model/modelInfoByMV";

   $.post(url,{"manufacturer":change_cs,"modelVersion":change_xh},function(data){

        if (data.status==1&&data.code==1) {
            var phone_type=data.model.phone_type;  // 手机类型
                screen_size=data.model.screen_size;  //屏幕尺寸
                screen_p=data.model.screen_proportion;  // 屏幕占比
                screen_r=data.model.screen_resolution;  //屏幕分辨率
                phone_cpu=data.model.cpu;   // CPU
                phone_ram=data.model.ram;  // 内存
                phone_rom=data.model.rom;  //存储
                front=data.model.front_camera_pix;   //前置摄像头
                rear=data.model.rear_camera_pix;   //后置摄像头
                battery=data.model.battery_capacity;   // 电池容量
                network=data.model.network_type;   // 网络类型
                fin=data.model.fingerprint;  //指纹识别
                service=data.model.service_feature;  // 服务特色
                img_url=data.model.logo_url;  // 手机图片
                phone_name=data.model.model_version;  //机型
                phone_manufacturer=data.model.manufacturer;
                phone_fee=data.model.fee;  // 价钱

                phoneName=phone_manufacturer+" "+phone_name;

            if(img_url==""||img_url==null||img_url==undefined){
                $(".con1_right img").attr('src',"image/db2.jpg");
            }else{
                $(".con1_right img").attr('src',img_url);
            }

            $(".phone_versionr").html(phone_name);
            $(".phone_type_right").html(phone_type);
            $(".screen_right").html(screen_size);
            $(".screen_proR").html(screen_p);
            $(".resolution_right").html(screen_r);
            $(".cpu_right").html(phone_cpu);
            $(".ram_right").html(phone_ram);
            $(".rom_right").html(phone_rom);
            $(".front_right").html(front);
            $(".rear_right").html(rear);
            $(".battery_right").html(battery);
            $(".network_right").html(network);
            $(".fingerprint_right").html(fin);
            $(".service_right").html(service);

            yhBehavior2(phoneName);
        }
   })

}


//用户记录行为
function yhBehavior(phoneName){
    var url="/weixin/model/addActionLog";
    $.post(url,{"openId":openId_value,"productId":getProductId,"action":"比一比-:"+phoneName},function(data){
        if (data.status==1&&data.code==1) {

        }
    })
}
//用户记录行为(切换机型)
function yhBehavior2(phoneName){
    var url="/weixin/model/addActionLog";
    $.post(url,{"openId":openId_value,"productId":getProductId,"action":"比一比-切换机型-"+phoneName},function(data){
        if (data.status==1&&data.code==1) {

        }
    })
}


//错误提示
function errMessage(){
    $("#err_message").html()
}
// 切换手机
function change(){
    $(".mark").show();
    $(".change_jx").show();
}


//关闭
function close_phone(){
    $(".mark").hide();
    $(".change_jx").hide();
}


//页面跳转
function myorder_qh(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/loading2.html?param="+getProductId+","+openId_value+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}

// 返回上一页
function goback(){
    window.history.go(-1);
}
/*
返回时跳过loading页,直接返回上一页面
function history_qh(){
    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb133be61f42dc4e1&redirect_uri=http://gz.mobicloud.com.cn/active/sellPhone2/tj_details.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
}*/

