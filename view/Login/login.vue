<template>
  <el-form
  :model= "form"
  status-icon
  :rules= "rules"
  ref= "form"
  label-width= "100px"
  class="login-container"
  >
  <h3 class="login-tilter">系统登录</h3>
  <el-form-item
  label= "用户名"
  label-width = "80px"
  prop= "username">
  <el-input
  type= "input"
  v-model= "form.username"
  autocomplete= "off"
  placeholder="请输入账号"></el-input>
  </el-form-item>
  <el-form-item
  label= "密码"
  label-width = "80px"
  prop= "password">
  <el-input
  type= "password"
  v-model= "form.password"
  autocomplete= "off"
  placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item class="login-submit">
    <el-button type= "primary" @click="login" class="login-submit">登录</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
// import Mock from 'mockjs'
import {getMenu} from '../../api/data'

export default {
  name: "Login",
  data() {
    return {
        form: {

        },
        rules:{
            username: [
                {required: true, massage: "请输入用户名", trigger: "blur"},
                {
                    min: 3,
                    message: "用户名长度不能低于3位",
                    trigger: "blur"
                }
            ],
             password: [
                {required: true, massage: "请输入密码", trigger: "blur"},
                // {
                //     min: 3,
                //     message: "用户名密码不能低于3位",
                //     trigger: "blur"
                // }
            ]
        }
    }
  },
  methods: {
    login() {
      getMenu(this.form).then( res => {
        console.log(res,'res')
        if(res.code === 20000){
            this.$store.commit('clearMenu')
            this.$store.commit('setMenu',res.data.menu)
            this.$store.commit('setToken',res.data.token)
            this.$store.commit('addMenu',this.$router)
            this.$router.push({name:'home'})
        }
        else {
            this.$message.warning(res.data.message)
        }
      })
    //   const token = Mock.random.guid()
    //   this.$store.commit('setToken',token)
    //   this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="less" scoped>
.el-form{
    width: 250px;
    height: 250px;
    margin:auto;
    margin-top: 200px;
    border: 2px solid blanchedalmond;
    border-radius: 30px;
    h3{
        text-align: center;
        margin:15px 0  15px 0;
    }
    
}
.el-form-item 
.el-input{
    align-items: center;
    margin-right: 20px;
}
</style>