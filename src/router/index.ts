import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue';
import SearchView from '../views/Search.vue';
import MonsterView from '../views/Monster.vue';
import CombatView from '../views/Combat.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/search', component: SearchView },
  { path: '/monsters/:slug', component: MonsterView },
  { path: '/combat', component: CombatView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;