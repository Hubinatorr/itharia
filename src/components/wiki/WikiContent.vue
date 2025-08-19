<template>
    <main class="flex-grow p-6 md:p-12 overflow-y-auto">
        <div v-if="page">
            <div
                    v-html="page.content"
                    class="prose prose-invert prose-lg max-w-none"
                    :style="{ fontSize: `${fontSize}rem` }"
            ></div>
        </div>
    </main>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router'; // <-- Importujeme useRoute
import {wikiPages} from './wikiData.js';

const route = useRoute(); // <-- Získame prístup k route

const page = computed(() => {
    const pageId = route.params.pageId;
    return pageId ? wikiPages[pageId] : null;
});

const fontSize = ref(1);

function changeFontSize(amount) {
    fontSize.value += amount * 0.1;
}
</script>
