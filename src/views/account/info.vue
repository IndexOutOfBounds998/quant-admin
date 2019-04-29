<template>
  <div class="app-container">
    <el-table  border height="850" :data="tableData" v-loading="listLoading" stripe style="width: 100%">
      <el-table-column prop="type" label="账户类型" width="180"></el-table-column>
      <el-table-column prop="currency" label="币名称" width="180"></el-table-column>
      <el-table-column prop="tradeBalance" label="交易余额"></el-table-column>
      <el-table-column prop="frozenBalance" label="冻结余额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBalanceList } from "@/api/account.js";
export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      accountId: ""
    };
  },
  created() {
    const id = this.$route.query.id;
    this.accountId = id;
    var queryData = {
      accountId: this.accountId
    };
    this.getBalanceList(queryData);
  },
  methods: {
    async getBalanceList(queryData) {
      this.listLoading = true;
      const data = await getBalanceList(queryData);
      this.tableData = data.data;
      this.listLoading = false;
    }
  }
};
</script>