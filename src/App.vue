<script setup>

import Navbar from "./components/Navbar.vue";
</script>

<template>
    <div>
        <router-link to="/"/>
        <Navbar/>
        <router-view/>
    </div>
</template>
