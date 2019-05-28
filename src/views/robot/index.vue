<template>
  <div class="app-container">
    <el-form ref="form" :model="robot" :rules="rules" label-width="120px">
      <el-form-item label="机器人名称:" prop="robotName">
        <el-col :span="6">
          <el-input v-model="robot.robotName" placeholder="例如起名为:topusdt机器人"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="策略选择:" prop="strategyId">
        <el-select v-model="robot.strategyId" placeholder="请选择策略">
          <el-option
            v-for="item in strategys"
            :key="item.id"
            :label="item.strategyName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="api账号选择:" prop="accountId">
        <el-select v-model="robot.accountId" placeholder="请选择账号">
          <el-option v-for="item in accounts" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="交易对选择:" prop="symbol">
        <el-select :filterable="true" v-model="robot.symbol" placeholder="请选择交易对">
          <el-option
            v-for="item in symbols"
            :key="item.symbol"
            :label="item.symbol"
            :value="item.symbol"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="节点选择:" prop="nodeAddress">
        <el-select
          v-model="robot.nodeAddress"
          placeholder="请选择节点"
          value-key="ipo"
          @change="ipChange"
        >
          <el-option v-for="item in nodes" :key="item.ipo" :label="item.ipo" :value="item.ipo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{title}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSimpleStrategys } from "@/api/strategy.js";
import { getNodes } from "@/api/nodes.js";
import { getSymbols } from "@/api/symbol.js";
import { getRobotById, addOrUpdateRobot } from "@/api/robot.js";
import { getAccounts } from "@/api/account.js";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  data() {
    return {
      title: "立即创建",
      robot: {
        id: "",
        robotName: "",
        strategyId: "",
        accountId: "",
        nodeAddress: "",
        symbol: ""
      },
      strategys: [],
      nodes: [],
      symbols: [],
      accounts: [],
      listQuery: {
        uid: getToken()
      },
      rules: {
        robotName: [
          { required: true, message: "请输入机器人名称", trigger: "blur" }
        ],
        strategyId: [
          {
            type: "number",
            required: true,
            message: "请选择策略",
            trigger: "change"
          }
        ],
        accountId: [
          {
            type: "number",
            required: true,
            message: "请选择账号",
            trigger: "change"
          }
        ],
        nodeAddress: [
          { required: true, message: "请选择节点地址", trigger: "change" }
        ],
        symbol: [{ required: true, message: "请选择交易对", trigger: "change" }]
      }
    };
  },
  created() {
    const id = this.$route.query.id;
    if (id !== undefined) {
      this.title = "立即修改";
      this.robot.id = id;
      const data = getRobotById(id).then(data => {
        console.log(data);
        this.robot = data.data;
        this.robot.nodeAddress = data.data.clientAddress;
      });
    }

    this.getStrategys();
    this.getNodes();
    this.getSymbols();
    this.getAccounts();
  },
  methods: {
    //获取策略
    async getStrategys() {
      const data = await getSimpleStrategys();
      this.strategys = data.data;
    },
    //获取节点
    async getNodes() {
      const data = await getNodes();
      this.nodes = data.data;
    },
    //获取交易对
    async getSymbols() {
      const data = await getSymbols();
      this.symbols = data.data;
    },
    //获取账号列表
    async getAccounts() {
      const data = await getAccounts(this.listQuery);
      this.accounts = data.data;
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addOrUpdateRobot(this.robot).then(data => {
            console.log("res=====" + data);
            if (data.code === 20000) {
              this.$notify({
                title: "成功",
                message:
                  this.robot.id === undefined
                    ? "机器人创建成功"
                    : "机器人修改成功",
                type: "success",
                duration: 2000
              });
              this.$router.push("/robot/list");
            }
          });
        } else {
          this.$notify({
            title: "提示",
            message: "请填写完整的信息",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    ipChange($event) {
      console.log($event);
      this.robot.nodeAddress = $event;
    }
  }
};
</script>