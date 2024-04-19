<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FigureV"
})
</script>

<template>
  <div class="fig-table">
    <div class="four-leaf mar30">
      <span class="leaf1"></span>
      <span class="leaf2"></span>
      <span class="leaf3"></span>
      <span class="leaf4"></span>
    </div>
  </div>
</template>

<style  scoped>
.fig-table{
  height: 80vh;
  display: flex;
  justify-content: center; /*水平方向居中*/
  align-items: center; /*垂直方向居中*/
  background-color: #f1f7ff;
}

.four-leaf {
  width: 210px;
  height: 210px;
  position: relative;
}

.four-leaf span {
  display: block;
  width: 100px;
  height: 100px;
  //background: #317ef3;
  position: absolute;
}

.four-leaf span.leaf1 {
  left: 0;
  top: 0;
  border-radius: 50px 50px 0 50px;
  background-color: #7dffd4;
}

.four-leaf span.leaf2 {
  right: 0;
  top: 0;
  border-radius: 50px 50px 50px 0;
  background-color: #fd0201;
}

.four-leaf span.leaf3 {
  left: 0;
  bottom: 0;
  border-radius: 50px 0 50px 50px;
  background-color: #fee3c3;
}

.four-leaf span.leaf4 {
  right: 0;
  bottom: 0;
  border-radius: 0 50px 50px 50px;
  background-color: #317ef2;
}


</style>