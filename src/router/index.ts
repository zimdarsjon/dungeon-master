import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../views/Home.vue';
import SearchView from '../views/Search.vue';
import OpenMonsterView from '@/views/monsters/OpenMonster.vue';
import BaseMonsterView from '@/views/monsters/BaseMonster.vue';
import CombatView from '../views/Combat.vue';

const routes = [
  { path: '/', component: CombatView },
  { path: '/search', component: SearchView },
  { path: '/monsters/open/:slug', component: OpenMonsterView },
  { path: '/monsters/base/:index', component: BaseMonsterView },
  { path: '/combat', component: CombatView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;