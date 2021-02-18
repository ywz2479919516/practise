<template>
  <div>
    <el-container>
        <el-header class="table_header">
            区县:
            <el-select
                class="select_area"
                v-model="areaSelect"
                clearable
                placeholder="全部">
                <el-option
                    v-for="item in areas"
                    :key="item.id"
                    :label="item.data"
                    :value="item.data">
                </el-option>
            </el-select>
            指数:
            <el-select
                class="select_indexNums"
                v-model="indexNumsSelect"
                clearable
                placeholder="全部">
                <el-option
                    v-for="item in indexNums"
                    :key="item.id"
                    :label="item.data"
                    :value="item.data">
                </el-option>
            </el-select>
            <el-button @click="onSearchClick()" class="search_button">查询</el-button>
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
                            <el-link @click="toDetails(scope.row)">{{scope.row.data.qu}}</el-link>
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
  </div> 
</template>

<script>
import dataService from './service/Dataservice';
export default {
    data () {
        return {
            areas: new Array(),
            indexNums: new Array(),
            tableData: new Array(),
            tableDataShow: null,
            rankData: null,
            areaSelect: '',
            indexNumsSelect: '',
            currentPage: 1,
            pageSize: 5,
        }
    },
    created () {
        // 初始化表格数据
        this.tableData = dataService.initTableData();
        // 生成区县列表和指数列表
        let quAndZhishu = dataService.createIdListAndSort(dataService.initQuAndZhishu());
        this.areas = quAndZhishu.qu;
        this.indexNums = quAndZhishu.zhishu;
        // 初始化无搜索条件列表数据
        this.tableDataSearch = JSON.parse(JSON.stringify(this.tableData));
        // 数据分页
        this.handleCurrentChange(1);
        // 生成区县详情页所需数据
        let zhishuMap = dataService.groupByZhishu(this.tableData);
        this.rankData = dataService.rankQuByZhishu(this.areas, this.indexNums, zhishuMap);
    },
    methods: {
        /**
         * 更改每页显示数据条数
         * @method handleSizeChange
         * @param {Number} pageSize 每页显示数据条数
         */
        handleSizeChange (pageSize) {
            this.pageSize = pageSize;
            this.handleCurrentChange(1);
        },
        /**
         * 分页
         * @method handleCurrentChange
         * @param {Number} currentPage 当前页数
         */
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            let start = (this.currentPage - 1) * this.pageSize;
            let end = this.currentPage * this.pageSize;
            // 分割数组进行分页
            this.tableDataShow = this.tableDataSearch.slice(start, end);
        },
        /**
         * 条件搜索
         * @method onSearchClick
         */
        onSearchClick () {
            let qu = this.areaSelect;
            let zhishu = this.indexNumsSelect;
            let tableDataSearch = new Array();
            // 根据两个条件联合查询
            for (var i = 0; i<this.tableData.length; i++) {
                if (qu && this.tableData[i].data.qu != qu) {
                    continue;
                }
                if (zhishu && this.tableData[i].data.zhishu != zhishu) {
                    continue;
                }
                tableDataSearch.push(this.tableData[i]);
            }
            this.tableDataSearch = tableDataSearch;
            this.handleCurrentChange(1);
        },
        /**
         * 跳转区县详情页
         * @method toDetails
         * @param {object} data 表格行数据
         */
        toDetails (data) {
            this.$router.push({
                name: 'page',
                params: {
                    data: data,
                    areas: this.areas,
                    indexNums: this.indexNums,
                    rankData: this.rankData
                }
            });
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
</style>

