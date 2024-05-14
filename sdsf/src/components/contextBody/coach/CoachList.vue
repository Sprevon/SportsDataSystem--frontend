<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";
import {DeleteFilled} from "@element-plus/icons-vue";

export default defineComponent({
  name: "CoachList",
  components: {DeleteFilled},
  data() {
    return {
      coachList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      coachQueryData: {
        cName: '', cNation: '', cId: ''
      },
    }
  },
  methods: {
  //查询教练
  getCoachList() {
    this.$http.post("/sdsb/coach/queryCoach", this.coachQueryData).then(response => {
      const res = response.data;
      this.coachList.responseData = res.data;
      this.coachList.code = res.code;
      this.coachList.total = res.total;
      this.coachList.message = res.message;
    })
  },
  //删除教练
  deleteCoach(cId) {
    const alertMessage = "删除编号为" + cId + "的教练？"
    ElMessageBox.confirm(alertMessage, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }).then(() => {
      this.$http.post("/sdsb/coach/deleteCoach", {cId: cId}).then(response => {
        const code = response.data.code;
        if (code === 200) {
          ElMessageBox.alert("操作成功", "提示", {
            confirmButtonText: "确定"
          }).then(r => {
            //修改成功后刷新页面
            this.getCoachList();
            return r
          })
        } else {
          ElMessageBox.alert("操作失败", "提示", {
            confirmButtonText: "确定"
          }).then(r => {
            this.getCoachList();
            return r
          })
        }      })
    }).catch(() => {
    });
  },
  //新增教练
  turnAdd() {
    this.$router.push({
      path: `/coach/coachAdd`
    })
  },
},
created() {
  this.getCoachList();
}



})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="coachQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="教练ID:">
              <el-input v-model="coachQueryData.cId" placeholder="请输入教练ID"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="教练名字:">
              <el-input v-model="coachQueryData.cName" placeholder="请输入教练名字"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="教练国籍:">
              <el-input v-model="coachQueryData.cNation" placeholder="请输入教练国籍"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getCoachList">查询教练</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增教练</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="coachList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="教练ID" prop="cId" width="100"/>
          <el-table-column label="教练名字" prop="cName" width="180"/>
          <el-table-column label="教练国籍" prop="cNation" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col :span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除教练"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCoach(scope.row.cId)">
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