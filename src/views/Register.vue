<template>
    <layout name="LayoutBlank">
        <section class="hero is-info welcome is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <div class="column is-4 is-offset-4">
                        <h1 class="title has-text-centered">
                            Idle Trading Hero
                        </h1>
                        <p class="subtitle has-text-centered">Register</p>
                        <form @submit.prevent="onRegisterClick" class="box">
                            <b-field label="Username">
                                <b-input type="text" v-model="username">
                                </b-input>
                            </b-field>
                            <b-field label="Email">
                                <b-input type="email" v-model="email">
                                </b-input>
                            </b-field>
                            <b-field label="First Name">
                                <b-input type="text" v-model="firstName">
                                </b-input>
                            </b-field>
                            <b-field label="Last Name">
                                <b-input type="text" v-model="lastName">
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
                            <b-field
                                label="Confirm Password"
                                :type="{
                                    'is-danger': password !== confirmPassword,
                                }"
                            >
                                <b-input
                                    type="password"
                                    v-model="confirmPassword"
                                    password-reveal
                                >
                                </b-input>
                            </b-field>
                            <button
                                class="button is-fullwidth is-success"
                                type="submit"
                                :disabled="!canRegister"
                            >
                                Register
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
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
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
        async onRegisterClick() {
            this.isLoading = true;
            const credentials = {
                username: this.username,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
            };

            try {
                await this.register(credentials);
                this.$router.push({ name: 'Login' });
            } catch (err) {
                if (err.response.status === 422) {
                    alert(err.response.data.Errors[0].Message);
                    this.isLoading = false;
                    return;
                }
                alert('Something has gone wrong');
                this.isLoading = false;
                return;
            }
        },
        ...mapActions(['register']),
        onErrorModalOk() {
            this.isErrorModalActive = false;
        },
    },
    computed: {
        canRegister() {
            return (
                this.username !== '' &&
                this.email !== '' &&
                this.firstName !== '' &&
                this.lastName !== '' &&
                this.password !== '' &&
                this.password == this.confirmPassword
            );
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
