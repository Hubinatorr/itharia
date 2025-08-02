<script setup>

import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
    <div class="bg-stone-950">
        <router-link to="/"/>
        <router-link to="/"/>
        <Navbar/>
        <router-view/>
        <Footer/>
    </div>
</template>
