<script>
import {defineComponent} from 'vue'
import {ElMessageBox} from "element-plus";
import {DeleteFilled, Edit} from "@element-plus/icons-vue";

export default defineComponent({
  name: "TeamDocList",
  components: {Edit, DeleteFilled},
  data() {
    return {
      teamDocList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      teamDocQueryData: {
        docId: '', docName: '', docMajor: '', docPosition: '', docState: ''
      },
    }
  },
  methods: {
    //查询队医
    getTeamDocList() {
      this.$http.post("/sdsb/teamDoc/queryTeamDocs", this.teamDocQueryData).then(response => {
        const res = response.data;
        this.teamDocList.responseData = res.data;
        this.teamDocList.code = res.code;
        this.teamDocList.total = res.total;
        this.teamDocList.message = res.message;
      })
    },
    //删除队医
    deleteCms(docId) {
      const alertMessage = "删除编号为" + docId + "的队医信息？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
            this.$http.post("/sdsb/teamDoc/deleteTeamDoc", {docId: docId}).then(response => {
              const code = response.data.code;
              if (code === 200) {
                ElMessageBox.alert("操作成功", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  //修改成功后刷新页面
                  this.getTeamDocList();
                  return r
                })
              } else {
                ElMessageBox.alert("操作失败", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getTeamDocList();
                  return r
                })
              }
            })
          }
      )
          .catch(() => {
          })
    },
    //新增队医
    turnAdd() {
      this.$router.push({
        path: `/teamDoc/teamDocAdd`
      })
    },
    //修改队医
    turnEdit(docId) {
      this.$router.push({
        path: `/teamDoc/teamDocEdit/${docId}`
      })
    },
  },
  created() {
    this.getTeamDocList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="teamDocQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="队医ID:">
              <el-input v-model="teamDocQueryData.docId" placeholder="请输入队医ID"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="队医名称:">
              <el-input v-model="teamDocQueryData.docName" placeholder="请输入队医名称"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="队医专业:">
              <el-input v-model="teamDocQueryData.docMajor" placeholder="请输入队医专业"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="队医职位:">
              <el-input v-model="teamDocQueryData.docPosition" placeholder="请输入队医职位"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="队医状态:">
              <el-input v-model="teamDocQueryData.docState" placeholder="请输入队医状态"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getTeamDocList">查询队医</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增队医</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="teamDocList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="队医ID" prop="docId" width="100"/>
          <el-table-column label="队医名称" prop="docName" width="180"/>
          <el-table-column label="队医专业" prop="docMajor" width="100"/>
          <el-table-column label="队医职位" prop="docPosition" width="100"/>
          <el-table-column label="队医状态" prop="docState" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="队医编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="turnEdit(scope.row.docId)">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除队医"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCms(scope.row.docId)">
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