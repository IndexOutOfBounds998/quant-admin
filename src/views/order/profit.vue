<template>
  <div class="app-container">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="编号" width="80px"></el-table-column>
      <el-table-column prop="sellOrderId" label="出售订单id" width="110px"></el-table-column>
      <el-table-column prop="buyOrderId" label="买入订单id" width="110px"></el-table-column>

      <el-table-column prop="buyAmount" label="买委托量" width="110px"></el-table-column>

      <el-table-column prop="sellAmount" label="卖委托量"></el-table-column>
      <el-table-column prop="buyPrice" label="买入价格" width="110px"></el-table-column>

      <el-table-column prop="sellPrice" label="卖出价格" width="110px"></el-table-column>
      <el-table-column prop="buyCashAmount" label="买入总交易额" width="110px"></el-table-column>
      <el-table-column prop="sellCashAmount" label="卖出总交易额" width="110px"></el-table-column>
      <el-table-column prop="diff" label="交易额差价" width="110px"></el-table-column>
      <el-table-column prop="divide" label="盈亏率(%)">
        <template slot-scope="scope">
          <span>{{ scope.row.divide | divideCad }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="profitInfo"
    />
  </div>
</template>

<script>
import { getProfitInfo } from "@/api/order.js";
import Pagination from "@/components/Pagination";

import { formatDate } from "@/utils/date.js";
export default {
  components: { Pagination },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    divideCad(data) {
      return (data * 100).toFixed(2) + "%";
    }
  },
  data() {
    return {
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
    this.listQuery.rid = id;
    this.profitInfo();
  },
  methods: {
    async profitInfo() {
      //查看盈亏记录
      const data = await getProfitInfo(this.listQuery);
      this.tableData = data.data.records;
      this.total = data.data.total;
    }
  }
};
</script>