import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
	state: () => ({
		user: {
			role: 'user',
			faction: null,
			email: null,
		}
	}),
	getters: {
		role: (state) => state.user.role,
		faction: (state) => state.user.faction,
		email: (state) => state.user.email,
	},
	actions: {
		setUser(user) {
			this.user = user;
		},
		setFaction(faction) {
			this.user.faction = faction;
		},
		setEmail(email) {
			this.user.email = email;
		}
	},
});
