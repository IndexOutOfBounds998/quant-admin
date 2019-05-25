<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤一:k线选择</span>
        </div>
        <el-form ref="form" :model="baseData" label-width="80px">
          <el-form-item label="k线类型">
            <el-col :span="5">
              <el-select v-model="baseData.kline" placeholder="请选择k线类型">
                <el-option label="1分钟" value="1min"></el-option>
                <el-option label="5分钟" value="5min"></el-option>
                <el-option label="30分钟" value="30min"></el-option>
                <el-option label="60分钟" value="60min"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="交易对">
            <el-col :span="5">
              <el-input v-model="baseData.symbol" placeholder="比如btcusdt" width="100px"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="k线数据量">
            <el-col :span="5">
              <el-input v-model="baseData.size" placeholder="范围[0,2000]" width="100px"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤二:买入卖出指标 设定</span>
        </div>

        <el-tabs type="border-card">
          <el-tab-pane label="简单设定">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>买入指标 设定</span>
                </div>
                <el-form ref="form" :model="baseData.indicatorBuy" label-width="80px">
                  <el-form-item label="指标选择">
                    <el-select v-model="baseData.indicatorBuy.indicator" placeholder="请选择指标">
                      <el-option label="RSI-相对强弱指数" value="RSI"></el-option>
                      <el-option label="ADX-平均趋向指标" value="ADX"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="指定天数">
                    <el-input v-model="baseData.indicatorBuy.count"></el-input>
                  </el-form-item>

                  <el-form-item label="指标指数">
                    <el-input v-model="baseData.indicatorBuy.value"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>卖出指标 设定</span>
                </div>
                <el-form ref="form" :model="baseData.indicatorSell" label-width="80px">
                  <el-form-item label="指标选择">
                    <el-select v-model="baseData.indicatorSell.indicator" placeholder="请选择指标">
                      <el-option label="RSI-相对强弱指数" value="RSI"></el-option>
                      <el-option label="ADX-平均趋向指标" value="ADX"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="指定天数">
                    <el-input v-model="baseData.indicatorSell.count"></el-input>
                  </el-form-item>
                  <el-form-item label="指标指数">
                    <el-input v-model="baseData.indicatorSell.value"></el-input>
                  </el-form-item>
                </el-form>
              </el-card>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="进阶设定">进阶设定</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>操作</span>
        </div>
        <el-button type="success" @click="handleTest">开始回测</el-button>

        <ve-line :data="chartData" :mark-line="markLine" :settings="chartSettings"></ve-line>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import "echarts/lib/component/markLine";
import { backTest } from "@/api/indicator.js";
export default {
  name: "InlineEditTable",
  components: { VeLine },
  data() {
    this.chartSettings = {
      yAxis: {
        min: 200,
        max: 300
      }
    };
    this.markLine = {
      data: [
        {
          name: "买入",
          xAxis: "100"
        },
        {
          name: "卖出",
          xAxis: "200"
        }
      ]
    };
    return {
      chartData: {
        columns: ["日期", "价格"],
        rows: []
      },
      baseData: {
        kline: "30min",
        size: "2000",
        symbol: "ethusdt",
        indicatorBuy: {
          indicator: "RSI",
          count: "14",
          value: "30"
        },
        indicatorSell: {
          indicator: "RSI",
          count: "14",
          value: "70"
        }
      }
    };
  },
  created() {},
  methods: {
    //执行回测
    async handleTest() {
      const data = await backTest(this.baseData);
      this.chartData.rows = data.data.data;
      this.markLine.data = data.data.buyOrSell;
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
