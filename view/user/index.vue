<template>
  <div class="manage">
     <el-dialog
     :title= "operateType === 'add' ? '新增用户' : '更新用户'"
     :visible.sync= "isShow">
     <commom-form
      :formLabel = "operateLabel"
      :form = "operateForm"
      :inline = "true"
      ref = "form">
     
     </commom-form>
     <div slot= "footer" class= "dialog-footer">
        <el-button @click= "isShow = flase">取消</el-button>
        <el-button  type="primary" @click= "confirm">确定</el-button>
     </div>
     </el-dialog>
     <div class="manage-header">
     <el-button  type="primary" @click= "addUser" class="new-add">+ 新增</el-button>
        <commom-form
         :formLabel = "formLabel"
         :form = "searchForm"
         :inline = "true"
         ref = "form">
     <el-button type="primary"  @click= "getList" class="search">搜索</el-button>
     </commom-form>
     </div>
    <commom-table
    :tableData= "tableData"
    :tableLabel= "tableLabel"
    :config= "config"
    @changePage= "getList()"
    @edit= "editUser"
    @del= "delUser"></commom-table>
  </div>
</template>

<script>
import CommomForm from '../../src/components/CommomForm.vue'
import CommomTable from '../../src/components/CommomTable.vue'

export default {
  name: "user",
   components:{
      CommomForm,
      CommomTable
  },
  data() {
    return {
      operateType : 'add',
      isShow : false,
      operateLabel: [
                    {
                        model: 'name',
                        label: '姓名',
                        type: 'input'
                    },
                    {
                        model: 'age',
                        label: '年龄',
                        type: 'input'
                    },
                    {
                        model: 'sex',
                        label: '性别',
                        type: 'select',
                        opts: [
                            {
                                label: '男',
                                value: 1
                            },
                            {
                                label: '女',
                                value: 0
                            }
                        ]
                    },
                    {
                        model: 'birth',
                        label: '出生日期',
                        type: 'date'
                    },
                    {
                        model: 'addr',
                        label: '地址',
                        type: 'input'
                    }
                ],
      operateForm:{
               name:  '',
               addr: '',
               age: '',
               birth: '',
               sex: ''
                },
      formLabel:[
          {
          model: "keyword",
          label: '',
          type: 'input'

        }
      ],
      searchForm:{
        keyword: ''
      },
      tableData:[],
      tableLabel:[
      {
          prop:'name',
          label: '姓名'
      },
      {
          prop:'age',
          label: '年龄'
      },
      {
          prop:'sex',
          label: '性别'
      },
      {
          prop:'birth',
          label: '出生日期',
          width: 200
      },
      {
          prop:'addr',
          label: '地址',
          width: 320
      }
      ],
      config:{
        page: 1,
        total:30 
      }
    }
  },
  methods: {
    confirm() {
      if(this.operateType === 'edit') {
         this.$http.post('/user/edit', this.operateForm).then(res =>{
          this.isShow = false
         })
      }else {
        this.$http.post('/user/add', this.operateForm).then(res =>{
          this.isShow = false
         })
      }

    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
               name:  '',
               addr: '',
               age: '',
               birth: '',
               sex: ''
                }

    },
    getList() {
      
    },
    editUser() {

    },
    delUser() {

    }
   
  }

}
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content:space-between;
  align-items: center;
 .commom-form{
   margin-top: 10px;
}
}
</style>