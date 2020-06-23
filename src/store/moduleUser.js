import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        updateUserInfoAsync({ commit }) {
            return axios.get(`${BACKEND_URL}/userInfo`).then(({ data }) => {
                const userInfo = data;
                userInfo.roles = ['user'];
                commit('setUserInfo', userInfo, { root: true });
            });
        },
    },
};
