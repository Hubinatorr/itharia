<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css"; // CRITICAL: Required for marker positioning and z-index

const emit = defineEmits(["location-selected"]);
const mapContainer = ref(null);
let map = null;

// Stav pre aktuálne vybranú lokáciu (zobrazí sa v sidebare)
const selectedLocation = ref(null);

// Dáta lokácií (bez stats, iba name a description)
const locations = [
  { id: 1, name: "Ignis Mons Fumus", description: "Testovací popis pre Ignis Mons Fumus.", coordinates: [0.1, 0.0] },
  { id: 2, name: "Pansala'm", description: "Testovací popis pre mesto Pansala'm.", coordinates: [0.1, 0.5] },
  { id: 3, name: "Arbor Nuclea", description: "Testovací popis pre obrovský strom Arbor Nuclea.", coordinates: [0.9, 0.6] },
  { id: 4, name: "Obsidian Crown Plateau", description: "Testovací popis pre zasnežené vrcholky Obsidian Crown Plateau.", coordinates: [-1.4, 1.4] },
  { id: 5, name: "Aquilonia", description: "Testovací popis pre prístavné mesto Aquilonia.", coordinates: [-1.6, 0.2] },
  { id: 6, name: "Karüng Bernö (Iron Peaks)", description: "Testovací popis pre oblasť Železných hôr.", coordinates: [-0.6, 0.2] },
  { id: 7, name: "Bersrun Skurdur", description: "Testovací popis pre juhozápadnú pevnosť Bersrun Skurdur.", coordinates: [-1.0, -1.2] },
  { id: 8, name: "Sableclaw Mountain Range", description: "Testovací popis pre pohorie Sableclaw.", coordinates: [0.7, 1.6] },
  { id: 9, name: "Celestial Lake", description: "Testovací popis pre nebeské jazero Celestial Lake.", coordinates: [0.8, 1.1] },
  { id: 10, name: "Verdant Canopy", description: "Testovací popis pre hustý les Verdant Canopy.", coordinates: [1.6, 0.0] },
  { id: 11, name: "Crystalline Lakes", description: "Testovací popis pre oblasť Crystalline Lakes.", coordinates: [1.1, -0.1] },
  { id: 12, name: "Mistwallow Marsh", description: "Testovací popis pre bažiny Mistwallow Marsh.", coordinates: [0.7, -1.0] },
  { id: 13, name: "Sylvan Solitude Forest", description: "Testovací popis pre les Sylvan Solitude Forest.", coordinates: [-0.3, 1.3] },
  { id: 14, name: "Barren Plains", description: "Testovací popis pre pustiny Barren Plains.", coordinates: [-1.4, 0.8] },
  { id: 15, name: "Island of the Celest", description: "Testovací popis pre vzdialený ostrov.", coordinates: [1.7, -1.3] }
];

const INITIAL_VIEW = {
  center: [0, 0],
  zoom: 1.0,
  pitch: 55,
  bearing: 0,
};

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        "itharia-image": {
          type: "image",
          url: "/images/map.png",
          coordinates: [
            [-2, 2],
            [2, 2],
            [2, -2],
            [-2, -2],
          ],
        },
      },
      layers: [
        {
          id: "itharia-layer",
          type: "raster",
          source: "itharia-image",
        },
      ],
    },
    ...INITIAL_VIEW,
    maxBounds: [
      [-3, -3],
      [3, 3],
    ],
    renderWorldCopies: false,
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    keyboard: true,
  });

  locations.forEach((loc) => {
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = `
      <div class="marker-content">
        <div class="shield"></div><span class="label">${loc.name}</span>
      </div>`;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(loc.coordinates)
      .addTo(map);

    console.log(`Marker for ${loc.name} added at coordinates: ${loc.coordinates}`);

    marker.setRotationAlignment("map");

    el.addEventListener("click", () => {
      document
        .querySelectorAll(".custom-marker")
        .forEach((m) => m.classList.remove("active"));
      el.classList.add("active");
      focusOnLocation(loc);
    });
  });
});

const focusOnLocation = (loc) => {
  selectedLocation.value = loc; // Nastavenie pre zobrazenie v sidebare

  map.flyTo({
    center: loc.coordinates,
    zoom: 9.5,
    pitch: INITIAL_VIEW.pitch,
    bearing: INITIAL_VIEW.bearing,
    padding: { right: 350 }, // Akurát pre šírku nášho sidebar-u
    speed: 1.2,
    curve: 1.4,
    essential: true,
  });

  emit("location-selected", loc);
};

// Funkcia na zavretie sidebaru a oddialenie mapy
const closeSidebar = () => {
  selectedLocation.value = null;
  resetCamera();
};

const resetCamera = () => {
  document
    .querySelectorAll(".custom-marker")
    .forEach((m) => m.classList.remove("active"));
  map.flyTo({
    ...INITIAL_VIEW,
    padding: { right: 0 },
    speed: 1.2,
    essential: true,
  });
};

defineExpose({ resetCamera });

onUnmounted(() => {
  if (map) map.remove();
});
</script>

<template>
  <div class="app-container">
    <div class="map-wrapper">
      <div ref="mapContainer" class="map-container"></div>
      <div class="fog-overlay"></div>

      <div class="sidebar" :class="{ 'is-open': selectedLocation !== null }">
        <button class="close-btn" @click="closeSidebar">✕</button>
        <div class="sidebar-content" v-if="selectedLocation">
          <h2>{{ selectedLocation.name }}</h2>
          <div class="divider"></div>
          <p>{{ selectedLocation.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  overflow: hidden;
}

.map-container {
  position: absolute; /* Explicit positioning for clear z-index stacking */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}

.fog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10; /* Safely overlay the map canvas while letting clicks pass through */
  background: radial-gradient(
    ellipse at center,
    rgba(15, 14, 13, 0) 40%,
    rgba(15, 14, 13, 0.7) 75%,
    rgba(15, 14, 13, 1) 100%
  );
  box-shadow: inset 0 0 100px 50px rgba(15, 14, 13, 0.9);
}

/* --- VÝRAZNEJŠIE MARKERY --- */
:deep(.custom-marker) {
  cursor: pointer;
  z-index: 20;
}

:deep(.marker-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
}

:deep(.custom-marker:hover .marker-content),
:deep(.custom-marker.active .marker-content) {
  transform: scale(1.3) translateY(-12px);
  z-index: 100;
}

/* Zväčšený a žiarivejší štít */
:deep(.shield) {
  width: 36px;
  height: 48px;
  background: #e6b95c; /* Jasnejšia zlatá */
  clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
  border: 3px solid #fff; /* Hrubší okraj */
  box-shadow: 0 0 20px rgba(230, 185, 92, 0.8); /* Silnejší zlatý glow efekt */
}

/* Lepšie viditeľný text s tmavým pozadím */
:deep(.label) {
  margin-top: 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.7); /* Polopriehľadné čierne pozadie pre čitateľnosť */
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(230, 185, 92, 0.3);
  text-shadow: 1px 1px 2px #000;
  font-weight: bold;
  font-size: 15px;
  white-space: nowrap;
}

/* --- SIDEBAR --- */
.sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: rgba(15, 14, 13, 0.95);
  border-left: 2px solid #c5a059;
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
}

.sidebar.is-open {
  transform: translateX(0);
}

.close-btn {
  align-self: flex-end;
  background: transparent;
  border: none;
  color: #c5a059;
  font-size: 24px;
  cursor: pointer;
  padding: 15px 20px;
  transition:
    color 0.2s,
    transform 0.2s;
}

.close-btn:hover {
  color: #fff;
  transform: scale(1.1);
}

.sidebar-content {
  padding: 0 30px 30px 30px;
  color: #fff;
}

.sidebar-content h2 {
  color: #c5a059;
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.divider {
  height: 2px;
  background: linear-gradient(90deg, #c5a059, transparent);
  margin-bottom: 20px;
}

.sidebar-content p {
  font-size: 16px;
  line-height: 1.6;
  color: #ddd;
}
</style>