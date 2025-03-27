<script lang="ts" setup>
import type { Action, APIAction } from '../models';
import Card from 'primevue/card';

const props = defineProps<{
    actions?: Action[] | APIAction[],
    title: string
}>();

</script>
<template>
    <Card v-if="actions && actions.length > 0" style="overflow: hidden">
        <template #title>{{ props.title }}</template>
        <template #content>
            <p v-for="action in props.actions" class="text-left">
                <span><b>{{ action.name }} </b></span>
                :&nbsp;
                <span>{{ action.desc }}</span>
            </p>
        </template>
    </Card>
</template>