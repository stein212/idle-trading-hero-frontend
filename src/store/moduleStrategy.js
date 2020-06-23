import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        getMACDPerformance(_, macdConfig) {
            return axios.post(`${BACKEND_URL}/strategy/macd`, macdConfig);
        },
    },
};
