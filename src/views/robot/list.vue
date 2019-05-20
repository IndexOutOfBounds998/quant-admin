<template>
  <div class="app-container">
    <el-table :data="tableData" stripe border height="850" style="width: 100%">
      <el-table-column prop="id" label="机器人编号" width="105px"></el-table-column>
      <el-table-column prop="robotName" label="机器人名称" width="105px">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span>{{ scope.row.robotName }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="strategyId" label="策略编号" width="105px"></el-table-column>
      <el-table-column prop="strategyName" label="策略名称" width="105px"></el-table-column>

      <el-table-column prop="symbol" label="交易对" width="85px"></el-table-column>
      <el-table-column prop="clientAddress" label="托管地址" width="165px"></el-table-column>

      <el-table-column prop="isRun" label="运行状态" width="135px">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-if="scope.row.isRun===0" style="margin-left: 10px">
            <el-tag size="medium" type="warning">未启动</el-tag>
          </span>
          <span v-else style="margin-left: 10px">
            <el-tag size="medium" type="success">运行中</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="600px">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isRun===0"
            @click="operatingRobot(scope.row.id,1)"
            type="success"
            size="small"
          >启动</el-button>
          <el-button v-else @click="operatingRobot(scope.row.id,0)" type="warning" size="small">停止</el-button>
          <el-button @click="robotInfo(scope.row)" type="info" size="small">实时日志</el-button>
          <el-button @click="orderInfo(scope.row.id)" type="warning" size="small">订单</el-button>
          <el-button
            icon="el-icon-info"
            type="info"
            size="small"
            @click="profitInfo(scope.row.id)"
          >盈亏</el-button>
          <el-button @click="changeRobot(scope.row.id)" type="primary" size="small">修改</el-button>
          <el-button @click="deleteRobot(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRobots, operatingRobot, deleteRobot } from "@/api/robot.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getRobots();
  },
  methods: {
    async getRobots() {
      const data = await getRobots();
      this.tableData = data.data;
    },
    operatingRobot(id, state) {
      this.$confirm("请谨慎操作,是否确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.robotStartOrStop(id, state);
        })
        .catch(() => {});
    },
    robotInfo(row) {
      this.$router.push({
        path: "/robot/info",
        query: {
          id: row.id
        }
      });
    },
    changeRobot(id) {
      this.$router.push({
        path: "/robot/index",
        query: {
          id: id
        }
      });
    },
    deleteRobot(id) {
      this.$confirm("是否删除该机器人,确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRobotById(id);
        })
        .catch(() => {});
    },
    async deleteRobotById(id) {
      const query = { id: id };
      const data = await deleteRobot(query);
      if (data.code === 20000) {
        this.getRobots();
        this.$notify({
          title: "成功",
          message: "机器人删除成功",
          type: "success",
          duration: 2000
        });
      }
    },
    async robotStartOrStop(id, state) {
      const query = { id: id, state: state };
      const data = await operatingRobot(query);
      if (data.code === 20000) {
        var find = this.tableData.find(function(data) {
          return data.id === id;
        });
        if (state === 1) {
          //启动
          find.isRun = 1;
          this.$notify({
            title: "成功",
            message: "机器人成功启动",
            type: "success",
            duration: 2000
          });
        } else {
          find.isRun = 0;
          this.$notify({
            title: "成功",
            message: "机器人成功关闭",
            type: "success",
            duration: 2000
          });
        }
      }
    },
    orderInfo(id) {
      this.$router.push({
        path: "/order/list",
        query: {
          id: id
        }
      });
    },
    profitInfo(robotId) {
      //查看盈亏记录
      this.$router.push({
        path: "/order/profit",
        query: {
          id: robotId
        }
      });
    }
  }
};
</script>