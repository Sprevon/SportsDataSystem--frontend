<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";
import {DeleteFilled, Edit} from "@element-plus/icons-vue";

export default defineComponent({
  name: "PlayerList",
  components: {Edit, DeleteFilled},
  data() {
    return {
      playerList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      playerQueryData: {
        plId: '', plName: '', plNation: '', plState: '', plField: '', plPosition:'', plDeviceId:''
      },
    }
  },
  methods: {
    //查询运动员
    getPlayerList() {
      this.$http.post("/sdsb/player/queryPlayers", this.playerQueryData).then(response => {
        const res = response.data;
        this.playerList.responseData = res.data;
        this.playerList.code = res.code;
        this.playerList.total = res.total;
        this.playerList.message = res.message;
      })
    },
    //删除运动员
    deleteCms(plId) {
      const alertMessage = "删除编号为" + plId + "的运动员？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
            this.$http.post("/sdsb/player/deletePlayer", {plId: plId}).then(response => {
              const code = response.data.code;
              if (code === 200) {
                ElMessageBox.alert("操作成功", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  //修改成功后刷新页面
                  this.getPlayerList();
                  return r
                })
              } else {
                ElMessageBox.alert("操作失败", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getPlayerList();
                  return r
                })
              }
            })
          }
      )
          .catch(() => {
          })
    },
    //新增运动员
    turnAdd() {
      this.$router.push({
        path: `/player/playerAdd`
      })
    },
    //修改运动员
    turnEdit(plId) {
      this.$router.push({
        path: `/player/playerEdit/${plId}`
      })
    },
  },
  created() {
    this.getPlayerList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="playerQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="运动员编号:">
              <el-input v-model="playerQueryData.plId" placeholder="请输入运动员编号"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="运动员名称:">
              <el-input v-model="playerQueryData.plName" placeholder="请输入运动员名称"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="运动员国籍:">
              <el-input v-model="playerQueryData.plNation" placeholder="请输入运动员国籍"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="运动员状态:">
              <el-input v-model="playerQueryData.plState" placeholder="请输入运动员状态"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="运动种类:">
              <el-input v-model="playerQueryData.plField" placeholder="请输入运动种类"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="场上位置:">
              <el-input v-model="playerQueryData.plPosition" placeholder="请输入场上位置"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="使用设备序号:">
              <el-input v-model="playerQueryData.plDeviceId" placeholder="请输入使用设备序号"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getPlayerList">查询运动员</el-button>
            </el-col>
            <el-col :span="1"/>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增运动员</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="playerList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="运动员编号" prop="plId" width="100"/>
          <el-table-column label="运动员名称" prop="plName" width="180"/>
          <el-table-column label="运动员国籍" prop="plNation" width="100"/>
          <el-table-column label="运动员状态" prop="plState" width="100"/>
          <el-table-column label="运动种类" prop="plField" width="100"/>
          <el-table-column label="场上位置" prop="plPosition" width="100"/>
          <el-table-column label="使用设备序号" prop="plDeviceId" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="运动员编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="turnEdit(scope.row.plId)">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除运动员"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCms(scope.row.plId)">
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
.pagination-in-list {
  text-align: center;
  justify-content: center;
  margin: 20px;
}

.form-label {
  font-weight: bold;
}
</style>