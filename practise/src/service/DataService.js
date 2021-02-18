import TableData from '../tabledata/zhishu-defen';
const service = {
    /**
     * 初始化表格数据
     * @method initTableData
     * @return {Array} 从文件中读取的表格数据
     */
    initTableData () {
        let result = new Array();
        for (var i = 0; i < TableData.length; i++) {
            // 生成ID用于显示
            let param = {
                id: i + 1,
                data: TableData[i],
            }
            result.push(param);
        }
        return result;
    },
    /**
     * 初始化区县信息和指数信息
     * @method initQuAndZhishu
     * @return {object} 从表格数据中读取的区县列表和指数列表
     */
    initQuAndZhishu () {
        let tableData = this.initTableData();
        let result = {
            qu: new Array(),
            zhishu: new Array()
        }
        for (var i = 0; i < tableData.length; i++) {
            let index = result.qu.indexOf(tableData[i].data.qu);
            if (index === -1) {
                result.qu.push(tableData[i].data.qu);
            }
            index = result.zhishu.indexOf(tableData[i].data.zhishu);
            if (index === -1) {
                result.zhishu.push(tableData[i].data.zhishu);
            }
        }
        return result;
    },
    /**
     * 对区县和指数信息按照字母序排序
     * @method createIdListAndSort
     * @param {object} quAndZhishu 区县列表和指数列表
     * @return {object} 排序并添加ID后的区县列表和指数列表
     */
    createIdListAndSort (quAndZhishu) {
        // 按字母序排序
        quAndZhishu.qu.sort((a, b)=>a.localeCompare(b));
        quAndZhishu.zhishu.sort((a, b)=>a.localeCompare(b));
        let result = {
            qu: new Array(),
            zhishu: new Array()
        };
        for (var i = 0; i < quAndZhishu.qu.length; i++) {
            let s = {
                id: i,
                data: quAndZhishu.qu[i]
            }
            result.qu.push(s);
        }
        for (var i = 0; i < quAndZhishu.zhishu.length; i++) {
            let s = {
                id: i,
                data: quAndZhishu.zhishu[i]
            }
            result.zhishu.push(s);
        }
        return result;
    },
    /**
     * 对表格数据按照指数进行分组
     * @method groupByZhishu
     * @param {Array} tableData 表格数据
     * @return {Map} 按照指数分组后的Map(K->指数,V->{Array}表格数据)
     */
    groupByZhishu (tableData) {
        let dataMap = new Map();
        for (var i = 0; i < tableData.length; i++) {
            let dm = dataMap.get(tableData[i].data.zhishu);
            // 去重分组
            if (dm) {
                dm.push(tableData[i].data);
            } else {
                let value = new Array();
                let item = tableData[i].data;
                value.push(item);
                dataMap.set(tableData[i].data.zhishu, value);
            }
        }
        return dataMap;
    },
    /**
     * 根据数组元素的区县属性查找元素位置
     * @method indexOf
     * @param {Array} targetArray 目标数组
     * @param {String} quItem 区县
     * @return {Number} 目标元素下标,若不存在则为-1
     */
    indexOf (targetArray, quItem) {
        for (var i = 0; i < targetArray.length; i++) {
            if (targetArray[i].qu === quItem) {
                return i;
            }
        }
        return -1;
    },
    /**
     * 根据指数的分值对区县进行排名
     * @method rankQuByZhishu
     * @param {Array} quList 区县列表
     * @param {Array} zhishuList 指数列表
     * @param {Map} zhishuMap 按指数分组后的区县数据
     * @return {Map} 区县排名Map(K->区县,V->Map(K->指数,V->排名))
     */
    rankQuByZhishu (quList, zhishuList, zhishuMap) {
        // 对每个指数的区县得分进行降序排序实现排名
        for (var i = 0; i < zhishuList.length; i++) {
            zhishuMap.get(zhishuList[i].data).sort((a, b)=>b.defen - a.defen);
        }
        let dataMap = new Map();
        let avgRankArray = new Array();
        for (var i = 0; i < quList.length; i++) {
            let rankMap = new Map();
            for (var j = 0; j < zhishuList.length; j++) {
                let index = this.indexOf(zhishuMap.get(zhishuList[j].data), quList[i].data);
                // 初始数据设为'-' 
                let param = {
                    score: '-',
                    rank: '-',
                }
                if (index != -1) {
                    param.score = zhishuMap.get(zhishuList[j].data)[index].defen;
                    param.rank = index + 1;
                }
                // 生成指数分数和排名列表
                rankMap.set(zhishuList[j].data, param);
            }
            let sum = 0;
            let num = 0;
            // 求平均值
            rankMap.forEach((value, key)=>{
                if (value.score != '-') {
                    sum += value.score;
                    num ++;
                }
            });
            let par = {
                score: '-',
                rank: '-',
            }
            if (num != 0) {
                par.score = (sum/num).toString().substring(0, 5);
            }
            rankMap.set('AVG', par);
            // 平均值列表,用于接下来的排序
            avgRankArray.push({key:quList[i].data,value:par});
            dataMap.set(quList[i].data, rankMap);
        }
        // 对每个区县所有指数分数的平均值进行排序
        avgRankArray.sort((a,b)=>b.value.score - a.value.score);
        for (var i = 0; i < quList.length; i++) {
            let item1 = dataMap.get(quList[i].data);
            let item2 = item1.get('AVG');
            for (var j = 0; j < avgRankArray.length; j++) {
                // 生成排名
                if (avgRankArray[j].key === quList[i].data) {
                    item2.rank = j + 1;
                    break;
                }
            }
            item1.set('AVG', item2);
            dataMap.set(quList[i].data, item1);
        }
        return dataMap;
    }
}
export default service;