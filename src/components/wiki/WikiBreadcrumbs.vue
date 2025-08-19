<template>
    <nav class="flex items-center text-sm text-zinc-400 px-4 py-3 border-b border-zinc-700 md:hidden">
        <ol v-if="path" class="flex items-center whitespace-nowrap min-w-0">
            <li v-for="(item, index) in path" :key="item.id" class="flex items-center">
                <router-link
                        v-if="index < path.length - 1 && item.type === 'page'"
                        :to="`/wiki/${item.id}`"
                        class="hover:text-yellow-400 truncate"
                >
                    {{ item.name }}
                </router-link>

                <span v-else class="truncate" :class="{ 'text-zinc-200 font-medium': index === path.length - 1 }">
            {{ item.name }}
        </span>

                <span v-if="index < path.length - 1" class="mx-2">/</span>
            </li>
        </ol>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { wikiTree } from '../../data/wikiData.js';
import { findPathById } from '../../utils/wikiUtils';

const route = useRoute();
const pageId = computed(() => route.params.pageId);

// Vypočítaná vlastnosť, ktorá generuje cestu pre breadcrumbs
const path = computed(() => {
    if (!pageId.value) return [];
    return findPathById(wikiTree, pageId.value);
});
</script>
