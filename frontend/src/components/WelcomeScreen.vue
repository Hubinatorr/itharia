<script setup>

defineEmits(['showFactions'])

</script>

<template>
    <div class="relative w-full h-full">
        <video
                class="w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline
        >
            <source src="/videos/map.mp4" />
        </video>

        <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-5"
        >
            <img
                    src="/images/logo_glow.png"
                    class="w-[350px] h-auto"
            />
            <div class="rounded-xl">
                <button
                        @click="$emit('showFactions')"
                        class="transform uppercase transition-transform duration-200 hover:scale-110 bg-stone-900 font-semibold text-yellow-100 px-6 py-2 text-2xl border-1 border-yellow-100 shadow-white"
                >
                    Join Battle
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
