import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        loginAsync(_, credentials) {
            return axios.post(`${BACKEND_URL}/loginc`, credentials);
        },
    },
};
