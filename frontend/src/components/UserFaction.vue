<script setup>
import {useUserStore} from "../stores/userStore.js";
const store = useUserStore();
</script>

<template>
    <div class="relative w-full h-full overflow-hidden">
        <img :src="`/images/factions/${store.faction.toLowerCase()}.png`"
             class="w-full h-full object-cover mask-fade-corners"/>
        <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-5"
        >
            <img
                    src="/images/logo_glow.png"
                    class="w-[350px] h-auto"
            />
            <div class="rounded-xl">
                <div
                        @click="$emit('showFactions')"
                        class="transform uppercase bg-stone-900 font-semibold text-yellow-100 px-6 py-2 text-2xl border-1 border-yellow-100 shadow-white"
                >
                    Welcome
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>


</style>
