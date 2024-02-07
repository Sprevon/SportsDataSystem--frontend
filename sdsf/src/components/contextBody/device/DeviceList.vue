<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";
import {DeleteFilled, Edit} from "@element-plus/icons-vue";

export default defineComponent({
  name: "DeviceList",
  components: {Edit, DeleteFilled},
  data() {
    return {
      deviceList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      deviceQueryData: {
        deviceId: '', deviceField: '', deviceKind: '', deviceState: ''
      },
    }
  },
  methods: {
    //查询设备
    getDeviceList() {
      this.$http.post("/sdsb/device/queryDevices", this.deviceQueryData).then(response => {
        const res = response.data;
        this.deviceList.responseData = res.data;
        this.deviceList.code = res.code;
        this.deviceList.total = res.total;
        this.deviceList.message = res.message;
      })
    },
    //删除设备
    deleteCms(deviceId) {
      const alertMessage = "删除编号为" + deviceId + "的设备？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
            // console.log('1231231')}
            this.$http.post("/sdsb/device/deleteDevice", {deviceId: deviceId}).then(response => {
              const code = response.data.code;
              if (code === 200) {
                ElMessageBox.alert("操作成功", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  //修改成功后刷新页面
                  this.getDeviceList();
                  return r
                })
              } else {
                ElMessageBox.alert("操作失败", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getDeviceList();
                  return r
                })
              }
            })
          }
      )
          .catch(() => {
          })
    },
    //新增设备
    turnAdd() {
      this.$router.push({
        path: `/device/deviceAdd`
      })
    },
    //修改设备
    turnEdit(deviceId) {
      this.$router.push({
        path: `/device/deviceEdit/${deviceId}`
      })
    },
  },
  created() {
    this.getDeviceList();
  }
})
</script>


<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="deviceQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="设备ID:">
              <el-input v-model="deviceQueryData.deviceId" placeholder="请输入设备ID"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="设备字段:">
              <el-input v-model="deviceQueryData.deviceField" placeholder="请输入设备字段"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="设备种类:">
              <el-input v-model="deviceQueryData.deviceKind" placeholder="请输入设备种类"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="设备状态:">
              <el-input v-model="deviceQueryData.deviceState" placeholder="请输入设备状态"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getDeviceList">查询设备</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增设备</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="deviceList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="设备ID" prop="deviceId" width="100"/>
          <el-table-column label="设备字段" prop="deviceField" width="180"/>
          <el-table-column label="设备种类" prop="deviceKind" width="100"/>
          <el-table-column label="设备状态" prop="deviceState" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="设备编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="turnEdit(scope.row.deviceId)">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除设备"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCms(scope.row.deviceId)">
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