<script setup>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="bg-stone-950 ">
        <router-link to="/"/>
        <router-link to="/"/>
        <Navbar/>
        <div class="min-h-[calc(100vh-224px)] space-y-2 bg-stone-950 flex flex-col items-center justify-center text-center font-bold text-yellow-200">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>
