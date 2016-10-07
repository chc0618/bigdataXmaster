var pageii = null;
var grid = null;
$(function () {
    grid = lyGrid({
        id: 'paging',
        l_column: [{
            colkey: "id",
            name: "id",
            width: "50px",
            hide: true
        }, {
            colkey: "description",
            name: "数据集描述"
        }, {
            colkey: "upload_user_id",
            name: "上传者ID"
        }, {
            colkey: "audit_user_id",
            name: "审核者ID"
        }, {
            colkey: "remark",
            name: "审核回复"
        }, {
            colkey: "path",
            name: "文件路径"
        }, {
            colkey: "meta_created",
            name: "创建时间",
            renderData: function (rowindex, data, rowdata, column) {
                return new Date(data).format("yyyy-MM-dd hh:mm:ss");
            }
        }, {
            colkey: "deleted_mark",
            name: "当前状态",
            renderData: function (rowindex, data, rowdata, column) {
                if(data==0)return "无效";
                else if(data==1)return "有效";
                else if(data==2)return "待审核";
                else if(data==3)return "审核未通过";
                else return "未知状态";
            }
        }],
        jsonUrl: rootPath + '/gsmdataset/findByPage.shtml',
        checkbox: true
    });

    $("#search").click("click", function () {// 绑定查询按扭
        var searchParams = $("#searchForm").serializeJson();
        grid.setOptions({
            data: searchParams
        });
    });
    $("#auditFun").click("click", function () {
        auditFun();
    });
});
function auditFun() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("只能选中一个");
        return;
    }
    var url = rootPath + '/gsmdataset/' + cbox + '/check.shtml';
    var s = CommnUtil.ajax(url, {}, "json");
    if (!s) {
        layer.msg('已审核过，无需再审！');
        grid.loadData();
        return;
    }
    pageii = layer.open({
        title: "审核",
        type: 2,
        area: ["600px", "20%"],
        content: rootPath + '/gsmdataset/' + cbox + '/audit.shtml'
    });
}