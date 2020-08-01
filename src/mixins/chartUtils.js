import moment from 'moment';

export default {
    methods: {
        getLatestTimestamp(seriesData) {
            const currentSeriesLength = seriesData.length;

            if (currentSeriesLength < 1) {
                return null;
            }

            return seriesData[currentSeriesLength - 1].timestamp;
        },
        dfToCandleSeries({ t, o, h, l, c }, from) {
            let start;
            for (start = 0; start < t.length; start++) {
                if (from === null || from < t[start]) {
                    break;
                }
            }

            const series = [];
            for (let i = start; i < t.length; i++) {
                series.push({
                    timestamp: t[i],
                    x: this.formatDateTime(t[i]),
                    y: [o[i], h[i], l[i], c[i]],
                });
            }

            return series;
        },
        dfToMultipleSeries(df, from, cols) {
            const seriesArray = [];
            for (let col of cols) {
                if (df[col] === undefined) continue;
                const series = [];

                for (let i = 0; i < df[col].length; i++) {
                    const t = df.t[i];
                    if (from < t) {
                        series.push({
                            timestamp: df.t[i],
                            x: this.formatDateTime(df.t[i]),
                            y: df[col][i],
                        });
                    }
                }

                seriesArray.push({
                    data: series,
                });
            }

            return seriesArray;
        },
        formatDateTime(unixSeconds) {
            const t = moment.unix(unixSeconds);
            if (t.second() === 0 && t.minute() === 0 && t.hour === 0) {
                return t.format('YYYY-MM-DD');
            } else if (t.second() === 0 && t.minute() === 0) {
                return t.format('HH:mm');
            }

            return t.format('HH:mm:ss');
        },
        getSeriesNames(series) {
            const result = [];
            for (const s of series) {
                result.push(s.name);
            }

            return result;
        },

        // temp put here (or forever?)
        getStatusText(status) {
            switch (status) {
                case 'notDeployed':
                    return 'Not Deployed';
                case 'deployed':
                    return 'Deployed';
                case 'live':
                    return 'Live';
                case 'paused':
                    return 'Paused';
                case 'deleted':
                    return 'Deleted';
                default:
                    return 'Unknown';
            }
        },
    },
};
