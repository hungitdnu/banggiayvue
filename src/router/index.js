import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/men',
    name: 'Men',

    component: () => import('../views/Men.vue'),
  },
  {
    path: '/women',
    name: 'Women',

    component: () => import('../views/Women.vue'),
  },
  {
    path: '/dress-shoes',
    name: 'Dress',

    component: () => import('../views/Dress.vue'),
  },
  {
    path: '/sneaker-shoes',
    name: 'Sneakers',

    component: () => import('../views/Sneakers.vue'),
  },

  {
    path: '/shoe-detail/:id',
    name: 'ShoeDetail',
    props: true,
    component: () => import('../views/ShoeDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
});

export default router;
