<!-- components/ImageScreen.vue -->
<template>
    <div class="relative inline-block w-full h-full">
        <img src="http://googleusercontent.com/image_collection/image_retrieval/13963287667715805960_0" alt="Example Image" class="w-full h-auto" />

        <button @click="$emit('click')" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded">
            Click Me
        </button>
    </div>
</template>

<script setup>

</script>
