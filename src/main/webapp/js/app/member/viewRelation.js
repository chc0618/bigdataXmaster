$(function () {	
	var myChart = echarts.init(document.getElementById('relation'));

    // 指定图表的配置项和数据
    option = {
        title: {
        	 text: 'Event River',
		     subtext: '纯属虚构'
        },
        tooltip: {
        	trigger: 'item',
	        enterable: true
	   	},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 50,
                roam: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                symbol:'circle',
                force:{repulsion: 2000},
                categories : [
                    {
                        name: '人物'
                    },
                    {
                        name: '家人'
                    },
                    {
                        name:'朋友'
                    }
                ],
                nodes:[
   	                {category:0, name: '乔布斯', value : 10, label: '乔布斯\n（主要）'},
   	                {category:1, name: '丽萨-乔布斯',value : 2},
   	                {category:1, name: '保罗-乔布斯',value : 3},
   	                {category:1, name: '克拉拉-乔布斯',value : 3},
   	                {category:1, name: '劳伦-鲍威尔',value : 7},
   	                {category:2, name: '史蒂夫-沃兹尼艾克',value : 5},
   	                {category:2, name: '奥巴马',value : 8},
   	                {category:2, name: '比尔-盖茨',value : 9},
   	                {category:2, name: '乔纳森-艾夫',value : 4},
   	                {category:2, name: '蒂姆-库克',value : 4},
   	                {category:2, name: '龙-韦恩',value : 1},
   	            ],
   	            links : [
   	                {source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿'},
   	                {source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲'},
   	                {source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲'},
   	                {source : '劳伦-鲍威尔', target : '乔布斯', weight : 2},
   	                {source : '史蒂夫-沃兹尼艾克', target : '乔布斯', weight : 3, name: '合伙人'},
   	                {source : '奥巴马', target : '乔布斯', weight : 1},
   	                {source : '比尔-盖茨', target : '乔布斯', weight : 6, name: '竞争对手'},
   	                {source : '乔纳森-艾夫', target : '乔布斯', weight : 1, name: '爱将'},
   	                {source : '蒂姆-库克', target : '乔布斯', weight : 1},
   	                {source : '龙-韦恩', target : '乔布斯', weight : 1},
   	                {source : '克拉拉-乔布斯', target : '保罗-乔布斯', weight : 1},
   	                {source : '奥巴马', target : '保罗-乔布斯', weight : 1},
   	                {source : '奥巴马', target : '克拉拉-乔布斯', weight : 1},
   	                {source : '奥巴马', target : '劳伦-鲍威尔', weight : 1},
   	                {source : '奥巴马', target : '史蒂夫-沃兹尼艾克', weight : 1},
   	                {source : '比尔-盖茨', target : '奥巴马', weight : 6},
   	                {source : '比尔-盖茨', target : '克拉拉-乔布斯', weight : 1},
   	                {source : '蒂姆-库克', target : '奥巴马', weight : 1}
   	            ],
                draggable:true,
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
            }
        ]
    };
    
    myChart.setOption(option);
});