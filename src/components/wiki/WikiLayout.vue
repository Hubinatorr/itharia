<template>
    <div class="flex h-screen w-full">
        <WikiSidebar class="hidden md:flex flex-col" />

        <div class="flex-1 flex flex-col min-w-0 h-screen">

            <header class="flex-shrink-0 flex items-center justify-between p-4 border-b border-zinc-700 md:hidden">
                <span class="font-bold">Wiki</span>
                <button @click="isMobileNavOpen = true" class="text-2xl">
                    &#9776;
                </button>
            </header>

            <WikiBreadcrumbs />

            <WikiContent class="flex-1 overflow-y-auto" />
        </div>

        <WikiMobileNav
                :is-open="isMobileNavOpen"
                @close="isMobileNavOpen = false"
        />
    </div>
</template>

<script setup>
import WikiSidebar from './WikiSidebar.vue';
import WikiContent from './WikiContent.vue';
import {ref} from "vue";
import WikiMobileNav from "./WikiMobileNav.vue";
import WikiBreadcrumbs from "./WikiBreadcrumbs.vue";

const isMobileNavOpen = ref(false);
</script>
