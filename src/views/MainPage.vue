<template>
    <div class="space-y-16">
        <div class="min-h-[calc(100vh-68px)]">
            <Transition name="fade" mode="out-in">
                <template v-if="factionsShown">
                    <Factions :show-modal="openModal"/>
                </template>
                <template v-else>
                    <WelcomeScreen @showFactions="showFactions"/>
                </template>
            </Transition>
        </div>
        <div class="px-4 grid space-y-6 md:space-y-0 text-yellow-100 grid-cols-1 md:grid-cols-2 w-full justify-center items-stretch">
            <div class="flex">
                <img src="/images/pa.png"
                     class="w-full h-full object-cover md:p-12 mask-fade-corners">
            </div>
            <div class="lg:px-12 flex flex-col justify-center">
                <h2 class="text-3xl font-bold text-yellow-200">Welcome to Itharia</h2>
                <p class="whitespace-pre-line py-4">
                    {{welcomeText}}
                </p>
            </div>
        </div>
        <settlements/>
    </div>
    <RegistrationModal
        :faction="selectedFaction"
        :color="selectedColor"
    />
</template>

<script setup>
import Factions from "../components/Factions.vue";
import RegistrationModal from "../components/RegistrationModal.vue";
import {onMounted, ref} from "vue";
import {Modal} from "flowbite";
import Settlements from "../components/Settlements.vue";
import WelcomeScreen from "../components/WelcomeScreen.vue";
let modalInstance = null; // To store the Flowbite Modal instance

const welcomeText = 'A classical insired Epic fantasy reborn for a new age.\n' +
        '\n' +
        '                    Step into a realm of gargantuan scale, where the eternal war between Ether and Void shapes the fate of worlds. Ten primal elements clash in an endless dance—the noble forces of Fire, Metal, Water, Earth, and Wind rage against their dark mirrors: Blight, Hellstorm, Shadowflame, Abyss, and Carrion. Metal-sprites dance through ancient halls while angels and demons wage war across celestial planes.\n' +
        '\n' +
        '                    Discover a world where proud Dwarves forge destiny in their mountain strongholds, enigmatic Celestials channel divine power, and mysterious Voidborn command living shadows. From the crafty Gruftlingars to the soaring Avians, from the noble Minotaurs to the cunning Reptis—every race stands on the precipice of the coming storm.\n' +
        '\n' +
        '                    As prophecies whisper of divine war, each soul must choose: stand with the forces of creation, or answer the void’s siren call.\n' +
        '\n' +
        '                    Your journey through Itharia begins here. Which path will you walk?'
onMounted(() => {
    // Target element for the modal
    const modalElement = document.getElementById('default-modal');

    // Options for the modal (optional)
    const modalOptions = {
        placement: 'center',
        backdrop: 'dynamic',
        backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {

        },
        onShow: () => {

        },
        onToggle: () => {

        }
    };

    // Create a new modal instance
    if (modalElement) {
        modalInstance = new Modal(modalElement, modalOptions);
    }
});

const openModal = (faction) => {
    selectedFaction.value = faction.name
    selectedColor.value = faction.color
    if (modalInstance) {
        modalInstance.show();
    }
};

const showFactions = () => {
    factionsShown.value = true
}

const closeModal = () => {
    if (modalInstance) {
        modalInstance.hide();
    }
};

const factionsShown = ref(false);
const selectedFaction = ref(null);
const selectedColor = ref(null);

</script>

<style>
.min-h-\[calc\(100vh-68px\)\] {
    height: calc(100vh - 68px);
}
</style>
