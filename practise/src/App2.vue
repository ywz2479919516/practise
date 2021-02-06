<template>
  <div>
    <el-container>
        <el-header class="table_header">
            区县:
            <el-select
                class="select_area"
                v-model="areaSelect"
                clearable
                @change="selectArea"
                placeholder="全部">
                <el-option
                    v-for="item in areas"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                </el-option>
            </el-select>
            指数:
            <el-select
                class="select_indexNums"
                v-model="indexNumsSelect"
                clearable
                @change="selectIndexNum"
                placeholder="全部">
                <el-option
                    v-for="item in indexNums"
                    :key="item.id"
                    :label="item.data"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button class="search_button">查询</el-button>
        </el-header>
        <el-main class="table_main">
            <div>
                <el-table
                    :data="tableDataShow"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    height="100%">
                    <el-table-column
                        prop="id"
                        label="编号"
                        sortable
                        width="80">
                    </el-table-column>
                    <el-table-column
                        label="区县"
                        sortable
                        width="180">
                        <template slot-scope="scope">
                            <el-link @click="openDialog(scope.row.quId)">{{scope.row.data.qu}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="data.zhishu"
                        label="指数"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="data.defen"
                        label="得分"
                        sortable
                        width="100">
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
        <el-footer class="table_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[3, 5, 7, 9, 11]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDataSearch.length">
                </el-pagination>
        </el-footer>
    </el-container>
    <el-dialog
        title="区县详情页面"
        center
        :visible.sync="dialogVisible"
        width="75%"
        class="dialog">
        <el-container>
            <el-aside width="30%">
                <ul v-for="item in areas" :key="item.id">
                    <li>
                        <div :class="quSelect==item.id?'area_select blue':'area_select'" @click="quSelectHandle(item.id)">
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
                            <span class="big_size_text">{{quPaiming}}</span>
                        </div>
                    </el-col>
                    <el-col :span="3">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-button @click="closeDialog">返回</el-button>
                    </el-col>
                </el-row>
                <div class="title_margin">各指数得分详情:</div>
                <el-table
                    :data="quDataShow"
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    height="300px">
                    <el-table-column
                        prop="zhishu"
                        label="指数"
                        width="200px">
                    </el-table-column>
                    <el-table-column
                        prop="defen"
                        label="得分"
                        width="200px">
                    </el-table-column>
                    <el-table-column
                        prop="paiming"
                        label="排名"
                        width="200px">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-dialog>
  </div> 
</template>

<script>
import tableData from './tabledata/zhishu-defen';
export default {
    data () {
        return {
            areas: new Array(),
            indexNums: new Array(),
            tableData: new Array(),
            tableDataShow: null,
            areaSelect: '',
            indexNumsSelect: '',
            currentPage: 1,
            pageSize: 5,
            dialogVisible: false,
            quSelect: '',
            quData: null,
            quDataShow: null,
            quDefen: '',
            quPaiming: '',
            scores: new Array()
        }
    },
    created () {
        let areas = new Array();
        let indexNums = new Array();
        for (var i = 0; i < tableData.length; i++) {
            let param = {
                id: null,
                data: tableData[i],
                quId: null,
                zhishuId: null
            }
            this.tableData.push(param);
        }
        for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].id = i + 1;
            let index = areas.indexOf(this.tableData[i].data.qu);
            if (index === -1) {
                areas.push(this.tableData[i].data.qu);
                this.tableData[i].quId = areas.length - 1;
            } else {
                this.tableData[i].quId = index;
            }
            index = indexNums.indexOf(this.tableData[i].data.zhishu);
            if (index === -1) {
                indexNums.push(this.tableData[i].data.zhishu);
                this.tableData[i].zhishuId = indexNums.length - 1;
            } else {
                this.tableData[i].zhishuId = index;
            }
        }
        this.tableDataSearch = JSON.parse(JSON.stringify(this.tableData));
        for (var i = 0; i < areas.length; i++) {
            let param = {
                id: i + 1,
                data: areas[i]
            }
            this.areas.push(param);
        }
        for (var i = 0; i < indexNums.length; i++) {
            let param = {
                id: i + 1,
                data: indexNums[i]
            }
            this.indexNums.push(param);
        }
        this.handleCurrentChange(1);
        this.quData = new Array();
        for (var i = 0;i < this.indexNums.length + 1; i++) {
            let d = new Array();
            for (var j = 0; j < this.areas.length; j++){
                d.push('-');
            }
            this.quData.push(d);
        }
        for (var i = 0; i < indexNums.length; i++) {
            let data = this.selectHandle('',i+1);
            data.sort(function(a,b){
                return b.data.defen - a.data.defen;
            });
            for (var j = 0; j < data.length; j++) {
                this.quData[data[j].quId][i] = j + 1;
            }
        }
        var scores = new Array();
        for (var i = 0; i < this.areas.length; i++) {
            let data = this.selectHandle(i+1,'');
            let sum = 0;
            for (var j = 0; j < data.length; j++) {
                sum += data[j].data.defen;
            }
            let avg = sum / data.length;
            let param = {
                id: i,
                defen: avg
            }
            scores.push(param);
            this.scores.push(param);
        }
        scores.sort(function(a,b){
            return  b.defen - a.defen;
        })
        for (var i = 0; i < scores.length; i++) {
            this.quData[this.indexNums.length][scores[i].id] = i + 1;
        }
    },
    methods: {
        handleSizeChange (pageSize) {
            this.pageSize = pageSize;
            this.handleCurrentChange(1);
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tableDataShow = new Array();
            for (var i = (this.currentPage - 1) * this.pageSize; i<this.currentPage * this.pageSize; i++) {
                if (this.tableDataSearch[i]){
                    this.tableDataShow.push(this.tableDataSearch[i]);
                }
            }
        },
        selectArea (id) {
            this.tableDataSearch = this.selectHandle(id,this.indexNumsSelect);
            this.handleCurrentChange(1);
        },
        selectIndexNum (id) {
            this.tableDataSearch = this.selectHandle(this.areaSelect,id);
            this.handleCurrentChange(1);
        },
        selectHandle (quId, zhishuId) {
            let tableDataSearch = new Array();
            for (var i = 0; i<this.tableData.length; i++) {
                if ((quId?(this.tableData[i].quId === (quId - 1)):true)
                    && (zhishuId?(this.tableData[i].zhishuId === (zhishuId - 1)):true)) {
                    tableDataSearch.push(this.tableData[i]);
                }
            }
            return tableDataSearch;
        },
        openDialog (quId) {
            this.dialogVisible = true;
            this.quSelect = quId + 1;
            this.changeQu(quId);
        },
        closeDialog () {
            this.dialogVisible = false;
        },
        quSelectHandle (quId) {
            this.quSelect = quId;
            this.changeQu(quId - 1);
        },
        changeQu (quId) {
            this.quDataShow = new Array();
            for (var i = 0; i < this.indexNums.length; i++) {
                let s = this.selectHandle (quId+1, i+1);
                console.log(s);
                let param = {
                    id: i,
                    zhishu: this.indexNums[i].data,
                    defen: s.length>0?s[0].data.defen:0,
                    paiming: this.quData[quId][i]
                }
                this.quDataShow.push(param);
            }
            console.log(this.scores);
            this.quDefen = this.scores[quId].defen.toString().substring(0,5);
            this.quPaiming = this.quData[this.indexNums.length][quId];
        }
    }
}
</script>

<style>
.table_main{
    width: 600px;
    margin:0 auto;
}
.table_header{
    width: 600px;
    margin:0 auto;
}
.table_footer{
    width: 600px;
    margin:0 auto;
}
.select_area{
    width: 33%;
}
.select_indexNums{
    position: relative;
    width: 33%;
}
.search_button{
    margin: 0px 0px 0px 20px;
}
.dialog{
    height: 650px;
}
.el-dialog__footer{
    padding: 0px;
}
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
</style>
<style scope>
ul{
    list-style-type:none
}
</style>

