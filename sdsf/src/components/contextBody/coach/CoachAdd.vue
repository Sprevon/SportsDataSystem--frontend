<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "CoachAdd",
  data() {
    return {
      Coach: {
        cName: '',
        cNation: '',
        cId: '',
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push('/coach')
    },
    //保存
    commit() {
      this.$http.post('/sdsb/coach/addCoach', this.Coach).then(response => {
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
            tag="b">新增教练
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="Coach" label-width="10%">
      <el-form-item class="form-label" label="教练ID:">
        <el-input v-model="Coach.cId" placeholder="请输入教练ID"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="教练名字:">
        <el-input v-model="Coach.cName" placeholder="请输入教练名字"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="教练国籍:">
        <el-input v-model="Coach.cNation" placeholder="请输入教练国籍"></el-input>
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