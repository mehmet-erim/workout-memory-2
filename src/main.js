import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import Ionic from '@ionic/vue';
import { addIcons } from 'ionicons';
import { bicycle, body, checkmark, add } from 'ionicons/icons';
import Vue from 'vue';
import App from './App.vue';
import * as fb from './firebaseConfig.js';
import router from './router';
import { DbService } from './services/dbService.js';
import { LazyLoadService } from './services/lazyLoadService.js';
import { store } from './store';

Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.prototype.$lazyLoadService = new LazyLoadService();
Vue.prototype.$dbService = new DbService();

addIcons({
  'ios-body': body.ios,
  'md-body': body.md,
  'ios-bicycle': bicycle.ios,
  'md-bicycle': bicycle.md,
  'ios-checkmark': checkmark.ios,
  'md-checkmark': checkmark.md,
  'ios-add': add.ios,
  'md-add': add.md,
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
