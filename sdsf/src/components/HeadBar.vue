<script>
import {defineComponent} from 'vue'
import UserPart from '@/components/headBar/UserPart.vue'

export default defineComponent({
  name: "HeadBar",
  components: {
    UserPart
  },
  data() {
    return {
      heading: '竞技体育数据管理系统',
    }
  },

})
</script>

<template>
  <div>
    <el-image class="header-image" fit="cover" src="/pic/photo1.jpg"></el-image>
    <div class="empty-box"></div>
    <el-row :gutter="20">
      <el-col :span="4">
      </el-col>
      <el-col :span="10">
        <el-text class="slogan" size="large" tag="b">
          {{ heading }}
        </el-text>
      </el-col>
      <el-col :span="3"></el-col>
      <el-col :span="6">
        <router-link to="/login">
          <UserPart></UserPart>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.slogan {
  font-size: x-large;
}

.empty-box {
  height: 10px;
}

.header-image {
  height: 50px;
  width: 199px;
  position: absolute;
  top: 6px;
  left: 10px;
}
</style>