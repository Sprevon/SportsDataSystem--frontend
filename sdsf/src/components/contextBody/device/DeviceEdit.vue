<script>
import {defineComponent} from 'vue'
import {ArrowLeft} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "DeviceEdit",
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  data() {
    return {
      deviceId: Number,
      device: {
        deviceState: '',
      },
      editData: {
        deviceId: Number,
        deviceState: '',
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        path: '/device'
      })
    },
    //保存
    save() {
      this.editData.deviceId = this.deviceId;
      const alertMessage = "保存编号为" + this.deviceId + "的设备修改？";
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http.post('/sdsb/device/editDevice', this.editData).then(response => {
          const code = response.data.code;
          if (code === 200) {
            ElMessageBox.alert("操作成功", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              this.goBack()
              return r
            }).catch(() => {
            })
          } else {
            ElMessageBox.alert("操作失败", "提示", {
              confirmButtonText: "确定"
            }).then(r => {
              return r
            }).catch(() => {
            })
          }
        })
      }).catch(() => {})
    },
    //获取数据
    getData() {
      this.$http.post("/sdsb/device/queryDevices",
          {deviceId: this.deviceId}).then(response => {
        const res = response.data;
        const details = res.data[0];
        this.device.deviceState = details.deviceState;
      })
    }
  },
  created() {
    this.deviceId = this.$route.params.deviceId;
    this.getData()
  },
})
</script>

<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">设备编辑——设备编号{{ this.deviceId }}
        </el-text>
      </template>
    </el-page-header>

    <el-form :model="device" label-width="10%">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-text size="large" tag="b">旧——设备状态：</el-text>
        <el-text size="default">{{ this.device.deviceState }}</el-text>
        <div style="height: 20px"/>
      </el-form-item>
      <el-form-item>
        <el-text size="large" tag="b">新——设备状态：</el-text>
        <div style="height: 20px"/>
        <el-input v-model="this.editData.deviceState" placeholder="请输入设备状态"></el-input>
        <div style="height: 20px"/>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="default" @click="goBack">返回</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>