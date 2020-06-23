<template>
    <layout>
        <h1>Create MACD Strategy</h1>

        <form @submit.prevent="onMACDFormSubmit">
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
            <button class="button is-fullwidth is-success" type="submit">
                Get Performance
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
                asset: 'AAPL',
                strategy: 'MACD',
                capital: 10000,
                ema26: 26,
                ema12: 12,
                ema9: 9,
            },
            performance: null,
        };
    },
    methods: {
        onMACDFormSubmit() {
            this.getMACDPerformance(this.macdConfig).then(({ data }) => {
                this.performance = data;
            });
        },
        ...mapActions(['getMACDPerformance']),
    },
};
</script>
