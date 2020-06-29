import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import axios from 'axios';
import './assets/scss/app.scss';

Vue.use(Buefy, {
    defaultIconPack: 'fa',
});

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push({ name: 'login' });
        }
        return error;
    }
);

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
