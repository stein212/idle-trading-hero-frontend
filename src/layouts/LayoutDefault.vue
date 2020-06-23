<template>
    <div class="container">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
            <div v-if="userInfo.id !== null">
                {{ userInfo.firstName }} {{ userInfo.lastName }}
            </div>
        </nav>
        <main>
            <slot />
        </main>
        <footer>
            &copy; Idle Trading Hero
        </footer>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'LayoutDefault',
    computed: {
        ...mapState(['userInfo']),
    },
};
</script>
