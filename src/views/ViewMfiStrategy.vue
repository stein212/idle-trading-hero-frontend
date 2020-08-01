<template>
    <layout>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <p class="title">{{ name }}</p>
                    <p class="subtitle">MFI</p>

                    <p><strong>Instrument:</strong> {{ instrument }}</p>
                    <p>
                        <strong>Overbought Level:</strong> {{ overboughtLevel }}
                    </p>
                    <p><strong>Oversold Level:</strong> {{ oversoldLevel }}</p>

                    <br />
                    <span
                        class="event-action"
                        :class="{ 'is-success': status === 'live' }"
                        content="Status of the strategy"
                        v-tippy="{
                            placement: 'right',
                            arrow: true,
                        }"
                    >
                        {{ getStatusText(status) }}
                    </span>
                </div>
            </div>

            <div class="column">
                <div class="box">
                    <div v-if="status === 'notDeployed'">
                        <p>Intialise Algorithm with Capital</p>
                        <b-field
                            label="Capital"
                            content="The amount of money the strategy will use"
                            v-tippy="{
                                placement: 'bottom',
                                arrow: true,
                            }"
                        >
                            <b-input v-model.number="capital"></b-input>
                        </b-field>
                        <button
                            class="button"
                            @click="onInitialiseClick"
                            content="Deploys the strategy but will not start it"
                            v-tippy="{
                                arrow: true,
                            }"
                        >
                            Initialise
                        </button>
                    </div>
                    <button
                        v-if="isStartable"
                        class="button"
                        @click="onStartClick"
                        content="Strategy will start trading"
                        v-tippy="{
                            arrow: true,
                        }"
                    >
                        Start
                    </button>
                    <button
                        v-if="status === 'live'"
                        class="button"
                        @click="onPauseClick"
                        content="Pause the strategy"
                        v-tippy="{
                            arrow: true,
                        }"
                    >
                        Pause
                    </button>
                </div>
            </div>
            <div class="column">
                <div class="card events-card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Events
                        </p>
                    </header>
                    <div class="card-table">
                        <div class="content">
                            <table class="table is-fullwidth is-striped">
                                <tbody>
                                    <tr
                                        v-for="event in strategyEvents"
                                        :key="event.id"
                                    >
                                        <td>
                                            {{ event.amount }} -
                                            {{
                                                event.eventOn.format(
                                                    'HH:mm:ss DD/MM/YYYY'
                                                )
                                            }}
                                        </td>
                                        <td class="level-right">
                                            <span
                                                class="event-action"
                                                :class="
                                                    getActionColor(event.action)
                                                "
                                                content="Action taken by the strategy at this timing"
                                                v-tippy="{
                                                    placement: 'left',
                                                    arrow: true,
                                                }"
                                            >
                                                {{ event.action }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="title is-4 has-text-centered">Price</p>
        <div class="historical-chart"></div>
        <p class="title is-4 has-text-centered">Indicator</p>
        <div class="indicator-chart"></div>
        <p class="title is-4 has-text-centered">Performance</p>
        <div class="performance-chart"></div>
        <p class="title is-4 has-text-centered">Balance</p>
        <div class="balance-chart"></div>

        <br />
        <div class="column is-offset-4 is-4">
            <div class="has-text-centered">
                <p class="title is-5 has-text-danger">Delete strategy</p>
                <button class="button is-danger" @click="onDeleteStrategy">
                    Delete
                </button>
            </div>
        </div>
        <b-loading :active="isLoading"></b-loading>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import chartUtils from '../mixins/chartUtils';
import strategyEventUtils from '../mixins/strategyEventUtils';

import { mapActions } from 'vuex';

export default {
    name: 'ViewMfiStrategy',
    components: {
        Layout,
    },
    mixins: [chartUtils, strategyEventUtils],
    data() {
        return {
            isLoading: false,

            id: this.$route.params.id,
            name: '',
            instrument: '',
            overboughtLevel: null,
            oversoldLevel: null,
            strategyType: 'mfi',
            status: 'notDeployed',

            capital: 0,

            loadDataPoll: null,
            loadStrategyEventsPoll: null,

            strategyEvents: [],

            historicalChart: {
                chart: null,
                options: {
                    chart: {
                        id: '1',
                        zoom: {
                            enabled: true,
                            type: 'x',
                        },
                        type: 'candlestick',
                        height: 300,
                    },
                    yaxis: {
                        min: min => {
                            return min;
                        },
                        max: max => {
                            return max;
                        },
                    },
                    series: [
                        {
                            name: 'price',
                            data: [],
                        },
                    ],
                },
            },
            indicatorChart: {
                chart: null,
                options: {
                    chart: {
                        id: '2',
                        zoom: {
                            enabled: true,
                            type: 'x',
                        },
                        type: 'line',
                        height: 300,
                    },
                    series: [
                        {
                            name: 'volume_mfi',
                            data: [],
                        },
                    ],
                    yaxis: {
                        decimalsInFloat: 8,
                    },
                },
            },
            performanceChart: {
                chart: null,
                options: {
                    chart: {
                        id: '3',
                        zoom: {
                            enabled: true,
                            type: 'x',
                        },
                        type: 'line',
                        height: 300,
                    },
                    series: [
                        {
                            name: 'alpha',
                            data: [],
                        },
                        {
                            name: 'return',
                            data: [],
                        },
                        {
                            name: 'sharpe',
                            data: [],
                        },
                        {
                            name: 'stock',
                            data: [],
                        },
                    ],
                    yaxis: {
                        decimalsInFloat: 8,
                    },
                },
            },
            balanceChart: {
                chart: null,
                options: {
                    chart: {
                        id: '4',
                        zoom: {
                            enabled: true,
                            type: 'x',
                        },
                        type: 'line',
                        height: 300,
                    },
                    series: [
                        {
                            name: 'balance',
                            data: [],
                        },
                    ],
                },
            },
        };
    },
    mounted() {
        this.setupCharts();
        this.loadStrategy();
    },
    beforeDestroy() {
        console.log(
            'clearing interval',
            this.loadDataPoll,
            this.loadStrategyEventsPoll
        );
        clearInterval(this.loadDataPoll);
        clearInterval(this.loadStrategyEventsPoll);
    },
    methods: {
        setupCharts() {
            this.historicalChart.chart = new this.$ApexCharts(
                document.querySelector('.historical-chart'),
                this.historicalChart.options
            );
            this.historicalChart.chart.render();

            this.indicatorChart.chart = new this.$ApexCharts(
                document.querySelector('.indicator-chart'),
                this.indicatorChart.options
            );
            this.indicatorChart.chart.render();

            this.performanceChart.chart = new this.$ApexCharts(
                document.querySelector('.performance-chart'),
                this.performanceChart.options
            );
            this.performanceChart.chart.render();

            this.balanceChart.chart = new this.$ApexCharts(
                document.querySelector('.balance-chart'),
                this.balanceChart.options
            );
            this.balanceChart.chart.render();
        },

        loadStrategy() {
            this.isLoading = true;
            this.getMfiStrategy({ strategyId: this.id }).then(({ data }) => {
                this.name = data.name;
                this.instrument = data.instrument.replace('_', '/');
                this.overboughtLevel = data.overboughtLevel;
                this.oversoldLevel = data.oversoldLevel;
                this.status = data.status;

                if (this.status === 'live') {
                    this.loadData(100);
                    this.startLoadData();
                }

                this.loadStrategyEvents(50);
                this.loadStrategyEventsPoll = setInterval(() => {
                    this.loadStrategyEvents(3);
                }, 5000);

                this.isLoading = false;
            });
        },

        onInitialiseClick() {
            if (this.status !== 'notDeployed') {
                return Promise.resolve();
            }

            return this.initialiseStrategy({
                strategyId: this.id,
                strategyType: this.strategyType,
                capital: this.capital,
            }).then(() => {
                this.loadStrategy();
            });
        },

        onStartClick() {
            this.startStrategy({
                strategyId: this.id,
                strategyType: this.strategyType,
            }).then(() => {
                this.status = 'live';
                this.startLoadData();
            });
        },

        startLoadData() {
            this.loadDataPoll = setInterval(() => {
                if (this.loadDataPoll === null) {
                    return;
                }
                this.loadData();
            }, 5000);
        },

        onPauseClick() {
            this.pauseStrategy({
                strategyId: this.id,
                strategyType: this.strategyType,
            }).then(() => {
                clearInterval(this.loadDataPoll); // if clearInterval does not work
                this.loadDataPoll === null;
            });
        },

        loadStrategyEvents(length) {
            return this.getStrategyEvents({
                id: this.id,
                length: length,
                to: this.$moment().unix(),
            }).then(({ data }) => {
                const strategyEvents = data;

                const latestEvent = this.strategyEvents[0];
                for (let i = strategyEvents.length - 1; i >= 0; i--) {
                    const event = strategyEvents[i];
                    event.eventOn = this.$moment.unix(event.eventOn);
                    if (
                        latestEvent === undefined ||
                        event.eventOn > latestEvent.eventOn
                    ) {
                        this.strategyEvents.unshift(event);
                    }
                }
            });
        },

        loadData(length = 3) {
            const promises = [
                this.getStrategyData({ strategyId: this.id, length }),
                this.getStrategyIndicatorData({ strategyId: this.id, length }),
                this.getStrategyPerformanceData({
                    strategyId: this.id,
                    length,
                }),
            ];
            Promise.all(promises).then(responses => {
                // history
                const historicalData = responses[0].data;
                let latestTimestamp = this.getLatestTimestamp(
                    this.historicalChart.options.series[0].data
                );

                let dataToAppend = this.dfToCandleSeries(
                    historicalData,
                    latestTimestamp
                );

                this.historicalChart.chart.appendData([
                    {
                        data: dataToAppend,
                    },
                ]);

                // indicator
                const indicatorData = responses[1].data;
                latestTimestamp = this.getLatestTimestamp(
                    this.indicatorChart.options.series[0].data
                );

                let seriesToAppend = this.dfToMultipleSeries(
                    indicatorData,
                    latestTimestamp,
                    this.getSeriesNames(this.indicatorChart.options.series)
                );

                this.indicatorChart.chart.appendData(seriesToAppend);

                // performance
                // debugger;
                const performanceData = responses[2].data;
                console.log(performanceData);
                latestTimestamp = this.getLatestTimestamp(
                    this.performanceChart.options.series[0].data
                );

                seriesToAppend = this.dfToMultipleSeries(
                    performanceData,
                    latestTimestamp,
                    this.getSeriesNames(this.performanceChart.options.series)
                );

                this.performanceChart.chart.appendData(seriesToAppend);

                // balance
                const balanceData = {
                    balance: performanceData.balance,
                    t: performanceData.t,
                };

                seriesToAppend = this.dfToMultipleSeries(
                    balanceData,
                    latestTimestamp,
                    this.getSeriesNames(this.balanceChart.options.series)
                );

                this.balanceChart.chart.appendData(seriesToAppend);
            });
        },

        onDeleteStrategy() {
            this.isLoading = true;
            this.deleteStrategy({
                strategyId: this.id,
                strategyType: 'mfi',
            }).then(() => {
                this.$router.push({ name: 'Strategies' });
            });
        },

        ...mapActions([
            'getMfiStrategy',
            'initialiseStrategy',
            'getStrategyData',
            'getStrategyIndicatorData',
            'getStrategyPerformanceData',
            'startStrategy',
            'pauseStrategy',
            'getStrategyEvents',
            'deleteStrategy',
        ]),
    },
    computed: {
        isStartable() {
            return this.status === 'deployed' || this.status === 'paused';
        },
    },
};
</script>
