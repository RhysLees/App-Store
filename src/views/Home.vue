<template>
<div class="bg-gray-900 min-h-screen text-white p-8">
    <p v-if="loggedIn">Logged In</p>
    <p v-if="!loggedIn">Logged Out</p>
    <p>Version: {{ version }}</p>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
const { ipcRenderer } = require('electron');
export default {
  name: 'Home',
  computed: {
    ...mapGetters({loggedIn: 'getLoggedIn'})
  },
  data() {
    return {
      version: '0.0.0',
    }
  },
  created() {
    ipcRenderer.send('app_version');
		ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      this.version = arg.version;
    });
  }
}
</script>
