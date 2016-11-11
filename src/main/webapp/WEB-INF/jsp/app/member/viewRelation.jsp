<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%-- <div id = "myId">id = ${id}</div> --%>
<div id="force" style="height:100%;width:100%"></div>
<%@include file="/common/common.jspf" %>
<script src="${pageContext.request.contextPath}/js/dist/echarts.js"></script>
<script type="text/javascript">
	var myChart;   
	var option;
    require.config({
        paths: {
            echarts: '${pageContext.request.contextPath}/js/dist'
        }
    });
    require(
            [
                'echarts',
                'echarts/chart/force',
            ],
            function (ec) {
                myChart = ec.init(document.getElementById('force'));
        		var url = rootPath + '/member/getRelation.shtml';
                var s = CommnUtil.ajax(url, {
                    id : '${id}'
                }, "json");
                var data = JSON.parse(s);
                option = {
               	    title : {
               	        text: '人物关系',
               	        subtext: '数据来智慧城市大数据管理系统',
               	        x:'center',
               	        y:'bottom'
               	    },
               	    tooltip : {
               	        trigger: 'item',
               	        formatter: '{a} : {b}'
               	    },
               	    toolbox: {
               	        show : true,
               	        feature : {
               	            restore : {show: true},
               	            magicType: {show: true, type: ['force', 'chord']},
               	            saveAsImage : {show: true}
               	        }
               	    },
               	    legend: {
               	        x: 'left',
               	        data:['关系1','关系2']
               	    },
               	    series : [
               	        {
               	            type:'force',
               	            name : "人物关系",
               	            ribbonType: false,
               	            categories : [
               	                {
               	                    name: '人物'
               	                },
               	                {
               	                    name: '关系1'
               	                },
               	                {
               	                    name:'关系2'
               	                }
               	            ],
               	            itemStyle: {
               	                normal: {
               	                    label: {
               	                        show: true,
               	                        textStyle: {
               	                            color: '#333'
               	                        }
               	                    },
               	                    nodeStyle : {
               	                        brushType : 'both',
               	                        borderColor : 'rgba(255,215,0,0.4)',
               	                        borderWidth : 1
               	                    },
               	                    linkStyle: {
               	                        type: 'curve'
               	                    }
               	                },
               	                emphasis: {
               	                    label: {
               	                        show: false
               	                        // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
               	                    },
               	                    nodeStyle : {
               	                        //r: 30
               	                    },
               	                    linkStyle : {}
               	                }
               	            },
               	            useWorker: false,
               	            minRadius : 15,
               	            maxRadius : 25,
               	            gravity: 1.1,
               	            scaling: 1.1,
               	            roam: 'move',
               	            nodes:data.members,
               	            links : data.relations
               	        }
               	    ]
               	};
               	var ecConfig = require('echarts/config');
               	function focus(param) {
               	    var data = param.data;
               	    var links = option.series[0].links;
               	    var nodes = option.series[0].nodes;
               	    if (
               	        data.source !== undefined
               	        && data.target !== undefined
               	    ) { //点击的是边
               	        var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
               	        var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
               	        console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
               	    } else { // 点击的是点
               	        console.log("选中了" + data.name + '(' + data.value + ')');
               	    }
               	}
               	myChart.on(ecConfig.EVENT.CLICK, focus)

               	myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
               	    console.log(myChart.chart.force.getPosition());
               	});
               	myChart.setOption(option);
            }
        );
</script>


