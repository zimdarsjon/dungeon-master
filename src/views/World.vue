<script lang="ts" setup>
import NavBar from '@/components/world/NavBar.vue';

</script>
<template>
    <div class="flex">
        <NavBar />
        <div class="w-full">
            <RouterView />
        </div>
    </div>
</template>