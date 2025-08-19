<template>
    <div class="flex h-screen">
        <WikiSidebar
                :active-page-id="activePageId"
                @select-page="onPageSelect"
        />
        <WikiContent :page-id="activePageId" />
    </div>
</template>

<script setup>
// Script setup zostáva nezmenený
import { ref } from 'vue';
import WikiSidebar from './WikiSidebar.vue';
import WikiContent from './WikiContent.vue';

const activePageId = ref('pansalam');

function onPageSelect(pageId) {
    activePageId.value = pageId;
}
</script>
