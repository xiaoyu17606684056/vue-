<template>
  <el-row class= "home" :gutter= "20">
    <el-col :span="8" style="margin-top= 20px">
       <el-card shadow="hover"> 
         <div class="user">
            <img :src= "userImg">
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
         </div>
         <div class="loginInfo">
          <p>上次登录时间:<span>2022-8-8</span></p>
          <p>上次登录地点:<span>广东</span></p>
         </div>
       </el-card>
       <el-card style="margin-top: 20px; height: 360px;">
          <el-table :data= "tableData">
             <el-table-column 
              v-for = "(val,key) in tableLable"
             :key = "key "
             :prop = "key "
             :label = "val">
             </el-table-column>
          </el-table>
       </el-card>
    </el-col>
    <el-col style="margin-top = 20px" :span= "16">
       <div class= "num">
         <el-card shadow="hover" v-for = "item in countData " :index = " item.name + ''" :key = "item.name" :body-style = "{display: 'flex', padding: 0 } ">
            <i class= "icon" :class= "`el-icon-${item.icon}`" :style= "{ background: item.color }"></i>
            <div class="detail">
              <i class="money"> ￥{{item.value}} </i>
              <i class="txt"> {{item.name}} </i>
            </div>
         </el-card>
      </div>
    </el-col>
      <el-card style="height: 250px">
        <div style="height: 250px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 220px"></el-card>
        <el-card style="height: 220px"></el-card>
      </div>
  </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'


export default {  
  name: "home",
  data() {
    return {
       userImg:require('../../src/assets/images/user.png'),
       tableData:[],
       tableLable: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
       },
       countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        }
      ]
    }
  },
  mounted() {
      getData().then(res => {
      const {code, data} = res
      if(code === 20000 ){
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArry = Object.keys(order.data[0])
        const series = []
        keyArry.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArry
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
      }

      console.log(res)
      
      
     })
  }
}

</script>
