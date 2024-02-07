<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from 'element-plus'

export default defineComponent({
  name: "DeviceAdd",
  data() {
    return {
      device: {
        deviceId: '',
        deviceField: '',
        deviceKind: '',
        deviceState: '',
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push('/device')
    },
    //保存
    commit() {
      this.$http.post('/sdsb/device/addDevice', this.device).then(response => {
        const res = response.data;
        const code = res.code;
        if (code === 200) {
          ElMessageBox.alert('操作成功', '提示', {
            confirmButtonText: '确定'
          })
        }
        this.goBack();
      })
    }
  },


})
</script>

<template>
  <div>
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <el-text
            size="large"
            tag="b">新增设备
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="device" label-width="10%">
      <el-form-item label="设备ID:">
        <el-input v-model="device.deviceId" placeholder="请输入设备ID"></el-input>
      </el-form-item>
      <el-form-item label="设备字段:">
        <el-input v-model="device.deviceField" placeholder="请输入设备字段"></el-input>
      </el-form-item>
      <el-form-item label="设备种类:">
        <el-input v-model="device.deviceKind" placeholder="请输入设备种类"></el-input>
      </el-form-item>
      <el-form-item label="设备状态:">
        <el-input v-model="device.deviceState" placeholder="请输入设备状态"></el-input>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button @click="commit" type="primary">保存</el-button>
            <el-button @click="goBack" type="info">取消</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>