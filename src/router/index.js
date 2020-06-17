import Vue from 'vue';
import { IonicVueRouter } from '@ionic/vue';
import Application from '../layouts/Application.vue';
import firebase from 'firebase';

Vue.use(IonicVueRouter);

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', redirect: '/workouts' },
    {
      path: '',
      component: Application,
      children: [
        {
          path: '/movements',
          name: 'movements',
          component: () =>
            import(
              /* webpackChunkName: "movements" */ '../views/Movements.vue'
            ),
        },
        {
          path: '/workouts',
          name: 'workouts',
          component: () =>
            import(/* webpackChunkName: "workouts" */ '../views/Workouts.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !firebase.auth().currentUser)
    next({ name: 'login' });
  else next();
});

export default router;
