<template>
<div class="bg-gray-900 text-white p-8">
    <p v-if="loggedIn">Logged In</p>
    <p v-if="!loggedIn">Logged Out</p>
</div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
}
</script>
