<template>
    <main class="flex-grow md:p-12 overflow-y-auto">
        <div v-if="page">
            <div class="content-body">
                <div class="flex-row flex">
                    <div>
                        <span class="inline-block bg-zinc-700 px-2 py-1 text-xs font-bold rounded mb-2">{{ page.category }}</span>
                        <h1 class="text-5xl font-bold mb-6 text-zinc-100">{{ page.title }}</h1>
                    </div>
                    <div class="flex justify-end items-center text-sm text-zinc-400 mb-10 ml-auto">
                        <div class="meta-info mr-6">Updated on: {{ page.lastUpdated }}</div>

                        <div class="font-controls flex items-center space-x-1">
                            <button
                                    @click="changeFontSize(-0.1)"
                                    class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700 transition-colors"
                                    title="Zmenšiť text"
                            >
                                A-
                            </button>
                            <button
                                    @click="resetFontSize"
                                    class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700 transition-colors"
                                    title="Obnoviť veľkosť"
                            >
                                A
                            </button>
                            <button
                                    @click="changeFontSize(0.1)"
                                    class="px-3 py-1 border border-zinc-600 rounded hover:bg-zinc-700 transition-colors"
                                    title="Zväčšiť text"
                            >
                                A+
                            </button>
                        </div>
                    </div>
                </div>
                <div
                        v-html="page.content"
                        class="prose space-y-4 prose-invert prose-lg max-w-none prose-p:text-zinc-300"
                        :style="{ fontSize: `${currentFontSize}rem` }"
                ></div>
            </div>

        </div>
        <div v-else class="text-center text-zinc-500">
            <p>Select a page to view content.</p>
        </div>
    </main>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {wikiPages} from './wikiData.js';

const route = useRoute();

// Získanie ID stránky z URL
const pageId = computed(() => route.params.pageId);

// Nájdenie obsahu stránky na základe ID
const page = computed(() => {
    return pageId.value ? wikiPages[pageId.value] : null;
});

// ===== LOGIKA PRE ZMENU VEĽKOSTI PÍSMA =====
const BASE_FONT_SIZE = 1; // Základná veľkosť v 'rem' (typicky 16px)
const currentFontSize = ref(BASE_FONT_SIZE);

// Funkcia na zväčšenie/zmenšenie písma
function changeFontSize(amount) {
    // Pridáme limit, aby text nebol príliš malý alebo veľký
    const newSize = currentFontSize.value + amount;
    if (newSize >= 0.7 && newSize <= 1.5) {
        currentFontSize.value = newSize;
    }
}

// Funkcia na resetovanie veľkosti písma
function resetFontSize() {
    currentFontSize.value = BASE_FONT_SIZE;
}

// Sledovač (watcher), ktorý resetuje veľkosť písma pri prechode na novú stránku
watch(pageId, () => {
    resetFontSize();
});
// ===== KONIEC LOGIKY PRE PÍSMO =====
</script>

<style scoped>
/* Pridáme jemné vylepšenia, napríklad pre plynulú zmenu veľkosti */
.prose {
    transition: font-size 0.2s ease-in-out;
}
</style>
