<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full w-full">
        <div v-for="faction in factions" :key="faction.name"
             @click="showModal(faction.name)"
             class="relative group overflow-hidden shadow-lg w-full h-full"
             data-modal-target="defaultModal"
        >
            <img :src="faction.imageUrl" :alt="faction.name"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div class="absolute bottom-0 left-0 p-6">
                <h2 class="text-3xl font-bold text-white tracking-wider uppercase">
                    {{ faction.name }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps({
    showModal: Function
})
const factions = ref([
    {
        name: 'Dwarfs',
        imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/13963287667715805960_0'
    },
    {
        name: 'Minotaurs',
        imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/1223929831687572010_0'
    },
    {
        name: 'Humans',
        imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/11062789968995934601_0'
    },
    {
        name: 'Aquilonians',
        imageUrl: 'http://googleusercontent.com/image_collection/image_retrieval/6492665048231296728_0'
    }
]);
</script>
