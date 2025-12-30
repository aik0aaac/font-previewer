import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 3rd Party Tools - ライブラリ読み込み
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { RecycleScroller } from 'vue-virtual-scroller'

// CSS読み込み
import './styles/index.css'
const app = createApp(App)

app.use(createPinia())

// 3rd Party Tools - マウント
app.component('RecycleScroller', RecycleScroller)

app.mount('#app')
