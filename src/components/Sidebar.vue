<template>
    <div class="w-56 bg-gray-700 text-white border-black border-r fixed min-h-screen pt-8">
      <div class="search-container text-center p-4 relative">
        <input type="text" placeholder="Search" class="bg-gray-900 text-gray-100 text-xs w-full p-2 pl-8 border-gray-300 border rounded">
        <div class="absolute top-0 py-5 px-2 text-gray-300">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" width="18" height="18"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path></svg>
        </div>
      </div>

      <div class="">
        <router-link to="/" class="flex items-center px-4 py-2 text-grey no-underline cursor-pointer hover:bg-grey-darker">
          <div class="text-white">Home</div>
        </router-link>
      </div>
      <div class="">
        <router-link to="/update" class="flex items-center px-4 py-2 text-grey no-underline cursor-pointer hover:bg-grey-darker">
          <div class="text-white">Updater</div>
        </router-link>
      </div>

      <user/>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import User from './auth/User.vue';
export default {
  components: {
    User
  },
  computed: {
    ...mapGetters({loggedIn: 'getLoggedIn'})
  }
}
</script>

