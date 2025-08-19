<script setup>

const settlements = [
    {
        name: "Bergrün Skürdür",
        description: "Welcome to Bergrün Skürdur, the resilient and industrious home of the Ironpeak Dwarfs. Nestled in the northeast part of Celestria, this dwarven kingdom is a testament to the mastery of the iron element.",
        image: "../../public/images/bergrun.png",
        link: "/wiki/begrun-skurdir"
    },
    {
        name: "Aquilonia",
        description: "Welcome to Aquilonia, a thriving city-state renowned for its mastery of watermanipulation. Situated at the heart of the northern coast of Celestria island, Aquiloniais home to a vibrant and innovative society.",
        image: "../../public/images/aquilonia.png",
        link: "/wiki/aquilonia"
    },
    {
        name: "Pansala'm",
        description: "Welcome to Pansala’m, the serene and harmonious home of the Windfolks, comprised of Avians and Minotaurs. Nestled southwest from the center of Celestria, near the majestic Arborn Nuclea and the expansive Celestial Lake.",
        image: "../../public/images/pa.png",
        link: "/wiki/pansalam"
    }
]

</script>

<template>
    <section class="text-yellow-200">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold">Major Settlements of Itharia</h2>
            <div class="mt-2 w-24 h-1 bg-yellow-500 mx-auto rounded"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
            <div
                    v-for="(settlement, index) in settlements"
                    :key="index"
                    class="bg-stone-800 rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105"
            >
                <img :src="settlement.image" alt="" class="w-full object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">{{ settlement.name }}</h3>
                    <p class="text-gray-300 mb-4">{{ settlement.description }}</p>
                    <a :href="settlement.link" class="text-yellow-500 hover:underline">Find out More</a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
