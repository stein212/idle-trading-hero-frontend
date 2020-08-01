export default {
    methods: {
        getActionColor(action) {
            switch (action) {
                case 'buy':
                    return 'is-success';
                case 'sell':
                    return 'is-danger';
                default:
                    return '';
            }
        },
    },
};
