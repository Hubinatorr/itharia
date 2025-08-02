import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../views/MainPage.vue";
import SampleChapters from "../views/SampleChapters.vue";
import QuestsOfItharia from "../views/QuestsOfItharia.vue";
import WarOfItharia from "../views/WarOfItharia.vue";
import CardsOfItharia from "../views/CardsOfItharia.vue";
import Almanach from "../views/Almanach.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: MainPage
	},
	{
		path: "/sample-chapters",
		name: "Sample Chapters",
		component: SampleChapters
	},
	{
		path: "/war-of-itharia",
		name: "War of Itharia",
		component: WarOfItharia
	},
	{
		path: "/quests-of-itharia",
		name: "Quests Of Itharia",
		component: QuestsOfItharia
	},
	{
		path: "/cards-of-itharia",
		name: "Cards Of Itharia",
		component: CardsOfItharia
	},
	{
		path: "/almanach",
		name: "Almanach",
		component: Almanach
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
