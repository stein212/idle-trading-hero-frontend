import LayoutBlank from './LayoutBlank.vue';

export default {
    name: 'LayoutBlankDynamic',
    created() {
        this.$parent.$emit('update:layout', LayoutBlank);
    },
    render() {
        return this.$slots.default[0];
    },
};
