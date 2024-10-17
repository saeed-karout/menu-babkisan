import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// استيراد أيقونات من حزم Font Awesome
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App)

// إضافة الأيقونات إلى المكتبة
library.add(fas, far, fab)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
