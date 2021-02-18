<template>
    <el-container direction="vertical">
        <el-header width="100%">
            <div id="myChart" class="myChart" :style="{width: '650px', height: '300px'}"></div>
        </el-header>
        <el-main class="down_300">
            <el-container>
                <el-aside width="15%">
                    <ul v-for="item in areas" :key="item.id">
                        <li>
                            <div :class="quSelect==item.data?'area_select blue':'area_select'" @click="quSelectHandle(item.data)">
                                {{item.data}}
                            </div>
                        </li>
                    </ul>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="7">
                            <div class="col_div">
                                平均得分<br>
                                <span class="big_size_text">{{quDefen}}</span>
                            </div>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="7">
                            <div class="col_div">
                                排名<br>
                                <span v-if="quPaiming&gt;3" class="big_size_text">{{quPaiming}}</span>
                                <img v-if="quPaiming==1" src="../img/img1.png" />
                                <img v-if="quPaiming==2" src="../img/img2.png" />
                                <img v-if="quPaiming==3" src="../img/img3.png" />
                            </div>
                        </el-col>
                        <el-col :span="3">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-button @click="returnPage">返回</el-button>
                        </el-col>
                    </el-row>
                    <div class="div_left">
                        <div class="title_margin">各指数得分详情:</div>
                        <el-table
                            class="table_dialog"
                            :data="quDataShow"
                            :default-sort = "{prop: 'id', order: 'ascending'}"
                            height="300px">
                            <el-table-column
                                prop="zhishu"
                                label="指数"
                                width="120px">
                            </el-table-column>
                            <el-table-column
                                prop="defen"
                                label="得分"
                                width="120px">
                            </el-table-column>
                            <el-table-column
                                prop="paiming"
                                label="排名"
                                width="120px">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="div_right">
                        <div id="myRadar" class="myRadar" :style="{width: '400px', height: '500px'}"></div>
                    </div>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
// 引入Echars图表组件
let echarts = require('echarts')
export default {
    name: 'Echarts',
    data () {
        return{
            quSelect: '',
            quData: null,
            quDataShow: null,
            quDefen: '',
            quPaiming: '',
            scores: new Array(),
            areas: null,
            indexNums: null,
            rankData: new Map()
        }
    },
    created () {
        // 接收路由params参数
        let params = this.$route.params;
        this.areas = params.areas;
        this.indexNums = params.indexNums;
        this.rankData = params.rankData;
        // 初始化选定区县的数据
        this.quSelectHandle(params.data.data.qu);
        // 绘制区县分数柱状图
        this.$nextTick(()=>{
            this.drawHistogram();
        });
    },
    methods: {
        /**
         * 切换区县选择处理
         * @method quSelectHandle
         * @param {String} qu 所选区县
         */
        quSelectHandle (qu) {
            // 控制class动态变色
            this.quSelect = qu;
            // 更改数据显示
            this.changeQu(qu);
        },
        /**
         * 返回区县指数得分列表页
         * @method returnPage
         */
        returnPage () {
            this.$router.replace('/app2');
        },
        /**
         * 变更区县
         * @method changeQu
         * @param {String} qu 所选区县
         */
        changeQu (qu) {
            this.quDataShow = new Array();
            let quData = this.rankData.get(qu);
            // 生成所选区县对应的指数的得分及排名表格数据
            for (var i = 0; i < this.indexNums.length; i++) {
                let param = {
                    id: i,
                    zhishu: this.indexNums[i].data,
                    defen: quData.get(this.indexNums[i].data).score,
                    paiming: quData.get(this.indexNums[i].data).rank
                }
                this.quDataShow.push(param);
            }
            // 获取所选区县平均分以及排名
            this.quDefen = quData.get('AVG').score;
            this.quPaiming = quData.get('AVG').rank;
            // 绘制所选区县指数得分雷达图
            this.$nextTick(()=>{
                this.drowRadar(qu);
            });
        },
        /**
         * 绘制区县得分柱状图
         * @method drawHistogram
         */
        drawHistogram() {
            // 根据id绑定Echars对象并初始化
            let myChart = echarts.init(document.getElementById('myChart'));
            let that = this;
            // 绑定柱状图点击事件
            myChart.on('click', function(params) {
                that.quSelect = params.name;
                that.changeQu(that.quSelect);
            });
            // 生成Echars柱状图设置和数据对象
            let option = {
                color: ['#f44'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'shadow'
                    }
                },
                xAxis : [{
                    type : 'category',
                    data : [],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis : [{
                    type : 'value'
                }],
                // 列
                series : [{
                    name:'平均得分',
                    type:'bar',
                    barWidth: '60%',
                    data:[],
                    itemStyle: {
                        normal: {
                            // 柱上方显示分数数值
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: 'black',
                                    fontSize: 16
                                }
                            }
                        }
                    }
                }],
                label:{ 
                    normal:{
                        show: true,
                        position: 'inside'
                    }
                },
            };
            // 获取区县列表数据
            for (var i = 0; i < this.areas.length; i++) {
                option.xAxis[0].data.push(this.areas[i].data);
            }
            // 获取区县得分数据并根据规则改变颜色
            for (var i = 0; i < this.areas.length; i++) {
                let num = eval(this.rankData.get(this.areas[i].data).get('AVG').score);
                let singleData = {
                    value: num,
                    itemStyle: {
                        color: num<=85?'yellow':num<=90?'green':'blue'
                    }
                };
                option.series[0].data.push(singleData);
            }
            // 生成柱状图
            myChart.setOption(option);
        },
        /**
         * 绘制区县指数得分详情雷达图
         * @method drowRadar
         */
        drowRadar (qu) {
            // 根据id绑定Echars对象并初始化
            let myRadar = echarts.init(document.getElementById('myRadar'));
            // 生成Echars雷达图设置和数据对象
            let option = {
                tooltip: {},
                radar: {
                    name: {
                        textStyle: {
                            color: 'black'
                        }
                    },
                    indicator: []
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [],
                        name: '分数'
                    }]
                }]
            };
            // 获取区县数据
            let quData = this.rankData.get(qu);
            let param = new Array();
            for (var i = 0; i < this.indexNums.length; i++) {
                param[i] = quData.get(this.indexNums[i].data).score;

            }
            option.series[0].data[0].value = param;
            // 根据指数得分生成雷达图数据并设置上限
            let v = new Array();
            for (var i = 0; i < this.indexNums.length; i++) {
                let r = {
                    name: this.indexNums[i].data,
                    max: 100
                }
                v.push(r);
            }
            option.radar.indicator = v;
            // 生成雷达图
            myRadar.setOption(option);
        }
    }
}
</script>

<style>
.area_select{
    text-align: center;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 2px solid black;
}
.blue{
    background-color: lightblue;
}
.col_div{
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 30px;
    border: 2px solid black;
}
.big_size_text{
    font-size: x-large;
    font-weight: 700;
}
.title_margin{
    margin: 15px 0px 15px 0px;
    font-size: larger;
    font-weight: 700;
}
.down_300{
    position: relative;
    top: 200px;
}
.myChart{
    position: relative;
    left: 30%;
}
.table_dialog{
    width: 360px;
}
.div_left{
    float: left;
}
.div_right{
    float: left;
}
ul{
    list-style-type:none
}
</style>