import axios from 'axios';

import BACKEND_URL from './base';

export default {
    actions: {
        createMacdStrategy(_, createMacdConfig) {
            console.log(createMacdConfig);
            return axios.post(
                `${BACKEND_URL}/strategies/macd`,
                createMacdConfig
            );
        },

        getStrategies() {
            return axios.get(`${BACKEND_URL}/strategies`);
        },
        getMacdStrategy(_, { strategyId }) {
            return axios.get(`${BACKEND_URL}/strategies/info/${strategyId}`);
        },
        getMacdBacktest(_, backtestMacdConfig) {
            return axios.post(
                `${BACKEND_URL}/strategies/macd/backtest`,
                backtestMacdConfig
            );
        },

        initialiseStrategy(_, { strategyId, strategyType, capital }) {
            return axios.post(
                `${BACKEND_URL}/strategies/initialise/${strategyId}`,
                {
                    strategyType,
                    capital,
                }
            );
        },
        startStrategy(_, { strategyId }) {
            return axios.post(`${BACKEND_URL}/strategies/start/${strategyId}`);
        },
        pauseStrategy(_, { strategyId }) {
            return axios.post(`${BACKEND_URL}/strategies/pause/${strategyId}`);
        },
        getStrategyData(_, { strategyId, length }) {
            return axios.get(
                `${BACKEND_URL}/strategies/getdata/${strategyId}/${length}`
            );
        },
    },
};
