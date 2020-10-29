import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import dao from './data/dao'

Vue.config.productionTip = false

const shared = new Vue({
  data: dao
});

shared.install = function () {
  Object.defineProperty(Vue.prototype, '$dao', {
    get() { return shared; },
  });
};

Vue.use(shared);

Vue.mixin({
  methods: {
    timeSince(date) {
      const seconds = Math.floor((+new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        return `${interval} year${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hour${(interval > 1 ? 's' : '')}`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} minute${(interval > 1 ? 's' : '')}`;
      }
      return `${Math.floor(seconds)} seconds`;
    },
  },
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
