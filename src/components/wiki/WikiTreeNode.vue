<template>
    <div class="tree-node">
        <div
                class="node-item flex items-center p-2 rounded cursor-pointer mb-0.5"
                @click="toggleNode"
                :style="{ paddingLeft: (level * 1.25) + 0.5 + 'rem' }"
                :class="{
        'hover:bg-zinc-700': node.id !== activePageId,
        'bg-yellow-500 text-zinc-900 font-bold': node.id === activePageId
      }"
        >
            <span class="mr-2">{{ node.type === 'folder' ? '📁' : '📄' }}</span>
            {{ node.name }}
        </div>

        <div v-if="isExpanded && node.children" class="children">
            <WikiTreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :level="level + 1"
                    :active-page-id="activePageId"
                    @select-page="(id) => $emit('select-page', id)"
            />
        </div>
    </div>
</template>

<script setup>
// Script setup zostáva nezmenený
import { ref } from 'vue';

const props = defineProps({
    node: Object,
    level: Number,
    activePageId: String
});

const emit = defineEmits(['select-page']);
const isExpanded = ref(true);

function toggleNode() {
    if (props.node.type === 'folder') {
        isExpanded.value = !isExpanded.value;
    } else {
        emit('select-page', props.node.id);
    }
}
</script>
