$(function() {
    chaxuntong();
})

//从地址栏获取 
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
//每次都要传给后台的     是从登录之后获取的token  os 
var token = sessionStorage.getItem("token");
var salesId = sessionStorage.getItem("salesId");
var os = "web";


//任务类型列表
function chaxuntong() {
    var url = "/assist/task/taskTypeList";
    var request = {
        param: {
            "salesId": salesId
        },
        common_param: {
            "token": token,
            "os": "web"
        }
    };
    $.ajax({
        type: 'post',
        url: url,
        data: { 'request': JSON.stringify(request) },
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data) {
            if (data == "" || data == undefined || data == null || data == "undefined") {
                window.parent.location = 'login.html';
            } else {
                var str = '<option value="-1" id="selFist">全部查询</option>';
                $("#selec").append(str);
                $.each(data.data.taskTypeList, function(i, item) {
                    if (item.NAME == "微信十全十美") {
                        var str = '<option value="' + item.ID + '">' + item.NAME + '</option>';
                        $("#selFist").after(str);
                    } else {
                        var str = '<option value="' + item.ID + '">' + item.NAME + '</option>';
                        $("#selec").append(str);
                    }
                })
                tongjile();
            }
        }
    });
}
/**
 * 格式化时间
 *  
 */
Date.prototype.pattern = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
        "H+": this.getHours(), //小时         
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

//数据统计
var startDate, downTime;
var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 1);
var startDatel = $('#startDate').val(firstDay.pattern("yyyy-MM-dd 00:00:00"));
var downTimell = $('#downTime').val(lastDay.pattern("yyyy-MM-dd 00:00:00"));

function tongjile() {
    var url = "/assist/form/show";
    startDate = $('#startDate').val();
    downTime = $("#downTime").val();
    var endDate = $('#endDate').val();
    var Deadline = $("#Deadline").val();
    var statusDateStart = $('#statusDateStart').val();
    var statusDateEnd = $('#statusDateEnd').val();
    var options = $("#selec option:selected");
    var taskType = options.val();
    var optionsS = $("#selecee option:selected");
    var belongType = optionsS.val();
    var statiStatus = $("#statiStatus option:selected");
    var status = statiStatus.val();
    var request = {
        param: {
            "startDate": startDate,
            "endDate": endDate,
            "taskType": taskType,
            "belongType": belongType,
            "statusDateStart": statusDateStart,
            "statusDateEnd": statusDateEnd,
            "Deadline": Deadline,
            "downTime": downTime,
            "status": status
        },
        common_param: {
            "token": token,
            "os": "web"
        }
    };
    $.ajax({
        type: 'post',
        url: url,
        data: { 'request': JSON.stringify(request) },
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function(data) {
            if (data == "" || data == undefined || data == null || data == "undefined") {
                window.parent.location = 'login.html';
            } else {
                $(".statisticalWork").html("");
                var num = [];
                num[0] = 0;
                num[1] = 0;
                num[2] = 0;
                num[3] = 0;
                num[4] = 0;
                num[5] = 0;
                if (data.error.code == 1) {
                    $.each(data.data.form, function(i, item) {
                        $(".tong_xian1:even").css({ 'background': '#f3fbff' });
                        //执行率
                        var impl = item.total - item.unfinishedNum; // 执行工单=总共单-未执行工单
                        var implemen = impl / item.total;
                        var implementation;
                        if (implemen == 0) {
                            implementation = 0; //么有执行工单   默认执行率为0
                        } else {
                            implementation = (implemen * 100).toFixed(2); //执行率  保留小数点后面两位小数
                        }
                        if (isNaN(implementation) == true) {
                            implementation = 0;
                        }
                        //				成功率
                        var Success = item.successfulNum / item.total;
                        var successRate;
                        if (Success == 0) {
                            successRate = 0;
                        } else {
                            successRate = (Success * 100).toFixed(2);
                        }
                        if (isNaN(successRate) == true) {
                            successRate = 0;
                        }
                        //				竣工率
                        var Completion = item.compeleteNum / item.total;
                        var completionRate;
                        if (Completion == 0) {
                            completionRate = 0;
                        } else {
                            completionRate = (Completion * 100).toFixed(2);
                        }
                        if (isNaN(completionRate) == true) {
                            completionRate = 0;
                        }
                        var str16 = '<tr class="stad">' +
                            '<td>' + (i + 1) + '</td>' +
                            '<td>' + item.taskName + '</td>' +
                            '<td>' + item.total + '</td>' +
                            '<td>' + item.unfinishedNum + '</td>' +
                            '<td>' + item.successfulNum + '</td>' +
                            '<td>' + item.failedNum + '</td>' +
                            '<td>' + item.deferredNum + '</td>' +
                            '<td>' + item.compeleteNum + '</td>' +
                            '<td>' + implementation + '</td>' +
                            '<td>' + successRate + '</td>' +
                            '<td>' + completionRate + '</td>' +
                            '</tr>'
                        $(".statisticalWork").append(str16);
                        num[0] += parseInt(item.total); //总共单
                        num[1] += parseInt(item.unfinishedNum);
                        num[2] += parseInt(item.successfulNum);
                        num[3] += parseInt(item.failedNum);
                        num[4] += parseInt(item.deferredNum);
                        num[5] += parseInt(item.compeleteNum);
                    })
                    $(".stad:even").css({ 'background': '#f3fbff' });
                    //	    		总共单
                    //总共单的执行率
                    var zimpl = num[0] - num[1]; // 执行工单=总共单-未执行工单
                    var zimplemen = zimpl / num[0];
                    var zimplementation;
                    if (zimplemen == 0) {
                        zimplementation = 0; //么有执行工单   默认执行率为0
                    } else {
                        zimplementation = (zimplemen * 100).toFixed(2); //执行率  保留小数点后面两位小数
                    }
                    if (isNaN(zimplementation) == true) {
                        zimplementation = 0;
                    }
                    //总共单成功率
                    var zSuccess = num[2] / num[0];
                    var zsuccessRate;
                    if (zSuccess == 0) {
                        zsuccessRate = 0;
                    } else {
                        zsuccessRate = (zSuccess * 100).toFixed(2);
                    }
                    if (isNaN(zsuccessRate) == true) {
                        zsuccessRate = 0;
                    }
                    //	总共单竣工率
                    var zCompletion = num[5] / num[0];
                    var zcompletionRate;
                    if (zCompletion == 0) {
                        zcompletionRate = 0;
                    } else {
                        zcompletionRate = (zCompletion * 100).toFixed(2);
                    }
                    if (isNaN(zcompletionRate) == true) {
                        zcompletionRate = 0;
                    }
                    var str18 = '<tr>' +
                        '<td></td>' +
                        '<td>总计</td>' +
                        '<td>' + num[0] + '</td>' +
                        '<td>' + num[1] + '</td>' +
                        '<td>' + num[2] + '</td>' +
                        '<td>' + num[3] + '</td>' +
                        '<td>' + num[4] + '</td>' +
                        '<td>' + num[5] + '</td>' +
                        '<td>' + zimplementation + '</td>' +
                        '<td>' + zsuccessRate + '</td>' +
                        '<td>' + zcompletionRate + '</td>' +
                        '</tr>';
                    $(".statisticalWork").append(str18);
                }
            }
        }
    });
}