<template>
  <div class="login-container">
<!--    <div class="login-background">-->
<!--      <img class="background-image" src="public/pic/photo3-ico.png" alt="Dynamic Arrows">-->
<!--    </div>-->
    <div class="login-form">
      <h1 class="login-title">登录 - 竞技体育数据管理系统</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model="username">
        </div>
        <div class="input-container">
          <label for="password">密码</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // 登录逻辑
      this.$emit('login-success');
    }
  }
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 1000px;
  width: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-image {
  height: 1000px;
  width: 100%;
  object-fit: cover;
  filter: blur(5px); /* Adjust the blur level as needed */
}

.login-form {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.input-container {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.login-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #409EFF;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.login-button:hover {
  background-color: #367BEC;
}
</style>
