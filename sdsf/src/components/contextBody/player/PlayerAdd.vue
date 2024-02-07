/* eslint-disable */

<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from 'element-plus'

export default defineComponent({
  name: "PlayerAdd",
  data() {
    return {
      player: {
        plId: '',
        plName: '',
        plNation: '',
        plState: '',
        plField: '',
        plPosition: '',
        plDeviceId: '',
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push('/player')
    },
    //保存
    commit() {
      this.$http.post('/sdsb/player/addPlayer', this.player).then(response => {
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
            tag="b">新增运动员
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="player" label-width="10%">
      <el-form-item label="运动员编号:">
        <el-input v-model="player.plId" placeholder="请输入运动员编号"></el-input>
      </el-form-item>
      <el-form-item label="运动员名称:">
        <el-input v-model="player.plName" placeholder="请输入运动员名称"></el-input>
      </el-form-item>
      <el-form-item label="运动员国籍:">
        <el-input v-model="player.plNation" placeholder="请输入运动员国籍"></el-input>
      </el-form-item>
      <el-form-item label="运动员状态:">
        <el-input v-model="player.plState" placeholder="请输入运动员状态"></el-input>
      </el-form-item>
      <el-form-item label="运动种类:">
        <el-input v-model="player.plField" placeholder="请输入运动种类"></el-input>
      </el-form-item>
      <el-form-item label="场上位置:">
        <el-input v-model="player.plPosition" placeholder="请输入场上位置"></el-input>
      </el-form-item>
      <el-form-item label="使用设备序号:">
        <el-input v-model="player.plDeviceId" placeholder="请输入使用设备序号"></el-input>
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