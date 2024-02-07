<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PropertyManAdd",
  data() {
    return {
      //装备管理员信息
      PropertyMan: {
        //装备管理员编号
        propId: '',
        //装备管理员名称
        propName: '',
        //装备管理员工作状态
        propState: '',
        //装备管理员负责的装备室号码
        propRoomId: '',
      }
    }
  },
  methods: {
    //返回
    goBack() {
      this.$router.push('/propertyMan')
    },
    //保存
    commit() {
      this.$http.post('/sdsb/propertyMan/addPropertyMan', this.PropertyMan).then(response => {
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
            tag="b">新增装备管理员
        </el-text>
      </template>
    </el-page-header>

    <div style="height: 20px;"></div>

    <el-form :model="PropertyMan" label-width="10%">
      <el-form-item class="form-label" label="管理员编号:">
        <el-input v-model="PropertyMan.propId" placeholder="请输入装备管理员编号"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="管理员名称:">
        <el-input v-model="PropertyMan.propName" placeholder="请输入管理员名称"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="管理员工作状态:">
        <el-input v-model="PropertyMan.propState" placeholder="请输入管理员工作状态"></el-input>
      </el-form-item>
      <el-form-item class="form-label" label="装备室号码:">
        <el-input v-model="PropertyMan.propRoomId" placeholder="请输入负责的装备室号码"></el-input>
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