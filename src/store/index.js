import Vuex from 'vuex';
import axios from 'axios';
axios.defaults.baseURL = "http://homestead.test/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const store = new Vuex.Store({
	state: {
        token: localStorage.getItem("token") || null,
        name: localStorage.getItem("name") || null,
        icon: localStorage.getItem("icon") || null,
	},
    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
        user(state) {
            return {
                name: state.name || 'Login',
                icon: state.icon,
            }
        }
    },
	mutations: {
		retreiveToken(state, token, name, icon) {
			state.token = token;
			state.name = name;
			state.icon = icon;
		},
		destroyToken(state) {
			state.token = null;
			state.name = null;
			state.icon = null;
		},
	},
	actions: {
		retreiveToken(context, credentials) {
			return new Promise((resolve, reject) => {
				axios
					.post("/sanctum/token", {
						email: credentials.email,
						password: credentials.password,
						device_name: "App",
					})
					.then((response) => {
						console.log(response);
						console.log(response.data.token);

						const token = response.data.token;
						const name = response.data.user.name;
						const icon = response.data.user.profile_photo_url;

						localStorage.setItem("token", token);
                        localStorage.setItem("name", name);
                        localStorage.setItem("icon", icon);
                        
                        context.commit("retreiveToken", token, name, icon);
                        
						resolve(response);
					})
					.catch((error) => {
						console.log(error);
						reject(error);
					});
			});
		},
        destroyToken(context) {
			axios.defaults.headers.common["Authorization"] =
				"Bearer " + context.state.token;
			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					axios
						.post("/logout", {
							token: context.state.token,
						})
						.then((response) => {
							console.log(response);

							localStorage.removeItem("token");
							localStorage.removeItem("name");
							localStorage.removeItem("icon");
							context.commit("destroyToken", null);
							resolve(response);
						})
						.catch((error) => {
							console.log(error);
							reject(error);
						});
				});
			}
		},
	},
});

export default store;