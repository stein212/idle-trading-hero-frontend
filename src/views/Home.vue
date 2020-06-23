<template>
    <layout>
        <div>
            <h1 class="title">Idle Trading Hero nigger</h1>
            <HelloWorld></HelloWorld>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
        Layout,
    },
};
</script>
