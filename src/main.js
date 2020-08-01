import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import moment from 'moment';
import VueTippy, { TippyComponent } from 'vue-tippy';

import './assets/scss/app.scss';

Vue.use(Buefy, {
    defaultIconPack: 'fa',
});

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            router.push({
                name: 'Login',
                params: { errorMessage: 'Your session has expired' },
            });
        }
        return Promise.reject(error);
    }
);

Vue.prototype.$axios = axios;
Vue.prototype.$ApexCharts = ApexCharts;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
