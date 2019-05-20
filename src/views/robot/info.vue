<template>
  <div class="app-container">
    <el-table :data="tableData" stripe border height="850" style="width: 100%">
      <el-table-column prop="robotId" label="机器人编号" width="200"></el-table-column>
      <el-table-column prop="msg" label="日志信息">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>机器人编号: {{ scope.row.robotId }}</p>
            <p>日志信息: {{ scope.row.msg }}</p>
            <div slot="reference" class="name-wrapper">
              <i class="el-icon-arrow-down"></i>
              <el-tag type="info">{{ scope.row.msg }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>

          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getRobots, operatingRobot, deleteRobot } from "@/api/robot.js";
export default {
  data() {
    return {
      robotId: 1,
      tableData: [],
      socket: "",
      stompClient: ""
    };
  },
  created() {
    const id = this.$route.query.id;
    this.robotId = id;
    if (this.robotId !== undefined) {
      this.initWebSocket();
    }
  },
  destroyed() {
    if (this.robotId !== undefined) {
      this.disconnect();
    }
  },
  methods: {
    initWebSocket() {
      this.connection();
      let self = this;
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          self.stompClient.send("test");
        } catch (err) {
          console.log("断线了: " + err);
          self.connection();
        }
      }, 5000);
    },
    removeTab(targetName) {
      console.log(targetName);
    },
    connection() {
      const baseUrl = process.env.BASE_API;
      // 建立连接对象
      this.socket = new SockJS(baseUrl + "/robotLog"); //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket);
      // 定义客户端的认证信息,按需求配置
      var headers = {
        login: "mylogin",
        passcode: "mypasscode",
        // additional header
        "client-id": "my-client-id"
      };
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,
        frame => {
          this.stompClient.subscribe("/topic/" + this.robotId, msg => {
            // 订阅服务端提供的某个topic
            if (this.tableData.length >= 100) {
              this.tableData = [];
            }
            var json = JSON.parse(msg.body);
            this.tableData.unshift(json);
          });
        },
        err => {
          // 连接发生错误时的处理函数
          console.log(err);
        }
      );
    },
    // 断开连接
    disconnect() {
      if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
      }
    }
  }
};
</script>