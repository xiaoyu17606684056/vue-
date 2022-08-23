<template>
    <div class="comomm-tabe">
        <el-table :data = "tableData"  height = "90%"></el-table>
        <el-table-column
        show-overflow-tooltip
        v-for="item in tableLable"
        :key="item.prop"
        :label= "item.label"
        :width= "item.width ? item.waidth : 125">
        <template slot-scope= "scope">
            <span style="margin-left: 10px" >{{scope.row[item.prop]}}</span>
        </template>
        </el-table-column>
        <el-table-column label= "操作" min-width="180">
            <el-button size="mini" @click="handerEdit">编辑</el-button>
            <el-button size="mini" type = "danger" @click="handerDelet">删除</el-button>
        </el-table-column>
        <el-pagination
        class="pager"
        layout= "prev,pager,next"
        :total= "config.total"
        :current-page-sync= "config.page"
        @current-change= "changePage"
        :page-size= "20"
        >

        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'CommomTable',
    props: {
      tableData: Array ,
      tableLabel: Array,
      config: Object
    },
    data() {
       return {

       }
    },
    methods: {
    handerEdit(){
       this.$emit('edit', row)
    },
    handerDelet() {
      this.$emit('del',row)
    },
    changePage() {
      this.$emit('changePage',row)
    }
    
}
}
</script>
<style lang="less" scoped>
.comomm-tabe{
    height: calc(100%-62px);
    background-color: #fff;
    position: relative;
    .pager{
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
    
</style>