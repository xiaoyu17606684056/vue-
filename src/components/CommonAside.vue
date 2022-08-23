<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{isCollapse?'后台':'后台管理系统'}}</h3>
    <el-menu-item
      @click="cilckMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu  v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for = "(subItem,subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click = "cilckMenu(subItem)" :index="subIndex.toString()">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height : 100% ;
}
.el-menu {
  height: 100vh;
  border: none;
  background-color: #545c64;
  h3 {
    text-align: center;
    margin-left: -25px;
    color: #fff;
    line-height: 48px;
    
  }
}
</style>

<script>
// import { FormItem } from "element-ui"
export default {
  data() {
    return {
      menu: [

      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    cilckMenu(item) {
      this.$router.push({
        name: item.name
        
      })
      this.$store.commit('selectMemu',item)
    }
  },
  computed: {
    noChildren() {
      return this.asnycMenu.filter((item) => !item.children)
    },
    hasChildren() {
      return this.asnycMenu.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asnycMenu() {
      return this.$store.state.tab.menu
    }

  }
}
</script>