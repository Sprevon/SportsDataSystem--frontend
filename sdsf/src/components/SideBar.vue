<script>
import {defineComponent} from 'vue'
import {DataLine, Discount, MessageBox, Suitcase, User} from "@element-plus/icons-vue";

export default defineComponent({
  name: "SideBar",
  components: {Suitcase, Discount, User, DataLine, MessageBox},
  data: function () {
    return {
      sideBar: [
        {id: 1, name: '穿戴设备管理'},
        {id: 2, name: '装备管理员管理'},
        {id: 3, name: '运动员管理'},
        {id: 4, name: '教练员管理'},
        {id: 5, name: '队医管理'}
      ]
    }
  }
})
</script>

<template>
  <div>
    <el-row>
      <el-col>
        <el-text></el-text>
        <el-menu class="left-menu"
                 default-active="">
          <el-menu-item index="1">
            <router-link to="/device">
              <el-icon>
                <MessageBox/>
              </el-icon>
              <span>穿戴设备管理</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="2">
            <router-link to="/propertyMan">
              <el-icon>
                <Discount/>
              </el-icon>
              <span>装备管理员管理</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="3">
            <router-link to="/player">
              <el-icon>
                <User/>
              </el-icon>
              <span>运动员管理</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="4">
            <router-link to="/coach">
              <el-icon>
                <DataLine/>
              </el-icon>
              <span>教练员管理</span>
            </router-link>
          </el-menu-item>

          <el-menu-item index="5">
            <router-link to="/teamDoc">
              <el-icon>
                <Suitcase/>
              </el-icon>
              <span>队医管理</span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.left-menu {
  height: 100vh;
}

span {
  font-weight: bold;
  font-size: medium;
}

el-menu-item {
  border: solid #dcdfe6;
}
</style>