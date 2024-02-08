<script>
import {defineComponent} from 'vue'
// import {ElMessageBox} from "element-plus";

export default defineComponent({
  name: "PlayerHeartRateList",
  data(){
    return{
      playerHeartRateList: {
        message: String,
        code: Number,
        total: Number,
        responseData: [],
      },
      playerHeartRateQueryData: {
        plId: '', playerName: ''
      },
    }
  },
  methods: {
  getPlayerHeartRateList() {
    this.$http.post("/sdsb/playerheartrate/queryPlayerHeartRates", this.playerHeartRateQueryData).then(response => {
      const res = response.data;
      this.playerHeartRateList.responseData = res.data;
      this.playerHeartRateList.code = res.code;
      this.playerHeartRateList.total = res.total;
      this.playerHeartRateList.message = res.message;
    })
  },

  turnDetail(plId, playerName) {
    // console.log(playerName);
    this.$router.push({
      path: `/playerHeartRate/playerHeartRateDetail/${plId}`,
      query: {
        playerName: playerName
      }
    })
  },
},
  created() {
    this.getPlayerHeartRateList();
  }
})
</script>

<template>
  <div>
    <el-container>
      <el-header height="auto">
        <el-form :label-position="'right'" :model="playerHeartRateQueryData">
          <el-form-item class="form-label" label="运动员编号:">
            <el-input v-model="playerHeartRateQueryData.plId" placeholder="请输入运动员编号"></el-input>
          </el-form-item>
          <el-form-item class="form-label" label="运动员姓名:">
            <el-input v-model="playerHeartRateQueryData.playerName" placeholder="请输入运动员姓名"></el-input>
          </el-form-item>
          <el-button type="primary" @click="getPlayerHeartRateList">查询</el-button>
        </el-form>
      </el-header>
      <el-divider></el-divider>

      <el-main height="auto">
        <el-table :cell-type="{'textAlign':'center'}" :data="playerHeartRateList.responseData" border fit stripe>
          <el-table-column label="运动员编号" prop="plId" width="100"/>
          <el-table-column label="运动员姓名" prop="playerName" width="100"/>
          <el-table-column label="操作" width="180">
            <template #default="scope">
              <el-button type="text" size="small" @click="turnDetail(scope.row.plId, scope.row.playerName)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>