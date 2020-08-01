<template>
    <layout>
        <div class="container">
            <p class="title">Create RSI Strategy</p>

            <form @submit.prevent="onRsiFormSubmit">
                <b-field label="Name">
                    <b-input v-model="rsiConfig.name"></b-input>
                </b-field>
                <b-field
                    label="Instrument"
                    content="The market the strategy will trade in"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-select v-model="rsiConfig.instrument" expanded>
                        <option
                            v-for="instrument of instruments"
                            :key="instrument.value"
                            :value="instrument.value"
                            >{{ instrument.text }}</option
                        >
                    </b-select>
                </b-field>
                <b-field
                    label="Overbought Level"
                    content="Set the Overbought levels of RSI"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-input
                        type="number"
                        v-model.number="rsiConfig.overboughtLevel"
                    >
                    </b-input>
                </b-field>
                <b-field
                    label="Oversold Level"
                    content="Set the Oversold levels of RSI"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-input
                        type="number"
                        v-model.number="rsiConfig.oversoldLevel"
                    >
                    </b-input>
                </b-field>

                <button class="button is-fullwidth is-success" type="submit">
                    Create
                </button>
            </form>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';
export default {
    name: 'CreateRSIStrategy',
    components: {
        Layout,
    },
    data() {
        return {
            rsiConfig: {
                name: '',
                instrument: 'AUD_USD',
                granularity: 'S5',
                overboughtLevel: 70,
                oversoldLevel: 30,
            },
            performance: null,
        };
    },
    methods: {
        onRsiFormSubmit() {
            const createRsiConfig = {
                name: this.rsiConfig.name,
                instrument: this.rsiConfig.instrument,
                granularity: this.rsiConfig.granularity,
                overboughtLevel: this.rsiConfig.overboughtLevel,
                oversoldLevel: this.rsiConfig.oversoldLevel,
            };
            this.createRsiStrategy(createRsiConfig).then(() => {
                this.$router.push({ name: 'Strategies' });
            });
        },
        ...mapActions(['createRsiStrategy']),
    },
    computed: {
        instruments() {
            return this.$store.state.moduleStrategy.instruments;
        },
    },
};
</script>
