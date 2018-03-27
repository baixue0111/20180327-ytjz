var reportObject, sortData = new Array();
(function () {
    var url = "/gzmp/fileindex?tz=" + new Date().getTime();
    $.ajax({
        type: 'get',
        url: url,
        dataType: "json",
        success: function (data) {
          var datas = eval(data.files);
          var arrayObj = new Array();
          for (var i = 0; i < datas.length; i++) {
            var date = datas[i].url.substring(datas[i].url.lastIndexOf("_") + 1, datas[i].url.lastIndexOf("."));
            arrayObj.push(date);
          }

          arrayObj.sort(function (a, b) {
            return b - a;
          })

          for (var i = 0; i < arrayObj.length; i++) {
            if (arrayObj[i] != null && arrayObj[i] != undefined && arrayObj[i] != "") {
              for (var j = 0; j < datas.length - i; j++) {
                if (datas[j].url.indexOf(arrayObj[i]) != -1) {
                  sortData.push(datas[j]);
                }
              }

            }
          }

          $("#reportForm").html("");  // 清空上一次查询记录
          reportObject = data.files;  //获取的json数据复制给全局变量  下面检索时直接获取
          $.each(sortData, function (i, item) {
                if (item.name != "null") {
                    var reportFormStr = '<tr class="thLength">' +
                                            '<td>' + item.name + '</td>' +
                                            '<td><a href="' + item.url + '">下载</a></td>' +
                                        '</tr> ';
                    $("#reportForm").append(reportFormStr);
                    $("#reportForm td").css("text-align", "center");
                }
            })
            goPage(1, 10);
        }
    });
}())





/**
 * 检索
 */ 
function reportRetrieval() { 
    $("#reportForm").html("");
    $.each(sortData, function (i, item) {
        if (item.name != "null") {
            var itemName = item.name;
            var retrieval = $("#reportRetrieval").val();
            var reportFormStr = '<tr class="thLength">' +
                                    '<td>' + item.name + '</td>' +
                                    '<td><a href="' + item.url + '">下载</a></td>' +
                                '</tr> ';
            if (itemName.indexOf(retrieval) > -1) {
                $("#reportForm").append(reportFormStr);
            } else if (retrieval == null || retrieval == "null") {
                $("#reportForm").append(reportFormStr);
            }
            $("#reportForm td").css("text-align", "center");
        }
    })
    goPage(1, 10);
}

/**
 * 
 * @param {*} pno 页码
 * @param {*} psize  条数
 */ 
function goPage(pno, psize) {
    var itable = document.getElementById("reportForm");
    var num = itable.rows.length;//表格所有行数(所有记录数)
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr =  "共" + num + "条记录   第" + currentPage + "/" + totalPage +"页";
    if (currentPage > 1) {
        tempStr += "<button class='paging' onClick=\"goPage(" + (1) + "," + psize + ")\">首页</button>";
        tempStr += "<button class='paging' onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\">上一页</button>"
    } else {
        tempStr += "<button class='paging'>首页</button>";
        tempStr += "<button class='paging'>上一页</button>";
    }

    if (currentPage < totalPage) {
        tempStr += "<button class='paging' onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">下一页</button>";
        tempStr += "<button class='paging' onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</button>";
    } else {
        tempStr += "<button class='paging'>下一页</button>";
        tempStr += "<button class='paging'>尾页</button>";
    }

    document.getElementById("barcon").innerHTML = tempStr;

}
