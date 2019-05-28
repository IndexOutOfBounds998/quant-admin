<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤一 :k线选择（交易对和k线数据量仅回测时候用）</span>
        </div>
        <el-form label-width="80px">
          <el-form-item label="k线类型">
            <el-col :span="5">
              <el-select v-model="baseData.kline" placeholder="请选择k线类型">
                <el-option label="1分钟" value="1min"></el-option>
                <el-option label="5分钟" value="5min"></el-option>
                <el-option label="30分钟" value="30min"></el-option>
                <el-option label="60分钟" value="60min"></el-option>
                <el-option label="一天" value="1day"></el-option>
                <el-option label="一月" value="1mon"></el-option>
                <el-option label="一周" value="1week"></el-option>
                <el-option label="一年" value="1year"></el-option>
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

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤二:指标 设定</span>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="dialogVisible = true"
            style="float:right"
          ></el-button>
        </div>

        <el-card>
          <div slot="header" class="clearfix">指标列表</div>
          <el-table :data="indicatorList" style="width: 100%">
            <el-table-column prop="name" label="指标名称" width="180"></el-table-column>
            <el-table-column prop="value" label="指标" width="180"></el-table-column>
            <el-table-column prop="params" label="数值/天数" width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.params===-1">价格</span>
                <span v-else-if="scope.row.params===-2">成交量</span>
                <span v-else>{{scope.row.params}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, indicatorList)"
                  type="text"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>买入设定</span>
          <el-button type="success" icon="el-icon-plus" @click="showBuySetting" style="float:right"></el-button>
        </div>

        <el-table :data="baseData.indicatorBuy" style="width: 100%">
          <el-table-column prop="condition" label="指标关系" width="180"></el-table-column>
          <el-table-column prop="ruleFirst.name" label="名称" width="180"></el-table-column>
          <el-table-column prop="compare.label" label="比较" width="180"></el-table-column>
          <el-table-column prop="ruleSecond.name" label="名称" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, baseData.indicatorBuy)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卖出设定</span>
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="showSellSetting"
            style="float:right"
          ></el-button>
        </div>

        <el-table :data="baseData.indicatorSell" style="width: 100%">
          <el-table-column prop="condition" label="指标关系" width="180"></el-table-column>
          <el-table-column prop="ruleFirst.name" label="名称" width="180"></el-table-column>
          <el-table-column prop="compare.label" label="比较" width="180"></el-table-column>
          <el-table-column prop="ruleSecond.name" label="名称" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, baseData.indicatorSell)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤三:止盈止损 设定</span>
        </div>
        <el-row>
          <el-tag type="warning">tips:不填或者填0则不生效</el-tag>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-card class="box-card">
              <el-input placeholder="默认不填不生效" v-model="baseData.stopGain">
                <template slot="prepend">止盈百分比</template>
              </el-input>

              <hr style="border:1 dashed #303133;margin:10px" width="100%" color="white" size="1">

              <el-input placeholder="默认不填不生效" v-model="baseData.stopLoss">
                <template slot="prepend">止损百分比</template>
              </el-input>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-row>

    <el-row :gutter="15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>操作</span>
        </div>
        <el-button type="success" @click="handleTest">开始回测</el-button>
        <el-button type="success" @click="handleSave">保存策略</el-button>

        <ve-line :data="chartData" :mark-line="markLine" :settings="chartSettings"></ve-line>
      </el-card>
    </el-row>

    <el-dialog title="新增指标" :visible.sync="dialogVisible" width="60%">
      <el-form ref="indicatorForm" :model="indicator" label-width="180px">
        <el-form-item label="命名">
          <el-input v-model="indicator.name" placeholder="命名" style="width:230px"></el-input>
        </el-form-item>

        <el-form-item label="指标选择">
          <el-select v-model="indicator.value" placeholder="请选择指标">
            <el-option label="RSI-相对强弱指数" value="RSI"></el-option>
            <el-option label="ADX-平均趋向指标" value="ADX"></el-option>
            <el-option label="SMA-简单移动平均线" value="SMA"></el-option>
            <el-option label="EMA-指数移动平均线" value="EMA"></el-option>
            <el-option label="CCI-商品通道指数" value="CCI"></el-option>
            <el-option label="AO-令人敬畏的振荡器" value="AO"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指定天数/数值">
          <el-input
            v-model="indicator.params"
            placeholder="如14,3,3(价格 成交量 直接填具体数值"
            style="width:230px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addIndicator">新 增</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增指标关系" :visible.sync="dialogCompare" width="60%">
      <el-form label-width="180px">
        <el-form-item label="类型选择">
          <el-select v-model="indicatorRelation.condition" placeholder="and/or">
            <el-option label="and 和选项" value="and"></el-option>
            <el-option label="or 或选项" value="or"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指标选择">
          <el-select v-model="indicatorRelation.ruleFirst" value-key="params" placeholder="请选择指标">
            <el-option
              v-for="item in indicatorList"
              :label="item.name"
              :key="item.params"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="比较">
          <el-select v-model="indicatorRelation.compare" placeholder="请选择" @change="compareChange">
            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <template v-if="!numBool">
          <el-form-item label="指标选择">
            <el-select v-model="indicatorRelation.ruleSecond" value-key="params" placeholder="请选择指标">
              <el-option
                v-for="item in indicatorList"
                :label="item.name"
                :key="item.params"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="数值">
            <el-input
              v-model="indicatorRelation.ruleSecond.value"
              placeholder="具体数值"
              style="width:230px"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCompare = false">取 消</el-button>
        <el-button type="primary" @click="addIndicatorRelation">新 增</el-button>
      </span>
    </el-dialog>
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
      isBuy: true,
      numBool: false,
      dialogVisible: false, //添加指标的dialog
      dialogCompare: false, //添加关系的dialog
      indicator: {
        name: "",
        value: "RSI",
        params: ""
      },
      indicatorRelation: {
        condition: "",
        compare: {
          name: "",
          value: ""
        },
        ruleFirst: { name: "", value: "", params: "" },
        ruleSecond: { name: "", value: "", params: "" }
      }, // 指标数值比较的model
      indicatorList: [],
      options: [
        {
          label: "数值比较",
          options: [
            {
              value: "num_up",
              label: "大于"
            },
            {
              value: "num_down",
              label: "小于"
            },
            {
              value: "num_equal",
              label: "等于"
            }
          ]
        },
        {
          label: "交叉指标",
          options: [
            {
              value: "cross_up",
              label: "交叉向上"
            },
            {
              value: "cross_down",
              label: "交叉向下"
            }
          ]
        }
      ],
      baseData: {
        stopLoss: 0,
        stopGain: 0,
        kline: "30min",
        size: "2000",
        symbol: "ethusdt",
        indicatorBuy: [],
        indicatorSell: []
      },
      chartData: {
        columns: ["日期", "价格"],
        rows: []
      }
    };
  },
  created() {
    var ls = [
      {
        name: "价格",
        value: "price",
        params: -1
      },
      {
        name: "成交量",
        value: "amount",
        params: -2
      }
    ];
    this.indicatorList = this.indicatorList.concat(ls);
  },
  methods: {
    //执行回测
    async handleTest() {
      const data = await backTest(this.baseData);
      this.chartData.rows = data.data.data;
      this.markLine.data = data.data.buyOrSell;
    },
    handleSave() {},
    addIndicator() {
      var cloneOfA = JSON.parse(JSON.stringify(this.indicator));
      this.indicatorList.push(cloneOfA);
      this.dialogVisible = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    compareChange($event) {
      var value = $event.value;
      if (value.includes("num")) {
        this.numBool = true;
      } else {
        this.numBool = false;
      }
    },
    addIndicatorRelation() {
      var cloneOfA = JSON.parse(JSON.stringify(this.indicatorRelation));

      console.log(this.indicatorRelation);
      if (this.numBool) {
        //如果是数值
        cloneOfA.ruleSecond.name = "number";
      }
      console.log("cloneOfA" + JSON.stringify(cloneOfA));
      if (this.isBuy) {
        this.baseData.indicatorBuy.push(cloneOfA);
      } else {
        this.baseData.indicatorSell.push(cloneOfA);
      }
      this.dialogCompare = false;

      this.indicatorRelation = {
        condition: "",
        compare: {
          name: "",
          value: ""
        },
        ruleFirst: {},
        ruleSecond: {}
      };

      console.log("indicatorRelation" + JSON.stringify(this.indicatorRelation));
    },
    showBuySetting() {
      this.dialogCompare = true;
      this.isBuy = true;
    },
    showSellSetting() {
      this.dialogCompare = true;
      this.isBuy = false;
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
