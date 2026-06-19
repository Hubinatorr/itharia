<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import maplibregl from "maplibre-gl";

const emit = defineEmits(["location-selected"]);
const mapContainer = ref(null);
let map = null;

// Ukážkové dáta lokácií
const locations = [
  {
    id: 1,
    name: "Citadela Metal-spritov",
    description: "Starobylé sídlo vykované v srdci hory Metal-vlkmi.",
    coordinates: [0, 0],
    stats: { pop: "12 000", faction: "Metal" },
  },
  {
    id: 2,
    name: "Prístav Tieňov",
    description: "Miesto, kde Abyss stretáva temné vody Itharie.",
    coordinates: [1.5, -0.8],
    stats: { pop: "5 500", faction: "Abyss" },
  },
  {
    id: 3,
    name: "Zmrznutý Vrchol",
    description: "Najvyšší bod severských hôr, bičovaný večnou víchricou.",
    coordinates: [-1.2, 1.3],
    stats: { pop: "200", faction: "Nord" },
  },
  {
    id: 4,
    name: "Zlaté Údolie",
    description: "Úrodná pôda a domov najlepšieho vína v celom regióne.",
    coordinates: [0.8, 1.2],
    stats: { pop: "25 000", faction: "Metal" },
  },
  {
    id: 5,
    name: "Pustatina Zavrhnutých",
    description:
      "Nekonečné piesočné duny, v ktorých sa stratil nejeden hrdina.",
    coordinates: [-1.5, -0.5],
    stats: { pop: "0", faction: "Unknown" },
  },
  {
    id: 6,
    name: "Smaragdový Hvozd",
    description: "Mystický les, kde stromy šepkajú starodávne piesne.",
    coordinates: [-0.5, -1.2],
    stats: { pop: "8 000", faction: "Nature" },
  },
  {
    id: 7,
    name: "Ohnivá Trhlina",
    description: "Zem, ktorá nikdy nespí, neustále chrliaca lávu a popol.",
    coordinates: [1.2, 0.5],
    stats: { pop: "1 200", faction: "Chaos" },
  },
  {
    id: 8,
    name: "Kryštálové Jazero",
    description: "Priehľadná hladina ukrývajúca zabudnuté poklady.",
    coordinates: [-0.8, 0.2],
    stats: { pop: "3 000", faction: "Balance" },
  },
];

// Statická konfigurácia 2.5D pohľadu
const INITIAL_VIEW = {
  center: [0, 0],
  zoom: 1.0,
  pitch: 55, // Fixný náklon
  bearing: 0, // Fixná rotácia, ktorá sa nebude meniť
};

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        "itharia-image": {
          type: "image",
          url: "/map.jpg",
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
      [-2, -2],
      [2, 2],
    ],
    renderWorldCopies: false,

    // Ovládanie myšou zostáva aktívne
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
  map.flyTo({
    center: loc.coordinates,
    zoom: 9.5, // Zvýšená hodnota pre väčšie priblíženie (pôvodne 5.5)
    pitch: INITIAL_VIEW.pitch,
    bearing: INITIAL_VIEW.bearing,
    padding: { right: 350 }, // Vynechanie priestoru pre sidebar
    speed: 1.2,
    curve: 1.4,
    essential: true,
  });

  emit("location-selected", loc);
};

const resetCamera = () => {
  document
    .querySelectorAll(".custom-marker")
    .forEach((m) => m.classList.remove("active"));
  map.flyTo({
    ...INITIAL_VIEW,
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
  <div class="map-wrapper">
    <slot name="sidebar"></slot>
    <div ref="mapContainer" class="map-container"></div>
    <div class="fog-overlay"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #0f0e0d;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
}

/* Štýl pre hmlu */
.fog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Dôležité: prepustí kliknutia a ťahanie myšou na mapu pod ňou */
  z-index: 50; /* Zabezpečí, že hmla je nad mapou */
  
  /* Radiálny gradient: v strede 100% priehľadný, na okrajoch prechádza do tmavej farby pozadia */
  background: radial-gradient(
    ellipse at center, 
    rgba(15, 14, 13, 0) 40%,   /* Stred je čistý */
    rgba(15, 14, 13, 0.7) 75%, /* Začína hustnúť */
    rgba(15, 14, 13, 1) 100%   /* Úplná tma/hmla na okrajoch */
  );
  
  /* Voliteľné: Pridanie vnútorného tieňa pre ešte plynulejší prechod na hranách okna */
  box-shadow: inset 0 0 100px 50px rgba(15, 14, 13, 0.9);
}

:deep(.custom-marker) {
  cursor: pointer;
}

/* Inner wrapper for smooth interaction */
:deep(.marker-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
}

/* Scale and lift effect for active or hovered marker */
:deep(.custom-marker:hover .marker-content),
:deep(.custom-marker.active .marker-content) {
  transform: scale(1.2) translateY(-10px);
  z-index: 100;
}

:deep(.shield) {
  width: 30px;
  height: 40px;
  background: #c5a059;
  clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

:deep(.label) {
  margin-top: 5px;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  font-weight: bold;
}

.map-container {
  width: 100%;
  height: 100%;
  background: #0f0e0d;
}

:deep(.custom-marker) {
  cursor: pointer;
}

/* Inner wrapper for smooth interaction */
:deep(.marker-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
}

/* Scale and lift effect for active or hovered marker */
:deep(.custom-marker:hover .marker-content),
:deep(.custom-marker.active .marker-content) {
  transform: scale(1.2) translateY(-10px);
  z-index: 100;
}

:deep(.shield) {
  width: 30px;
  height: 40px;
  background: #c5a059;
  clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

:deep(.label) {
  margin-top: 5px;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  font-weight: bold;
}
</style>
