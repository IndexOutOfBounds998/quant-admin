<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >添加新的策略</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="策略名称">
        <template slot-scope="scope">
          <span>{{ scope.row.strategyName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="策略购买总权重">
        <template slot-scope="scope">
          <span>{{ scope.row.buyAllWeights }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" label="策略卖出总权重">
        <template slot-scope="scope">
          <span>{{ scope.row.sellAllWeights }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="是否限价" width="110">
        <template slot-scope="scope">
          <el-tag>{{ checkIsLimitPrice(scope.row.isLimitPrice) }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="300px" label="购买价格(当前最优价格基础)">
        <template slot-scope="scope">
          <span>{{ scope.row.buyPrice }}</span>
        </template>
      </el-table-column>-->

      <el-table-column class-name="status-col" label="是否全部购买" width="110">
        <template slot-scope="scope">
          <el-tag>{{ checkBuyState(scope.row.isAllBuy) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="是否全部卖出" width="110">
        <template slot-scope="scope">
          <el-tag>{{ checkSellState(scope.row.isAllSell) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="策略周期">
        <template slot-scope="scope">
          <span>{{ scope.row.sleep }}秒</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >修改策略</el-button>
          <el-button type="danger" @click="delectStrategy(row.id)">删除策略</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStrategys, deleteStrategy } from "@/api/strategy.js";
import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";
import waves from "@/directive/waves"; // Waves directive
export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "danger"
      };
      return statusMap[status];
    }
  },
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 1,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: "",
      temp: {
        access_key: "",
        secret_key: "",
        info: ""
      },
      listQuery: {
        uid: 1,
        page: 1,
        limit: 10
      },
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getStrategys();
  },
  methods: {
    async getStrategys() {
      this.listLoading = true;
      const data = await getStrategys();
      this.list = data.data;
      this.listLoading = false;
    },
    checkIsLimitPrice(status) {
      if (status === 1) {
        return "限价";
      } else {
        return "市价";
      }
    },
    confirmEdit(row) {
      //修改策略
      this.$router.push({
        path: "/strategy/index",
        query: {
          id: row.id
        }
      });
    },
    delectStrategy(id) {
      this.$confirm("机器人可能在使用该策略, 是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var queryParam = {
            id: id
          };
          this.deleteStrategyById(queryParam);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async deleteStrategyById(queryParam) {
      const data = await deleteStrategy(queryParam);
      this.getStrategys();
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    checkBuyState(status) {
      if (status === 1) {
        return "全部购买";
      } else {
        return "自定义购买";
      }
    },
    checkSellState(status) {
      if (status === 1) {
        return "全部卖出";
      } else {
        return "自定义卖出";
      }
    },
    handleCreate() {
      this.$router.push({ path: "/strategy/index" });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
