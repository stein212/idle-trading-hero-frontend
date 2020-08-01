<template>
    <layout>
        <div class="container">
            <p class="title">Create Strategy</p>
            <p class="subtitle">Choose your strategy type</p>
            <div class="columns">
                <div class="column">
                    <router-link :to="{ name: 'CreateMACDStrategy' }">
                        <div
                            class="hero is-medium"
                            content="The MACD strategy consists of multiple indicators: The MACD line consists of the 12-day EMA subtracting the 26-day EMA. The Signal line is computed as the 9-day EMA of the MACD line.<br/><br/> When the Signal line crosses over the MACD line, the strategy buys. Simiarly, when the Signal line crosses below the MACD line, the strategy sells."
                            v-tippy="{
                                placement: 'bottom',
                                arrow: true,
                            }"
                        >
                            <div class="hero-body box has-text-centered">
                                <p class="is-size-3">MACD</p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="column">
                    <router-link :to="{ name: 'CreateMFIStrategy' }">
                        <div
                            class="hero is-medium"
                            content="The Money Flow Index (MFI) is a technical oscillator that uses price and volume data for identifying overbought or oversold signals in an asset.<br/><br/>When the indicator crosses from oversold to normal, the strategy buys. Similarly, When the indicator crosses from overbought to normal, the strategy sells."
                            v-tippy="{
                                placement: 'bottom',
                                arrow: true,
                            }"
                        >
                            <div class="hero-body box has-text-centered">
                                <p class="is-size-3">MFI</p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="column">
                    <router-link :to="{ name: 'CreateRSIStrategy' }">
                        <div
                            class="hero is-medium"
                            content="The relative strength index (RSI) is a momentum indicator used in technical analysis that measures the magnitude of recent price changes to evaluate overbought or oversold conditions in the price of a stock or other asset.<br/><br/>When the indicator crosses from oversold to normal, the strategy buys. Similarly, When the indicator crosses from overbought to normal, the strategy sells."
                            v-tippy="{
                                placement: 'bottom',
                                arrow: true,
                            }"
                        >
                            <div class="hero-body box has-text-centered">
                                <p class="is-size-3">RSI</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
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
