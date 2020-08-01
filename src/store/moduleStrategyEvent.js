import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        getUserStrategyEvents(_, { length, to }) {
            return axios.get(
                `${BACKEND_URL}/strategies/allEvents/${length}/${to}`
            );
        },
        getStrategyEvents(_, { id, length, to }) {
            return axios.get(
                `${BACKEND_URL}/strategies/events/${id}/${length}/${to}`
            );
        },
    },
};
