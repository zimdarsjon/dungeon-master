<script setup lang="ts">
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
  <div class="card pl-0 pr-0">
    <Menubar :model="menuItems">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
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

</style>
