
var param=GetQueryString('param').split(",");
    phone=param[1];
    productId=param[0];
var phoneName;
$(function(){
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

//获取产品详情
function tj_message(){
    var url="/sda/model/productInfo";
    $.post(url,{"productId":productId},function(data){
        if (data.code==1) {
             //productId=data.userProduct.product_id;
            var phone_type=data.product.phone_type;  // 手机类型
                phoneManu=data.product.manufacturer;  // 手机厂商
                screen_size=data.product.screen_size;  //屏幕尺寸
                screen_p=data.product.screen_proportion;  // 屏幕占比
                screen_r=data.product.screen_resolution;  //屏幕分辨率
                phone_cpu=data.product.cpu;   // CPU
                phone_ram=data.product.ram;  // 内存
                phone_rom=data.product.rom;  //存储
                front=data.product.front_camera_pix;   //前置摄像头
                rear=data.product.rear_camera_pix;   //后置摄像头
                battery=data.product.battery_capacity;   // 电池容量
                network=data.product.network_type;   // 网络类型
                fin=data.product.fingerprint;  //指纹识别
                service=data.product.service_feature;  // 服务特色
                img_url=data.product.logo_url;  // 手机图片
                phone_name=data.product.model_version;  //机型
                //phone_fee=data.product.fee;  // 价钱
                original_fee=data.product.fee_interval;  //原价


            //$("#original_fee").html("￥"+original_fee);
            $(".con1_left img").attr('src',img_url);
            $(".phone_fee").html("￥"+original_fee);
            $(".phone_versionl").html(phoneManu+" "+phone_name);
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
    var url="/sda/model/ownModel";
    $.post(url,{"phone":phone},function(data){
        if (data.code==1) {
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
                $(".con1_right .rightImg").attr('src',"image/db2.jpg");
            }else{
                $(".con1_right .rightImg").attr('src',img_url);
            }

            
            if(phone_manufacturer==""||phone_manufacturer==null||phone_manufacturer==undefined||phone_name==""||phone_name==null||phone_name==undefined){
                phoneName="";
            }else{
                phoneName=phone_manufacturer+" "+phone_name;
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
            
        }

    })   
}

//获取厂商列表
var manufacturerList;
function manufacturerList(){
    var url1="/sda/model/manufacturerList";
    $.ajax({
        url:url1,
        type:"post",
        contentType:'application/json;charset=UTF-8',
        success:function(data){
            if(data.code==1){
                $("#select_list #facturerList select").html('<option value="" id="cs">厂商</option>');
                $.each(data.manufacturerList, function(i, item){
                    $("#select_list #facturerList select").append('<option value="'+item+'">'+item+'</option>');
                });
            }
        }
    })
}

//获取机型列表
function modelVersionList(change_cs){
    var url2="/sda/model/modelVersionList";
    $.post(url2,{"manufacturer":change_cs},function(data){
        if(data.code==1){
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

    var url="/sda/model/modelInfoByMV";

   $.post(url,{"manufacturer":change_cs,"modelVersion":change_xh,"recommProductId":productId,"phone":phone},function(data){

        if (data.code==1) {
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

                phoneName=phone_manufacturer+" "+phone_name;

            if(img_url==""||img_url==null||img_url==undefined){
                $(".con1_right .rightImg").attr('src',"image/db2.jpg");
            }else{
                $(".con1_right .rightImg").attr('src',img_url);
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

//跳转到热门推荐页面
function hot(){
    window.location.href="hot.html?param="+productId+","+phone;
}


//点击预约按钮
function affirmSubscribe(){
    window.location.href="affirmSubscribe.html?param="+productId+","+phone;;      

}

//预约成功跳转到我的预约页面
function mySubcribe(){
    window.location.href="mySubscribe.html?param="+phone;
}

// 返回上一页
function goback(){
    window.history.go(-1);
}


