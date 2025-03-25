<script setup lang="ts">
// import DynamicDialog from 'primevue/dynamicdialog';
import { Toast, DynamicDialog } from 'primevue';
import { useMenuStore } from './stores/menu';
import { storeToRefs } from 'pinia';
import Menubar from 'primevue/menubar';

const menuStore = useMenuStore();

const { menuItems} = storeToRefs(menuStore);

</script>

<template>
  <DynamicDialog />
  <Toast />
  <div class="card">
    <Menubar :model="menuItems">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
