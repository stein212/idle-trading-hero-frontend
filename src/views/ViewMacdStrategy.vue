<template>
    <layout>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h1>{{ name }}</h1>

                    <p>ema26: {{ ema26 }}</p>
                    <p>ema12: {{ ema12 }}</p>
                    <p>ema9: {{ ema9 }}</p>
                    <p>status: {{ status }}</p>
                </div>
            </div>

            <div class="column">
                <div class="box">
                    <p>Intialise Algorithm with Capital</p>
                    <b-field label="Capital">
                        <b-input v-model.number="capital"></b-input>
                    </b-field>
                    <button class="button" @click="onInitialiseClick">
                        Initialise
                    </button>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <p>Live: {{ this.status === 'live' }}</p>
                    <button
                        v-if="isStartable"
                        class="button"
                        @click="onStartClick"
                    >
                        Start
                    </button>
                    <button v-else class="button" @click="onPauseClick">
                        Pause
                    </button>
                    <div>{{ data }}</div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';
export default {
    name: 'ViewMacdStrategy',
    components: {
        Layout,
    },
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            instrument: '',
            ema26: null,
            ema12: null,
            ema9: null,
            status: 'notDeployed',

            capital: 0,

            data: {},
            getDataPoll: null,
        };
    },
    mounted() {
        this.loadStrategy();
    },
    methods: {
        loadStrategy() {
            this.getMacdStrategy({ strategyId: this.id }).then(({ data }) => {
                this.name = data.name;
                this.ema26 = data.ema26;
                this.ema12 = data.ema12;
                this.ema9 = data.ema9;
                this.status = data.status;
            });
        },

        onInitialiseClick() {
            if (this.status !== 'notDeployed') {
                return Promise.resolve();
            }

            return this.initialiseStrategy({
                strategyId: this.id,
                strategyType: 'macd',
                capital: this.capital,
            }).then(() => {
                this.loadStrategy();
            });
        },

        onStartClick() {
            this.startStrategy({ strategyId: this.id }).then(() => {
                this.getDataPoll = setInterval(() => {
                    this.getData();
                }, 5000);
            });
        },

        onPauseClick() {
            this.pauseStrategy({ strategyId: this.id }).then(() => {
                clearInterval(this.getDataPoll);
            });
        },

        getData() {
            this.getStrategyData({ strategyId: this.id, length: 10 }).then(
                ({ data }) => {
                    this.data = data;
                }
            );
        },
        ...mapActions([
            'getMacdStrategy',
            'initialiseStrategy',
            'getStrategyData',
            'startStrategy',
            'pauseStrategy',
        ]),
    },
    computed: {
        isStartable() {
            return this.status === 'deployed' || this.status === 'paused';
        },
    },
};
</script>
