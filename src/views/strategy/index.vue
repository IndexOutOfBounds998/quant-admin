<template>
  <div class="app-container">
    <el-tabs type="card" value="first">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="base" :model="baseInfo" label-width="140px">
          <el-form-item label="策略名称:">
            <el-col :span="6">
              <el-input v-model="baseInfo.strategyName" placeholder="名称为了辨别策略,最好不要起重复的名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="baseInfo.isLimitPrice"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="限价"
              inactive-text="市价"
            ></el-switch>
            <template v-if="baseInfo.isLimitPrice">
              <el-form-item label="买入价格:">
                <el-tag>最新购买订单价格基础:</el-tag>
                <el-input-number
                  v-model="baseInfo.buyPrice"
                  :precision="8"
                  :step="0.00000001"
                  :min="-100000000"
                  :max="100000000"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="卖出价格:">
                <el-tag>最新卖出订单价格基础:</el-tag>
                <el-input-number
                  v-model="baseInfo.sellPrice"
                  :precision="8"
                  :step="0.00000001"
                  :min="-100000"
                  :max="100000"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-form-item>

          <el-form-item label="买入数量:">
            <el-row>
              <el-switch v-model="baseInfo.isAllBuy" active-text="全部买" inactive-text="自定义"></el-switch>
              <template v-if="!baseInfo.isAllBuy && baseInfo.isLimitPrice">
                <el-form-item label="买入数量:">
                  <el-input-number
                    v-model="baseInfo.buyAmount"
                    :precision="4"
                    :step="0.0001"
                    :max="100000"
                  ></el-input-number>
                </el-form-item>
              </template>
              <template v-if="!baseInfo.isAllBuy && !baseInfo.isLimitPrice">
                <el-form-item label="交易额必须大于1:">
                  <el-input-number
                    v-model="baseInfo.buyQuotaPrice"
                    :precision="4"
                    :step="0.0001"
                    :max="100000"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-row>
          </el-form-item>
          <el-form-item label="卖出数量:">
            <el-row>
              <el-switch v-model="baseInfo.isAllSell" active-text="全部卖" inactive-text="自定义"></el-switch>
              <template v-if="!baseInfo.isAllSell">
                <el-form-item label="卖出数量:">
                  <el-input-number
                    v-model="baseInfo.sellAmount"
                    :precision="4"
                    :step="0.0001"
                    :max="100000"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-row>
          </el-form-item>

          <el-form-item label="策略周期:">
            <el-input-number v-model="baseInfo.sleep" :min="1" :max="100000"></el-input-number>
            <el-tag>秒执行一次</el-tag>
          </el-form-item>

          <el-form-item label="策略亏损次数:">
            <el-input-number v-model="baseInfo.profit" :min="1" :max="100000"></el-input-number>
            <el-tag type="danger">次后机器人自动关闭</el-tag>
          </el-form-item>

          <el-form-item label="买入总权重:">
            <el-input-number v-model="baseInfo.buyAllWeights" :min="0" :max="1000"></el-input-number>
          </el-form-item>

          <el-form-item label="卖出总权重:">
            <el-input-number v-model="baseInfo.sellAllWeights" :min="0" :max="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="策略一" name="second">
        <el-form ref="setting1" :model="setting1" label-width="120px">
          <el-form-item label="买入:">
            <el-tag type="warning">购买订单20位</el-tag>
            <el-row class="grid-content">
              <el-col>
                <el-tag>产生超过USDT价格:</el-tag>
                <el-input-number
                  v-model="setting1.buyOrdersUsdt"
                  :precision="8"
                  :step="0.00000001"
                  :max="1000000"
                ></el-input-number>
                <el-tag type="success" class="left">买操作</el-tag>
              </el-col>
            </el-row>
            <el-form-item label="买入权重:">
              <el-row>
                <el-input-number v-model="setting1.buyWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item label="卖出:">
            <el-tag type="warning">卖出订单20位</el-tag>
            <el-row class="grid-content">
              <el-col>
                <el-tag>产生超过USDT价格:</el-tag>
                <el-input-number
                  v-model="setting1.sellOrdersUsdt"
                  :precision="8"
                  :step="0.00000001"
                  :max="1000000"
                ></el-input-number>
                <el-tag type="danger" class="left">卖操作</el-tag>
              </el-col>
            </el-row>
            <el-form-item label="卖出权重:">
              <el-row>
                <el-input-number v-model="setting1.sellWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="策略二" name="third">
        <el-form ref="setting2" :model="setting2" label-width="120px">
          <el-form-item label="买入:">
            <el-row class="grid-content">
              <el-col>
                <el-tag>最新单笔购买订单的USDT价格大于:</el-tag>

                <el-input-number
                  v-model="setting2.buyOrderUsdt"
                  :precision="8"
                  :step="0.00000001"
                  :max="1000000"
                ></el-input-number>
                <el-tag type="success" class="left">买操作</el-tag>
              </el-col>
            </el-row>
            <el-form-item label="买入权重:">
              <el-row>
                <el-input-number v-model="setting2.buyWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item label="卖出:">
            <el-row class="grid-content">
              <el-col>
                <el-tag>最新单笔卖出订单的USDT价格大于:</el-tag>

                <el-input-number
                  v-model="setting2.sellOrderUsdt"
                  :precision="8"
                  :step="0.00000001"
                  :max="1000000"
                ></el-input-number>
                <el-tag type="danger" class="left">卖操作</el-tag>
              </el-col>
            </el-row>
            <el-form-item label="卖出权重:">
              <el-row>
                <el-input-number v-model="setting2.sellWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="策略三" name="fourth">
        <el-form ref="setting3" :model="setting3" label-width="120px">
          <el-form-item label="买入:">
            <el-row class="grid-content">
              <el-tag>最新购买订单成交记录价格和</el-tag>

              <el-input-number v-model="setting3.buyDownSecond" :min="1" :max="2000" label="秒"></el-input-number>
              <el-tag>秒之前的订单价格</el-tag>

              <el-tag type="danger">下跌超出</el-tag>
              <el-input-number
                :precision="4"
                v-model="setting3.buyDownPercent"
                :min="0"
                :max="2000"
                label="百分比"
              ></el-input-number>%
              <el-tag type="success" class="left">买操作</el-tag>
            </el-row>
            <el-form-item label="买入权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting3.buyWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item label="卖出:">
            <el-row class="grid-content">
              <el-tag>最新卖出订单成交记录当价格和</el-tag>
              <el-input-number v-model="setting3.sellDownSecond" :min="1" :max="2000" label="秒"></el-input-number>
              <el-tag>秒之前的订单价格</el-tag>
              <el-tag type="danger">下跌超出</el-tag>
              <el-input-number
                :precision="4"
                v-model="setting3.sellDownPercent"
                :min="0"
                :max="100"
                label="百分比"
              ></el-input-number>%
              <el-tag type="danger" class="left">卖操作</el-tag>
            </el-row>
            <el-form-item label="卖出权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting3.sellWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="策略四" name="five">
        <el-form ref="setting4" :model="setting4" label-width="120px">
          <el-form-item label="买入:">
            <el-row class="grid-content">
              <el-tag>最新购买订单成交记录价格和</el-tag>
              <el-input-number v-model="setting4.buyUpSecond" :min="1" :max="2000" label="秒"></el-input-number>
              <el-tag>秒之前的订单价格</el-tag>
              <el-tag type="success">上涨超出</el-tag>
              <el-input-number
                :precision="4"
                v-model="setting4.buyUpPercent"
                :min="0"
                :max="2000"
                label="百分比"
              ></el-input-number>
              <el-tag>%</el-tag>
              <el-tag type="success" class="left">买操作</el-tag>
            </el-row>
            <el-form-item label="买入权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting4.buyWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item label="卖出:">
            <el-row class="grid-content">
              <el-tag>最新卖出订单成交记录当价格和</el-tag>

              <el-input-number v-model="setting4.sellUpSecond" :min="1" :max="2000" label="秒"></el-input-number>
              <el-tag>秒之前的订单价格</el-tag>

              <el-tag type="success">上涨超出</el-tag>
              <el-input-number
                :precision="4"
                v-model="setting4.sellUpPercent"
                :min="0"
                :max="2000"
                label="百分比"
              ></el-input-number>
              <el-tag>%</el-tag>

              <el-tag type="danger" class="left">卖操作</el-tag>
            </el-row>
            <el-form-item label="卖出权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting4.sellWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="策略五">
        <el-form ref="setting5" :model="setting5" label-width="120px">
          <el-form-item label="买入:">
            <el-form-item label="分钟线:">
              <el-select v-model="setting5.buyKline" placeholder="请选择">
                <el-option
                  v-for="item in klines"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="趋势:">
              <el-radio v-model="setting5.buyKlineOption" label="1">上涨趋势</el-radio>
              <el-radio v-model="setting5.buyKlineOption" label="2">下跌趋势</el-radio>
            </el-form-item>
            <el-form-item label="涨跌幅大于:">
              <el-row :gutter="6" class="grid-content">
                <el-col :span="4">
                  <el-input v-model="setting5.buyPercent" placeholder="百分比"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-tag type="danger" class="left">%</el-tag>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="买入权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting5.buyWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
          <el-form-item label="卖出:">
            <el-form-item label="分钟线:">
              <el-select v-model="setting5.sellKline" placeholder="请选择">
                <el-option
                  v-for="item in klines"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="趋势:">
              <el-radio v-model="setting5.sellKlineOption" label="1">上涨趋势</el-radio>
              <el-radio v-model="setting5.sellKlineOption" label="2">下跌趋势</el-radio>
            </el-form-item>
            <el-form-item label="涨跌幅大于:">
              <el-row :gutter="6" class="grid-content">
                <el-col :span="4">
                  <el-input v-model="setting5.sellPercent" placeholder="百分比"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-tag type="danger" class="left">%</el-tag>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="卖出权重:">
              <el-row class="grid-content">
                <el-input-number v-model="setting5.sellWeights" :min="0" :max="1000"></el-input-number>
              </el-row>
            </el-form-item>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane :label="title" name="last">
      
      </el-tab-pane>-->
    </el-tabs>
    <el-row>
      <el-col :offset="6">
        <el-button type="warning" @click="onSubmit()">{{title}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addOrUpdateStrategy, getStrategyById } from "@/api/strategy.js";
export default {
  data() {
    return {
      id: "",
      title: "创建",
      baseInfo: {
        strategyName: "",
        buyAmount: "",
        sellAmount: "",
        buyPrice: "",
        sellPrice: "",
        isAllBuy: true,
        isAllSell: true,
        sleep: "3",
        profit: 1,
        buyAllWeights: 0,
        sellAllWeights: 0,
        isLimitPrice: true,
        buyQuotaPrice: ""
      },
      setting1: {
        buyOrdersUsdt: "",
        sellOrdersUsdt: "",
        buyWeights: 0,
        sellWeights: 0
      },
      setting2: {
        buyOrderUsdt: "",
        sellOrderUsdt: "",
        buyWeights: 0,
        sellWeights: 0
      },
      setting3: {
        buyDownSecond: "",
        buyDownPercent: "",
        sellDownSecond: "",
        sellDownPercent: "",
        buyWeights: 0,
        sellWeights: 0
      },
      setting4: {
        buyUpSecond: "",
        buyUpPercent: "",
        sellUpSecond: "",
        sellUpPercent: "",
        buyWeights: 0,
        sellWeights: 0
      },
      setting5: {
        buyKlineOption: "1",
        sellKlineOption: "1",
        buyKline: "1min",
        sellKline: "1min",
        buyWeights: 0,
        sellWeights: 0,
        buyPercent: "",
        sellPercent: ""
      },
      //1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year
      klines: [
        {
          value: "1min",
          label: "1min"
        },
        {
          value: "5min",
          label: "5min"
        },
        {
          value: "15min",
          label: "15min"
        },
        {
          value: "30min",
          label: "30min"
        },
        {
          value: "60min",
          label: "60min"
        }
      ]
    };
  },
  created() {
    const id = this.$route.query.id;
    this.id = id;
    if (this.id !== undefined) {
      this.title = "修改";
      var params = {
        id: this.id
      };
      const data = getStrategyById(params).then(data => {
        data = data.data;
        this.setting1 = JSON.parse(data.setting1);
        this.setting2 = JSON.parse(data.setting2);
        this.setting3 = JSON.parse(data.setting3);
        this.setting4 = JSON.parse(data.setting4);
        this.setting5 = JSON.parse(data.setting5);

        this.baseInfo.strategyName = data.strategyName;
        this.baseInfo.buyAllWeights = data.buyAllWeights;
        this.baseInfo.sellAllWeights = data.sellAllWeights;
        this.baseInfo.profit=data.profit;
        this.baseInfo.sleep = data.sleep;
        if (data.isLimitPrice === 1) {
          //限价

          this.baseInfo.isLimitPrice = true;
          this.baseInfo.buyPrice = data.buyPrice;
          this.baseInfo.sellPrice = data.sellPrice;

          if (data.isAllBuy === 1) {
            //全部买
            this.baseInfo.isAllBuy = true;
          } else {
            this.baseInfo.isAllBuy = false;
            this.baseInfo.buyAmount = data.buyAmount;
          }
        } else {
          //市价 没有购买 卖出 价格设置
          this.baseInfo.isLimitPrice = false;
          if (data.isAllBuy === 1) {
            //全部买
            this.baseInfo.isAllBuy = true;
          } else {
            this.baseInfo.isAllBuy = false;
            this.baseInfo.buyQuotaPrice = data.buyQuotaPrice;
          }
        }

        if (data.isAllSell === 1) {
          //全部卖
          this.baseInfo.isAllSell = true;
        } else {
          this.baseInfo.isAllSell = false;
          this.baseInfo.sellAmount = data.sellAmount;
        }
      });
    } else {
      title: "创建";
    }
  },
  methods: {
    async onSubmit() {
      var requestData = {
        id: this.id,
        baseInfo: this.baseInfo,
        setting1: this.setting1,
        setting2: this.setting2,
        setting3: this.setting3,
        setting4: this.setting4,
        setting5: this.setting5
      };
      const data = await addOrUpdateStrategy(requestData);
      if (data.code === 20000) {
        this.$notify({
          title: "操作成功",
          message: this.id === undefined ? "创建成功！！！" : "修改成功！！！",
          type: "success",
          duration: 2000
        });

        // this.$router.push({ path: "/strategy/list" });
      }
    }
  }
};
</script>
<style>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin-bottom: 6px;
}
.left {
  margin-left: 15px;
}
.create {
  margin-left: 600px;
  margin-top: 200px;
}
</style>
