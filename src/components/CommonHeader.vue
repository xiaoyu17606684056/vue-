<template>
<header>
    <div class="l-content" plain icon="el-icon-menu" size="mini">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item  v-for= "item in tags" :key= "item.path" :to= "{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
            <img  class="user" :src="userImg">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >个人中心</el-dropdown-item>
            <el-dropdown-item @click.native= "logOut" >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</header>

</template>



<script>
import { mapState } from 'vuex'

export default{
    name:'CommonHeader',
    data () {
       return{
        userImg:require('../assets/images/user.png')
       }   
    },
    methods: {
        handleMenu(){
            this.$store.commit('collaspe')
        },
        logOut() {
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push('/login')
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabslist
        })
    }  
}
</script>
 




<style lang="less" scoped>
header{
    display: flex;
    height: 100%;
    justify-content:space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 25px;
        
    }
  
}
.el-breadcrumb-item{
    color: #fff;
    font-size: 15px;
    z-index: 10000;
}
.r-content{
    .user{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 25px;
    }
}


</style>