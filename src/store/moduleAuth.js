import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        login(_, credentials) {
            return axios.post(`${BACKEND_URL}/loginc`, credentials);
        },
        register(_, registerData) {
            return axios.post(`${BACKEND_URL}/register`, registerData);
        },
    },
};
