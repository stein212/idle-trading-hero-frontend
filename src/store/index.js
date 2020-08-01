import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import moduleAuth from './moduleAuth';
import moduleUser from './moduleUser';
import moduleStrategy from './moduleStrategy';
import moduleStrategyEvent from './moduleStrategyEvent';

export default new Vuex.Store({
    state: {
        userInfo: {
            id: null,
            firstName: null,
            lastName: null,
            roles: [],
        },
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo.id = userInfo.id;
            state.userInfo.firstName = userInfo.firstName;
            state.userInfo.lastName = userInfo.lastName;
            state.userInfo.roles = userInfo.roles;
        },
    },
    actions: {},
    modules: {
        moduleAuth,
        moduleUser,
        moduleStrategy,
        moduleStrategyEvent,
    },
});
