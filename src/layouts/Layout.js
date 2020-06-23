// https://markus.oberlehner.net/blog/dynamic-vue-layout-components/

import Vue from 'vue';

export default {
    name: 'Layout',
    props: {
        name: {
            type: String,
            default: 'LayoutDefault',
        },
    },
    created() {
        // Check if the layout component
        // has already been registered.
        if (!Vue.options.components[this.name]) {
            Vue.component(this.name, () =>
                import(`../layouts/${this.name}.vue`)
            );
        }

        this.$parent.$emit('update:layout', this.name);
    },
    render(createElement) {
        return createElement('div', this.$slots.default);
    },
};
