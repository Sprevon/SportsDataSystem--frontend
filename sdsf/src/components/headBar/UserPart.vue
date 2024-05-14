<script>
import {defineComponent} from 'vue'
import useTokenStore from "@/stoers/useToken";

export default defineComponent({
  name: "UserPart",
  components: {},
  data() {
    return {
      userData: {
        username: '',
      }
    }
  },
  computed:{
    username(){
      const useStore = useTokenStore()
      return useStore.token.username
    }
  }
})
</script>

<template>
  <div>
    <div class="empty-div-user"></div>
    <el-row :gutter="0">
      <el-col :span="4" class="greeting-icon">
        <font-awesome-icon size="xl" icon="fa-solid fa-circle-user" />
      </el-col>
      <el-col :span="20" class="greeting-text">
        <el-text tag="b" size="large" >欢迎{{ username === ''? '您' : ',' + username}}</el-text>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.empty-div-user{
}
.greeting-icon{
  margin-top: 5px;
}
.greeting-text{
  margin-top: 6px;
}
</style>