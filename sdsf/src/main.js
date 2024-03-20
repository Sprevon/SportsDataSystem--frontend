import {createApp} from 'vue'
import App from './App.vue'
import Axios from 'axios'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/css/base.css"
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import {createRouter, createWebHashHistory} from "vue-router";
import Welcome from "@/components/contextBody/WelcomePage.vue";
import DeviceList from "@/components/contextBody/device/DeviceList.vue";
import DeviceAdd from "@/components/contextBody/device/DeviceAdd.vue";
import DeviceEdit from "@/components/contextBody/device/DeviceEdit.vue";
import CoachList from "@/components/contextBody/coach/CoachList.vue";
import CoachAdd from "@/components/contextBody/coach/CoachAdd.vue";
import PropertyManList from "@/components/contextBody/propertyMan/PropertyManList.vue";
import PropertyManAdd from "@/components/contextBody/propertyMan/PropertyManAdd.vue";
import PropertyManEdit from "@/components/contextBody/propertyMan/PropertyManEdit.vue";
import PlayerList from "@/components/contextBody/player/PlayerList.vue";
import PlayerAdd from "@/components/contextBody/player/PlayerAdd.vue";
import PlayerEdit from "@/components/contextBody/player/PlayerEdit.vue";
import TeamDocList from "@/components/contextBody/teamDoc/TeamDocList.vue";
import TeamDocAdd from "@/components/contextBody/teamDoc/TeamDocAdd.vue";
import TeamDocEdit from "@/components/contextBody/teamDoc/TeamDocEdit.vue";
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import PlayerHealthList from "@/components/contextBody/playerHealth/PlayerHealthList.vue";
import PlayerHealthAdd from "@/components/contextBody/playerHealth/PlayerHealthAdd.vue";
import PlayerHealthEdit from "@/components/contextBody/playerHealth/PlayerHealthEdit.vue";
import PlayerHeartRateList from "@/components/contextBody/playerHeartRate/PlayerHeartRateList.vue";
import PlayerHeartRateDetail from "@/components/contextBody/playerHeartRate/PlayerHeartRateDetail.vue";
// import loginPage from "@/components/login/LoginPage.vue";
import * as echarts from 'echarts'
import loginPage from "@/components/login/LoginPage.vue";

//创建容器
const app = createApp(App)

//配置echarts
app.config.globalProperties.$echarts = echarts

//配置axios
// Axios.defaults.baseURL = "http://localhost:8088"
Axios.defaults.baseURL = "http://112.124.17.166:8088"
app.config.globalProperties.$http = Axios

//配置element-icon
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//配置awesome-icon库
library.add(faCircleUser)
app.component('font-awesome-icon', FontAwesomeIcon)

//配置router
const routes = [

    // {path: '/', redirect: '/login'},
    {path: '/login', component: loginPage},

    {path: '/', redirect: '/home'},
    {path: '/home', redirect: '/welcome'},
    {path: '/welcome', component: Welcome},

    {path: '/device', redirect: '/device/deviceList'},
    {path: '/device/deviceList', component: DeviceList},
    {path: '/device/deviceAdd', component: DeviceAdd},
    {path: '/device/deviceEdit/:deviceId', component: DeviceEdit},

    {path: '/coach', redirect: '/coach/coachList'},
    {path: '/coach/coachList', component: CoachList},
    {path: '/coach/coachAdd', component: CoachAdd},

    {path: '/propertyMan', redirect: '/propertyMan/propertyManList'},
    {path: '/propertyMan/propertyManList', component: PropertyManList},
    {path: '/propertyMan/propertyManAdd', component: PropertyManAdd},
    {path: '/propertyMan/propertyManEdit/:propId', component: PropertyManEdit},

    {path: '/player', redirect: '/player/playerList'},
    {path: '/player/playerList', component: PlayerList},
    {path: '/player/playerAdd', component: PlayerAdd},
    {path: '/player/playerEdit/:plId', component: PlayerEdit},

    {path: '/teamDoc', redirect: '/teamDoc/teamDocList'},
    {path: '/teamDoc/teamDocList', component: TeamDocList},
    {path: '/teamDoc/teamDocAdd', component: TeamDocAdd},
    {path: '/teamDoc/teamDocEdit/:docId', component: TeamDocEdit},

    {path: '/playerHealth', redirect: '/playerHealth/playerHealthList'},
    {path: '/playerHealth/playerHealthList', component: PlayerHealthList},
    {path: '/playerHealth/playerHealthAdd', component: PlayerHealthAdd},
    {path: '/playerHealth/playerHealthEdit/:plId', component: PlayerHealthEdit},

    {path: '/playerHeartRate', redirect: '/playerHeartRate/playerHeartRateList'},
    {path: '/playerHeartRate/playerHeartRateList', component: PlayerHeartRateList},
    {path: '/playerHeartRate/playerHeartRateDetail/:plId', component: PlayerHeartRateDetail},

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

let loadingInstance;

router.beforeEach((to, from, next) => {
    // loadingInstance = ElLoading.service({ fullscreen: true, text: '加载中...' });
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可选的，使滚动平滑进行
    });
    next();
});

router.afterEach(() => {
    if (loadingInstance) {
        loadingInstance.close();
    }
});

app.use(router)

//容器挂载
app.mount('#app')







//nginx -s  reload