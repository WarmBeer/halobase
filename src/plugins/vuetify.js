import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1a191c',
                secondary: '#292728',
                tertiary: "#151215",
                accent: '#f66003',
            },
        },
    },
})

export default vuetify