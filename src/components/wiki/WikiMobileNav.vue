<template>
    <div
            v-if="isOpen"
            class="fixed inset-0 bg-zinc-900 z-40 flex flex-col md:hidden"
    >
        <div class="flex justify-between items-center p-4 border-b border-zinc-700 flex-shrink-0">
            <span class="font-bold text-lg">Navigácia</span>
            <button @click="$emit('close')" class="text-2xl">&times;</button>
        </div>

        <nav class="p-4 overflow-y-auto">
            <WikiTreeNode
                    v-for="node in wikiTree"
                    :key="node.id"
                    :node="node"
                    :level="0"
                    :active-page-id="activePageId"
                    @select-page="onPageSelect"
            />
        </nav>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { wikiTree } from './wikiData.js';
import WikiTreeNode from './WikiTreeNode.vue';

defineProps({
    isOpen: Boolean
});
const emit = defineEmits(['close']);

const route = useRoute();
const activePageId = computed(() => route.params.pageId);

function onPageSelect() {
    // Po kliknutí na link zatvoríme menu
    emit('close');
}
</script>
