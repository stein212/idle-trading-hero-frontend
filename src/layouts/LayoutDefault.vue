<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <p class="title is-4">Idle Trading Hero</p>
                </div>
            </div>

            <div class="navbar-start">
                <div class="navbar-item">
                    <router-link to="/dashboard">Dashboard</router-link>
                </div>
                <div class="navbar-item">
                    <router-link to="/strategies">Strategies</router-link>
                </div>
            </div>

            <div v-if="userInfo.id !== null" class="navbar-end">
                <div class="navbar-item">
                    <p>{{ userInfo.firstName }} {{ userInfo.lastName }}</p>
                </div>
            </div>
        </nav>
        <main>
            <slot />
        </main>

        <br />
        <footer class="has-text-centered">
            &copy; Idle Trading Hero 2020
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
