<script>
import {defineComponent} from 'vue'
import {DeleteFilled, Edit} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PlayerHealthList",
  components: {Edit, DeleteFilled},
  data() {
    return {
      playerHealthList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      playerHealthQueryData: {
        plId: '', plMaxHeartRate: '', plMinHeartRate: '', plAvgHeartRate: '', plTotalDistance: '', plSprint: ''
      },
    }
  },
  methods: {
    getPlayerHealthList() {
      this.$http.post("/sdsb/playerhealth/queryPlayerHealths", this.playerHealthQueryData).then(response => {
        const res = response.data;
        this.playerHealthList.responseData = res.data;
        this.playerHealthList.code = res.code;
        this.playerHealthList.total = res.total;
        this.playerHealthList.message = res.message;
      })
    },
    deletePlayerHealth(plId) {
      const alertMessage = "删除编号为" + plId + "的运动员健康信息？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
            this.$http.post("/sdsb/playerHealth/deletePlayerHealth", {plId: plId}).then(response => {
              const code = response.data.code;
              if (code === 200) {
                ElMessageBox.alert("操作成功", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getPlayerHealthList();
                  return r
                })
              } else {
                ElMessageBox.alert("操作失败", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getPlayerHealthList();
                  return r
                })
              }
            })
          }
      )
          .catch(() => {
          })
    },
    turnAdd() {
      this.$router.push({
        path: `/playerHealth/playerHealthAdd`
      })
    },
    turnEdit(plId) {
      this.$router.push({
        path: `/playerHealth/playerHealthEdit/${plId}`
      })
    },
  },
  created() {
    this.getPlayerHealthList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="playerHealthQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="运动员编号:">
              <el-input v-model="playerHealthQueryData.plId" placeholder="请输入运动员编号"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="最大心率:">
              <el-input v-model="playerHealthQueryData.plMaxHeartRate" placeholder="请输入最大心率"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="最小心率:">
              <el-input v-model="playerHealthQueryData.plMinHeartRate" placeholder="请输入最小心率"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="平均心率:">
              <el-input v-model="playerHealthQueryData.plAvgHeartRate" placeholder="请输入平均心率"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="总距离:">
              <el-input v-model="playerHealthQueryData.plTotalDistance" placeholder="请输入总距离"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="冲刺次数:">
              <el-input v-model="playerHealthQueryData.plSprint" placeholder="请输入冲刺次数"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getPlayerHealthList">查询运动员健康信息</el-button>
            </el-col>
            <el-col :span="2"/>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增运动员健康信息</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="playerHealthList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="运动员编号" prop="plId" width="100"/>
          <el-table-column label="最大心率" prop="plMaxHeartRate" width="100"/>
          <el-table-column label="最小心率" prop="plMinHeartRate" width="100"/>
          <el-table-column label="平均心率" prop="plAvgHeartRate" width="100"/>
          <el-table-column label="总距离" prop="plTotalDistance" width="100"/>
          <el-table-column label="冲刺次数" prop="plSprint" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col :span="4">
                  <el-tooltip
                      class="box-item"
                      content="编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="turnEdit(scope.row.plId)">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col :span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deletePlayerHealth(scope.row.plId)">
                      <DeleteFilled/>
                    </el-icon>
                  </el-tooltip>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.form-label {
  font-weight: bold;
}
</style>