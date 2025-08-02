<template>
    <div class="min-h-[calc(100vh-68px)] bg-gray-100 dark:bg-gray-800 ">
        <Transition name="fade" mode="out-in">
            <template v-if="factionsShown">
                <Factions :show-modal="openModal"/>
            </template>
            <template v-else>
                <div class="relative w-full h-full">
                    <video
                            class="w-full h-full object-cover"
                            autoplay
                            muted
                            loop
                            playsinline
                    >
                        <source src="../../public/videos/map.mp4" />
                    </video>

                    <div
                            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-5"
                    >
                        <img
                                src="https://itharia.com/wp-content/uploads/2024/05/logo_glow.png"
                                class="w-[350px] h-auto"
                        />
                        <div class="border-2 rounded-xl">
                            <button
                                    @click="showFactions"
                                    class="transform uppercase transition-transform duration-200 hover:scale-110 bg-stone-900 font-semibold text-yellow-100 px-6 py-2 text-2xl border-1 border-yellow-100 shadow-white"
                            >
                                Join Battle
                            </button>
                        </div>
                    </div>
                </div>

            </template>
        </Transition>
    </div>
    <div v-if="selectedFaction">

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
import Footer from "../components/Footer.vue";
let modalInstance = null; // To store the Flowbite Modal instance


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
            console.log('modal is hidden');
        },
        onShow: () => {
            console.log('modal is shown');
        },
        onToggle: () => {
            console.log('modal has been toggled');
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

<style scoped>
.min-h-\[calc\(100vh-68px\)\] {
    height: calc(100vh - 68px);
}
</style>
