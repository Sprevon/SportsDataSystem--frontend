<template>
  <div class="login-container">
    <div class="login-background">
      <video ref="videoPlayer"
             autoplay
             loop
             width="1500"
             height="700"
             @timeupdate="updateProgress"
             @loadedmetadata="initializeProgress">
        <source src="video/oceans.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="login-form">
      <h1 class="login-title">注册 - 竞技体育数据管理系统</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="username"></label>
          <el-input type="text" id="username" placeholder="请输入用户名" v-model="username"/>
        </div>
        <div class="input-container">
          <label for="password"></label>
          <el-input type="password" id="password" placeholder="请输入密码" v-model="password"/>
        </div>
        <div class="input-container">
          <label for="password"></label>
          <el-input type="password" id="password" placeholder="请确认密码" v-model="password"/>
        </div>
        <div class="input-container" style="background-color: white; display: flex">
          <label style=" background-color: white; width: 40px; margin: auto">+86</label>
          <el-input type="password" id="phone" placeholder="手机号" v-model="password"/>
        </div>
        <div class="input-container" style="display: flex; background-color: white">
          <el-input type="password" id="code" placeholder="请输入验证码" v-model="password"/>
          <label style=" background-color: white; width: 120px; color: #0b8ef8; margin:auto">获取验证码</label>
        </div>
        <div class="input-container" >
          <el-checkbox  style="display: flex" >
            <span style="color: white">我已阅读并同意</span>
            <span style="color: #0b8ef8">服务协议、隐私声明和账号协议</span>
          </el-checkbox>
        </div>
        <div style="height: 40px"/>
        <button type="submit" class="login-button">注册</button>
      </form>
    </div>
    <div class="floating-controls">
      <input type="range" min="0" :max="videoDuration" v-model="currentProgress" @input="seekVideo" />
      <el-button v-if="!isPlay" @click="playVideo">播放</el-button>
      <el-button v-if="isPlay" @click="pauseVideo">暂停</el-button>
      <el-button @click="muteVideo">{{ isMuted ? '取消静音' : '静音' }}</el-button>
    </div>
  </div>
</template>

<script>
import {ElMessageBox} from "element-plus";
import {createRouter as router} from "vue-router";
// import videojs from "video.js";
import 'video.js/dist/video-js.css'

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
      password: '',
      isPlay: true,
      isMuted: false, // 添加静音状态标记
      currentProgress: 0, // 当前播放时间
      videoDuration: 0, // 视频总时长
      cover:'视频播放器封面',
      title:'视频播放器',
      videoSource:'https://vjs.zencdn.net/v/oceans.mp4',
    };
  },
  methods: {
    handleLogin() {
      // 登录逻辑
      this.$http.post("/sdsb/login", {username: this.username, password: this.password}).then(response => {
        const code = response.data.code;
        if (code === 200) {
          ElMessageBox.alert("登录成功", "提示", {
            confirmButtonText: "确定"
          }).then(r => {
            //修改成功后刷新页面
            router.push("/welcome")
            return r
          })
        } else {
          ElMessageBox.alert("登录失败", "提示", {
            confirmButtonText: "确定"
          })
        }
      })
    },
    playVideo() {
      // 使用this.$refs来访问<video>元素，并播放视频
      this.$refs.videoPlayer.play();
      this.isPlay = !this.isPlay;
    },
    pauseVideo() {
      // 使用this.$refs来访问<video>元素，并暂停视频
      this.$refs.videoPlayer.pause();
      this.isPlay = !this.isPlay;
    },
    muteVideo(){
      const video = this.$refs.videoPlayer;
      video.muted = !video.muted;
      this.isMuted = video.muted; // 更新状态标记
    },
    updateProgress() {
      const video = this.$refs.videoPlayer;
      try {
        this.currentProgress = video.currentTime; // 更新当前播放时间
      }catch (a){
        console.log(a)
      }
    },
    initializeProgress() {
      const video = this.$refs.videoPlayer;
      this.videoDuration = video.duration; // 初始化视频时长
    },
    seekVideo() {
      const video = this.$refs.videoPlayer;
      video.currentTime = this.currentProgress; // 跳转到新的时间点
    },
    fastForward() {
      const video = this.$refs.videoPlayer;
      video.currentTime += 10; // 快进10秒
      if (video.currentTime > video.duration) video.currentTime = video.duration; // 防止超出视频长度
    },
  },
  beforeUnmount() {
    // 检查视频元素是否存在
    if (this.$refs.videoPlayer) {
      // 如果存在，停止视频播放
      this.$refs.videoPlayer.pause();
    }
  },
};
</script>

<style>
.login-container {
  top: 0;
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
  height: 100%;
  width: 100%;
  //overflow: hidden;
  z-index: -1;
}

.login-background video {
  flex-grow: 1;
  object-fit: cover; /* 或 'contain' 根据你的需求选择 */
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
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.input-container {
  margin-bottom: 1rem;
  padding-top: 0px;
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

.floating-controls {
  position: fixed;
  bottom: 20px; /* 根据需要调整位置 */
  left: 20px; /* 根据需要调整位置 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  padding: 10px;
  border-radius: 5px;
  display: flex;
  gap: 10px;
}

</style>
