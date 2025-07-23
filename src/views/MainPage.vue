<template>
    <div class="min-h-[calc(100vh-68px)] bg-gray-100 dark:bg-gray-800">
        <Transition name="fade" mode="out-in">
            <template v-if="factionsShown">
                <Factions :show-modal="openModal"/>
            </template>
            <template v-else>
                <div class="relative inline-block w-full h-full">
                    <img src="https://itharia.com/wp-content/uploads/2024/07/aq2.png"
                         alt="Example Image" class="w-full h-full object-cover"/>

                    <button @click="showFactions"
                            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded">
                        Click Me
                    </button>
                </div>
            </template>
        </Transition>

    </div>
</template>

<script setup>
import Factions from "../components/Factions.vue";
import {onMounted, ref} from "vue";
import {Modal} from "flowbite";
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
    selectedFaction.value = faction
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
</script>

<style scoped>
.min-h-\[calc\(100vh-68px\)\] {
    height: calc(100vh - 68px);
}

/* Transition Styles */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
