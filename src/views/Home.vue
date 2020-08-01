<template>
    <layout name="LayoutBlank">
        <div class="hero is-fullheight is-info welcome">
            <div class="hero-body has-text-centered">
                <div class="column is-4 is-offset-4">
                    <p class="title is-1">Idle Trading Hero</p>
                    <div class="buttons">
                        <router-link
                            class="button is-success"
                            :to="{ name: 'Login' }"
                        >
                            Login
                        </router-link>
                        <router-link class="button" :to="{ name: 'Register' }">
                            Register
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
// @ is an alias to /src

export default {
    name: 'Home',
    components: {
        Layout,
    },
};
</script>

<style lang="scss">
.buttons {
    justify-content: center !important;
}
</style>
