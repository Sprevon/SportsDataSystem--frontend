<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PlayerHealthAdd",
  data() {
    return {
      PlayerHealth: {
        plId: '',
        plHeight: '',
        plWeight: '',
        plMaxHeartRate: '',
        plMinHeartRate: '',
        plAvgHeartRate: '',
        plTotalDistance: '',
        plSprint: '',
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/playerHealth')
    },
    commit() {
      this.$http.post('/sdsb/playerhealth/addPlayerHealth', this.PlayerHealth).then(response => {
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
    <el-page-header title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">新增运动员健康信息
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="PlayerHealth" label-width="10%">
      <el-form-item class="form-label" label="运动员编号:">
        <el-input v-model="PlayerHealth.plId" placeholder="请输入运动员编号"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="运动员身高:">
        <el-input v-model="PlayerHealth.plHeight" placeholder="请输入运动员身高"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="运动员体重:">
        <el-input v-model="PlayerHealth.plWeight" placeholder="请输入运动员体重"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="最大心率:">
        <el-input v-model="PlayerHealth.plMaxHeartRate" placeholder="请输入最大心率"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="最低心率:">
        <el-input v-model="PlayerHealth.plMinHeartRate" placeholder="请输入最低心率"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="平均心率:">
        <el-input v-model="PlayerHealth.plAvgHeartRate" placeholder="请输入平均心率"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="运动距离:">
        <el-input v-model="PlayerHealth.plTotalDistance" placeholder="请输入运动距离"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="冲刺次数:">
        <el-input v-model="PlayerHealth.plSprint" placeholder="请输入冲刺次数"></el-input>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8"></el-col>
          <el-col :span="8">
            <el-button type="primary" @click="commit">保存</el-button>
            <el-button type="info" @click="goBack">取消</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>