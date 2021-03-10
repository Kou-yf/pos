<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs class="order-nav">
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                prop="goodsName"
                label="商品名称"
                width="120"
              ></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="reduceOrderList(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="addOrderList(scope.row)"
                    >增加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div>
              <p v-show="isEmpty">购物车已经空了，不能再减了!</p>
              <span>总数量: {{ totalCount }}</span
              >&nbsp;&nbsp;&nbsp;
              <span>总金额: {{ totalMoney }}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单"> 挂单 </el-tab-pane>
          <el-tab-pane label="外卖"> 外卖 </el-tab-pane>
        </el-tabs>
        <div>
          <el-button type="warning">挂单</el-button>
          <el-button type="danger" @click="delAll">删除</el-button>
          <el-button type="success" @click="check">结账</el-button>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="showing">
          <h2>常用商品</h2>
          <div class="common-goods">
            <ul>
              <li
                v-for="(goods, index) in offenGoods"
                :key="index"
                @click="addOrderList(goods)"
              >
                <span>{{ goods.goodsName }}</span>
                <span class="o-price">￥{{ goods.price }}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class="cooklist">
                <li v-for="(food, index) in type0Goods" :key="index">
                  <span class="foodImg"><img :src="food.goodsImg" /></span>
                  <span class="foodName">{{ food.goodsName }}</span>
                  <span class="foodPrice"> ￥{{ food.price }}</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食"> 小食 </el-tab-pane>
            <el-tab-pane label="饮料"> 饮料 </el-tab-pane>
            <el-tab-pane label="套餐"> 套餐 </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      offenGoods: [
        {
          goodsName: "可口可乐",
          price: 8,
          goodsId: 1,
        },
        {
          goodsName: "香辣鸡腿堡",
          price: 18,
          goodsId: 2,
        },
        {
          goodsName: "爱心薯条",
          price: 10,
          goodsId: 3,
        },
        {
          goodsName: "甜筒",
          price: 10,
          goodsId: 4,
        },
      ],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0,
      isEmpty: false,
    };
  },
  //   created() {
  //       axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
  //       .then( data => {
  //           console.log(data)
  //       })
  //       .catch()
  //   },
  mounted: function () {
    let fullHight = document.body.clientHeight;
    document.getElementById("order-list").style.height = fullHight + "px";
  },
  methods: {
    addOrderList(goods) {
      this.isEmpty = false;
      //判断是否存在于订单列表中
      let isHave = false,
        index = null;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
          index = i;
        }
      }
      //根据判断结果编写业务逻辑
      if (isHave) {
        let oPrice = this.tableData[index].price / this.tableData[index].count;
        this.tableData[index].count++;
        this.tableData[index].price += oPrice;
      } else {
        let newGoods = {
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1,
          goodsId: goods.goodsId,
        };
        this.tableData.push(newGoods);
      }
      this.totalCount++;
      this.totalMoney += goods.price;
    },
    reduceOrderList(goods) {
      let index = this.tableData.indexOf(goods);
      let oPrice = this.tableData[index].price / this.tableData[index].count;
      if (this.tableData[index].count > 1) {
        this.tableData[index].count--;
        this.tableData[index].price -= oPrice;
      } else {
        this.tableData = this.tableData.filter(
          (ele) => ele.goodsName != goods.goodsName
        );
      }
      this.totalCount--;
      this.totalMoney -= oPrice;
    },
    delAll() {
      if (this.tableData.length == 0) {
        this.isEmpty = true;
      } else {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
      }
    },
    check() {
      if (this.tableData.length != 0) {
            this.tableData = [];
            this.totalMoney = 0;
            this.totalCount = 0;
            this.$message({
            message: "结账成功",
            type: "success",
            });
      }else{
          this.$message.error('不能空结');
      }
    },
  },
};
</script>

<style scoped>
.pos-order {
  background-color: #fff;
  border: 1px solid #fff;
  height: 100%;
}
.order-nav {
  margin-left: 5px;
}

.showing h2 {
  background-color: #fff;
  font-size: 16px;
  text-align: left;
  line-height: 32px;
}
.showing .common-goods ul {
  padding: 15px 20px;
}
.showing .common-goods ul li {
  float: left;
  border: 1px solid #e5e9f2;
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.o-price {
  color: #58b7ff;
}
.showing::after {
  display: block;
  content: "";
  clear: both;
}
</style>
