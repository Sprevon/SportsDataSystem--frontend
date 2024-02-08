<script>
import {defineComponent} from 'vue'
import {ArrowLeft} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PlayerHealthEdit",
  computed: {
    ArrowLeft() {
      return ArrowLeft
    }
  },
  data() {
    return {
      plId: Number,
      playerHealth: {
        plMaxHeartRate: '',
        plMinHeartRate: '',
        plAvgHeartRate: '',
        plTotalDistance: '',
        plSprint: '',
        plId: '',
      },
      editData: {
        plId: Number,
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
      this.$router.push({
        path: '/playerHealth'
      })
    },
    save() {
      this.editData.plId = this.plId;
      const alertMessage = "保存编号为" + this.plId + "的运动员健康信息修改？";
      ElMessageBox.confirm(alertMessage, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http.post('/sdsb/playerhealth/updatePlayerHealth', this.editData).then(response => {
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
      }).catch(() => {
      })
    },
    getData() {
      this.$http.post("/sdsb/playerhealth/queryPlayerHealths",
          {plId: this.plId}).then(response => {
        const res = response.data;
        const details = res.data[0];
        this.playerHealth.plMaxHeartRate = details.plMaxHeartRate;
        this.playerHealth.plMinHeartRate = details.plMinHeartRate;
        this.playerHealth.plAvgHeartRate = details.plAvgHeartRate;
        this.playerHealth.plTotalDistance = details.plTotalDistance;
        this.playerHealth.plSprint = details.plSprint;
        this.playerHealth.plId = details.plId;
      })
    }
  },
  created() {
    this.plId = this.$route.params.plId;
    this.getData()
    // console.log(this.$route.params.plId)
  },
})
</script>

<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="goBack">
      <template #content>
        <el-text
            size="large"
            tag="b">运动员健康信息编辑——运动员编号{{ this.plId }}
        </el-text>
      </template>
    </el-page-header>

    <el-form :model="playerHealth" label-width="10%">
      <el-form-item class="form-label" >
        <el-text size="large" tag="b">旧——冲刺次数:</el-text>
        <el-text size="default">{{ this.playerHealth.plSprint }}</el-text>
      </el-form-item>
      <el-form-item class="form-label">
        <el-text size="large" tag="b">新——冲刺次数:</el-text>
        <el-input v-model="editData.plSprint" placeholder="请输入新冲刺次数"></el-input>
      </el-form-item>

      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="8"></el-col>
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