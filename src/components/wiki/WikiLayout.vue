<template>
    <div class="flex h-screen w-full">
        <WikiSidebar/>

        <WikiContent/>
    </div>
</template>

<script setup>
import WikiSidebar from './WikiSidebar.vue';
import WikiContent from './WikiContent.vue';
</script>
