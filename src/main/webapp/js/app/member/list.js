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
            colkey: "name",
            name: "名称",
            renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ data+"')\">"+data +"</a>";
            }
        }, {
            colkey: "number",
            name: "编号",
            hide: true
        }, {
            colkey: "meetup",
            name: "组织",
        	renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ data+"')\">"+data +"</a>";
            }
        }, {
            colkey: "member_since",
            name: "加入时间",
            renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ new Date(data).format("yyyy-MM-dd")+"')\">"+ new Date(data).format("yyyy-MM-dd") +"</a>";
                //return new Date(data).format("yyyy-MM-dd");
            }
        }, {
            colkey: "country",
            name: "国家",
            renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ data+"')\">"+data +"</a>";
            }
        }, {
            colkey: "region",
            name: "地区",
            renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ data+"')\">"+data +"</a>";
            }
        }, {
            colkey: "locality",
            name: "位置",
            renderData: function (rowindex, data, rowdata, column) {
        		return "<a href='javascript:void(0);' onclick=\"autoSearch('"+column+"','"+ data+"')\">"+data +"</a>";
            }
        }, {
            colkey: "address_url",
            name: "地址链接"
        }, {
            colkey: "meta_created",
            name: "创建时间",
            renderData: function (rowindex, data, rowdata, column) {
                return new Date(data).format("yyyy-MM-dd hh:mm:ss");
            }
        }],
        jsonUrl: rootPath + '/member/findByPage.shtml',
        checkbox: true,
    },myCallBack
    );

    $("#search").click("click", function () {// 绑定查询按扭
        var searchParams = $("#searchForm").serializeJson();
        grid.setOptions({
            data: searchParams
        });
    });
    
    $(function () {
    	$("#viewFun").click("click", function () {
    		var cbox = grid.getSelectedCheckbox();
    		if (cbox.length > 1 || cbox == "") {
    	        layer.msg("只能选中一个");
    	        return;
    	    }
    		pageii = layer.open({
    	        title: "人物关系",
    	        type: 2,
    	        area: ["70%", "97%"],
    	        content: rootPath + '/member/toRelationViewPage.shtml?id=' + cbox
    	    });
        });
    });

    $("#addFun").click("click", function () {
        addFun();
    });
    $("#editFun").click("click", function () {
        editFun();
    });
    $("#delFun").click("click", function () {
        delFun();
    });
    $("#auditFun").click("click", function () {
        auditFun();
    });


});

function editFun() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("只能选中一个");
        return;
    }
    pageii = layer.open({
        title: "编辑",
        type: 2,
        area: ["600px", "80%"],
        content: rootPath + '/meetup/' + cbox + '/edit.shtml'
    });
}
function addFun() {
    pageii = layer.open({
        title: "新增",
        type: 2,
        area: ["600px", "80%"],
        content: rootPath + '/meetup/add.shtml'
    });
}
function delFun() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("只能选中一个");
        return;
    }
    layer.confirm('是否删除？', function (index) {
        var url = rootPath + '/meetup/' + cbox + '/delete.shtml';
        var s = CommnUtil.ajax(url, {}, "json");
        if (s == "success") {
            layer.msg('删除成功');
            grid.loadData();
        } else {
            layer.msg('删除失败');
        }
    });
}

function auditFun() {
    var cbox = grid.getSelectedCheckbox();
    if (cbox.length > 1 || cbox == "") {
        layer.msg("只能选中一个");
        return;
    }
    var url = rootPath + '/meetup/' + cbox + '/check.shtml';
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
        content: rootPath + '/meetup/' + cbox + '/audit.shtml'
    });
}

function autoSearch(column,data){
	var t = new Array("name","meetup","member_since","country","region","locality");
	var str = "";
	for(var i=0;i<t.length;i++){
		if(t[i] == column){
			str += "\"memberFormMap." + t[i] + "\":\"" +data+  "\"" + ",";
		}
		else{
			str += "\"memberFormMap." + t[i] + "\":\"" + "\"" + ",";
		}
	}
	str = str.substring(0,str.length - 1);
	var jsonStr = "{" + str + "}";
	//var jsonStr = "{\"memberFormMap."+column +"\":\"" +data+"\"}";
    //alert(str);
	var searchParams = eval('(' + jsonStr + ')');
	grid.setOptions({
        data: searchParams
    });
}

function myCallBack(){
	//alert("加载完成");
}
