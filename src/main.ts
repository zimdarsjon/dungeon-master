import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router/index.ts';
import { createPinia } from 'pinia'
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import DialogService from 'primevue/dialogservice';
import ToastService from 'primevue/toastservice';
import FocusTrap from 'primevue/focustrap';

const pinia = createPinia();

createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
.use(router)
.use(pinia)
.use(DialogService)
.use(ToastService)
.directive('focustrap', FocusTrap)
.mount('#app')
