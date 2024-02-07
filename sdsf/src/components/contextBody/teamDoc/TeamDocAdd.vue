<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from 'element-plus'

export default defineComponent({
  name: "TeamDocAdd",
  data() {
    return {
      teamDoc: {
        docId: '',
        docName: '',
        docMajor: '',
        docPosition: '',
        docState: '',
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push('/teamDoc')
    },
    //保存
    commit() {
      this.$http.post('/sdsb/teamDoc/addTeamDoc', this.teamDoc).then(response => {
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
            tag="b">新增队医
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="teamDoc" label-width="10%">
      <el-form-item label="队医ID:">
        <el-input v-model="teamDoc.docId" placeholder="请输入队医ID"></el-input>
      </el-form-item>
      <el-form-item label="队医名称:">
        <el-input v-model="teamDoc.docName" placeholder="请输入队医名称"></el-input>
      </el-form-item>
      <el-form-item label="专业:">
        <el-input v-model="teamDoc.docMajor" placeholder="请输入专业"></el-input>
      </el-form-item>
      <el-form-item label="职位:">
        <el-input v-model="teamDoc.docPosition" placeholder="请输入职位"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-input v-model="teamDoc.docState" placeholder="请输入状态"></el-input>
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