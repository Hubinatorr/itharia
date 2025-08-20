<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-full w-full">
        <div v-for="faction in factions" :key="faction.name"
             @click="showModal(faction)"
             class="relative group overflow-hidden shadow-lg w-full h-full"
             data-modal-target="defaultModal"
        >
            <img :src="faction.imageUrl" :alt="faction.name"
                 class="w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-110"/>

            <div :class="`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 hover:from-${faction.color} to-transparent`"></div>

            <div class="absolute bottom-0 left-0 p-6">
                <h2 class="text-3xl font-bold text-white tracking-wider uppercase">
                    {{ faction.name }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    showModal: Function
})
import {factions} from "../data/wikiData.js";
</script>
