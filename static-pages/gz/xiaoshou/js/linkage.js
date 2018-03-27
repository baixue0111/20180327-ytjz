/**
 * Created by hsgeng on 2018/1/12.
 * 当前工单和抢单工单 两级联动和三级联动
 */
$(function(){
    FillSheng();
})
    /*****************两级联动*******/
    var city = [
        [],
        ["业务竣工", "营销成功", "接触成功", "其他"],
        ["营销失败", "联系失败", "其他"],
        ["联系延迟", "营销延迟", "其他"],
    ];
    function getCity() {
        //获得省份下拉框的对象
        var sltProvince = document.form1.province;
        //获得城市下拉框的对象
        var sltCity = document.form1.city;
        //得到对应省份的城市数组
        var provinceCity = city[sltProvince.selectedIndex - 1];
        //清空城市下拉框，仅留提示选项
        sltCity.length = 1;
        //将城市数组中的值填充到城市下拉框中
        for (var i = 0; i < provinceCity.length; i++) {
            sltCity[i + 1] = new Option(provinceCity[i], provinceCity[i]);
        }
    }

    /***********用户归属三级联动*******/
    $("#prefecture").change(function () {
        $("#shi option:first").prop("selected", 'selected');
        $("#qu option:first").prop("selected", 'selected');
        if ($("#prefecture").val() == "") {
            $("#county").html("");
            $("#substation").html("");
            return;
        } else {
            FillShi();
        }
    })
    $("#county").change(function () {
        $("#qu option:first").prop("selected", 'selected');
        if ($("#shi").val() == "") {
            $("#substation").html("");
            return;
        } else {
            FillQu();
        }
    });

//用户归属列表
//地市
    function FillSheng(){
        var regionId = sessionStorage.getItem("hqregionId");
        var regionName = sessionStorage.getItem("hqName");
        var str = '<option value = ' + regionId+ '>' + regionName + '</option>';
        $("#prefecture").append(str);
    }

//区县
    function FillShi() {
        var url = "/assist/task/regionList";
        var regionId = $("#prefecture").val();
        var request = {
            param: {
                "regionId": regionId

            },
            common_param: {
                "token": token,
                "os": "web"
            }
        };
        $.ajax({
            type: 'post',
            async: false,
            url: url,
            data: { 'request': JSON.stringify(request) },
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function (data) {
                $("#county").html('<select id="shi" class="retrievalSelect"><option value="">请选择</option></select>');
                $.each(data.data.regionList, function (i, item) {
                    var shiStr = '<option value = ' + item.ID + '>' + item.NAME + '</option>';
                    $("#shi").append(shiStr);
                })
            }
        })
    }

//支局
    function FillQu() {
        var url = "/assist/task/regionList";
        var regionId = $("#shi").val();
        var request = {
            param: {
                "regionId": regionId

            },
            common_param: {
                "token": token,
                "os": "web"
            }
        };
        $.ajax({
            type: 'post',
            async: false,
            url: url,
            data: { 'request': JSON.stringify(request) },
            contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
            success: function (data) {
                $("#substation").html('<select id="qu" class="retrievalSelect"><option value="">请选择</option></select>');
                $.each(data.data.regionList, function (i, item) {
                    var quStr = '<option value = ' + item.ID + '>' + item.NAME + '</option>';
                    $("#qu").append(quStr);
                })
            }
        })
    }
