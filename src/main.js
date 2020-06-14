import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Ionic from '@ionic/vue';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { addIcons } from 'ionicons';
import { body, bicycle } from 'ionicons/icons';
import { store } from './store.js';
import { LazyLoadService } from './services/lazyLoadService.js';
import * as fb from './firebaseConfig.js';

Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.prototype.$lazyLoadService = new LazyLoadService();

addIcons({
  'ios-body': body.ios,
  'md-body': body.md,
  'ios-bicycle': bicycle.ios,
  'md-bicycle': bicycle.md,
});

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
