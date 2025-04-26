<script lang="ts" setup>
import Menubar from 'primevue/menubar';
import { useWordMenuStore } from '@/stores/world-menu';
import { storeToRefs } from 'pinia';

const menuStore = useWordMenuStore();

const { menuItems } = storeToRefs(menuStore);

</script>
<template>
    <Menubar :model="menuItems" :pt="{
        root: {
            class: 'h-fit'
        },
        rootList: {
            class: 'flex flex-column'
        },
        item: {
            class: 'w-full'
        }
    }">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </router-link>
        <router-link v-else-if="item.to" v-slot="{ href, navigate }" :to="{ name: item.to}" custom>
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
</template>