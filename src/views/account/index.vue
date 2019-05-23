<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      height="850"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="access key">
        <template slot-scope="scope">
          <span>{{ scope.row.accessKey }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="300px" label="Secret Key">
        <template slot-scope="scope">
          <span  placeholder="password">{{ scope.row.secretKey }}</span>
        </template>
      </el-table-column> -->

      <el-table-column min-width="200px" label="备注说明">
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" width="110">
        <template slot-scope="scope">
          <el-tag :type=" scope.row.isDelete | statusFilter">{{ checkIsDelete(scope.row.isDelete) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" icon="el-icon-info" @click="info(row)">查看</el-button>

          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="access key" prop="access_key">
          <el-input v-model="temp.access_key"/>
        </el-form-item>
        <el-form-item label="sercet key" prop="secret_key">
          <el-input v-model="temp.secret_key"/>
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input v-model="temp.info"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAccountList, createOrUpdateAccount } from "@/api/account.js";
import Pagination from "@/components/Pagination";
import { parseTime } from "@/utils";
import waves from "@/directive/waves"; // Waves directive
import { getToken, setToken, removeToken } from "@/utils/auth";
import { formatDate } from "@/utils/date.js";
export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "danger"
      };
      return statusMap[status];
    },
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
      dialogTitle: "",
      temp: {
        id: "",
        name: "",
        access_key: "",
        secret_key: "",
        info: "",
        userId: getToken()
      },
      listQuery: {
        uid: getToken(),
        page: 1,
        limit: 10
      },
      rules: {
        name: [{ required: true, message: "名称必填", trigger: "blur" }],
        access_key: [
          { required: true, message: "access_key 必填", trigger: "blur" }
        ],
        secret_key: [
          { required: true, message: "secret_key 必填", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const data = await getAccountList(this.listQuery);
      this.list = data.data.records;
      this.total = data.data.total;
      this.listLoading = false;
    },
    checkIsDelete(status) {
      if (status === 1) {
        return "已删除";
      } else {
        return "未删除";
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogTitle = "添加";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleEdit(row) {
      this.dialogStatus = "edit";
      this.dialogTitle = "修改";
      this.dialogFormVisible = true;
      this.temp.id = row.id;
      this.temp.name = row.name;
      this.temp.access_key = row.accessKey;
      this.temp.secret_key = row.secretKey;
      this.temp.info = row.info;
      this.temp.userId = getToken();

      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    resetTemp() {
      this.temp = {
        name: "",
        access_key: "",
        secret_key: "",
        info: "",
        userId: getToken()
      };
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createOrUpdateAccount(this.temp).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createOrUpdateAccount(this.temp).then(() => {
            this.getList();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    info(row) {
      this.$router.push({
        path: "/account/info",
        query: {
          id: row.id
        }
      });
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
