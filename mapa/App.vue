<script setup>
import { ref } from 'vue';
import WorldMap from './WorldMap.vue';

const selectedLocation = ref(null);
const mapRef = ref(null);

const handleLocationClick = (location) => {
  selectedLocation.value = location;
};

const closeDetail = () => {
  selectedLocation.value = null;
  if (mapRef.value && typeof mapRef.value.resetCamera === 'function') {
    mapRef.value.resetCamera();
  }
};
</script>

<template>
  <div class="app-container">
    <WorldMap 
      ref="mapRef"
      @location-selected="handleLocationClick" 
    />

    <!-- Bočný panel pre detaily lokácie -->
    <Transition name="slide">
      <div v-if="selectedLocation" class="detail-sidebar">
        <button @click="closeDetail" class="close-btn">×</button>
        <h2 class="title">{{ selectedLocation.name }}</h2>
        <p class="description">{{ selectedLocation.description }}</p>
        <div class="stats">
          <p><strong>Populácia:</strong> {{ selectedLocation.stats.pop }}</p>
          <p><strong>Frakcia:</strong> {{ selectedLocation.stats.faction }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.detail-sidebar {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 320px;
  bottom: 20px;
  background: rgba(26, 24, 20, 0.95);
  border: 2px solid #c5a059;
  color: #f3e5ab;
  padding: 2rem;
  z-index: 10;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  border-radius: 8px;
}

.title { margin-top: 0; color: #c5a059; font-size: 1.5rem; }

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: #c5a059;
  font-size: 2rem;
  cursor: pointer;
}

.slide-enter-active, .slide-leave-active { transition: transform 0.4s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(110%); }
</style>