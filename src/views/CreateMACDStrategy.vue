<template>
    <layout>
        <h1>Create MACD Strategy</h1>

        <form @submit.prevent="onMacdFormSubmit">
            <b-field label="Name">
                <b-input v-model="macdConfig.name"></b-input>
            </b-field>
            <b-field label="Instrument">
                <b-input v-model="macdConfig.instrument"></b-input>
            </b-field>
            <b-field label="Ema26">
                <b-input type="number" v-model.number="macdConfig.ema26">
                </b-input>
            </b-field>
            <b-field label="Ema12">
                <b-input type="number" v-model.number="macdConfig.ema12">
                </b-input>
            </b-field>
            <b-field label="Ema9">
                <b-input type="number" v-model.number="macdConfig.ema9">
                </b-input>
            </b-field>

            <button class="button is-fullwidth" type="button">
                Backtest
            </button>

            <button class="button is-fullwidth is-success" type="submit">
                Create
            </button>
        </form>

        <br />

        <div class="content" v-if="performance !== null">
            <h3 class="title">Performance</h3>

            <p>Initial Capitial: {{ this.macdConfigcapitial }}</p>
            <p>Final Capitial: {{ this.performance.balance }}</p>
            <p>
                Number Of Stock: {{ this.performance.stock }} (${{
                    this.performance.c
                }}/stock)
            </p>
            <p>Returns: {{ this.performance.return }}</p>
            <p>
                Total Equity:
                {{
                    this.performance.balance +
                        this.performance.stock * this.performance.c
                }}
            </p>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';
export default {
    name: 'CreateMACDStrategy',
    components: {
        Layout,
    },
    data() {
        return {
            macdConfig: {
                name: '',
                instrument: 'AUD_USD',
                granularity: 'S5',
                ema26: 26,
                ema12: 12,
                ema9: 9,
            },
            performance: null,
        };
    },
    methods: {
        onMacdFormSubmit() {
            const createMacdConfig = {
                name: this.macdConfig.name,
                instrument: this.macdConfig.instrument,
                granularity: this.macdConfig.granularity,
                ema26: this.macdConfig.ema26,
                ema12: this.macdConfig.ema12,
                ema9: this.macdConfig.ema9,
            };
            console.log(createMacdConfig);
            this.createMacdStrategy(createMacdConfig).then(() => {
                this.$router.push({ name: 'Strategies' });
            });
        },
        onBacktestClick() {
            this.getMacdBacktest(this.macdConfig).then(({ data }) => {
                this.performance = data;
            });
        },
        ...mapActions(['createMacdStrategy', 'getMacdBacktest']),
    },
};
</script>
