import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Ionic from '@ionic/vue';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { addIcons } from 'ionicons';
import { body, bicycle } from 'ionicons/icons';
import { store } from './store';
import { LazyLoadService } from './services/lazyLoadService.js';
import { DbService } from './services/dbService.js';
import * as fb from './firebaseConfig.js';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Ionic);
Vue.use(Loading, { color: '#3880ff' });
Vue.config.productionTip = false;
Vue.prototype.$lazyLoadService = new LazyLoadService();
Vue.prototype.$dbService = new DbService();

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
