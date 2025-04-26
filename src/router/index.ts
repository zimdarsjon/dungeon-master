import { createRouter, createWebHistory } from 'vue-router'

import WorldView from '@/views/World.vue';
import SearchView from '../views/Search.vue';
import OpenMonsterView from '@/views/monsters/OpenMonster.vue';
import BaseMonsterView from '@/views/monsters/BaseMonster.vue';
import CombatView from '../views/Combat.vue';
import BaseView from '@/views/world/Base.vue';
import Umbria from '@/views/world/countries/Umbria.vue';
import Zamir from '@/views/world/countries/Zamir.vue';
import CopperCoast from '@/views/world/countries/CopperCoast.vue';
import Odarris from '@/views/world/countries/Odarris.vue';
import Ashan from '@/views/world/countries/Ashan.vue';
import Ferran from '@/views/world/countries/Ferran.vue';
import Cauldera from '@/views/world/countries/Cauldera.vue';
import Blackburn from '@/views/world/countries/Blackburn.vue';

const routes = [
  { path: '/', component: CombatView, name: 'combat' },
  { path: '/search', component: SearchView, name: 'search' },
  { path: '/monsters/open/:slug', component: OpenMonsterView, name: 'open-monster' },
  { path: '/monsters/base/:index', component: BaseMonsterView, name: 'base-monster' },
  {
    path: '/world',
    component: WorldView,
    children: [
      { path: '', component: BaseView , name: 'world'},
      { path: '/world/umbria', component: Umbria, name: 'umbria' },
      { path: '/world/zamir', component: Zamir, name: 'zamir' },
      { path: '/world/coppercoast', component: CopperCoast, name: 'coppercoast' },
      { path: '/world/odarris', component: Odarris, name: 'odarris' },
      { path: '/world/ashan', component: Ashan, name: 'ashan' },
      { path: '/world/ferran', component: Ferran, name: 'ferran' },
      { path: '/world/cauldera', component: Cauldera, name: 'cauldera' },
      { path: '/world/blackburn', component: Blackburn, name: 'blackburn' },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;