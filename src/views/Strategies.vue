<template>
    <layout>
        <h1>Strategies</h1>
        <p>TODO list of strategies user has</p>

        <router-link
            v-for="strategy in strategies"
            :key="strategy.id"
            class="box"
            :to="{ path: `/strategies/${strategy.type}/${strategy.id}` }"
        >
            <p>{{ strategy.id }}</p>
            <p>{{ strategy.name }}</p>
        </router-link>

        <router-link class="button" :to="{ name: 'CreateStrategy' }"
            >Create Strategy</router-link
        >
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
