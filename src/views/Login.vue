<template>
    <layout name="LayoutBlank">
        <section class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="column is-4 is-offset-4">
                        <h1 class="title has-text-centered">
                            Idle Trading Hero
                        </h1>
                        <form @submit.prevent="login" class="box">
                            <b-field label="Username">
                                <b-input type="text" v-model="username">
                                </b-input>
                            </b-field>
                            <b-field label="Password">
                                <b-input
                                    type="password"
                                    v-model="password"
                                    password-reveal
                                >
                                </b-input>
                            </b-field>
                            <button
                                class="button is-fullwidth is-success"
                                type="submit"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <b-loading :active="isLoading"></b-loading>
            <b-modal :active.sync="isErrorModalActive">
                <div class="modal-card">
                    <section class="modal-card-body">
                        {{ errorMessage }}
                    </section>

                    <footer class="modal-card-foot">
                        <div>
                            <button
                                class="button is-pulled-right"
                                @click="onErrorModalOk"
                            >
                                Ok
                            </button>
                        </div>
                    </footer>
                </div>
            </b-modal>
        </section>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    props: {
        errorMessage: {
            type: String,
        },
    },
    components: {
        Layout,
    },
    data() {
        return {
            username: '',
            password: '',
            isLoading: false,
            isErrorModalActive: false,
        };
    },
    mounted() {
        if (this.errorMessage !== undefined) {
            this.isErrorModalActive = true;
        }
    },
    methods: {
        async login() {
            this.isLoading = true;
            const credentials = {
                username: this.username,
                password: this.password,
            };

            try {
                await this.loginAsync(credentials);
            } catch (err) {
                alert('Invalid Credentials!');
                console.log(err);
                this.isLoading = false;
                return;
            }

            try {
                await this.updateUserInfoAsync();
                this.$router.push({ name: 'Dashboard' });
            } catch (err) {
                alert('Unknown Error');
                console.log(err);
                this.isLoading = false;
            }
        },
        ...mapActions(['loginAsync', 'updateUserInfoAsync']),
        onErrorModalOk() {
            this.isErrorModalActive = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.modal {
    .modal-card {
        margin: auto;
        .modal-card-foot {
            justify-content: flex-end;
        }
    }
}
</style>
