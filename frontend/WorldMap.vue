<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import maplibregl from 'maplibre-gl';

const emit = defineEmits(['location-selected']);
const mapContainer = ref(null);
let map = null;

// Ukážkové dáta lokácií
const locations = [
  {
    id: 1,
    name: 'Citadela Metal-spritov',
    description: 'Starobylé sídlo vykované v srdci hory Metal-vlkmi.',
    coordinates: [0, 0], // Stred mapy
    stats: { pop: '12 000', faction: 'Metal' }
  },
  {
    id: 2,
    name: 'Prístav Tieňov',
    description: 'Miesto, kde Abyss stretáva temné vody Itharie.',
    coordinates: [1.5, -0.8],
    stats: { pop: '5 500', faction: 'Abyss' }
  }
];

onMounted(() => {
  // Inicializácia mapy
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: {
      version: 8,
      sources: {
        'itharia-image': {
          type: 'image',
          // Tu vlož cestu k svojmu JPG/PNG obrázku mapy
          url: '/images/world-map.jpg', // Uisti sa, že súbor existuje v public/images/
          // Súradnice rohov obrázka [long, lat]
          coordinates: [
            [-2, 2],  // Top Left
            [2, 2],   // Top Right
            [2, -2],  // Bottom Right
            [-2, -2]  // Bottom Left
          ]
        }
      },
      layers: [
        {
          id: 'itharia-layer',
          type: 'raster',
          source: 'itharia-image'
        }
      ]
    },
    center: [0, 0],
    zoom: 2,
    pitch: 0,
    bearing: 0,
    maxBounds: [[-2.5, -2.5], [2.5, 2.5]]
  });

  // Pridanie markerov
  locations.forEach(loc => {
    // Vytvorenie HTML elementu pre marker (stredoveký štít)
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `<div class="shield"></div><span class="label">${loc.name}</span>`;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(loc.coordinates)
      .addTo(map);
    marker.setRotationAlignment('map'); // Marker sa nakloní spolu s mapou

    el.addEventListener('click', () => {
      focusOnLocation(loc);
    });
  });
});

const focusOnLocation = (loc) => {
  map.flyTo({
    center: loc.coordinates,
    zoom: 4,
    pitch: 65,      // 2.5D naklonenie
    bearing: -15,   // Mierna rotácia pre hĺbku
    speed: 1.5,
    essential: true
  });
  emit('location-selected', loc);
};

// Metóda prístupná pre rodiča cez ref
const resetCamera = () => {
  map.flyTo({
    center: [0, 0],
    zoom: 2,
    pitch: 0,
    bearing: 0,
    speed: 1.2
  });
};

defineExpose({ resetCamera });

onUnmounted(() => {
  if (map) map.remove();
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  width: 100%;
  height: 100%;
  background: #0f0e0d;
}

.custom-marker {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shield {
  width: 30px;
  height: 40px;
  background: #c5a059;
  clip-path: polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%);
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.label {
  margin-top: 5px;
  color: #fff;
  text-shadow: 1px 1px 2px #000;
  font-weight: bold;
}
</style>