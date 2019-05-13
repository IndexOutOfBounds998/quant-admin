<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">欢迎您:{{ name }}</div> -->
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <!-- TradingView Widget BEGIN -->

    <VueTradingView
      :options="{
      symbol: 'HUOBI:BTCUSDT',
      theme: 'dark',
      width: '100%',
      height: 900,
      interval:1,
      timezone: 'Etc/UTC',
      locale: 'zh_CN',
      toolbar_bg: '#f1f3f6',
      withdateranges: true,
      allow_symbol_change: true,
      watchlist: [
    'HUOBI:BTCUSDT',
    'HUOBI:ETHUSDT',
    'HUOBI:TOPUSDT'],
       studies: [
    'ATR@tv-basicstudies',
    'DM@tv-basicstudies',
    'MACD@tv-basicstudies',
    'MASimple@tv-basicstudies'
  ],
     details: true,
    }"
    />
    <!-- TradingView Widget END -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueTradingView from "vue-trading-view";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  },
  components: {
    VueTradingView
  },
  created() {},
  methods: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 200%;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-tview {
    margin-top: 50px;
    margin-left: 0px;
  }
}
</style>
