import {defineStore} from "pinia";

export const userStore = defineStore('todo', {
	state: () => ({
		user: {
			role: 'user',
			faction: undefined,
			email: undefined,
		}

	}),
	getters: {
		role: (state) => state.role,
		faction: (state) => state.faction,
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
