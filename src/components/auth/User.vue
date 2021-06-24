<template>
    <div class="bg-gray-800 absolute bottom-0 w-full">
        <router-link to="/profile" class="sidebar-icon flex items-center justify-center py-4 px-4 text-grey no-underline cursor-pointer hover:bg-grey-darker">
            <div class="w-full flex items-center">
                <img :src="icon" alt="" srcset="" class="mr-3 w-8 h-8 rounded-full">
                <div class="text-white flex-grow text-right">{{ name }}</div>
            </div>
        </router-link> <!-- end sidebar-icon -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			name: '',
			icon: '',
		}
	},
	computed: {
    ...mapGetters({
		loggedIn: 'getLoggedIn',
		})
	},
	mounted() { 
		this.name = this.$store.state.name;		
		this.icon = this.$store.state.icon;
		this.emitter.on("userUpdated", (res) => {
			console.log('Event Received');
			console.log(res.name);
			console.log(res.icon);
			this.name = res.name;		
			this.icon = res.icon;		
		});
	}
}
</script>
