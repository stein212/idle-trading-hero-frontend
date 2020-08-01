import axios from 'axios';

import BACKEND_URL from './base';

export default {
    state: {
        instruments: [
            {
                text: 'AUD/CHF',
                value: 'AUD_CHF',
            },
            {
                text: 'AUD/HKD',
                value: 'AUD_HKD',
            },
            {
                text: 'AUD/JPY',
                value: 'AUD_JPY',
            },
            {
                text: 'AUD/NZD',
                value: 'AUD_NZD',
            },
            {
                text: 'AUD/SGD',
                value: 'AUD_SGD',
            },
            {
                text: 'AUD/USD',
                value: 'AUD_USD',
            },
            {
                text: 'CAD/CHF',
                value: 'CAD_CHF',
            },
            {
                text: 'CAD/HKD',
                value: 'CAD_HKD',
            },
            {
                text: 'CAD/JPY',
                value: 'CAD_JPY',
            },
            {
                text: 'CAD/SGD',
                value: 'CAD_SGD',
            },
            {
                text: 'CHF/HKD',
                value: 'CHF_HKD',
            },
            {
                text: 'CHF/JPY',
                value: 'CHF_JPY',
            },
            {
                text: 'CHF/ZAR',
                value: 'CHF_ZAR',
            },
            {
                text: 'EUR/AUD',
                value: 'EUR_AUD',
            },
            {
                text: 'EUR/CAD',
                value: 'EUR_CAD',
            },
            {
                text: 'EUR/CHF',
                value: 'EUR_CHF',
            },
            {
                text: 'EUR/CZK',
                value: 'EUR_CZK',
            },
            {
                text: 'EUR/DKK',
                value: 'EUR_DKK',
            },
            {
                text: 'EUR/GBP',
                value: 'EUR_GBP',
            },
            {
                text: 'EUR/HKD',
                value: 'EUR_HKD',
            },
            {
                text: 'EUR/HUF',
                value: 'EUR_HUF',
            },
            {
                text: 'EUR/JPY',
                value: 'EUR_JPY',
            },
            {
                text: 'EUR/NOK',
                value: 'EUR_NOK',
            },
            {
                text: 'EUR/NZD',
                value: 'EUR_NZD',
            },
            {
                text: 'EUR/PLN',
                value: 'EUR_PLN',
            },
            {
                text: 'EUR/SEK',
                value: 'EUR_SEK',
            },
            {
                text: 'EUR/SGD',
                value: 'EUR_SGD',
            },
            {
                text: 'EUR/TRY',
                value: 'EUR_TRY',
            },
            {
                text: 'EUR/USD',
                value: 'EUR_USD',
            },
            {
                text: 'EUR/ZAR',
                value: 'EUR_ZAR',
            },
            {
                text: 'GBP/AUD',
                value: 'GBP_AUD',
            },
            {
                text: 'GBP/CAD',
                value: 'GBP_CAD',
            },
            {
                text: 'GBP/CHF',
                value: 'GBP_CHF',
            },
            {
                text: 'GBP/HKD',
                value: 'GBP_HKD',
            },
            {
                text: 'GBP/JPY',
                value: 'GBP_JPY',
            },
            {
                text: 'GBP/NZD',
                value: 'GBP_NZD',
            },
            {
                text: 'GBP/PLN',
                value: 'GBP_PLN',
            },
            {
                text: 'GBP/SGD',
                value: 'GBP_SGD',
            },
            {
                text: 'GBP/USD',
                value: 'GBP_USD',
            },
            {
                text: 'GBP/ZAR',
                value: 'GBP_ZAR',
            },
            {
                text: 'HKD/JPY',
                value: 'HKD_JPY',
            },
            {
                text: 'NZD/CAD',
                value: 'NZD_CAD',
            },
            {
                text: 'NZD/CHF',
                value: 'NZD_CHF',
            },
            {
                text: 'NZD/HKD',
                value: 'NZD_HKD',
            },
            {
                text: 'NZD/JPY',
                value: 'NZD_JPY',
            },
            {
                text: 'NZD/SGD',
                value: 'NZD_SGD',
            },
            {
                text: 'NZD/USD',
                value: 'NZD_USD',
            },
            {
                text: 'SGD/CHF',
                value: 'SGD_CHF',
            },
            {
                text: 'SGD/HKD',
                value: 'SGD_HKD',
            },
            {
                text: 'SGD/JPY',
                value: 'SGD_JPY',
            },
            {
                text: 'TRY/JPY',
                value: 'TRY_JPY',
            },
            {
                text: 'USD/CAD',
                value: 'USD_CAD',
            },
            {
                text: 'USD/CHF',
                value: 'USD_CHF',
            },
            {
                text: 'USD/CNH',
                value: 'USD_CNH',
            },
            {
                text: 'USD/CZK',
                value: 'USD_CZK',
            },
            {
                text: 'USD/DKK',
                value: 'USD_DKK',
            },
            {
                text: 'USD/HKD',
                value: 'USD_HKD',
            },
            {
                text: 'USD/HUF',
                value: 'USD_HUF',
            },
            {
                text: 'USD/INR',
                value: 'USD_INR',
            },
            {
                text: 'USD/JPY',
                value: 'USD_JPY',
            },
            {
                text: 'USD/MXN',
                value: 'USD_MXN',
            },
            {
                text: 'USD/NOK',
                value: 'USD_NOK',
            },
            {
                text: 'USD/PLN',
                value: 'USD_PLN',
            },
            {
                text: 'USD/SEK',
                value: 'USD_SEK',
            },
            {
                text: 'USD/SGD',
                value: 'USD_SGD',
            },
            {
                text: 'USD/THB',
                value: 'USD_THB',
            },
            {
                text: 'USD/TRY',
                value: 'USD_TRY',
            },
            {
                text: 'USD/ZAR',
                value: 'USD_ZAR',
            },
            {
                text: 'ZAR/JPY',
                value: 'ZAR_JPY',
            },
        ],
    },
    actions: {
        createMacdStrategy(_, createMacdConfig) {
            return axios.post(
                `${BACKEND_URL}/strategies/macd`,
                createMacdConfig
            );
        },
        createMfiStrategy(_, createMfiConfig) {
            return axios.post(`${BACKEND_URL}/strategies/mfi`, createMfiConfig);
        },
        createRsiStrategy(_, createRsiConfig) {
            return axios.post(`${BACKEND_URL}/strategies/rsi`, createRsiConfig);
        },

        getStrategies() {
            return axios.get(`${BACKEND_URL}/strategies`);
        },
        getMacdStrategy(_, { strategyId }) {
            return axios.get(
                `${BACKEND_URL}/strategies/macd/info/${strategyId}`
            );
        },
        getMfiStrategy(_, { strategyId }) {
            return axios.get(
                `${BACKEND_URL}/strategies/mfi/info/${strategyId}`
            );
        },
        getRsiStrategy(_, { strategyId }) {
            return axios.get(
                `${BACKEND_URL}/strategies/rsi/info/${strategyId}`
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
        startStrategy(_, { strategyId, strategyType }) {
            return axios.post(
                `${BACKEND_URL}/strategies/start/${strategyType}/${strategyId}`
            );
        },
        pauseStrategy(_, { strategyId, strategyType }) {
            return axios.post(
                `${BACKEND_URL}/strategies/pause/${strategyType}/${strategyId}`
            );
        },
        getStrategyData(_, { strategyId, length }) {
            return axios.get(
                `${BACKEND_URL}/strategies/getData/${strategyId}/${length}`
            );
        },
        getStrategyIndicatorData(_, { strategyId, length }) {
            return axios.get(
                `${BACKEND_URL}/strategies/getIndicatorData/${strategyId}/${length}`
            );
        },
        getStrategyPerformanceData(_, { strategyId, length }) {
            return axios.get(
                `${BACKEND_URL}/strategies/getPerformanceData/${strategyId}/${length}`
            );
        },

        deleteStrategy(_, { strategyId, strategyType }) {
            return axios.delete(
                `${BACKEND_URL}/strategies/${strategyType}/${strategyId}`
            );
        },
    },
};
