<template>
    <main class="flex-grow p-6 md:p-12 overflow-y-auto">
        <div v-if="page">
            <div class="flex justify-end items-center text-sm text-zinc-400 mb-10">
                <div class="meta-info mr-6">Updated on: {{ page.lastUpdated }}</div>
                <div class="font-controls flex items-center space-x-1">
                    <button @click="changeFontSize(-1)" class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700">-A</button>
                    <button @click="fontSize = 1" class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700">A</button>
                    <button @click="changeFontSize(1)" class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700">+A</button>
                </div>
            </div>

            <div class="content-body">
                <span class="inline-block bg-zinc-700 px-2 py-1 text-xs font-bold rounded mb-2">{{ page.category }}</span>
                <h1 class="text-5xl font-bold mb-6 text-zinc-100">{{ page.title }}</h1>

                <div
                        v-html="page.content"
                        class="prose prose-invert prose-lg max-w-none"
                        :style="{ fontSize: `${fontSize}rem` }"
                ></div>
            </div>

        </div>
        <div v-else class="text-center text-zinc-500">
            <p>Select a page to view content.</p>
        </div>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { wikiPages } from '../wikiData.js';

const props = defineProps({
    pageId: String
});

const page = computed(() => {
    return props.pageId ? wikiPages[props.pageId] : null;
});

// Zmeníme jednotky na 'rem' pre lepšiu škálovateľnosť a prístupnosť
const fontSize = ref(1); // Predvolená veľkosť (1rem)

function changeFontSize(amount) {
    // Zmena po desatinách, napr. 1.1rem, 0.9rem
    fontSize.value += amount * 0.1;
}
</script>

<style>
/* Môžeme pridať špecifické štýly pre prose, ak je to potrebné */
.prose.prose-invert p {
    color: #d4d4d8; /* Zinc 300 - trochu svetlejšia ako default */
}
</style>
