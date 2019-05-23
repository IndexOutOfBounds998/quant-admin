<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤一</span>
        </div>
        <el-form ref="form" :model="baseData" label-width="80px">
          <el-form-item label="k线类型">
            <el-select v-model="baseData.kline" placeholder="请选择活动区域">
              <el-option label="1分钟" value="1min"></el-option>
              <el-option label="5分钟" value="5min"></el-option>
              <el-option label="30分钟" value="30min"></el-option>
              <el-option label="60分钟" value="60min"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易对">
            <el-input v-model="baseData.symbol" placeholder="比如btcusdt"></el-input>
          </el-form-item>
          <el-form-item label="k线数据量">
            <el-input v-model="baseData.size" placeholder="范围[0,2000]"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤二:买入卖出指标 设定</span>
        </div>

        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>买入指标 设定</span>
            </div>
            <el-form ref="form" :model="indicatorBuy" label-width="80px">
              <el-form-item label="指标">
                <el-select v-model="indicatorBuy.indicator" placeholder="请选择指标">
                  <el-option label="RSI-相对强弱指数" value="RSI"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指定天数">
                <el-input v-model="indicatorBuy.count"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卖出指标 设定</span>
            </div>
            <el-form ref="form" :model="indicatorSell" label-width="80px">
              <el-form-item label="指标">
                <el-select v-model="indicatorSell.indicator" placeholder="请选择指标">
                  <el-option label="RSI-相对强弱指数" value="RSI"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="指定天数">
                <el-input v-model="indicatorSell.count"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>操作</span>
        </div>
        <el-button type="success">回测</el-button>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "InlineEditTable",
  data() {
    return {
      baseData: {
        kline: "1min",
        size: "",
        symbol: ""
      },
      indicatorBuy: {
        indicator: "",
        count: "14"
      },
      indicatorSell: {
        indicator: "",
        count: "14"
      }
    };
  },
  created() {},
  methods: {}
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
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
