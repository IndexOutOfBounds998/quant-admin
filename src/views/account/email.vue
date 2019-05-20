<template>
  <div class="app-container">
    <div class="filter-container" style="margin:10px">
      <el-switch v-model="isEnable" active-text="开启邮件通知" inactive-text="关闭邮件通知"></el-switch>
      <template v-if="isEnable">
        <el-row style=" margin-top: 20px;">
          <el-col :span="8">
            <el-input placeholder="请输入邮箱" v-model="user.sendMail">
              <template slot="prepend">邮箱地址</template>
            </el-input>
          </el-col>
        </el-row>
      </template>
      <el-row style=" margin-top: 20px;margin-left:355px" :span="12" :offset="6">
        <el-button type="primary" @click="emailEditer()">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { emailEditer, getUserEmail } from "@/api/user.js";
export default {
  name: "InlineEditTable",
  data() {
    return {
      isEnable: false,
      user: {
        id: getToken(),
        enableMail: 0,
        sendMail: ""
      }
    };
  },
  created() {
    this.getUserEmail();
  },
  methods: {
    emailEditer() {
      if (this.isEnable) {
        this.user.enableMail = 1;
      } else {
        this.user.enableMail = 0;
      }
      const data = emailEditer(this.user);
      this.$notify({
        title: "成功",
        message: "更新成功",
        type: "success",
        duration: 2000
      });
    },
    async getUserEmail() {
      const data = await getUserEmail(getToken());
      this.user = data.data;
      if (this.user.enableMail === 1) {
        this.isEnable = true;
      } else {
        this.isEnable = false;
      }
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
