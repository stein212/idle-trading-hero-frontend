<template>
    <layout>
        <h1>Create Strategy</h1>

        <router-link class="button" :to="{ name: 'CreateMACDStrategy' }"
            >Create MACD Strategy</router-link
        >
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
export default {
    name: 'CreateStrategy',
    components: {
        Layout,
    },
};
</script>
