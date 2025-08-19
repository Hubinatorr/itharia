<template>
    <div class="tree-node">
        <router-link
                v-if="node.type === 'page'"
                :to="`/wiki/${node.id}`"
                class="node-item flex items-center p-2 rounded cursor-pointer mb-0.5"
                :class="{
        'hover:bg-zinc-700': node.id !== activePageId,
        'bg-yellow-500 text-zinc-900 font-bold': node.id === activePageId
      }"
        >
            <span class="ml-2">📄</span>
            {{ node.name }}
        </router-link>

        <div
                v-else
                @click="isExpanded = !isExpanded"
                class="node-item flex items-center p-2 rounded cursor-pointer mb-0.5 hover:bg-zinc-700"
                :style="{ paddingLeft: (level * 1.25) + 0.5 + 'rem' }"
        >
            <span class="mr-2">📁</span>
            {{ node.name }}
        </div>

        <div v-if="isExpanded && node.children">
            <WikiTreeNode
                    v-for="child in node.children"
                    :key="child.id"
                    :node="child"
                    :level="level + 1"
                    :active-page-id="activePageId"
            />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';

defineProps({
    node: Object,
    level: Number,
    activePageId: String
});

const isExpanded = ref(true);
</script>
