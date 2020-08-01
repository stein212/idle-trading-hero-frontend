<template>
    <layout>
        <div class="section">
            <div class="container">
                <div class="hero is-small is-info welcome">
                    <div class="hero-body">
                        <p class="title">Dashboard</p>
                    </div>
                </div>

                <section class="info-tiles">
                    <div class="tile is-ancestor has-text-centered">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">{{ totalBalance }}</p>
                                <p class="subtitle">Total balance</p>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">{{ strategies.length }}</p>
                                <p class="subtitle">Strategies</p>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">{{ liveStrategies }}</p>
                                <p class="subtitle">Live Strategies</p>
                            </article>
                        </div>
                    </div>
                </section>

                <div class="columns">
                    <div class="column">
                        <div class="card events-card">
                            <header class="card-header">
                                <p class="card-header-title">
                                    Events
                                </p>
                            </header>
                            <div class="card-table">
                                <div class="content">
                                    <table
                                        class="table is-fullwidth is-striped"
                                    >
                                        <tbody>
                                            <tr
                                                v-for="event in strategyEvents"
                                                :key="event.id"
                                            >
                                                <td>
                                                    {{
                                                        idToName(
                                                            event.strategyId
                                                        )
                                                    }}
                                                    - {{ event.amount }} -
                                                    {{
                                                        event.eventOn.format(
                                                            'HH:mm:ss DD/MM/YYYY'
                                                        )
                                                    }}
                                                </td>
                                                <td class="level-right">
                                                    <p
                                                        class="event-action"
                                                        :class="
                                                            getActionColor(
                                                                event.action
                                                            )
                                                        "
                                                        content="Action taken by the strategy at this timing"
                                                        v-tippy="{
                                                            placement: 'left',
                                                            arrow: true,
                                                        }"
                                                    >
                                                        {{ event.action }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-loading :active="isLoading"></b-loading>
    </layout>
</template>

<script>
import Layout from '../layouts/Layout';
import { mapActions } from 'vuex';
import strategyEventUtils from '../mixins/strategyEventUtils';

export default {
    name: 'Dashboard',
    components: {
        Layout,
    },
    mixins: [strategyEventUtils],
    data() {
        return {
            isLoading: false,

            strategies: [],

            getStrategyEventsPoll: null,

            strategyEvents: [],
        };
    },
    mounted() {
        this.isLoading = true;
        this.loadDashboard().then(() => {
            this.isLoading = false;

            this.getStrategyEventsPoll = setInterval(() => {
                this.getUserStrategyEvents({
                    length: 3,
                    to: this.$moment().unix(),
                })
                    .then(res => {
                        console.log(res);
                        const data = res.data;
                        const strategyEvents = data;

                        const latestEvent = this.strategyEvents[0];
                        for (let i = strategyEvents.length - 1; i >= 0; i--) {
                            const event = strategyEvents[i];
                            event.eventOn = this.$moment.unix(event.eventOn);
                            if (
                                latestEvent === undefined ||
                                event.eventOn > latestEvent.eventOn
                            ) {
                                this.strategyEvents.unshift(event);
                            }
                        }
                    })
                    .catch(err => {
                        console.log('error', err);
                    });
            }, 5000);
        });
    },
    beforeDestroy() {
        console.log('clearing interval', this.getStrategyEventsPoll);
        clearInterval(this.getStrategyEventsPoll);
    },
    methods: {
        loadDashboard() {
            return this.getStrategies()
                .then(({ data }) => {
                    this.strategies = data;
                })
                .then(() => {
                    this.getUserStrategyEvents({
                        length: 50,
                        to: this.$moment().unix(),
                    }).then(({ data }) => {
                        this.strategyEvents = data;

                        for (const event of this.strategyEvents) {
                            event.eventOn = this.$moment.unix(event.eventOn);
                        }
                    });
                });
        },

        ...mapActions(['getUserStrategyEvents', 'getStrategies']),

        idToName(id) {
            for (const strategy of this.strategies) {
                if (strategy.id === id) {
                    return strategy.name;
                }
            }

            return null;
        },
    },
    computed: {
        totalBalance() {
            let bal = 0;
            for (const strategy of this.strategies) {
                bal += strategy.balance;
            }

            return bal;
        },
        liveStrategies() {
            let count = 0;
            for (const strategy of this.strategies) {
                if (strategy.status === 'live') {
                    count++;
                }
            }

            return count;
        },
    },
};
</script>
