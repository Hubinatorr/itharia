import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import {createPinia} from "pinia";

const pinia = createPinia()

router.afterEach((to) => {
	if (window.gtag) {
		window.gtag('config', 'G-EQDN3BWDSD', {
			page_path: to.fullPath,
		})
	}
})

createApp(App)
	.use(router)
	.use(pinia)
	.mount('#app')
