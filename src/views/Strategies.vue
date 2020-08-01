<template>
    <layout>
        <div class="container">
            <p class="title">Strategies</p>
            <div class="columns">
                <div class="column"></div>
                <div class="column is-narrow">
                    <router-link
                        class="button is-success is-pulled-right"
                        :to="{ name: 'CreateStrategy' }"
                        >Create Strategy</router-link
                    >
                </div>
            </div>

            <router-link
                v-for="strategy in strategies"
                :key="strategy.id"
                class="box"
                :to="{ path: `/strategies/${strategy.type}/${strategy.id}` }"
            >
                <p>{{ strategy.name }} ({{ strategy.type }})</p>
            </router-link>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';
export default {
    name: 'Strategies',
    components: {
        Layout,
    },
    data() {
        return {
            strategies: [],
        };
    },
    mounted() {
        this.loadStrategies();
    },
    methods: {
        loadStrategies() {
            this.getStrategies().then(({ data }) => {
                this.strategies = data;
            });
        },
        ...mapActions(['getStrategies']),
    },
};
</script>
