<script>
import {defineComponent} from 'vue'
import {DeleteFilled, Edit} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PropertyManList",
  components: {Edit, DeleteFilled},
  data() {
    return {
      propertyManList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      propertyManQueryData: {
        propId: '', propName: '', propState: '', propRoomId: ''
      },
    }
  },
  methods: {
    //查询设备
    getPropertyManList() {
      this.$http.post("/sdsb/propertyMan/queryPropertyMan", this.propertyManQueryData).then(response => {
        const res = response.data;
        this.propertyManList.responseData = res.data;
        this.propertyManList.code = res.code;
        this.propertyManList.total = res.total;
        this.propertyManList.message = res.message;
      })
    },
    //删除设备
    deleteCms(propId) {
      const alertMessage = "删除编号为" + propId + "的装备管理员？"
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
            // console.log('1231231')}
            this.$http.post("/sdsb/propertyMan/deletePropertyMan", {propId: propId}).then(response => {
              const code = response.data.code;
              if (code === 200) {
                ElMessageBox.alert("操作成功", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  //修改成功后刷新页面
                  this.getPropertyManList();
                  return r
                })
              } else {
                ElMessageBox.alert("操作失败", "提示", {
                  confirmButtonText: "确定"
                }).then(r => {
                  this.getPropertyManList();
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
        path: `/propertyMan/propertyManAdd`
      })
    },
    //修改设备
    turnEdit(deviceId) {
      this.$router.push({
        path: `/propertyMan/propertyManEdit/${deviceId}`
      })
    },
  },
  created() {
    this.getPropertyManList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="propertyManQueryData">
          <el-space :size="'small'" wrap>
            <el-form-item class="form-label" label="管理员编号:">
              <el-input v-model="propertyManQueryData.propId" placeholder="请输入管理员编号"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="管理员名称:">
              <el-input v-model="propertyManQueryData.propName" placeholder="请输入管理员名称"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="管理员工作状态:">
              <el-input v-model="propertyManQueryData.propState" placeholder="请输入管理员工作状态"></el-input>
            </el-form-item>
            <el-form-item class="form-label" label="装备室号码:">
              <el-input v-model="propertyManQueryData.propRoomId" placeholder="请输入负责的装备室号码"></el-input>
            </el-form-item>
          </el-space>
          <div style="height: 3px;"></div>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="getPropertyManList">查询管理员</el-button>
            </el-col>
            <el-col :span="1"/>
            <el-col :span="2">
              <el-button type="primary" @click="turnAdd">新增管理员</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="propertyManList.responseData" border fit stripe
                  style="width:100%">
          <el-table-column label="管理员编号" prop="propId" width="100"/>
          <el-table-column label="管理员名称" prop="propName" width="180"/>
          <el-table-column label="管理员工作状态" prop="propState" width="100"/>
          <el-table-column label="管理员负责的装备室号码" prop="propRoomId" width="100"/>
          <el-table-column label="操作" width="auto">
            <template #default="scope">
              <el-row :gutter="5">
                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="管理员编辑"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="turnEdit(scope.row.propId)">
                      <Edit/>
                    </el-icon>
                  </el-tooltip>
                </el-col>

                <el-col span="4">
                  <el-tooltip
                      class="box-item"
                      content="删除管理员"
                      effect="dark"
                      placement="bottom-start"
                  >
                    <el-icon :size="25" @click="deleteCms(scope.row.propId)">
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