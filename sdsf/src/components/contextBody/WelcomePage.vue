<template>
  <div class="center watermark">
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WelcomePage"
})
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2em;
}

.watermark::after {
  content: "欢迎使用智柔监测";
  position: absolute;
  top: 300px;
  left: 5%;
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.1);
  font-size: 2.5em;
  z-index: -1;
  transform: rotate(-0deg);
  text-align: center;
}
</style>