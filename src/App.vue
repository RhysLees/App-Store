<template>
  <div id="app" class="flex min-h-screen font-sans">
    <sidebar/>
    <div class="flex-1 ml-56">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>
