import Vue from 'vue';
import Movements from '../views/Movements.vue';
import { IonicVueRouter } from '@ionic/vue';
import Application from '../layouts/Application.vue';

Vue.use(IonicVueRouter);

const router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '', redirect: '/movements' },
    {
      path: '',
      component: Application,
      children: [
        {
          path: '/movements',
          name: 'movements',
          component: Movements,
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
  const isAuthenticated = true;
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' });
  else next();
});

export default router;
