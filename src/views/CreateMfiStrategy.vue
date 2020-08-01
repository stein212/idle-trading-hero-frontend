<template>
    <layout>
        <div class="container">
            <p class="title">Create MFI Strategy</p>

            <form @submit.prevent="onMfiFormSubmit">
                <b-field label="Name">
                    <b-input v-model="mfiConfig.name"></b-input>
                </b-field>
                <b-field
                    label="Instrument"
                    content="The market the strategy will trade in"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-select v-model="mfiConfig.instrument" expanded>
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
                    content="Set the Overbought levels of MFI"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-input
                        type="number"
                        v-model.number="mfiConfig.overboughtLevel"
                    >
                    </b-input>
                </b-field>
                <b-field
                    label="Oversold Level"
                    content="Set the Oversold levels of MFI"
                    v-tippy="{ placement: 'bottom', arrow: true }"
                >
                    <b-input
                        type="number"
                        v-model.number="mfiConfig.oversoldLevel"
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
    name: 'CreateMFIStrategy',
    components: {
        Layout,
    },
    data() {
        return {
            mfiConfig: {
                name: '',
                instrument: 'AUD_USD',
                granularity: 'S5',
                overboughtLevel: 80,
                oversoldLevel: 20,
                ema9: 9,
            },
            performance: null,
        };
    },
    methods: {
        onMfiFormSubmit() {
            const createMfiConfig = {
                name: this.mfiConfig.name,
                instrument: this.mfiConfig.instrument,
                granularity: this.mfiConfig.granularity,
                overboughtLevel: this.mfiConfig.overboughtLevel,
                oversoldLevel: this.mfiConfig.oversoldLevel,
            };
            this.createMfiStrategy(createMfiConfig).then(() => {
                this.$router.push({ name: 'Strategies' });
            });
        },
        ...mapActions(['createMfiStrategy']),
    },
    computed: {
        instruments() {
            return this.$store.state.moduleStrategy.instruments;
        },
    },
};
</script>
