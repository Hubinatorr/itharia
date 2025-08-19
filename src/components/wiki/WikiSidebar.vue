<template>
    <aside class="w-72 flex-shrink-0 bg-zinc-800 p-5 border-r border-zinc-700 overflow-y-auto">
        <div class="filter-container mb-5">
            <input
                    type="text"
                    v-model="searchTerm"
                    placeholder="Filter"
                    class="w-full px-3 py-2 rounded-md border border-zinc-600 bg-zinc-700 text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
        </div>
        <nav class="tree-nav">
            <WikiTreeNode
                    v-for="node in filteredTree"
                    :key="node.id"
                    :node="node"
                    :level="0"
                    :active-page-id="activePageId"
                    @select-page="(id) => $emit('select-page', id)"
            />
        </nav>
    </aside>
</template>

<script setup>
// Script setup zostáva nezmenený
import { ref, computed } from 'vue';
import { wikiTree } from '../wikiData.js';
import WikiTreeNode from './WikiTreeNode.vue';

defineProps(['activePageId']);
defineEmits(['select-page']);

const searchTerm = ref('');

const filteredTree = computed(() => {
    if (!searchTerm.value) {
        return wikiTree;
    }
    function filterNodes(nodes) {
        const result = [];
        for (const node of nodes) {
            if (node.type === 'page' && node.name.toLowerCase().includes(searchTerm.value.toLowerCase())) {
                result.push(node);
            } else if (node.type === 'folder') {
                const children = filterNodes(node.children);
                if (children.length > 0) {
                    result.push({ ...node, children });
                }
            }
        }
        return result;
    }
    return filterNodes(wikiTree);
});
</script>
