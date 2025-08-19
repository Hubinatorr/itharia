<script setup>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="bg-stone-950 ">
        <router-link to="/"/>
        <Navbar/>
        <div class="min-h-[calc(100vh-224px)] bg-stone-950 flex flex-col items-center justify-center text-yellow-100">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>
