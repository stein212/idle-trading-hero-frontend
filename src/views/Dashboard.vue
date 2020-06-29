<template>
    <layout>
        <h1>Dashboard</h1>
        <router-link :to="{ name: 'Strategies' }">Strategies</router-link>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
export default {
    name: 'Dashboard',
    components: {
        Layout,
    },
    data() {
        return {};
    },
};
</script>
