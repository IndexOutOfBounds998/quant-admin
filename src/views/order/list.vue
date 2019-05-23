<template>
  <div class="app-container">
    <div class="filter-container">
     
    </div>
    <div style="magin:20px">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="accountId" label="账户id"></el-table-column>
        <el-table-column prop="orderId" label="订单id"></el-table-column>

        <el-table-column prop="symbol" label="交易对" width="80px"></el-table-column>

        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="amount" label="委托量" width="80px"></el-table-column>

        <el-table-column prop="fieldAmount" label="成交数量" width="80px"></el-table-column>
        <el-table-column prop="fieldCashAmount" label="成交额"></el-table-column>
        <el-table-column prop="fieldFees" label="成交手续费(买入为币，卖出为钱)"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column prop="orderType" label="订单类型">
          <template slot-scope="scope">
            <span>{{ scope.row.orderType | formatOrderType }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="finishedTime" label="订单完成时间">
          <template slot-scope="scope">
            <span>{{ scope.row.finishedTime | formatDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getOrders"
    />
  </div>
</template>

<script>
import { getOrdersByRid } from "@/api/order.js";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/utils/date.js";
export default {
  components: { Pagination },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatOrderType(data) {
      if (data === "buy-market") {
        return "市价购买";
      }
      if (data === "sell-market") {
        return "市价卖出";
      }
      if (data === "buy-limit") {
        return "限价购买";
      }
      if (data === "sell-limit") {
        return "限价卖出";
      }
    }
  },
  data() {
    return {
      robotId: "",
      tableData: [],
      total: 1,
      listQuery: {
        rid: "",
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    const id = this.$route.query.id;
    console.log("robot====" + id);
    this.robotId = id;
    this.listQuery.rid = id;
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const data = await getOrdersByRid(this.listQuery);
      this.tableData = data.data.records;
      this.total = data.data.total;
    }
  }
};
</script>