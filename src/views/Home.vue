<template>
<div class="bg-gray-900 min-h-screen text-white p-8">
    <p v-if="loggedIn">Logged In</p>
    <p v-if="!loggedIn">Logged Out</p>
    {{  }}
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapGetters({loggedIn: 'getLoggedIn'})
  }
}
</script>
