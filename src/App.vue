<template>
	<div class="min-h-screen font-sans">
		<authorise v-if="!loggedIn" />
		<sidebar v-if="loggedIn" />
		<div v-if="loggedIn" class="ml-56">
			<router-view />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from './components/Sidebar.vue';
import Authorise from './views/Authorise.vue';
const { ipcRenderer } = require('electron');
export default {
	name: 'App',
	components: {
		Sidebar,
		Authorise
	},
	created() {
		ipcRenderer.send('app_version');
		ipcRenderer.send('app_check_update');
		ipcRenderer.on('app_version', (event, arg) => {
			ipcRenderer.removeAllListeners('app_version');
			console.log(arg.version);
		});
		ipcRenderer.on('message', function (event, text) {
			console.log('Message from updater:', text);
		});
		if (this.$store.getters.loggedIn) {	
			this.$store.dispatch('retreiveUser').then((res) => {
				this.emitter.emit("userUpdated", res);
				this.$router.push('/')
            }).catch((res) => {
				if (res.response.status == 401) {
					this.$store.dispatch('destroyTokenClientOnly').then(() => {
						this.$router.push('/profile')
					})				
				}
				console.log(res);
            });
		}
	},
	computed: {
		...mapGetters({loggedIn: 'getLoggedIn'})
	}
}
</script>
